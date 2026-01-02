const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OUTPUT_DIR = 'D:/Program/cron-job/home/cron';

// Pastikan folder ada
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Ambil tanggal & jam
const now = new Date();

const date = String(now.getMonth() + 1).padStart(2, '0') +
             String(now.getDate()).padStart(2, '0') +
             now.getFullYear();

const hours = String(now.getHours()).padStart(2, '0') + '.00';

const filename = `cron_${date}_${hours}.csv`;
const filePath = path.join(OUTPUT_DIR, filename);

// Simulasi data (bisa dari API / scraping)
async function collectData() {
  try {
    // Contoh API dummy
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

    let csv = 'id,title,body\n';
    response.data.forEach(item => {
      csv += `${item.id},"${item.title}","${item.body}"\n`;
    });

    fs.writeFileSync(filePath, csv);
    console.log(`✅ Data berhasil disimpan: ${filename}`);
  } catch (error) {
    console.error('❌ Gagal collect data:', error.message);
  }
}

collectData();
