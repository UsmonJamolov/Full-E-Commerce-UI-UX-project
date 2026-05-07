# Yandex Cloud (VM) ga joylash

Bu loyiha **bitta VM**da **nginx** (80-port) orqali **Next.js** va **Express**ni birgalikda ishga tushiradi. MongoDB compose ichida yoki tashqi (Managed MongoDB / Atlas) bo‘lishi mumkin.

Men sizning Yandex akkauntingizga ulanib VM yaratib berolmayman — quyidagi qadamlarni o‘zingiz bajarasiz; repoda `docker-compose.yml` va `deploy/nginx/default.conf` tayyor.

## 1. Yandex Cloud

1. [console.cloud.yandex.ru](https://console.cloud.yandex.ru) — **Compute Cloud** → **VM yaratish**.
2. **Ubuntu 22.04 LTS**, kamida **2 vCPU, 4 GB RAM** (Next `build` uchun).
3. **Tarmoq**: umumiy IP yoqing; **Security group**da **TCP 22** (SSH), **80** (HTTP), kerak bo‘lsa **443** (HTTPS).
4. VM ishga tushgach, **umumiy IP**ni yozib oling.

## 2. VMda Docker

SSH bilan kirgach (Linux uchun misol):

```bash
sudo apt update && sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 3. Loyihani VMga olish

```bash
git clone https://github.com/UsmonJamolov/Full-E-Commerce-UI-UX-project.git app
cd app
cp .env.example .env
nano .env   # YOUR_VM_IP o‘rniga haqiqiy IP yoki domen
```

**Muhim:**

- `NEXT_PUBLIC_SERVER_URL`, `NEXTAUTH_URL`, `CLIENT_URL` — **bir xil** asosiy manzil (masalan `http://51.x.x.x` yoki `https://shop.example.com`).
- `JWT_SECRET` va `NEXT_PUBLIC_JWT_SECRET` — **bir xil qiymat** (frontend token imzo va backend tekshiruvi mos tursin).

## 4. Ishga tushirish

Loyiha ildizida:

```bash
sudo docker compose up -d --build
```

Birinchi marta MongoDB tayyorlanmaguncha `api` konteyneri xato bilan qayta ishga tushishi mumkin; bir necha soniyadan keyin `sudo docker compose ps` da hammasi `running` bo‘lishi kerak.

Brauzerda: `http://<VM_IP>/`

## 5. HTTPS va domen

- Domenni VM umumiy IPga **A yozuvi** bilan bog‘lang.
- VMda **Certbot + nginx** yoki Yandex **Application Load Balancer** + sertifikat — `NEXT_PUBLIC_SERVER_URL` / `NEXTAUTH_URL` / `CLIENT_URL` ni **https://** ga o‘zgartiring, qayta build: `sudo docker compose up -d --build`.

## 6. Tashqi MongoDB ishlatsangiz

1. `.env` da `MONGO_URI` ni tashqi clusterga qo‘ying.
2. `docker-compose.yml` dan `mongo` servisini va `api` dagi `depends_on: mongo` ni olib tashlang (yoki alohida `compose.override` ishlating).

## 7. Xavfsizlik

- `.env` ni gitga commit qilmang.
- Ishlab chiqarishda kuchli `NEXTAUTH_SECRET`, `JWT_SECRET` ishlating.
- Security groupda faqat kerakli portlar ochiq bo‘lsin.
