<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight options requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$db_file = __DIR__ . '/frames.json';
$upload_dir = __DIR__ . '/uploads/';

// Ensure upload directory exists
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Function to read frames from database file
function read_frames() {
    global $db_file;
    if (!file_exists($db_file)) {
        // Initial fallback frame list
        $initial = [
            [
                "id" => "default_cai_2026",
                "name" => "CAI Lombok 2026",
                "src" => "twibonze CAI26 (1).png",
                "order" => 0,
                "isDefault" => true,
                "slots_count" => 4,
                "slots" => [
                    ["x" => 92, "y" => 153, "width" => 896, "height" => 413],
                    ["x" => 92, "y" => 582, "width" => 442, "height" => 498],
                    ["x" => 546, "y" => 582, "width" => 442, "height" => 243],
                    ["x" => 546, "y" => 837, "width" => 442, "height" => 243]
                ]
            ]
        ];
        file_put_contents($db_file, json_encode($initial, JSON_PRETTY_PRINT));
        return $initial;
    }
    $content = file_get_contents($db_file);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        return [];
    }
    // Sort by order ascending
    usort($data, function($a, $b) {
        return $a['order'] - $b['order'];
    });
    return $data;
}

// Function to write frames to database file
function write_frames($frames) {
    global $db_file;
    // Sort by order ascending before saving
    usort($frames, function($a, $b) {
        return $a['order'] - $b['order'];
    });
    return file_put_contents($db_file, json_encode($frames, JSON_PRETTY_PRINT));
}

// Simple authentication check
function check_auth() {
    $headers = getallheaders();
    $password = '';
    
    // Check Authorization header or parameter
    if (isset($headers['Authorization'])) {
        $password = trim($headers['Authorization']);
    } elseif (isset($_POST['password'])) {
        $password = trim($_POST['password']);
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['password'])) {
            $password = trim($input['password']);
        }
    }
    
    if ($password !== '354313') {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized. Invalid password."]);
        exit();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// 1. GET /api.php - Get all frames or Google Drive proxy
if ($method === 'GET') {
    if ($action === 'gdrive_proxy') {
        $file_id = isset($_GET['file_id']) ? trim($_GET['file_id']) : '';
        if (empty($file_id)) {
            http_response_code(400);
            echo json_encode(["error" => "File ID is required."]);
            exit();
        }
        
        $url = "https://lh3.googleusercontent.com/d/" . $file_id;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        $data = curl_exec($ch);
        $mime = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code === 200 && $data) {
            header("Content-Type: " . $mime);
            header("Cache-Control: public, max-age=86400"); // Cache for 1 day
            echo $data;
        } else {
            http_response_code(404);
            echo "Failed to load image from Google Drive.";
        }
        exit();
    }

    echo json_encode(read_frames());
    exit();
}

// 2. POST /api.php - Admin operations
if ($method === 'POST') {
    check_auth();
    
    // Save Frame
    if ($action === 'save') {
        if (!isset($_POST['name']) || empty(trim($_POST['name']))) {
            http_response_code(400);
            echo json_encode(["error" => "Frame name is required."]);
            exit();
        }
        
        if (!isset($_FILES['frame_image']) || $_FILES['frame_image']['error'] !== UPLOAD_ERR_OK) {
            $upload_error_code = isset($_FILES['frame_image']) ? $_FILES['frame_image']['error'] : -1;
            $upload_error_messages = [
                0 => 'Upload sukses', 1 => 'File melebihi upload_max_filesize di php.ini',
                2 => 'File melebihi MAX_FILE_SIZE di form HTML', 3 => 'File hanya terupload sebagian',
                4 => 'Tidak ada file yang dipilih', 6 => 'Folder temp tidak ditemukan',
                7 => 'Gagal menulis file ke disk', 8 => 'Upload dihentikan oleh ekstensi PHP'
            ];
            $msg = isset($upload_error_messages[$upload_error_code]) ? $upload_error_messages[$upload_error_code] : 'Error tidak dikenal';
            http_response_code(400);
            echo json_encode(["error" => "Upload gagal (kode $upload_error_code): $msg"]);
            exit();
        }
        
        $file = $_FILES['frame_image'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        // Validate MIME/Extension (Must be PNG)
        if ($ext !== 'png' || $file['type'] !== 'image/png') {
            http_response_code(400);
            echo json_encode(["error" => "Only transparent PNG frames are allowed."]);
            exit();
        }
        
        // Save file with unique name
        $filename = 'frame_' . time() . '_' . uniqid() . '.png';
        $destination = $upload_dir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            $frames = read_frames();
            $next_order = count($frames) > 0 ? max(array_column($frames, 'order')) + 1 : 0;
            
            // Parse slots coordinates sent from admin panel
            $slots_count = isset($_POST['slots_count']) ? intval($_POST['slots_count']) : 4;
            $slots_arr = [];
            if (isset($_POST['slots']) && !empty($_POST['slots'])) {
                $parsed = json_decode($_POST['slots'], true);
                if (is_array($parsed)) {
                    $slots_arr = $parsed;
                }
            }
            // If no valid slots provided, default to full-frame slots
            if (empty($slots_arr)) {
                for ($s = 0; $s < $slots_count; $s++) {
                    $slots_arr[] = ["x" => 0, "y" => 0, "width" => 1080, "height" => 1080];
                }
            }
            
            $new_frame = [
                "id" => "custom_" . time(),
                "name" => trim($_POST['name']),
                "src" => "uploads/" . $filename,
                "order" => $next_order,
                "isDefault" => false,
                "slots_count" => $slots_count,
                "slots" => $slots_arr,
                "gdrive_folder_id" => isset($_POST['gdrive_folder_id']) ? trim($_POST['gdrive_folder_id']) : '',
                "gdrive_script_url" => isset($_POST['gdrive_script_url']) ? trim($_POST['gdrive_script_url']) : ''
            ];
            
            $frames[] = $new_frame;
            write_frames($frames);
            
            echo json_encode(["success" => true, "frame" => $new_frame]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to save file on the server."]);
        }
        exit();
    }
    
    // Delete Frame
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? $input['id'] : (isset($_POST['id']) ? $_POST['id'] : '');
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "Frame ID is required for deletion."]);
            exit();
        }
        
        $frames = read_frames();
        $found = false;
        $updated_frames = [];
        
        foreach ($frames as $frame) {
            if ($frame['id'] === $id) {
                if ($frame['isDefault']) {
                    http_response_code(403);
                    echo json_encode(["error" => "Built-in default frame cannot be deleted."]);
                    exit();
                }
                // Delete physical file
                $filepath = __DIR__ . '/' . $frame['src'];
                if (file_exists($filepath)) {
                    unlink($filepath);
                }
                $found = true;
            } else {
                $updated_frames[] = $frame;
            }
        }
        
        if ($found) {
            // Re-index orders
            foreach ($updated_frames as $idx => &$frame) {
                $frame['order'] = $idx;
            }
            write_frames($updated_frames);
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Frame not found."]);
        }
        exit();
    }
    
    // Reorder Frames
    if ($action === 'reorder') {
        $input = json_decode(file_get_contents('php://input'), true);
        $frame_ids = isset($input['frame_ids']) ? $input['frame_ids'] : [];
        
        if (!is_array($frame_ids) || count($frame_ids) === 0) {
            http_response_code(400);
            echo json_encode(["error" => "List of frame IDs in ordered structure is required."]);
            exit();
        }
        
        $frames = read_frames();
        $updated_frames = [];
        
        // Re-index order based on provided array order
        foreach ($frames as &$frame) {
            $new_index = array_search($frame['id'], $frame_ids);
            if ($new_index !== false) {
                $frame['order'] = $new_index;
            }
        }
        
        write_frames($frames);
        echo json_encode(["success" => true]);
        exit();
    }
}

http_response_code(400);
echo json_encode(["error" => "Invalid API action or request."]);
exit();
?>
