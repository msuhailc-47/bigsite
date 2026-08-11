const fs = require('fs');

const transPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/i18n/translations.js";
let transContent = fs.readFileSync(transPath, 'utf8');

// Add images to English
transContent = transContent.replace(
  /hero: {/,
  `hero: {
      image: '',`
);
transContent = transContent.replace(
  /about: {/,
  `about: {
      image: '',`
);

// Add images to Malayalam
transContent = transContent.replace(
  /hero: {\s*tagline: 'Think Better/g,
  `hero: {
      image: '',
      tagline: 'Think Better`
);
transContent = transContent.replace(
  /about: {\s*label: 'ഞങ്ങളെക്കുറിച്ച്'/g,
  `about: {
      image: '',
      label: 'ഞങ്ങളെക്കുറിച്ച്'`
);

fs.writeFileSync(transPath, transContent, 'utf8');

console.log("Updated translations.js");

const heroPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/components/Hero.jsx";
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(
  /<div className="hero-grid-bg" \/>/,
  `<div className="hero-grid-bg" />
      {t.hero.image && <div className="hero-bg-image" style={{ backgroundImage: \`url(\${t.hero.image})\` }} />}`
);
fs.writeFileSync(heroPath, heroContent, 'utf8');

const heroCssPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/components/Hero.css";
let heroCssContent = fs.readFileSync(heroCssPath, 'utf8');
heroCssContent += `\n.hero-bg-image { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 1; opacity: 0.3; }`;
heroCssContent = heroCssContent.replace(`.hero-content {`, `.hero-content { z-index: 2; position: relative;`);
fs.writeFileSync(heroCssPath, heroCssContent, 'utf8');

const aboutPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/components/About.jsx";
let aboutContent = fs.readFileSync(aboutPath, 'utf8');
aboutContent = aboutContent.replace(
  /<div className="about-image-placeholder">/,
  `{t.about.image ? (
            <img src={t.about.image} alt="About Us" className="about-real-image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
          ) : (
          <div className="about-image-placeholder">`
);
aboutContent = aboutContent.replace(
  /<\/div>\n\s*<div className="about-stats">/s,
  `</div>\n          )}\n          <div className="about-stats">`
);
fs.writeFileSync(aboutPath, aboutContent, 'utf8');

console.log("Updated components");

const adminPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let adminContent = fs.readFileSync(adminPath, 'utf8');
adminContent = adminContent.replace(
  /<input\n                      type="text"\n                      value=\{sectionData\[editLang\]\.hero\.subtitle/s,
  `<div className="admin-form-group">
                    <label>Hero Background Image URL</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.image || ''}
                      onChange={(e) => handleTextChange('hero', 'image', e.target.value)}
                      placeholder="Paste image URL here"
                    />
                  </div>
                  <input
                      type="text"
                      value={sectionData[editLang].hero.subtitle`
);

adminContent = adminContent.replace(
  /<textarea\n                      value=\{sectionData\[editLang\]\.about\.subtitle/s,
  `<div className="admin-form-group">
                    <label>About Section Image URL</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.image || ''}
                      onChange={(e) => handleTextChange('about', 'image', e.target.value)}
                      placeholder="Paste image URL here"
                    />
                  </div>
                  <textarea
                      value={sectionData[editLang].about.subtitle`
);
fs.writeFileSync(adminPath, adminContent, 'utf8');

console.log("Updated AdminDashboard");
