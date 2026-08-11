const fs = require('fs');
const path = require('path');

const componentsDir = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/components";
const components = ['Hero.jsx', 'About.jsx', 'Businesses.jsx', 'WhyChoose.jsx', 'Products.jsx', 'Opportunities.jsx', 'Software.jsx', 'Network.jsx', 'Investors.jsx', 'Careers.jsx', 'News.jsx', 'Gallery.jsx', 'Downloads.jsx', 'Testimonials.jsx', 'CSR.jsx', 'Contact.jsx'];

components.forEach(comp => {
  const compPath = path.join(componentsDir, comp);
  let content = fs.readFileSync(compPath, 'utf8');

  // Add import if missing
  if (!content.includes("useCMS")) {
    content = content.replace(
      /import (.*?);/,
      `import $1;\nimport { useCMS } from '../context/CMSContext';`
    );
  }

  // Inject useCMS hook
  const funcMatch = content.match(/export default function \w+\(.*\) \{/);
  if (funcMatch && !content.includes("const { getAnimationClass } = useCMS();")) {
    const sectionName = comp.replace('.jsx', '').toLowerCase(); // e.g. 'hero'
    content = content.replace(
      funcMatch[0],
      `${funcMatch[0]}\n  const { getAnimationClass } = useCMS();\n  const animClass = getAnimationClass('${sectionName === 'whychoose' ? 'whyChoose' : sectionName}');`
    );
    
    // Replace section className
    content = content.replace(
      /<section id=".*?" className="(.*?)"(.*?)>/,
      (match, p1, p2) => match.replace(`className="${p1}"`, `className={\`${p1} \${animClass}\`}`)
    );
  }

  fs.writeFileSync(compPath, content, 'utf8');
});

console.log("Injected useCMS animations into all sections");
