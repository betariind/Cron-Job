const fs = require('fs');
const path = require('path');

const DIR = 'D:/Program/cron-job/home/cron';
const MAX_AGE_DAYS = 30;

const now = Date.now();

fs.readdir(DIR, (err, files) => {
  if (err) {
    console.error('❌ Gagal baca directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(DIR, file);

    fs.stat(filePath, (err, stats) => {
      if (err) return;

      const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

      if (ageDays > MAX_AGE_DAYS) {
        fs.unlink(filePath, err => {
          if (!err) {
            console.log(`🗑️ File dihapus: ${file}`);
          }
        });
      }
    });
  });
});
