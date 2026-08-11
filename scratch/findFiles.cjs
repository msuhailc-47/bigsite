const fs = require('fs');
const lines = fs.readFileSync('src/pages/AdminDashboard.jsx', 'utf8').split('\n');
lines.forEach((l, i) => {
    if (l.includes('type="file"')) {
        console.log((i + 1) + ': ' + l.trim());
    }
});
