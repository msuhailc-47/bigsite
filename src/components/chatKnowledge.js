// ============================================
// DOREK INTERNATIONAL — Chat Knowledge Base
// Local keyword-matching engine for the AI Assistant
// ============================================

const knowledgeBase = [
  // --- About Dorek ---
  {
    keywords: ['about', 'dorek', 'company', 'who', 'what is', 'tell me', 'introduction', 'info'],
    topic: 'about',
    response: `**Dorek International Enterprises LLP** is a premium corporate conglomerate headquartered in Kerala, India. Founded in 2020, we operate across 8 business divisions spanning retail, wholesale, distribution, services, training, and software — all under one roof.\n\n🏢 Our tagline: *"Think Better... Work Better... Grow Together..."*\n\nWould you like to know about our **products**, **business opportunities**, or **divisions**?`
  },
  {
    keywords: ['vision', 'mission', 'goal', 'aim', 'purpose'],
    topic: 'vision',
    response: `🎯 **Our Vision**: To become a leading pan-India corporate conglomerate offering complete engineering and business solutions under one trusted brand.\n\n🚀 **Our Mission**: To empower entrepreneurs, deliver quality products, provide professional services, and create employment opportunities across India.\n\nWant to learn about our **core values** or **business divisions**?`
  },
  {
    keywords: ['values', 'core values', 'principles', 'ethics'],
    topic: 'values',
    response: `Our **6 Core Values**:\n\n1. 🤝 **Integrity & Trust** — Transparent business practices\n2. 💡 **Innovation & Excellence** — Continuous improvement\n3. 👤 **Customer First** — Your satisfaction is our priority\n4. 🌱 **Teamwork & Growth** — Growing together\n5. 🌍 **Social Responsibility** — Giving back to communities\n6. ♻️ **Sustainable Development** — Eco-conscious operations`
  },
  {
    keywords: ['history', 'founded', 'when', 'started', 'established', 'timeline', 'year'],
    topic: 'history',
    response: `📅 **Dorek Timeline**:\n\n• **2020** — Dorek International Enterprises LLP incorporated\n• **2021** — Launched Doorcarts retail brand\n• **2022** — Expanded distribution network across Kerala\n• **2023** — Launched franchise model (Doorcarts My Store)\n• **2024** — Software division & ERP platform launched\n• **2025** — Pan-India expansion vision initiated\n\nWant to know about our **network across Kerala**?`
  },

  // --- Products & Services ---
  {
    keywords: ['product', 'products', 'sell', 'offer', 'catalogue', 'catalog', 'what do you', 'items', 'range'],
    topic: 'products',
    response: `We offer products across **10 major engineering sectors**:\n\n⚡ Electrical Solutions\n🔧 Plumbing Solutions\n🔨 Hardware & Building Materials\n💧 Pumps & Water Systems\n💡 Lighting Solutions\n☀️ Solar Energy Solutions\n🔋 Inverter & Battery Solutions\n🚰 Water Treatment Solutions\n🏠 Building Automation & Smart Solutions\n🛠️ Engineering & Technical Services\n\nAsk me about any specific category for more details!`
  },
  {
    keywords: ['electrical', 'wire', 'wires', 'switch', 'switches', 'mcb', 'panel', 'conduit'],
    topic: 'electrical',
    response: `⚡ **Electrical Solutions**:\n\n• Wires & Cables (House wiring, industrial cables)\n• Switches & Sockets (Modular switches, smart switches)\n• MCBs, MCCBs & Distribution Boards\n• Electrical Panels & Control Gear\n• Conduits & Cable Management\n• Earthing & Lightning Protection\n\nWe stock **trusted national brands** with competitive pricing. Want a quote? Use our **Contact** section!`
  },
  {
    keywords: ['plumbing', 'pipe', 'pipes', 'sanitary', 'bathroom', 'valve', 'tap', 'faucet', 'water supply', 'cpvc', 'upvc'],
    topic: 'plumbing',
    response: `🔧 **Plumbing Solutions**:\n\n• CPVC, UPVC & PPR Pipes & Fittings\n• CP Fittings & Sanitary Ware\n• Bathroom Accessories\n• Valves & Cocks\n• Water Supply Systems\n• Drainage & Sewage Solutions\n\nWe supply all major brands at wholesale pricing!`
  },
  {
    keywords: ['solar', 'solar panel', 'solar energy', 'renewable', 'epc', 'on-grid', 'off-grid', 'hybrid'],
    topic: 'solar',
    response: `☀️ **Solar Energy Solutions**:\n\n• Solar Panels (Mono & Poly crystalline)\n• Solar Inverters & Charge Controllers\n• On-Grid Solar Power Plants\n• Off-Grid Solar Power Plants\n• Hybrid Solar Systems\n• Solar EPC (Engineering, Procurement & Construction)\n• Government subsidy assistance available\n\nWe handle everything from **design to installation**!`
  },
  {
    keywords: ['lighting', 'light', 'lights', 'led', 'bulb', 'lamp', 'street light', 'flood light', 'smart light'],
    topic: 'lighting',
    response: `💡 **Lighting Solutions**:\n\n• LED Bulbs, Tubes & Downlights\n• Decorative & Architectural Lighting\n• Street Lights & Flood Lights\n• Smart Lights (WiFi & IoT enabled)\n• Panel Lights & Track Lights\n• Outdoor & Garden Lighting\n\nEnergy-efficient options from top brands!`
  },
  {
    keywords: ['pump', 'pumps', 'water pump', 'submersible', 'motor', 'booster'],
    topic: 'pumps',
    response: `💧 **Pumps & Water Systems**:\n\n• Domestic Water Pumps\n• Submersible Pumps\n• Industrial Pumps\n• Booster Pump Systems\n• Pressure Boosting Systems\n• Sewage & Drainage Pumps\n\nWe provide installation & AMC services too!`
  },
  {
    keywords: ['inverter', 'battery', 'ups', 'backup', 'power backup', 'lithium', 'tubular'],
    topic: 'inverter',
    response: `🔋 **Inverter & Battery Solutions**:\n\n• Home UPS & Inverters\n• Commercial UPS Systems\n• Lithium-ion Batteries\n• Tubular Batteries\n• Online & Offline UPS\n• Battery Monitoring Systems\n\nGet uninterrupted power for home or business!`
  },
  {
    keywords: ['water treatment', 'ro', 'purifier', 'filter', 'softener', 'sewage', 'water purification'],
    topic: 'water_treatment',
    response: `🚰 **Water Treatment Solutions**:\n\n• Domestic RO Water Purifiers\n• Commercial RO Plants\n• Water Softeners\n• UV & UF Purification Systems\n• Sewage Treatment Plants (STP)\n• Effluent Treatment Plants (ETP)\n\nClean water solutions for every need!`
  },
  {
    keywords: ['smart home', 'automation', 'cctv', 'camera', 'access control', 'biometric', 'security', 'smart'],
    topic: 'automation',
    response: `🏠 **Building Automation & Smart Solutions**:\n\n• Smart Home Automation Systems\n• CCTV Surveillance Systems\n• Access Control & Biometrics\n• Video Door Phones\n• Smart Switches & Controllers\n• Fire Alarm Systems\n• PA & Sound Systems\n\nMake your home or office intelligent!`
  },
  {
    keywords: ['hardware', 'tools', 'fastener', 'safety', 'building material', 'construction'],
    topic: 'hardware',
    response: `🔨 **Hardware & Building Materials**:\n\n• Hand Tools & Power Tools\n• Safety Gear & PPE\n• Fasteners, Bolts & Nuts\n• Adhesives & Sealants\n• Abrasives & Cutting Wheels\n• Locks & Door Hardware\n\nEverything for your construction project!`
  },
  {
    keywords: ['service', 'services', 'installation', 'repair', 'amc', 'maintenance', 'technical', 'engineering service'],
    topic: 'services',
    response: `🛠️ **Engineering & Technical Services**:\n\n• Electrical Contracting & Installation\n• Plumbing Contracting\n• Solar System Installation\n• Energy Audits & Consulting\n• Annual Maintenance Contracts (AMC)\n• Technical Manpower Supply\n\nProfessional teams across Kerala!`
  },

  // --- Business Divisions ---
  {
    keywords: ['division', 'divisions', 'business unit', 'departments', 'branches'],
    topic: 'divisions',
    response: `We operate **8 Business Divisions**:\n\n1. 🛒 **Doorcarts** — Flagship Retail & Wholesale Brand\n2. 🏪 **Doorcarts My Store** — Franchise Model\n3. 📍 **Retail Network** — Branded Outlets\n4. 🚚 **Distribution Division** — Multi-channel Wholesale\n5. 🔧 **Service Division** — Installation & Repairs\n6. 🛡️ **Maintenance Division** — AMC Services\n7. 📚 **Training Division** — Skill Development\n8. 💻 **Software Division** — Enterprise Tech Solutions\n\nWant details about any specific division?`
  },
  {
    keywords: ['doorcarts', 'flagship', 'retail brand', 'store'],
    topic: 'doorcarts',
    response: `🛒 **Doorcarts** is our flagship retail & wholesale brand offering a one-stop shop for all electrical, plumbing, hardware, solar, and home automation products.\n\n🏪 **Doorcarts My Store** is our franchise model — you can own your own branded Doorcarts outlet with our full support including inventory, training, branding, and software.\n\nInterested in owning a franchise? Ask about **business opportunities**!`
  },

  // --- Business Opportunities ---
  {
    keywords: ['opportunity', 'opportunities', 'franchise', 'dealer', 'distributor', 'partner', 'partnership', 'join', 'invest', 'business model', 'associate'],
    topic: 'opportunities',
    response: `💼 **Business Opportunities at Dorek**:\n\nWe offer **8 partnership models**:\n\n1. 🤝 **Associate** — Earn commissions by referring customers\n2. 🏪 **Franchise** — Own a Doorcarts My Store outlet\n3. 📍 **Authorized Outlet** — Become a branded outlet partner\n4. 💰 **Investor** — Invest in our growth story\n5. 🤫 **Silent Partner** — Invest without active involvement\n6. 🏢 **Active Partner** — Join operations & management\n7. 📦 **Dealer** — Sell Doorcarts products in your area\n8. 🚛 **Distributor** — Large-scale distribution rights\n\n📋 Apply via the **Portal Login** on our website or ask me for contact details!`
  },
  {
    keywords: ['franchise cost', 'franchise fee', 'how much', 'investment', 'cost to start', 'capital', 'money needed'],
    topic: 'franchise_cost',
    response: `💰 **Franchise & Investment Details**:\n\nInvestment requirements vary by model:\n\n• **Associate**: Minimal investment (referral-based)\n• **Franchise (Doorcarts My Store)**: Moderate investment\n• **Authorized Outlet**: Medium investment\n• **Dealer/Distributor**: Based on region & volume\n\nFor **exact investment figures**, please contact our Business Development team:\n📞 **+91 8590 36 8590**\n📧 **info@dorek.in**\n\nOr use the **Apply Now** button on our website!`
  },

  // --- Software ---
  {
    keywords: ['software', 'erp', 'crm', 'billing', 'inventory', 'app', 'mobile app', 'tech', 'technology'],
    topic: 'software',
    response: `💻 **Dorek Software Division** offers:\n\n1. 📊 **ERP System** — Complete enterprise management\n2. 🤝 **CRM Platform** — Customer relationship management\n3. 🧾 **Billing Software** — GST-compliant invoicing\n4. 📦 **Inventory Management** — Stock tracking & alerts\n5. 💰 **Accounts & Finance** — Bookkeeping & reporting\n6. 👆 **Biometric Attendance** — Employee management\n7. 📱 **Mobile Apps** — On-the-go business management\n\nAll software is built in-house for Dorek partners!`
  },

  // --- Network & Coverage ---
  {
    keywords: ['network', 'coverage', 'kerala', 'district', 'where', 'location', 'branch', 'hub', 'outlet'],
    topic: 'network',
    response: `📍 **Network Across Kerala**:\n\n• **14 Districts** covered\n• **50+ Hubs** operational\n• **200+ Outlets** across the state\n• **500+ Associates** in our network\n\nWe have presence in all 14 Kerala districts including Ernakulam, Thiruvananthapuram, Kozhikode, Thrissur, and more.\n\nCheck out our **interactive Kerala map** on the website for district-wise details!`
  },

  // --- Contact ---
  {
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'reach', 'whatsapp', 'office', 'number', 'talk'],
    topic: 'contact',
    response: `📞 **Contact Dorek International**:\n\n🏢 **Head Office**: Dorek International Enterprises LLP, Kerala, India\n📱 **Phone**: +91 8590 36 8590\n📧 **Email**: info@dorek.in\n💬 **WhatsApp**: +91 8590 36 8590\n\n🕐 **Office Hours**: Mon–Sat, 9:00 AM – 6:00 PM\n\nYou can also fill in the **Contact Form** on our website for any inquiries!`
  },

  // --- Careers ---
  {
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'vacancy', 'work', 'opening', 'internship', 'training program'],
    topic: 'careers',
    response: `👔 **Careers at Dorek**:\n\nWe're always looking for talented individuals!\n\n• 📋 **Current Openings** — Sales, Technical, Admin roles\n• 🎓 **Internships** — For engineering & management students\n• 📚 **Training Programs** — Skill development & certification\n\nVisit the **Careers** section on our website for the latest openings.\n\n📧 Send your resume to: **careers@dorek.in**`
  },

  // --- Pricing ---
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'quote', 'quotation', 'estimate', 'cheap', 'expensive', 'affordable'],
    topic: 'pricing',
    response: `💰 **Pricing & Quotations**:\n\nWe offer **competitive wholesale & retail pricing** across all product categories. Prices vary based on:\n\n• Product brand & specifications\n• Order quantity\n• Delivery location\n\nFor a **custom quotation**, please:\n📞 Call: **+91 8590 36 8590**\n📧 Email: **info@dorek.in**\n\nOr fill out the **Contact Form** on our website!`
  },

  // --- CSR ---
  {
    keywords: ['csr', 'social responsibility', 'community', 'welfare', 'charity', 'ngo'],
    topic: 'csr',
    response: `🌍 **Corporate Social Responsibility**:\n\nDorek is committed to:\n\n• 📚 **Skill Development** — Training programs for youth\n• 🏘️ **Community Welfare** — Supporting local communities\n• 💼 **Employment Generation** — Creating job opportunities\n• 🌱 **Sustainable Practices** — Eco-friendly operations\n\nWe believe in growing together with our communities!`
  },

  // --- Greetings & Small Talk ---
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'hii'],
    topic: 'greeting',
    response: `Hello! 👋 Welcome to Dorek International!\n\nI can help you with:\n• 📦 Products & Services\n• 💼 Business Opportunities\n• 🏪 Franchise Information\n• 📞 Contact Details\n• 💻 Software Solutions\n• 📍 Our Network in Kerala\n\nWhat would you like to know?`
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'appreciated', 'great', 'awesome', 'nice', 'good', 'wonderful'],
    topic: 'thanks',
    response: `You're welcome! 😊 We're glad to help.\n\nFeel free to ask anything else about Dorek International. We're here for you! 🤝`
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'close', 'exit'],
    topic: 'goodbye',
    response: `Goodbye! 👋 Thank you for visiting Dorek International.\n\n📞 Remember, you can always reach us at **+91 8590 36 8590** or **info@dorek.in**.\n\nHave a great day! 🌟`
  },
];

// --- Matching Engine ---
export function findBestResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Score each knowledge entry
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        // Longer keyword matches are weighted higher
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  // Fallback
  return `I appreciate your question! While I don't have a specific answer for that, I can help you with:\n\n• **Products & Services** — Ask about our 10 product categories\n• **Business Opportunities** — Franchise, dealer, investor info\n• **Contact Details** — Phone, email, address\n• **Software Solutions** — ERP, CRM, Billing\n• **Network** — Our presence across Kerala\n\nOr contact us directly at 📞 **+91 8590 36 8590**`;
}

export default knowledgeBase;
