# Deploy Astro ke VPS (Non-Docker) + CI/CD

## Portfolio development and verification

`npm run dev` starts the local site. Profile, career history, and external links live in `src/data/profile.ts`. Blog entries marked `featured: true` appear in Engineering writing, newest first, up to three; all non-draft posts remain in `/blog/`.

Run `npm run verify` to check Astro, build, test in a browser, and audit the representative routes in `lighthouserc.cjs` with three mobile Lighthouse runs each. Local Playwright tests use an installed Google Chrome; CI uses its installed Playwright Chromium. If local Chrome is unavailable, install Playwright Chromium and set `CI=1` for the test command. Lighthouse uses installed Chrome. No test browser is shipped to website visitors.

Browser and axe reports are written to `playwright-report/` and `test-results/`; Lighthouse reports are saved under `.lighthouseci/`. CI retains these as artifacts for 14 days and blocks deployment if the quality thresholds in `CONSTRAINTS.md` are not met.

The iOS portfolio is available as readable HTML at `/projects/curated-works-2025/`, linking to ERHA Buddy, SLNG, Paintee, and Rooted DBT case studies. The original PDF still downloads directly; screenshots can be added to the Markdown studies when supplied. The older non-iOS gallery remains available. Public originals remain for existing image links; source copies in `src/assets/` let Astro generate optimized images.

Dokumen ini menjelaskan langkah lengkap untuk menjalankan situs Astro statis di VPS dengan Nginx + TLS Let’s Encrypt, serta pipeline CI/CD menggunakan GitHub Actions yang sudah ada di repo (`.github/workflows/deploy.yml`).

## Ringkasan Arsitektur
- Build di CI menghasilkan `dist/` (output statis). 
- CI mengirim `dist/` ke VPS via `rsync` ke `DEPLOY_PATH/releases/<commit>`.
- Symlink `DEPLOY_PATH/current` diaktifkan dan Nginx serve direktori itu.
- Reload Nginx untuk aktifkan rilis baru. Rollback cukup ganti symlink ke rilis lama.

## Prasyarat
- VPS Linux (Ubuntu 22.04/24.04), akses SSH.
- Domain mengarah ke IP VPS.
- GitHub repo dengan branch `main`.

## Setup VPS (sekali saja)
1. Buat user khusus deploy dan direktori aplikasi
   ```bash
   sudo adduser deploy
   sudo mkdir -p /var/www/portfolio/{releases,current}
   sudo chown -R deploy:deploy /var/www/portfolio
   ```
2. Pasang Nginx dan Certbot
   ```bash
   sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
   sudo ufw allow 'Nginx Full'
   ```
3. Konfigurasi Nginx
   ```nginx
   # /etc/nginx/sites-available/portfolio
   server {
     server_name yourdomain.com www.yourdomain.com;
     root /var/www/portfolio/current;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # Cache aset
     location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
       expires 30d;
       add_header Cache-Control "public, max-age=2592000, immutable";
     }

     # HTML jangan di-cache lama
     location ~* \.(html)$ {
       add_header Cache-Control "no-cache";
     }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
   sudo nginx -t && sudo systemctl reload nginx
   ```
4. Aktifkan TLS Let’s Encrypt
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Kunci SSH untuk CI
1. Buat key di lokal (atau di GitHub Codespaces)
   ```bash
   ssh-keygen -t ed25519 -C "deploy@yourdomain"
   ```
2. Tambahkan public key ke VPS
   ```bash
   ssh-copy-id -p 22 deploy@yourdomain
   ```
3. Simpan private key sebagai GitHub Secret `SSH_PRIVATE_KEY`.

## Secrets GitHub yang diperlukan
- `SSH_HOST`: IP/domain VPS, mis. `yourdomain.com`
- `SSH_USER`: `deploy`
- `SSH_PORT`: `22` (opsional)
- `DEPLOY_PATH`: `/var/www/portfolio`
- `SSH_PRIVATE_KEY`: isi private key (format OpenSSH)

## CI/CD yang telah disediakan
- File: `.github/workflows/deploy.yml` 
- Memicu pada push ke `main` dan file relevan (paths filter). 
- Concurrency aktif agar run lama dibatalkan jika ada push baru.
- Tahapan: checkout → setup Node 20 → `npm install` → `npm run build` → `rsync` → symlink → reload Nginx.

## Manual deploy (opsional)
Jika ingin deploy langsung dari lokal tanpa CI:
```bash
npm run build
rsync -az --delete dist/ deploy@yourdomain:/var/www/portfolio/releases/$(git rev-parse HEAD)/
ssh deploy@yourdomain "ln -sfn /var/www/portfolio/releases/$(git rev-parse HEAD) /var/www/portfolio/current && sudo systemctl reload nginx"
```

## Rollback
```bash
ssh deploy@yourdomain "ls -ltr /var/www/portfolio/releases"
ssh deploy@yourdomain "ln -sfn /var/www/portfolio/releases/<commit-lama> /var/www/portfolio/current && sudo systemctl reload nginx"
```

## Rekomendasi .gitignore
Tambahkan file `.gitignore` dengan entri:
```
node_modules/
dist/
.astro/
.DS_Store
.env
```

## Catatan tentang Docker
- Untuk situs Astro statis, Docker tidak diperlukan. Nginx + file statis sudah sangat ringan.
- Jika tetap ingin Docker, pola minimal: Nginx container dengan volume mapping ke folder `dist/`. 
- Namun pendekatan di atas (non‑Docker) lebih sederhana dan hemat resource untuk VPS 2 core 2 GB.

## Troubleshooting
- Pastikan DNS domain mengarah ke IP VPS sebelum menjalankan Certbot.
- Jika reload Nginx gagal di step CI, hapus bagian `sudo systemctl reload nginx` dari workflow atau izinkan `deploy` menjalankan reload via `sudoers`:
  ```bash
  sudo visudo
  deploy ALL=(ALL) NOPASSWD:/bin/systemctl reload nginx
  ```
