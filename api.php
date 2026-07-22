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
$config_file = __DIR__ . '/config.json';
$upload_dir = __DIR__ . '/uploads/';
$orders_dir = __DIR__ . '/uploads/orders/';
$orders_file = __DIR__ . '/orders.json';

// Ensure upload directories exist
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}
if (!is_dir($orders_dir)) {
    mkdir($orders_dir, 0755, true);
}

// Function to read orders
function read_orders() {
    global $orders_file;
    if (!file_exists($orders_file)) {
        return [];
    }
    $content = file_get_contents($orders_file);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

// Function to write orders
function write_orders($orders) {
    global $orders_file;
    return file_put_contents($orders_file, json_encode($orders, JSON_PRETTY_PRINT));
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

// Function to read global config
function read_config() {
    global $config_file;
    $default = ["gdrive_folder_id" => "", "gdrive_script_url" => "", "print_enabled" => true];
    if (!file_exists($config_file)) {
        return $default;
    }
    $data = json_decode(file_get_contents($config_file), true);
    if (!is_array($data)) {
        return $default;
    }
    if (!isset($data['gdrive_folder_id'])) $data['gdrive_folder_id'] = "";
    if (!isset($data['gdrive_script_url'])) $data['gdrive_script_url'] = "";
    if (!isset($data['print_enabled'])) $data['print_enabled'] = true;
    return $data;
}

// Function to write global config
function write_config($data) {
    global $config_file;
    return file_put_contents($config_file, json_encode($data, JSON_PRETTY_PRINT));
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
    if ($action === 'get_config') {
        echo json_encode(read_config());
        exit();
    }
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
    
    if ($action === 'gdrive_files') {
        $folder_id = isset($_GET['folder_id']) ? trim($_GET['folder_id']) : '';
        $script_url = isset($_GET['script_url']) ? trim($_GET['script_url']) : '';
        
        if (empty($folder_id) || empty($script_url)) {
            echo json_encode(["success" => false, "error" => "Folder ID and Apps Script URL are required."]);
            exit();
        }
        
        if (strpos($script_url, 'https://script.google.com/') !== 0) {
            echo json_encode(["success" => false, "error" => "Invalid Google Apps Script URL. Must start with https://script.google.com/"]);
            exit();
        }
        
        $url = $script_url . (strpos($script_url, '?') !== false ? '&' : '?') . 'id=' . urlencode($folder_id);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code === 200 && $response) {
            echo $response;
        } else {
            echo json_encode(["success" => false, "error" => "Failed to fetch files from Google Apps Script. HTTP Code: " . $http_code]);
        }
        exit();
    }

    if ($action === 'get_orders') {
        echo json_encode(read_orders());
        exit();
    }

    echo json_encode(read_frames());
    exit();
}

// 2. POST /api.php - Operations
if ($method === 'POST') {
    if ($action !== 'create_order') {
        check_auth();
    }
    
    // Create Print Order (Public)
    if ($action === 'create_order') {
        $config = read_config();
        if (isset($config['print_enabled']) && !$config['print_enabled']) {
            http_response_code(403);
            echo json_encode(["error" => "Fitur cetak foto saat ini sedang dinonaktifkan oleh administrator."]);
            exit();
        }
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $whatsapp = isset($_POST['whatsapp']) ? trim($_POST['whatsapp']) : '';
        $payment_method = isset($_POST['payment_method']) ? trim($_POST['payment_method']) : '';

        if (empty($name) || empty($whatsapp) || empty($payment_method)) {
            http_response_code(400);
            echo json_encode(["error" => "Nama, No WhatsApp, dan Metode Pembayaran wajib diisi."]);
            exit();
        }

        // Validate twibbon image upload
        if (!isset($_FILES['twibbon_image']) || $_FILES['twibbon_image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["error" => "Hasil gambar twibbon wajib diunggah."]);
            exit();
        }

        // Save Twibbon Image
        $twibbon_file = $_FILES['twibbon_image'];
        $twibbon_ext = strtolower(pathinfo($twibbon_file['name'], PATHINFO_EXTENSION));
        if (!in_array($twibbon_ext, ['png', 'jpg', 'jpeg'])) {
            $twibbon_ext = 'png';
        }
        $twibbon_filename = 'twibbon_' . time() . '_' . uniqid() . '.' . $twibbon_ext;
        $twibbon_dest = $orders_dir . $twibbon_filename;

        if (!move_uploaded_file($twibbon_file['tmp_name'], $twibbon_dest)) {
            http_response_code(500);
            echo json_encode(["error" => "Gagal menyimpan hasil gambar twibbon ke server."]);
            exit();
        }

        // Handle Payment Proof if payment method is QRIS
        $proof_path = null;
        if ($payment_method === 'qris') {
            if (!isset($_FILES['payment_proof']) || $_FILES['payment_proof']['error'] !== UPLOAD_ERR_OK) {
                @unlink($twibbon_dest);
                http_response_code(400);
                echo json_encode(["error" => "Bukti pembayaran QRIS wajib diunggah untuk metode QRIS."]);
                exit();
            }
            $proof_file = $_FILES['payment_proof'];
            $proof_ext = strtolower(pathinfo($proof_file['name'], PATHINFO_EXTENSION));
            if (!in_array($proof_ext, ['png', 'jpg', 'jpeg'])) {
                $proof_ext = 'png';
            }
            $proof_filename = 'proof_' . time() . '_' . uniqid() . '.' . $proof_ext;
            $proof_dest = $orders_dir . $proof_filename;

            if (!move_uploaded_file($proof_file['tmp_name'], $proof_dest)) {
                @unlink($twibbon_dest);
                http_response_code(500);
                echo json_encode(["error" => "Gagal menyimpan bukti pembayaran ke server."]);
                exit();
            }
            $proof_path = "uploads/orders/" . $proof_filename;
        }

        // Save Order to database
        $orders = read_orders();
        $new_order = [
            "id" => "ord_" . time() . "_" . uniqid(),
            "name" => $name,
            "whatsapp" => $whatsapp,
            "payment_method" => $payment_method,
            "twibbon_image" => "uploads/orders/" . $twibbon_filename,
            "payment_proof" => $proof_path,
            "status" => "pending",
            "created_at" => date("Y-m-d H:i:s")
        ];
        $orders[] = $new_order;
        write_orders($orders);

        echo json_encode(["success" => true, "order" => $new_order]);
        exit();
    }

    // Upload QRIS Image (Admin)
    if ($action === 'upload_qris') {
        if (!isset($_FILES['qris_image']) || $_FILES['qris_image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["error" => "File QRIS image is required."]);
            exit();
        }

        $file = $_FILES['qris_image'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, ['png', 'jpg', 'jpeg', 'gif'])) {
            http_response_code(400);
            echo json_encode(["error" => "Only PNG, JPG, JPEG, or GIF images are allowed for QRIS."]);
            exit();
        }

        $filename = 'qris_' . time() . '_' . uniqid() . '.' . $ext;
        $destination = $upload_dir . $filename;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            $config = read_config();
            if (!empty($config['qris_image']) && file_exists(__DIR__ . '/' . $config['qris_image'])) {
                @unlink(__DIR__ . '/' . $config['qris_image']);
            }
            $config['qris_image'] = "uploads/" . $filename;
            write_config($config);

            echo json_encode(["success" => true, "qris_image" => $config['qris_image']]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to save QRIS image."]);
        }
        exit();
    }

    // Update Order Status (Admin)
    if ($action === 'update_order_status') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? trim($input['id']) : '';
        $status = isset($input['status']) ? trim($input['status']) : '';

        if (empty($id) || empty($status)) {
            http_response_code(400);
            echo json_encode(["error" => "Order ID and Status are required."]);
            exit();
        }

        $orders = read_orders();
        $found = false;
        foreach ($orders as &$order) {
            if ($order['id'] === $id) {
                $order['status'] = $status;
                $found = true;
                break;
            }
        }

        if ($found) {
            write_orders($orders);
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Order not found."]);
        }
        exit();
    }

    // Delete Order (Admin)
    if ($action === 'delete_order') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? trim($input['id']) : '';

        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "Order ID is required."]);
            exit();
        }

        $orders = read_orders();
        $filtered_orders = [];
        $found = false;

        foreach ($orders as $order) {
            if ($order['id'] === $id) {
                if (!empty($order['twibbon_image']) && file_exists(__DIR__ . '/' . $order['twibbon_image'])) {
                    @unlink(__DIR__ . '/' . $order['twibbon_image']);
                }
                if (!empty($order['payment_proof']) && file_exists(__DIR__ . '/' . $order['payment_proof'])) {
                    @unlink(__DIR__ . '/' . $order['payment_proof']);
                }
                $found = true;
            } else {
                $filtered_orders[] = $order;
            }
        }

        if ($found) {
            write_orders($filtered_orders);
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Order not found."]);
        }
        exit();
    }

    // Save Global Config
    if ($action === 'save_config') {
        $input = json_decode(file_get_contents('php://input'), true);
        $config = read_config();
        if (isset($input['gdrive_folder_id'])) $config['gdrive_folder_id'] = trim($input['gdrive_folder_id']);
        if (isset($input['gdrive_script_url'])) $config['gdrive_script_url'] = trim($input['gdrive_script_url']);
        if (isset($input['print_enabled'])) $config['print_enabled'] = (bool)$input['print_enabled'];
        write_config($config);
        echo json_encode(["success" => true, "config" => $config]);
        exit();
    }

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
                // Delete physical file
                $filepath = __DIR__ . '/' . $frame['src'];
                if (file_exists($filepath)) {
                    @unlink($filepath);
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
    
    // Edit Google Drive Settings for Existing Frame
    if ($action === 'edit_gdrive') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? trim($input['id']) : (isset($_POST['id']) ? trim($_POST['id']) : '');
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "Frame ID is required."]);
            exit();
        }
        
        $gdrive_folder_id = isset($input['gdrive_folder_id']) ? trim($input['gdrive_folder_id']) : (isset($_POST['gdrive_folder_id']) ? trim($_POST['gdrive_folder_id']) : '');
        $gdrive_script_url = isset($input['gdrive_script_url']) ? trim($input['gdrive_script_url']) : (isset($_POST['gdrive_script_url']) ? trim($_POST['gdrive_script_url']) : '');
        
        $frames = read_frames();
        $found = false;
        
        foreach ($frames as &$frame) {
            if ($frame['id'] === $id) {
                $frame['gdrive_folder_id'] = $gdrive_folder_id;
                $frame['gdrive_script_url'] = $gdrive_script_url;
                $found = true;
                break;
            }
        }
        
        if ($found) {
            write_frames($frames);
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
