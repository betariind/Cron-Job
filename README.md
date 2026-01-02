1. Deskripsi Proyek

Proyek ini bertujuan untuk melakukan otomatisasi pengambilan data (data collection) sebanyak 3 kali sehari dan pembersihan data lama (data cleansing) secara otomatis menggunakan Node.js di Windows.

Otomatisasi dijalankan menggunakan Windows Task Scheduler sebagai pengganti cron job di Linux.

2. Jadwal Otomatisasi
Data Collection

Data dikumpulkan 3 kali sehari pada jam:

08.00 WIB

12.00 WIB

15.00 WIB

Data Cleanup

Pembersihan data dijalankan:

1 kali sehari

Contoh: 01.00 WIB

Menghapus file yang berumur lebih dari 30 hari

3. Struktur Folder
D:\Program\cron-job\
├── collectdata.js      # Script pengambilan data
├── cleanup.js          # Script pembersihan data
├── package.json
├── package-lock.json
└── node_modules\

Folder output data:
C:\home\cron\

4. Format File Output

File hasil data collection disimpan dalam format CSV dengan pola:

cron_{MMDDYYYY}_{HH.MM}.csv

Contoh:
cron_12192024_08.00.csv
cron_12192024_12.00.csv
cron_12192024_15.00.csv

5. Persiapan Awal
5.1 Install Node.js

Download dan install Node.js LTS dari:

https://nodejs.org


Pastikan terinstall:

node -v
npm -v

5.2 Install Dependency

Masuk ke folder project:

cd D:\Program\cron-job


Install dependency:

npm install

6. Pengujian Manual (Opsional – Sekali Saja)

⚠️ Pengujian manual hanya untuk memastikan script berjalan, bukan untuk penggunaan harian.

Test data collection:
node collectdata.js


Pastikan file .csv muncul di:

C:\home\cron

Test data cleanup:
node cleanup.js


Jika tidak ada error, script siap dijalankan otomatis.

7. Menjalankan Skrip Secara Otomatis (CRON)

❗ Setelah Task Scheduler dikonfigurasi, script akan berjalan otomatis.
❗ Tidak perlu menjalankan node collectdata.js secara manual setiap hari.

8. Konfigurasi Task Scheduler – Data Collection

Buat 3 task terpisah menggunakan Create Basic Task:
Konfigurasi Action (sama untuk semua task):

Program/script

C:\Program Files\nodejs\node.exe


Add arguments

D:\Program\cron-job\collectdata.js


Start in

D:\Program\cron-job

9. Konfigurasi Task Scheduler – Data Cleanup

Buat 1 task terpisah:

Nama task: Cleanup Old CSV

Trigger: Daily

Jam: 01:00 (atau jam bebas)

Action:

Program/script:

C:\Program Files\nodejs\node.exe


Add arguments:

D:\Program\cron-job\cleanup.js


Start in:

D:\Program\cron-job

10. Cara Kerja Sistem (Ringkas)

Task Scheduler menjalankan script sesuai jadwal

collectdata.js membuat file CSV otomatis

File disimpan ke folder output

cleanup.js menghapus file lama (>30 hari)

Semua berjalan tanpa intervensi manual
