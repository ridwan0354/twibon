#!/bin/bash

# --- CONFIGURATIONS ---
DOMAIN="twibbon.galipatsistem.com"
GIT_REPO="https://github.com/ridwan0354/twibon.git"
WEB_ROOT="/var/www/$DOMAIN"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

# Text Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Memulai Setup Twibbon CAI di VPS ===${NC}"

# 1. Pastikan dijalankan sebagai root/sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: Harap jalankan script ini sebagai root atau menggunakan sudo!${NC}"
  exit 1
fi

# 2. Cek apakah Git terinstall
if ! command -v git &> /dev/null; then
    echo -e "${BLUE}Menginstall Git...${NC}"
    apt update && apt install -y git
fi

# 3. Cek apakah Nginx terinstall
if ! command -v nginx &> /dev/null; then
    echo -e "${BLUE}Menginstall Nginx...${NC}"
    apt update && apt install -y nginx
fi

# 4. Buat Web Root & Clone Repository
echo -e "${BLUE}Menyiapkan direktori website di: $WEB_ROOT${NC}"
if [ -d "$WEB_ROOT" ]; then
    echo -e "${GREEN}Direktori sudah ada. Melakukan git pull untuk update...${NC}"
    cd "$WEB_ROOT" || exit
    # Mengamankan direktori jika kepemilikan git berbeda
    git config --global --add safe.directory "$WEB_ROOT"
    git pull origin main
else
    echo -e "${GREEN}Mengkloning project dari GitHub...${NC}"
    git clone "$GIT_REPO" "$WEB_ROOT"
fi

# Setel izin direktori agar bisa dibaca oleh Nginx
echo -e "${BLUE}Mengatur hak akses file...${NC}"
chown -R www-data:www-data "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"

# 5. Buat Konfigurasi Nginx Server Block
echo -e "${BLUE}Membuat konfigurasi Nginx untuk $DOMAIN...${NC}"
cat << EOF > "$NGINX_CONF"
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    root $WEB_ROOT;
    index index.html;

    # Gzip compression untuk performa loading cepat
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Cache Control untuk static assets agar lebih kencang
    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
        expires 1M;
        access_log off;
        add_header Cache-Control "public";
    }

    location ~* \.(?:css|js)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public";
    }

    # Keamanan tambahan
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer-when-downgrade";

    error_log  /var/log/nginx/${DOMAIN}_error.log;
    access_log /var/log/nginx/${DOMAIN}_access.log;
}
EOF

# 6. Aktifkan konfigurasi di Nginx (Buat symlink)
if [ ! -f "$NGINX_ENABLED" ]; then
    echo -e "${BLUE}Mengaktifkan Nginx Server Block...${NC}"
    ln -s "$NGINX_CONF" "$NGINX_ENABLED"
fi

# Test konfigurasi Nginx
nginx -t
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Konfigurasi Nginx valid. Merestart Nginx...${NC}"
    systemctl reload nginx
else
    echo -e "${RED}Konfigurasi Nginx tidak valid! Mohon cek log.${NC}"
    exit 1
fi

# 7. Setup SSL menggunakan Certbot Let's Encrypt (SANGAT PENTING untuk Akses Kamera & Share)
echo -e "${BLUE}=== Setup SSL (HTTPS) dengan Certbot ===${NC}"
if ! command -v certbot &> /dev/null; then
    echo -e "${BLUE}Menginstall Certbot...${NC}"
    apt update
    apt install -y certbot python3-certbot-nginx
fi

echo -e "${BLUE}Memulai konfigurasi SSL otomatis untuk $DOMAIN...${NC}"
echo -e "${BLUE}Pastikan domain $DOMAIN sudah diarahkan (DNS A Record) ke IP VPS ini!${NC}"

# Jalankan Certbot secara interaktif
certbot --nginx -d "$DOMAIN"

# Reload nginx sekali lagi setelah sertifikat terpasang
systemctl reload nginx

echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT SELESAI!${NC}"
echo -e "${GREEN}Website Anda aktif di: https://$DOMAIN${NC}"
echo -e "${GREEN}====================================================${NC}"
