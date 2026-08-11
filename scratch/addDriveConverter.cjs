const fs = require('fs');
const file = 'src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

const helper = `  // Helper to convert Google Drive link to direct image link
  const convertDriveUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    const match = url.match(/\\/file\\/d\\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return \`https://lh3.googleusercontent.com/d/\${match[1]}\`;
    }
    return url;
  };
`;

if (!content.includes('convertDriveUrl')) {
  // Insert helper right after const { translationsData, ... } = useCMS();
  content = content.replace(
    /(const { translationsData.*?useCMS\(\);\n)/s,
    `$1\n${helper}\n`
  );

  // Update handleTextChange
  content = content.replace(
    /(const handleTextChange =.*?\{)/,
    `$1\n    if (typeof value === 'string' && value.includes('drive.google.com/file/d/')) value = convertDriveUrl(value);`
  );

  // Update handleArrayItemChange
  content = content.replace(
    /(const handleArrayItemChange =.*?\{)/,
    `$1\n    if (typeof value === 'string' && value.includes('drive.google.com/file/d/')) value = convertDriveUrl(value);`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Added convertDriveUrl and updated change handlers.');
} else {
  console.log('Already added convertDriveUrl.');
}
