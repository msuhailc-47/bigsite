const translations = {
  en: {
    nav: {
      home: 'Home', about: 'About', businesses: 'Businesses', services: 'Services',
      opportunities: 'Opportunities', software: 'Software', investors: 'Investors',
      careers: 'Careers', news: 'News', gallery: 'Gallery', downloads: 'Downloads', contact: 'Contact'
    },
    hero: {
      image: '',
      tagline: 'Think Better... Work Better... Grow Together...',
      subtitle: 'Dorek International Enterprises LLP is a leading parent company powering multiple brands and delivering complete engineering solutions across Kerala.',
      getStarted: 'Get Started',
      contactUs: 'Contact Us',
      portalLogin: 'Portal Login',
      stats: {
        divisions: 'Divisions',
        districts: 'Districts',
        associates: 'Associates',
        sectors: 'Sectors',
        counts: {
          divisions: '8+',
          districts: '14',
          associates: '500+',
          sectors: '10+'
        }
      }
    },
    about: {
      image: '',
      label: 'About Us',
      title: 'About Dorek International',
      subtitle: 'Dorek International Enterprises LLP is a professionally managed, multi-divisional enterprise headquartered in Kerala, India. With a vision to build a powerful ecosystem of brands and services, Dorek operates across multiple sectors including retail, distribution, engineering, software, and franchise networks.',
      history: 'Our History',
      historyText: 'Founded with a vision to revolutionize the way engineering products and services are delivered, Dorek International Enterprises LLP has grown from a small regional enterprise into a multi-brand corporate group. Our journey is marked by continuous innovation, strategic partnerships, and unwavering commitment to quality.',
      vision: 'Vision',
      visionText: 'To become the most trusted and innovative enterprise group in India, empowering communities through technology-driven solutions, sustainable business models, and a network of empowered entrepreneurs.',
      mission: 'Mission',
      missionText: 'To deliver world-class products, professional services, and entrepreneurial opportunities through our integrated ecosystem of brands, technology platforms, and strategic partnerships.',
      coreValues: 'Core Values',
      values: ['Integrity & Trust', 'Innovation & Excellence', 'Customer First', 'Teamwork & Growth', 'Social Responsibility', 'Sustainable Development'],
      founderTitle: 'Founder\'s Message',
      founderMsg: '"Our vision is clear — to build a corporate ecosystem that empowers every stakeholder. From our associates and franchise partners to our customers and investors, every relationship at Dorek is built on trust, transparency, and shared growth."',
      founderName: 'Founder & Managing Partner',
      founderCompany: 'Dorek International Enterprises LLP',
      timeline: 'Company Timeline',
      timelineItems: [
        { year: '2020', title: 'Foundation', desc: 'Dorek International Enterprises LLP was officially incorporated.' },
        { year: '2021', title: 'Doorcarts Launch', desc: 'Launched Doorcarts brand for retail and distribution network.' },
        { year: '2022', title: 'Network Expansion', desc: 'Expanded operations across multiple districts in Kerala.' },
        { year: '2023', title: 'Software Division', desc: 'Established the software division with ERP and CRM solutions.' },
        { year: '2024', title: 'Franchise Model', desc: 'Introduced the franchise and associate business model across Kerala.' },
        { year: '2025', title: 'Pan-India Vision', desc: 'Strategic planning for pan-India expansion and investor partnerships.' }
      ]
    },
    businesses: {
      label: 'Our Companies',
      title: 'Our Business Divisions',
      subtitle: 'Dorek International operates through multiple specialized divisions, each designed to deliver excellence in its domain.',
      items: [
        { name: 'Doorcarts', desc: 'Multi-category retail and wholesale brand delivering electrical, plumbing, hardware, solar, and automation products.', tag: 'Flagship Brand' },
        { name: 'Doorcarts My Store', desc: 'Franchise-based retail store model enabling entrepreneurs to run their own Doorcarts-branded outlets.', tag: 'Franchise' },
        { name: 'Retail Network', desc: 'A growing network of branded retail outlets across Kerala, ensuring product accessibility at every doorstep.', tag: 'Retail' },
        { name: 'Distribution Division', desc: 'Strategic distribution of multi-brand products across wholesale and retail channels in Kerala and beyond.', tag: 'Distribution' },
        { name: 'Service Division', desc: 'Professional installation, repair, and maintenance services for electrical, plumbing, solar, and water treatment systems.', tag: 'Services' },
        { name: 'Maintenance Division', desc: 'Annual Maintenance Contracts (AMC) and scheduled servicing for all installed systems and equipment.', tag: 'AMC' },
        { name: 'Training Division', desc: 'Skill development programs, technical training, and entrepreneurship workshops for associates and partners.', tag: 'Training' },
        { name: 'Software Division', desc: 'Custom ERP, CRM, billing, inventory, and mobile app solutions for businesses and franchise operations.', tag: 'Technology' }
      ],
      learnMore: 'Learn More'
    },
    whyChoose: {
      label: 'Why Dorek',
      title: 'Why Choose Dorek?',
      items: [
        { title: 'Complete Engineering Solutions', desc: 'Complete Engineering Solutions Under One Roof' },
        { title: 'Trusted Brands', desc: 'High-Quality Products from Trusted Brands' },
        { title: 'Professional Support', desc: 'Professional Installation & Technical Support' },
        { title: 'After-Sales Service', desc: 'Annual Maintenance & After-Sales Service' },
        { title: 'Customized Solutions', desc: 'Customized Solutions for Residential, Commercial & Industrial Projects' },
        { title: 'Expert Team', desc: 'Experienced Engineering Team' },
        { title: 'Competitive Pricing', desc: 'Competitive Pricing & Reliable Service' }
      ]
    },
    opportunities: {
      label: 'Business Opportunities',
      title: 'Grow With Dorek',
      subtitle: 'Join the Dorek ecosystem and build your own success story. We offer multiple partnership models for entrepreneurs, investors, and business leaders.',
      items: [
        { name: 'Associate', desc: 'Become a Dorek Associate and earn through product sales, referrals, and service commissions.', icon: 'Users' },
        { name: 'Franchise', desc: 'Own a Doorcarts My Store franchise outlet and run your own branded retail business.', icon: 'Store' },
        { name: 'Authorized Outlet', desc: 'Establish an authorized Doorcarts outlet in your area with full corporate support.', icon: 'Building2' },
        { name: 'Investor', desc: 'Invest in Dorek\'s growth and earn attractive returns with transparent profit-sharing.', icon: 'TrendingUp' },
        { name: 'Silent Partner', desc: 'Invest capital without active involvement and enjoy passive income from Dorek operations.', icon: 'Briefcase' },
        { name: 'Active Partner', desc: 'Join as an active business partner and lead a division or regional operation.', icon: 'Handshake' },
        { name: 'Dealer', desc: 'Become a product dealer and distribute Dorek-branded products in your territory.', icon: 'Package' },
        { name: 'Distributor', desc: 'Take charge of wholesale distribution for your district or region.', icon: 'Truck' }
      ],
      applyNow: 'Apply Now'
    },
    products: {
      label: 'Products & Services',
      title: 'Products & Services',
      subtitle: 'Dorek International Enterprises LLP provides a complete range of products and engineering solutions for residential, commercial, industrial, and infrastructure projects.',
      categories: [
        {
          name: 'Electrical Solutions', icon: 'Zap',
          items: ['Wires & Cables', 'Switches & Sockets', 'MCB, RCCB & Distribution Boards', 'Industrial Electrical Products', 'Electrical Panels & Accessories', 'Conduits & Cable Management Systems']
        },
        {
          name: 'Plumbing Solutions', icon: 'Droplets',
          items: ['Pipes & Fittings', 'CP & Sanitary Products', 'Valves & Plumbing Accessories', 'Bathroom Solutions', 'Water Supply Systems']
        },
        {
          name: 'Hardware & Building Materials', icon: 'Wrench',
          items: ['Building Hardware', 'Hand Tools', 'Power Tools', 'Safety Equipment', 'Fasteners', 'Construction Accessories']
        },
        {
          name: 'Pumps & Water Systems', icon: 'Waves',
          items: ['Domestic Pumps', 'Commercial Pumps', 'Industrial Pumps', 'Pressure Booster Pumps', 'Submersible Pumps', 'Pump Controllers', 'Pump Installation & Maintenance']
        },
        {
          name: 'Lighting Solutions', icon: 'Lightbulb',
          items: ['LED Lighting', 'Decorative Lighting', 'Street Lights', 'Flood Lights', 'Industrial Lighting', 'Smart Lighting Systems']
        },
        {
          name: 'Solar Energy Solutions', icon: 'Sun',
          items: ['Solar Panels', 'Solar Inverters', 'On-Grid Solar Power Plants', 'Off-Grid Solar Power Plants', 'Hybrid Solar Power Systems', 'Solar Batteries', 'Solar Street Lights', 'Solar Water Heaters', 'Solar Water Pumps', 'Complete Solar EPC Solutions', 'All Solar Products & Accessories']
        },
        {
          name: 'Inverter & Battery Solutions', icon: 'Battery',
          items: ['Home UPS Systems', 'Commercial UPS Systems', 'Online UPS', 'Inverters', 'Lithium Batteries', 'Tubular Batteries', 'Battery Chargers', 'Power Backup Solutions']
        },
        {
          name: 'Water Treatment Solutions', icon: 'GlassWater',
          items: ['Domestic Water Purifiers', 'Commercial Water Purifiers', 'RO Water Purifiers', 'UV & UF Water Purifiers', 'Industrial RO Plants', 'Water Treatment Plants', 'Water Softeners', 'Iron Removal Plants', 'Water Filtration Systems', 'Sewage & Effluent Water Treatment Systems']
        },
        {
          name: 'Building Automation & Smart Solutions', icon: 'Shield',
          items: ['Smart Home Automation', 'Smart Switches', 'CCTV Surveillance Systems', 'Video Door Phones', 'Access Control Systems', 'Biometric Attendance Systems', 'Fire Alarm Systems', 'Security & Monitoring Solutions']
        },
        {
          name: 'Engineering & Technical Services', icon: 'HardHat',
          items: ['Electrical Contracting', 'Plumbing Contracting', 'Solar EPC Projects', 'Water Treatment Plant Installation', 'Pump Installation & Maintenance', 'Annual Maintenance Contracts (AMC)', 'Repair & Maintenance Services', 'Project Consultancy', 'Energy Audit Services']
        }
      ]
    },
    software: {
      label: 'Software Solutions',
      title: 'Software Solutions',
      subtitle: 'Dorek\'s in-house software division delivers enterprise-grade technology solutions to power modern business operations.',
      items: [
        { name: 'ERP System', desc: 'Complete Enterprise Resource Planning for multi-location business management.', icon: 'LayoutDashboard' },
        { name: 'CRM Platform', desc: 'Customer Relationship Management for sales tracking, leads, and customer engagement.', icon: 'Users' },
        { name: 'Billing Software', desc: 'GST-compliant invoicing, billing, and payment management system.', icon: 'Receipt' },
        { name: 'Inventory Management', desc: 'Real-time stock tracking, purchase orders, and warehouse management.', icon: 'Package' },
        { name: 'Accounts & Finance', desc: 'Complete accounting solution with ledger, P&L, balance sheet, and tax reports.', icon: 'Calculator' },
        { name: 'Attendance System', desc: 'Biometric-integrated attendance, leave management, and payroll processing.', icon: 'Clock' },
        { name: 'Mobile Apps', desc: 'Custom mobile applications for field operations, delivery tracking, and customer self-service.', icon: 'Smartphone' }
      ]
    },
    network: {
      label: 'Doorcarts Network',
      title: 'Our Network Across Kerala',
      subtitle: 'Doorcarts operates a growing network of hubs, outlets, and associates across all 14 districts of Kerala.',
      stats: { 
        hubs: 'Hubs', 
        outlets: 'Outlets', 
        associates: 'Associates', 
        districts: 'Districts',
        counts: { districts: '', hubs: '', outlets: '', associates: '' }
      },
      districts: [
        { name: 'Thiruvananthapuram', hubs: 5, outlets: 18, associates: 42, coverage: 85 },
        { name: 'Kollam', hubs: 4, outlets: 15, associates: 38, coverage: 78 },
        { name: 'Pathanamthitta', hubs: 3, outlets: 10, associates: 28, coverage: 65 },
        { name: 'Alappuzha', hubs: 4, outlets: 14, associates: 35, coverage: 72 },
        { name: 'Kottayam', hubs: 4, outlets: 16, associates: 40, coverage: 80 },
        { name: 'Idukki', hubs: 2, outlets: 8, associates: 20, coverage: 45 },
        { name: 'Ernakulam', hubs: 6, outlets: 22, associates: 55, coverage: 92 },
        { name: 'Thrissur', hubs: 5, outlets: 20, associates: 48, coverage: 88 },
        { name: 'Palakkad', hubs: 4, outlets: 15, associates: 35, coverage: 70 },
        { name: 'Malappuram', hubs: 5, outlets: 18, associates: 45, coverage: 82 },
        { name: 'Kozhikode', hubs: 5, outlets: 20, associates: 50, coverage: 90 },
        { name: 'Wayanad', hubs: 2, outlets: 8, associates: 18, coverage: 40 },
        { name: 'Kannur', hubs: 4, outlets: 16, associates: 38, coverage: 75 },
        { name: 'Kasaragod', hubs: 3, outlets: 10, associates: 25, coverage: 58 }
      ]
    },
    investors: {
      label: 'Investors',
      title: 'Investor Relations',
      subtitle: 'Invest in a growing corporate ecosystem with transparent governance and attractive returns.',
      items: [
        { name: 'Investment Model', desc: 'Multiple investment tiers with flexible entry points starting from micro-investments to strategic partnerships.' },
        { name: 'Shareholding', desc: 'Transparent shareholding structure with proper legal documentation and periodic reporting.' },
        { name: 'Profit Sharing', desc: 'Performance-based profit sharing with quarterly dividends and annual reports.' },
        { name: 'Growth Plan', desc: 'Aggressive yet sustainable growth roadmap targeting 500+ outlets and pan-India presence by 2027.' }
      ]
    },
    careers: {
      label: 'Careers',
      title: 'Join Our Team',
      subtitle: 'Build your career with one of Kerala\'s fastest-growing enterprise groups.',
      categories: ['Current Openings', 'Internships', 'Training Programs'],
      applyOnline: 'Apply Online',
      apply: 'Apply',
      enroll: 'Enroll',
      certified: 'Certified',
      jobs: [
        { title: 'Sales Executive', dept: 'Sales', location: 'Ernakulam', type: 'Full-time' },
        { title: 'Electrical Engineer', dept: 'Engineering', location: 'Thrissur', type: 'Full-time' },
        { title: 'Software Developer', dept: 'Technology', location: 'Kochi', type: 'Full-time' },
        { title: 'Store Manager', dept: 'Retail', location: 'Kozhikode', type: 'Full-time' }
      ],
      internships: [
        { title: 'Marketing Intern', duration: '3 Months', dept: 'Marketing' },
        { title: 'Engineering Intern', duration: '6 Months', dept: 'Engineering' },
        { title: 'IT Intern', duration: '3 Months', dept: 'Technology' }
      ],
      training: [
        { title: 'Electrical Systems Training', desc: 'Comprehensive training on electrical installations and maintenance.', cert: true },
        { title: 'Solar EPC Certification', desc: 'Professional certification for solar power plant engineering.', cert: true },
        { title: 'Retail Management', desc: 'Store operations, inventory, and customer service training.', cert: false }
      ]
    },
    news: {
      label: 'News & Events',
      title: 'Latest News & Events',
      subtitle: 'Stay updated with the latest developments, achievements, and events at Dorek International.',
      categories: ['Latest News', 'Board Meetings', 'Alliance Summit', 'Events', 'Gallery'],
      readMore: 'Read More',
      items: [
        { cat: 'News', date: 'July 28, 2025', title: 'Dorek International Expands to 5 New Districts', excerpt: 'Dorek International announced expansion of Doorcarts network to five new districts across Kerala.', featured: true },
        { cat: 'Event', date: 'July 15, 2025', title: 'Alliance Summit 2025 Successfully Concluded', excerpt: 'Over 200 associates and partners gathered for the annual Alliance Summit.' },
        { cat: 'Meeting', date: 'June 30, 2025', title: 'Q2 Board Meeting Highlights', excerpt: 'Board approved new franchise guidelines and investment policies.' },
        { cat: 'News', date: 'June 20, 2025', title: 'Software Division Launches Mobile App', excerpt: 'New mobile application for field operations and delivery tracking.' }
      ]
    },
    gallery: {
      label: 'Gallery',
      title: 'Media Gallery',
      subtitle: 'Explore our journey through photos, videos, and milestones.',
      tabs: ['Photos', 'Videos', 'Achievements'],
      view: 'View',
      photos: [
        { title: 'Corporate Office', url: '' },
        { title: 'Team Meeting', url: '' },
        { title: 'Product Display', url: '' },
        { title: 'Store Opening', url: '' },
        { title: 'Training Session', url: '' },
        { title: 'Alliance Summit', url: '' },
        { title: 'Award Ceremony', url: '' },
        { title: 'Exhibition', url: '' },
        { title: 'Community Event', url: '' }
      ],
      videos: [
        { title: 'Corporate Overview', url: '' },
        { title: 'Product Demo', url: '' },
        { title: 'Franchise Guide', url: '' },
        { title: 'Training Highlights', url: '' }
      ],
      achievements: [
        { year: '2024', title: 'Best Emerging Enterprise Award', desc: 'Recognized for outstanding business growth and innovation.' },
        { year: '2023', title: 'Top Franchise Network in Kerala', desc: 'Acknowledged for fastest franchise network expansion.' },
        { year: '2023', title: 'Technology Excellence Award', desc: 'For in-house ERP and CRM software development.' },
        { year: '2022', title: 'Best Customer Service Award', desc: 'Recognized for outstanding after-sales support.' },
        { year: '2021', title: 'Startup Recognition', desc: 'Featured among top emerging startups in Kerala.' }
      ]
    },
    downloads: {
      label: 'Downloads',
      title: 'Download Center',
      subtitle: 'Access brochures, catalogs, forms, and policy documents.',
      download: 'Download',
      items: [
        { name: 'Company Brochure', type: 'PDF', size: '4.2 MB' },
        { name: 'Corporate Profile', type: 'PDF', size: '6.8 MB' },
        { name: 'Product Catalog', type: 'PDF', size: '12.5 MB' },
        { name: 'Franchise Application', type: 'PDF', size: '1.2 MB' },
        { name: 'Associate Application', type: 'PDF', size: '0.8 MB' },
        { name: 'Dealer Agreement', type: 'PDF', size: '2.1 MB' },
        { name: 'Privacy Policy', type: 'PDF', size: '0.5 MB' },
        { name: 'Terms & Conditions', type: 'PDF', size: '0.7 MB' }
      ]
    },
    testimonials: {
      label: 'Testimonials',
      title: 'What People Say',
      subtitle: 'Hear from our customers, associates, dealers, and investors.',
      tabs: ['Customers', 'Associates', 'Dealers', 'Investors'],
      items: [
        { name: 'Rajesh Kumar', role: 'Customer', text: '"Doorcarts provided excellent products and installation service for my home solar system. Highly professional team!"', category: 'Customers' },
        { name: 'Anitha Menon', role: 'Associate', text: '"Joining Dorek as an associate was the best business decision I\'ve made. The support system is incredible."', category: 'Associates' },
        { name: 'Mohammed Fasil', role: 'Dealer', text: '"As a dealer, I appreciate the wide product range and competitive margins. Dorek is a reliable partner."', category: 'Dealers' },
        { name: 'Dr. Suresh Nair', role: 'Investor', text: '"Transparent governance and strong growth trajectory. My investment with Dorek has been very rewarding."', category: 'Investors' },
        { name: 'Priya Krishnan', role: 'Customer', text: '"The water treatment system they installed works perfectly. Great after-sales support too!"', category: 'Customers' },
        { name: 'Arun Vijay', role: 'Associate', text: '"Dorek\'s training programs helped me build real skills. Now I run my own authorized outlet."', category: 'Associates' }
      ]
    },
    csr: {
      label: 'CSR',
      title: 'Social Responsibility',
      subtitle: 'Dorek is committed to community development, skill training, and sustainable growth.',
      items: [
        { name: 'Skill Development', desc: 'Free technical training programs for youth in electrical, plumbing, and solar technologies.' },
        { name: 'Employment Generation', desc: 'Creating direct and indirect employment opportunities through our franchise and associate network.' },
        { name: 'Community Projects', desc: 'Supporting local communities through infrastructure development and social welfare programs.' },
        { name: 'Training Programs', desc: 'Regular workshops and certification courses for technicians and entrepreneurs.' }
      ]
    },
    contact: {
      label: 'Contact Us',
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you. Reach out to us for inquiries, partnerships, or support.',
      addressLabel: 'Address',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
      address: 'Dorek International Enterprises LLP\nKerala, India',
      phone: '+91 XXXXX XXXXX',
      email: 'info@dorek.in',
      whatsapp: '+91 XXXXX XXXXX',
      formName: 'Your Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number',
      formSubject: 'Subject',
      formMessage: 'Your Message',
      formSubmit: 'Send Message',
      formOptions: ['Business Inquiry', 'Career', 'Customer Support', 'Other'],
      formSelect: 'Select Inquiry Type',
      formOptions: ['General Inquiry', 'Business Opportunity', 'Product Inquiry', 'Service Request', 'Investment', 'Career', 'Other'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3514059046777!2d76.3142721!3d9.9877864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4c82701d71%3A0xc3f6e166e51cc145!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    },
    footer: {
      quickLinks: 'Quick Links',
      legal: 'Legal',
      connect: 'Connect With Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      refund: 'Refund Policy',
      disclaimer: 'Disclaimer',
      copyright: '© 2025 Dorek International Enterprises LLP. All Rights Reserved.',
      facebook: 'https://facebook.com/dorek',
      instagram: 'https://instagram.com/dorek',
      twitter: 'https://twitter.com/dorek',
      linkedin: 'https://linkedin.com/company/dorek',
      youtube: 'https://youtube.com/@dorek',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      connect: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      refund: 'Refund Policy',
      disclaimer: 'Disclaimer',
      copyright: '© 2026 Dorek International LLP. All rights reserved.',
    },
    portal: {
      title: 'Portal Login',
      subtitle: 'Access your dashboard',
      portals: [
        { name: 'Member Login', icon: 'User' },
        { name: 'Outlet Login', icon: 'Store' },
        { name: 'ERP Login', icon: 'LayoutDashboard' },
        { name: 'Customer Login', icon: 'UserCircle' },
        { name: 'Investor Login', icon: 'TrendingUp' }
      ],
      partnerPortal: 'Partner & Employee Portal',
      username: 'Username / Portal ID',
      password: 'Password',
      enterId: 'Enter your ID',
      rememberMe: 'Remember me',
      login: 'Login',
      forgot: 'Forgot Password?',
      comingSoon: 'Coming Soon'
    },
    chat: {
      title: 'Dorek Assistant',
      placeholder: 'Type a message...',
      greeting: 'Hello! 👋 Welcome to Dorek International. How can I help you today?',
      reply: 'Thank you for your message. A representative will get back to you shortly.',
      online: 'Online',
      options: ['Products & Services', 'Business Opportunities', 'Franchise Info', 'Contact Sales']
    }
  },
  ml: {
    nav: {
      home: 'ഹോം', about: 'ഞങ്ങളെക്കുറിച്ച്', businesses: 'ബിസിനസ്', services: 'സേവനങ്ങൾ',
      opportunities: 'അവസരങ്ങൾ', software: 'സോഫ്‌റ്റ്‌വെയർ', investors: 'നിക്ഷേപകർ',
      careers: 'ജോലികൾ', news: 'വാർത്ത', gallery: 'ഗാലറി', downloads: 'ഡൗൺലോഡ്', contact: 'ബന്ധപ്പെടുക'
    },
    hero: {
      image: '',
      tagline: 'Think Better... Work Better... Grow Together...',
      subtitle: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP കേരളത്തിലുടനീളം ഒന്നിലധികം ബ്രാൻഡുകൾക്കും സമ്പൂർണ്ണ എഞ്ചിനീയറിംഗ് സൊല്യൂഷനുകൾക്കും ശക്തി പകരുന്ന ഒരു മുൻനിര മാതൃ കമ്പനിയാണ്.',
      getStarted: 'ആരംഭിക്കുക',
      contactUs: 'ബന്ധപ്പെടുക',
      portalLogin: 'പോർട്ടൽ ലോഗിൻ',
      stats: {
        divisions: 'വിഭാഗങ്ങൾ',
        districts: 'ജില്ലകൾ',
        associates: 'അസോസിയേറ്റുകൾ',
        sectors: 'മേഖലകൾ'
      }
    },
    about: {
      image: '',
      label: 'ഞങ്ങളെക്കുറിച്ച്',
      title: 'ഡോറെക് ഇന്റർനാഷണൽ',
      subtitle: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP കേരളത്തിൽ ആസ്ഥാനമായി പ്രവർത്തിക്കുന്ന, പ്രൊഫഷണലായി നിയന്ത്രിക്കപ്പെടുന്ന, ബഹു-വിഭാഗ എന്റർപ്രൈസ് ആണ്.',
      history: 'ഞങ്ങളുടെ ചരിത്രം',
      historyText: 'എഞ്ചിനീയറിംഗ് ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും നൽകുന്ന രീതിയിൽ വിപ്ലവം സൃഷ്ടിക്കാനുള്ള ഒരു ദർശനത്തോടെ സ്ഥാപിതമായ ഡോറെക്, ഒരു ചെറിയ പ്രാദേശിക സംരംഭത്തിൽ നിന്ന് ഒരു മൾട്ടി-ബ്രാൻഡ് കോർപ്പറേറ്റ് ഗ്രൂപ്പായി വളർന്നു.',
      vision: 'ദർശനം',
      visionText: 'സാങ്കേതിക-ചാലിത പരിഹാരങ്ങൾ, സുസ്ഥിര ബിസിനസ് മോഡലുകൾ, ശാക്തീകരിക്കപ്പെട്ട സംരംഭകരുടെ ശൃംഖല എന്നിവയിലൂടെ സമൂഹങ്ങളെ ശാക്തീകരിക്കുന്ന ഇന്ത്യയിലെ ഏറ്റവും വിശ്വസ്തവും നൂതനവുമായ എന്റർപ്രൈസ് ഗ്രൂപ്പായി മാറുക.',
      mission: 'ദൗത്യം',
      missionText: 'ഞങ്ങളുടെ ബ്രാൻഡുകളുടെ, സാങ്കേതിക പ്ലാറ്റ്ഫോമുകളുടെ, തന്ത്രപരമായ പങ്കാളിത്തങ്ങളുടെ സംയോജിത ആവാസവ്യവസ്ഥയിലൂടെ ലോകോത്തര ഉൽപ്പന്നങ്ങളും, പ്രൊഫഷണൽ സേവനങ്ങളും, സംരംഭക അവസരങ്ങളും നൽകുക.',
      coreValues: 'അടിസ്ഥാന മൂല്യങ്ങൾ',
      values: ['സത്യസന്ധതയും വിശ്വാസവും', 'നവീകരണവും മികവും', 'ഉപഭോക്താവ് ആദ്യം', 'ടീംവർക്കും വളർച്ചയും', 'സാമൂഹിക ഉത്തരവാദിത്തം', 'സുസ്ഥിര വികസനം'],
      founderTitle: 'സ്ഥാപകന്റെ സന്ദേശം',
      founderMsg: '"ഞങ്ങളുടെ ദർശനം വ്യക്തമാണ് — ഓരോ പങ്കാളിയെയും ശാക്തീകരിക്കുന്ന ഒരു കോർപ്പറേറ്റ് ആവാസവ്യവസ്ഥ കെട്ടിപ്പടുക്കുക. ഡോറെക്കിലെ ഓരോ ബന്ധവും വിശ്വാസത്തിലും സുതാര്യതയിലും പരസ്പര വളർച്ചയിലും നിർമ്മിച്ചതാണ്."',
      founderName: 'സ്ഥാപകനും മാനേജിംഗ് പാർട്ണറും',
      founderCompany: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP',
      timeline: 'കമ്പനി ടൈംലൈൻ',
      timelineItems: [
        { year: '2020', title: 'സ്ഥാപനം', desc: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP ഔദ്യോഗികമായി രജിസ്റ്റർ ചെയ്തു.' },
        { year: '2021', title: 'ഡോർകാർട്ട്സ് ലോഞ്ച്', desc: 'റീട്ടെയ്ൽ, ഡിസ്ട്രിബ്യൂഷൻ ശൃംഖലയ്ക്കായി ഡോർകാർട്ട്സ് ബ്രാൻഡ് ആരംഭിച്ചു.' },
        { year: '2022', title: 'ശൃംഖലാ വിപുലീകരണം', desc: 'കേരളത്തിലെ ഒന്നിലധികം ജില്ലകളിൽ പ്രവർത്തനം വിപുലീകരിച്ചു.' },
        { year: '2023', title: 'സോഫ്‌റ്റ്‌വെയർ ഡിവിഷൻ', desc: 'ERP, CRM സൊല്യൂഷനുകളുമായി സോഫ്‌റ്റ്‌വെയർ ഡിവിഷൻ സ്ഥാപിച്ചു.' },
        { year: '2024', title: 'ഫ്രാഞ്ചൈസ് മോഡൽ', desc: 'കേരളത്തിലുടനീളം ഫ്രാഞ്ചൈസ്, അസോസിയേറ്റ് ബിസിനസ് മോഡൽ അവതരിപ്പിച്ചു.' },
        { year: '2025', title: 'പാൻ-ഇന്ത്യ ദർശനം', desc: 'അഖിലേന്ത്യാ വിപുലീകരണത്തിനും നിക്ഷേപക പങ്കാളിത്തങ്ങൾക്കുമുള്ള തന്ത്രപരമായ ആസൂത്രണം.' }
      ]
    },
    businesses: {
      label: 'ഞങ്ങളുടെ കമ്പനികൾ',
      title: 'ഞങ്ങളുടെ ബിസിനസ് ഡിവിഷനുകൾ',
      subtitle: 'ഡോറെക് ഇന്റർനാഷണൽ ഒന്നിലധികം സ്പെഷ്യലൈസ്ഡ് ഡിവിഷനുകളിലൂടെ പ്രവർത്തിക്കുന്നു.',
      items: [
        { name: 'ഡോർകാർട്ട്സ്', desc: 'ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, ഹാർഡ്‌വെയർ, സോളാർ, ഓട്ടോമേഷൻ ഉൽപ്പന്നങ്ങൾ നൽകുന്ന മൾട്ടി-കാറ്റഗറി റീട്ടെയ്ൽ ബ്രാൻഡ്.', tag: 'ഫ്ലാഗ്‌ഷിപ്പ്' },
        { name: 'ഡോർകാർട്ട്സ് മൈ സ്റ്റോർ', desc: 'സംരംഭകരെ സ്വന്തം ഡോർകാർട്ട്സ് ബ്രാൻഡഡ് ഔട്ട്‌ലെറ്റുകൾ നടത്താൻ പ്രാപ്തമാക്കുന്ന ഫ്രാഞ്ചൈസ് അധിഷ്ഠിത റീട്ടെയ്ൽ സ്റ്റോർ മോഡൽ.', tag: 'ഫ്രാഞ്ചൈസ്' },
        { name: 'റീട്ടെയ്ൽ നെറ്റ്‌വർക്ക്', desc: 'കേരളത്തിലുടനീളം വളരുന്ന ബ്രാൻഡഡ് റീട്ടെയ്ൽ ഔട്ട്‌ലെറ്റുകളുടെ ശൃംഖല.', tag: 'റീട്ടെയ്ൽ' },
        { name: 'ഡിസ്ട്രിബ്യൂഷൻ ഡിവിഷൻ', desc: 'ഹോൾസെയിൽ, റീട്ടെയ്ൽ ചാനലുകളിൽ മൾട്ടി-ബ്രാൻഡ് ഉൽപ്പന്നങ്ങളുടെ തന്ത്രപരമായ വിതരണം.', tag: 'ഡിസ്ട്രിബ്യൂഷൻ' },
        { name: 'സർവീസ് ഡിവിഷൻ', desc: 'ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, സോളാർ, വാട്ടർ ട്രീറ്റ്‌മെന്റ് സിസ്റ്റങ്ങൾക്കുള്ള പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷൻ, റിപ്പയർ, മെയിന്റനൻസ് സേവനങ്ങൾ.', tag: 'സേവനങ്ങൾ' },
        { name: 'മെയിന്റനൻസ് ഡിവിഷൻ', desc: 'എല്ലാ ഇൻസ്റ്റാൾ ചെയ്ത സിസ്റ്റങ്ങൾക്കും ഉപകരണങ്ങൾക്കുമുള്ള വാർഷിക മെയിന്റനൻസ് കരാറുകൾ (AMC).', tag: 'AMC' },
        { name: 'ട്രെയിനിംഗ് ഡിവിഷൻ', desc: 'അസോസിയേറ്റുകൾക്കും പങ്കാളികൾക്കുമുള്ള നൈപുണ്യ വികസന പരിപാടികൾ, സാങ്കേതിക പരിശീലനം.', tag: 'ട്രെയിനിംഗ്' },
        { name: 'സോഫ്‌റ്റ്‌വെയർ ഡിവിഷൻ', desc: 'ബിസിനസുകൾക്കും ഫ്രാഞ്ചൈസ് പ്രവർത്തനങ്ങൾക്കുമുള്ള ഇഷ്ടാനുസൃത ERP, CRM, ബില്ലിംഗ്, ഇൻവെന്ററി, മൊബൈൽ ആപ്പ് സൊല്യൂഷനുകൾ.', tag: 'ടെക്നോളജി' }
      ],
      learnMore: 'കൂടുതലറിയുക'
    },
    whyChoose: {
      label: 'എന്തുകൊണ്ട് ഡോറെക്',
      title: 'എന്തുകൊണ്ട് ഡോറെക് തിരഞ്ഞെടുക്കണം?',
      items: [
        { title: 'സമ്പൂർണ്ണ എഞ്ചിനീയറിംഗ്', desc: 'ഒരു കുടക്കീഴിൽ സമ്പൂർണ്ണ എഞ്ചിനീയറിംഗ് സൊല്യൂഷനുകൾ' },
        { title: 'വിശ്വസ്ത ബ്രാൻഡുകൾ', desc: 'വിശ്വസ്ത ബ്രാൻഡുകളിൽ നിന്നുള്ള ഉയർന്ന ഗുണനിലവാരമുള്ള ഉൽപ്പന്നങ്ങൾ' },
        { title: 'പ്രൊഫഷണൽ പിന്തുണ', desc: 'പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷൻ & സാങ്കേതിക പിന്തുണ' },
        { title: 'ആഫ്റ്റർ-സെയിൽസ്', desc: 'വാർഷിക മെയിന്റനൻസ് & ആഫ്റ്റർ-സെയിൽസ് സർവീസ്' },
        { title: 'ഇഷ്ടാനുസൃത സൊല്യൂഷനുകൾ', desc: 'റെസിഡൻഷ്യൽ, കൊമേഴ്‌സ്യൽ & ഇൻഡസ്ട്രിയൽ പ്രോജക്ടുകൾക്കുള്ള ഇഷ്ടാനുസൃത സൊല്യൂഷനുകൾ' },
        { title: 'വിദഗ്ദ്ധ ടീം', desc: 'പരിചയസമ്പന്നമായ എഞ്ചിനീയറിംഗ് ടീം' },
        { title: 'മത്സരാധിഷ്ഠിത വില', desc: 'മത്സരാധിഷ്ഠിത വിലനിർണ്ണയവും വിശ്വസനീയ സേവനവും' }
      ]
    },
    opportunities: {
      label: 'ബിസിനസ് അവസരങ്ങൾ',
      title: 'ഡോറെക്കിനൊപ്പം വളരുക',
      subtitle: 'ഡോറെക് ഇക്കോസിസ്റ്റത്തിൽ ചേർന്ന് നിങ്ങളുടെ സ്വന്തം വിജയ ഗാഥ രചിക്കുക.',
      items: [
        { name: 'അസോസിയേറ്റ്', desc: 'ഡോറെക് അസോസിയേറ്റായി ഉൽപ്പന്ന വിൽപ്പന, റഫറലുകൾ, സേവന കമ്മീഷനുകൾ വഴി സമ്പാദിക്കുക.', icon: 'Users' },
        { name: 'ഫ്രാഞ്ചൈസ്', desc: 'ഡോർകാർട്ട്സ് മൈ സ്റ്റോർ ഫ്രാഞ്ചൈസ് ഔട്ട്‌ലെറ്റ് സ്വന്തമാക്കി നിങ്ങളുടെ ബ്രാൻഡഡ് റീട്ടെയ്ൽ ബിസിനസ് നടത്തുക.', icon: 'Store' },
        { name: 'ഓതറൈസ്ഡ് ഔട്ട്‌ലെറ്റ്', desc: 'നിങ്ങളുടെ പ്രദേശത്ത് ഒരു ഓതറൈസ്ഡ് ഡോർകാർട്ട്സ് ഔട്ട്‌ലെറ്റ് സ്ഥാപിക്കുക.', icon: 'Building2' },
        { name: 'നിക്ഷേപകൻ', desc: 'ഡോറെക്കിന്റെ വളർച്ചയിൽ നിക്ഷേപിച്ച് ആകർഷകമായ ലാഭവിഹിതം നേടുക.', icon: 'TrendingUp' },
        { name: 'സൈലന്റ് പാർട്ണർ', desc: 'സജീവ ഇടപെടലില്ലാതെ മൂലധനം നിക്ഷേപിച്ച് നിഷ്ക്രിയ വരുമാനം ആസ്വദിക്കുക.', icon: 'Briefcase' },
        { name: 'ആക്ടീവ് പാർട്ണർ', desc: 'ഒരു സജീവ ബിസിനസ് പങ്കാളിയായി ചേർന്ന് ഒരു ഡിവിഷൻ അല്ലെങ്കിൽ പ്രാദേശിക ഓപ്പറേഷൻ നയിക്കുക.', icon: 'Handshake' },
        { name: 'ഡീലർ', desc: 'ഉൽപ്പന്ന ഡീലറായി നിങ്ങളുടെ ടെറിട്ടറിയിൽ ഡോറെക് ബ്രാൻഡഡ് ഉൽപ്പന്നങ്ങൾ വിതരണം ചെയ്യുക.', icon: 'Package' },
        { name: 'ഡിസ്ട്രിബ്യൂട്ടർ', desc: 'നിങ്ങളുടെ ജില്ലയ്ക്കോ മേഖലയ്ക്കോ വേണ്ടി ഹോൾസെയ്ൽ ഡിസ്ട്രിബ്യൂഷന്റെ ചുമതല ഏറ്റെടുക്കുക.', icon: 'Truck' }
      ],
      applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക'
    },
    products: {
      label: 'ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും',
      title: 'ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും',
      subtitle: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP, റെസിഡൻഷ്യൽ, കൊമേഴ്‌സ്യൽ, ഇൻഡസ്ട്രിയൽ, ഇൻഫ്രാസ്ട്രക്ചർ പ്രോജക്ടുകൾക്കുള്ള സമ്പൂർണ്ണ ഉൽപ്പന്നങ്ങളും എഞ്ചിനീയറിംഗ് സൊല്യൂഷനുകളും നൽകുന്നു.',
      categories: [
        { name: 'ഇലക്ട്രിക്കൽ സൊല്യൂഷനുകൾ', icon: 'Zap', items: ['വയറുകളും കേബിളുകളും', 'സ്വിച്ചുകളും സോക്കറ്റുകളും', 'MCB, RCCB & ഡിസ്ട്രിബ്യൂഷൻ ബോർഡുകൾ', 'ഇൻഡസ്ട്രിയൽ ഇലക്ട്രിക്കൽ ഉൽപ്പന്നങ്ങൾ', 'ഇലക്ട്രിക്കൽ പാനലുകളും ആക്സസറികളും', 'കണ്ട്യൂട്ടുകളും കേബിൾ മാനേജ്‌മെന്റ് സിസ്റ്റങ്ങളും'] },
        { name: 'പ്ലംബിംഗ് സൊല്യൂഷനുകൾ', icon: 'Droplets', items: ['പൈപ്പുകളും ഫിറ്റിംഗ്‌സും', 'CP & സാനിറ്ററി ഉൽപ്പന്നങ്ങൾ', 'വാൽവുകളും പ്ലംബിംഗ് ആക്സസറികളും', 'ബാത്ത്‌റൂം സൊല്യൂഷനുകൾ', 'ജലവിതരണ സംവിധാനങ്ങൾ'] },
        { name: 'ഹാർഡ്‌വെയറും ബിൽഡിംഗ് മെറ്റീരിയലുകളും', icon: 'Wrench', items: ['ബിൽഡിംഗ് ഹാർഡ്‌വെയർ', 'ഹാൻഡ് ടൂളുകൾ', 'പവർ ടൂളുകൾ', 'സേഫ്റ്റി ഉപകരണങ്ങൾ', 'ഫാസ്റ്റ്‌നറുകൾ', 'കൺസ്ട്രക്ഷൻ ആക്സസറികൾ'] },
        { name: 'പമ്പുകളും വാട്ടർ സിസ്റ്റങ്ങളും', icon: 'Waves', items: ['ഡൊമസ്റ്റിക് പമ്പുകൾ', 'കൊമേഴ്‌സ്യൽ പമ്പുകൾ', 'ഇൻഡസ്ട്രിയൽ പമ്പുകൾ', 'പ്രഷർ ബൂസ്റ്റർ പമ്പുകൾ', 'സബ്‌മേഴ്‌സിബിൾ പമ്പുകൾ', 'പമ്പ് കൺട്രോളറുകൾ', 'പമ്പ് ഇൻസ്റ്റലേഷൻ & മെയിന്റനൻസ്'] },
        { name: 'ലൈറ്റിംഗ് സൊല്യൂഷനുകൾ', icon: 'Lightbulb', items: ['LED ലൈറ്റിംഗ്', 'ഡെക്കറേറ്റീവ് ലൈറ്റിംഗ്', 'സ്ട്രീറ്റ് ലൈറ്റുകൾ', 'ഫ്ലഡ് ലൈറ്റുകൾ', 'ഇൻഡസ്ട്രിയൽ ലൈറ്റിംഗ്', 'സ്മാർട്ട് ലൈറ്റിംഗ് സിസ്റ്റങ്ങൾ'] },
        { name: 'സോളാർ എനർജി സൊല്യൂഷനുകൾ', icon: 'Sun', items: ['സോളാർ പാനലുകൾ', 'സോളാർ ഇൻവെർട്ടറുകൾ', 'ഓൺ-ഗ്രിഡ് സോളാർ പവർ പ്ലാന്റുകൾ', 'ഓഫ്-ഗ്രിഡ് സോളാർ പവർ പ്ലാന്റുകൾ', 'ഹൈബ്രിഡ് സോളാർ പവർ സിസ്റ്റങ്ങൾ', 'സോളാർ ബാറ്ററികൾ', 'സോളാർ സ്ട്രീറ്റ് ലൈറ്റുകൾ', 'സോളാർ വാട്ടർ ഹീറ്ററുകൾ', 'സോളാർ വാട്ടർ പമ്പുകൾ', 'സമ്പൂർണ്ണ സോളാർ EPC സൊല്യൂഷനുകൾ', 'എല്ലാ സോളാർ ഉൽപ്പന്നങ്ങളും ആക്സസറികളും'] },
        { name: 'ഇൻവെർട്ടർ & ബാറ്ററി സൊല്യൂഷനുകൾ', icon: 'Battery', items: ['ഹോം UPS സിസ്റ്റങ്ങൾ', 'കൊമേഴ്‌സ്യൽ UPS സിസ്റ്റങ്ങൾ', 'ഓൺലൈൻ UPS', 'ഇൻവെർട്ടറുകൾ', 'ലിഥിയം ബാറ്ററികൾ', 'ട്യൂബുലാർ ബാറ്ററികൾ', 'ബാറ്ററി ചാർജറുകൾ', 'പവർ ബാക്കപ്പ് സൊല്യൂഷനുകൾ'] },
        { name: 'വാട്ടർ ട്രീറ്റ്‌മെന്റ് സൊല്യൂഷനുകൾ', icon: 'GlassWater', items: ['ഡൊമസ്റ്റിക് വാട്ടർ പ്യൂരിഫയറുകൾ', 'കൊമേഴ്‌സ്യൽ വാട്ടർ പ്യൂരിഫയറുകൾ', 'RO വാട്ടർ പ്യൂരിഫയറുകൾ', 'UV & UF വാട്ടർ പ്യൂരിഫയറുകൾ', 'ഇൻഡസ്ട്രിയൽ RO പ്ലാന്റുകൾ', 'വാട്ടർ ട്രീറ്റ്‌മെന്റ് പ്ലാന്റുകൾ', 'വാട്ടർ സോഫ്‌റ്റ്‌നറുകൾ', 'അയൺ റിമൂവൽ പ്ലാന്റുകൾ', 'വാട്ടർ ഫിൽട്ടറേഷൻ സിസ്റ്റങ്ങൾ', 'സീവേജ് & എഫ്ലുവന്റ് വാട്ടർ ട്രീറ്റ്‌മെന്റ് സിസ്റ്റങ്ങൾ'] },
        { name: 'ബിൽഡിംഗ് ഓട്ടോമേഷൻ & സ്മാർട്ട് സൊല്യൂഷനുകൾ', icon: 'Shield', items: ['സ്മാർട്ട് ഹോം ഓട്ടോമേഷൻ', 'സ്മാർട്ട് സ്വിച്ചുകൾ', 'CCTV സർവൈലൻസ് സിസ്റ്റങ്ങൾ', 'വീഡിയോ ഡോർ ഫോണുകൾ', 'ആക്സസ് കൺട്രോൾ സിസ്റ്റങ്ങൾ', 'ബയോമെട്രിക് അറ്റൻഡൻസ് സിസ്റ്റങ്ങൾ', 'ഫയർ അലാം സിസ്റ്റങ്ങൾ', 'സെക്യൂരിറ്റി & മോണിറ്ററിംഗ് സൊല്യൂഷനുകൾ'] },
        { name: 'എഞ്ചിനീയറിംഗ് & ടെക്നിക്കൽ സേവനങ്ങൾ', icon: 'HardHat', items: ['ഇലക്ട്രിക്കൽ കോൺട്രാക്ടിംഗ്', 'പ്ലംബിംഗ് കോൺട്രാക്ടിംഗ്', 'സോളാർ EPC പ്രോജക്ടുകൾ', 'വാട്ടർ ട്രീറ്റ്‌മെന്റ് പ്ലാന്റ് ഇൻസ്റ്റലേഷൻ', 'പമ്പ് ഇൻസ്റ്റലേഷൻ & മെയിന്റനൻസ്', 'വാർഷിക മെയിന്റനൻസ് കരാറുകൾ (AMC)', 'റിപ്പയർ & മെയിന്റനൻസ് സേവനങ്ങൾ', 'പ്രോജക്ട് കൺസൾട്ടൻസി', 'എനർജി ഓഡിറ്റ് സേവനങ്ങൾ'] }
      ]
    },
    software: {
      label: 'സോഫ്‌റ്റ്‌വെയർ സൊല്യൂഷനുകൾ',
      title: 'സോഫ്‌റ്റ്‌വെയർ സൊല്യൂഷനുകൾ',
      subtitle: 'ഡോറെക്കിന്റെ ഇൻ-ഹൗസ് സോഫ്‌റ്റ്‌വെയർ ഡിവിഷൻ ആധുനിക ബിസിനസ് പ്രവർത്തനങ്ങൾക്ക് ശക്തി പകരുന്ന എന്റർപ്രൈസ്-ഗ്രേഡ് ടെക്നോളജി സൊല്യൂഷനുകൾ നൽകുന്നു.',
      items: [
        { name: 'ERP സിസ്റ്റം', desc: 'മൾട്ടി-ലൊക്കേഷൻ ബിസിനസ് മാനേജ്‌മെന്റിനുള്ള സമ്പൂർണ്ണ എന്റർപ്രൈസ് റിസോഴ്‌സ് പ്ലാനിംഗ്.', icon: 'LayoutDashboard' },
        { name: 'CRM പ്ലാറ്റ്‌ഫോം', desc: 'സെയിൽസ് ട്രാക്കിംഗ്, ലീഡുകൾ, ഉപഭോക്തൃ എൻഗേജ്‌മെന്റ് എന്നിവയ്ക്കുള്ള കസ്റ്റമർ റിലേഷൻഷിപ്പ് മാനേജ്‌മെന്റ്.', icon: 'Users' },
        { name: 'ബില്ലിംഗ് സോഫ്‌റ്റ്‌വെയർ', desc: 'GST-അനുസൃതമായ ഇൻവോയ്‌സിംഗ്, ബില്ലിംഗ്, പേയ്‌മെന്റ് മാനേജ്‌മെന്റ് സിസ്റ്റം.', icon: 'Receipt' },
        { name: 'ഇൻവെന്ററി മാനേജ്‌മെന്റ്', desc: 'റിയൽ-ടൈം സ്റ്റോക്ക് ട്രാക്കിംഗ്, പർച്ചേസ് ഓർഡറുകൾ, വെയർഹൗസ് മാനേജ്‌മെന്റ്.', icon: 'Package' },
        { name: 'അക്കൗണ്ട്സ് & ഫിനാൻസ്', desc: 'ലെഡ്‌ജർ, P&L, ബാലൻസ് ഷീറ്റ്, ടാക്സ് റിപ്പോർട്ടുകൾ എന്നിവയ്ക്കുള്ള സമ്പൂർണ്ണ അക്കൗണ്ടിംഗ് സൊല്യൂഷൻ.', icon: 'Calculator' },
        { name: 'അറ്റൻഡൻസ് സിസ്റ്റം', desc: 'ബയോമെട്രിക്-ഇന്റഗ്രേറ്റഡ് അറ്റൻഡൻസ്, ലീവ് മാനേജ്‌മെന്റ്, പേറോൾ പ്രോസസ്സിംഗ്.', icon: 'Clock' },
        { name: 'മൊബൈൽ ആപ്പുകൾ', desc: 'ഫീൽഡ് ഓപ്പറേഷനുകൾ, ഡെലിവറി ട്രാക്കിംഗ്, കസ്റ്റമർ സെൽഫ്-സർവീസ് എന്നിവയ്ക്കുള്ള ഇഷ്ടാനുസൃത മൊബൈൽ ആപ്ലിക്കേഷനുകൾ.', icon: 'Smartphone' }
      ]
    },
    network: {
      label: 'ഡോർകാർട്ട്സ് നെറ്റ്‌വർക്ക്',
      title: 'കേരളത്തിലെ ഞങ്ങളുടെ ശൃംഖല',
      subtitle: 'ഡോർകാർട്ട്സ് കേരളത്തിലെ 14 ജില്ലകളിലും ഹബുകൾ, ഔട്ട്‌ലെറ്റുകൾ, അസോസിയേറ്റുകൾ എന്നിവയുടെ വളരുന്ന ശൃംഖല പ്രവർത്തിപ്പിക്കുന്നു.',
      stats: { hubs: 'ഹബുകൾ', outlets: 'ഔട്ട്‌ലെറ്റുകൾ', associates: 'അസോസിയേറ്റുകൾ', districts: 'ജില്ലകൾ' },
      districts: [
        { name: 'Thiruvananthapuram', hubs: 5, outlets: 18, associates: 42, coverage: 85 },
        { name: 'Kollam', hubs: 4, outlets: 15, associates: 38, coverage: 78 },
        { name: 'Pathanamthitta', hubs: 3, outlets: 10, associates: 28, coverage: 65 },
        { name: 'Alappuzha', hubs: 4, outlets: 14, associates: 35, coverage: 72 },
        { name: 'Kottayam', hubs: 4, outlets: 16, associates: 40, coverage: 80 },
        { name: 'Idukki', hubs: 2, outlets: 8, associates: 20, coverage: 45 },
        { name: 'Ernakulam', hubs: 6, outlets: 22, associates: 55, coverage: 92 },
        { name: 'Thrissur', hubs: 5, outlets: 20, associates: 48, coverage: 88 },
        { name: 'Palakkad', hubs: 4, outlets: 15, associates: 35, coverage: 70 },
        { name: 'Malappuram', hubs: 5, outlets: 18, associates: 45, coverage: 82 },
        { name: 'Kozhikode', hubs: 5, outlets: 20, associates: 50, coverage: 90 },
        { name: 'Wayanad', hubs: 2, outlets: 8, associates: 18, coverage: 40 },
        { name: 'Kannur', hubs: 4, outlets: 16, associates: 38, coverage: 75 },
        { name: 'Kasaragod', hubs: 3, outlets: 10, associates: 25, coverage: 58 }
      ]
    },
    investors: {
      label: 'നിക്ഷേപകർ',
      title: 'നിക്ഷേപക ബന്ധങ്ങൾ',
      subtitle: 'സുതാര്യമായ ഭരണവും ആകർഷകമായ ലാഭവിഹിതവും ഉള്ള വളരുന്ന കോർപ്പറേറ്റ് ഇക്കോസിസ്റ്റത്തിൽ നിക്ഷേപിക്കുക.',
      items: [
        { name: 'നിക്ഷേപ മോഡൽ', desc: 'മൈക്രോ-ഇൻവെസ്റ്റ്‌മെന്റ് മുതൽ സ്ട്രാറ്റജിക് പാർട്ണർഷിപ്പ് വരെയുള്ള ഫ്ലെക്‌സിബിൾ എൻട്രി പോയിന്റുകളുള്ള ഒന്നിലധികം നിക്ഷേപ ടയറുകൾ.' },
        { name: 'ഷെയർഹോൾഡിംഗ്', desc: 'ശരിയായ നിയമ ഡോക്യുമെന്റേഷനും ആനുകാലിക റിപ്പോർട്ടിംഗുമുള്ള സുതാര്യമായ ഷെയർഹോൾഡിംഗ് ഘടന.' },
        { name: 'ലാഭ വിഹിതം', desc: 'ത്രൈമാസ ഡിവിഡന്റുകളും വാർഷിക റിപ്പോർട്ടുകളുമുള്ള പ്രകടന-അധിഷ്ഠിത ലാഭ വിഹിതം.' },
        { name: 'വളർച്ചാ പദ്ധതി', desc: '2027-ഓടെ 500+ ഔട്ട്‌ലെറ്റുകളും അഖിലേന്ത്യാ സാന്നിധ്യവും ലക്ഷ്യമിടുന്ന ആക്രമണാത്മകവും സുസ്ഥിരവുമായ വളർച്ചാ റോഡ്‌മാപ്പ്.' }
      ]
    },
    careers: {
      label: 'ജോലികൾ',
      title: 'ഞങ്ങളുടെ ടീമിൽ ചേരുക',
      subtitle: 'കേരളത്തിലെ ഏറ്റവും വേഗത്തിൽ വളരുന്ന എന്റർപ്രൈസ് ഗ്രൂപ്പുകളിലൊന്നിൽ നിങ്ങളുടെ കരിയർ കെട്ടിപ്പടുക്കുക.',
      categories: ['നിലവിലെ ഒഴിവുകൾ', 'ഇന്റേൺഷിപ്പുകൾ', 'ട്രെയിനിംഗ് പ്രോഗ്രാമുകൾ'],
      applyOnline: 'ഓൺലൈനായി അപേക്ഷിക്കുക',
      apply: 'അപേക്ഷിക്കുക',
      enroll: 'എൻറോൾ ചെയ്യുക',
      certified: 'സർട്ടിഫൈഡ്',
      jobs: [
        { title: 'സെയിൽസ് എക്സിക്യൂട്ടീവ്', dept: 'സെയിൽസ്', location: 'എറണാകുളം', type: 'ഫുൾ-ടൈം' },
        { title: 'ഇലക്ട്രിക്കൽ എഞ്ചിനീയർ', dept: 'എഞ്ചിനീയറിംഗ്', location: 'തൃശ്ശൂർ', type: 'ഫുൾ-ടൈം' },
        { title: 'സോഫ്റ്റ്വെയർ ഡെവലപ്പർ', dept: 'ടെക്നോളജി', location: 'കൊച്ചി', type: 'ഫുൾ-ടൈം' },
        { title: 'സ്റ്റോർ മാനേജർ', dept: 'റീട്ടെയ്ൽ', location: 'കോഴിക്കോട്', type: 'ഫുൾ-ടൈം' }
      ],
      internships: [
        { title: 'മാർക്കറ്റിംഗ് ഇന്റേൺ', duration: '3 മാസം', dept: 'മാർക്കറ്റിംഗ്' },
        { title: 'എഞ്ചിനീയറിംഗ് ഇന്റേൺ', duration: '6 മാസം', dept: 'എഞ്ചിനീയറിംഗ്' },
        { title: 'ഐടി ഇന്റേൺ', duration: '3 മാസം', dept: 'ടെക്നോളജി' }
      ],
      training: [
        { title: 'ഇലക്ട്രിക്കൽ സിസ്റ്റംസ് പരിശീലനം', desc: 'ഇലക്ട്രിക്കൽ ഇൻസ്റ്റലേഷനുകളെയും അറ്റകുറ്റപ്പണികളെയും കുറിച്ചുള്ള സമഗ്ര പരിശീലനം.', cert: true },
        { title: 'സോളാർ EPC സർട്ടിഫിക്കേഷൻ', desc: 'സോളാർ പവർ പ്ലാന്റ് എഞ്ചിനീയറിംഗിനുള്ള പ്രൊഫഷണൽ സർട്ടിഫിക്കേഷൻ.', cert: true },
        { title: 'റീട്ടെയ്ൽ മാനേജ്മെന്റ്', desc: 'സ്റ്റോർ ഓപ്പറേഷൻസ്, ഇൻവെന്ററി, ഉപഭോക്തൃ സേവന പരിശീലനം.', cert: false }
      ]
    },
    news: {
      label: 'വാർത്തയും ഇവന്റുകളും',
      title: 'ഏറ്റവും പുതിയ വാർത്തയും ഇവന്റുകളും',
      subtitle: 'ഡോറെക് ഇന്റർനാഷണലിലെ ഏറ്റവും പുതിയ സംഭവവികാസങ്ങൾ, നേട്ടങ്ങൾ, ഇവന്റുകൾ എന്നിവ അറിയുക.',
      readMore: 'കൂടുതൽ വായിക്കുക',
      items: [
        { cat: 'വാർത്ത', date: 'ജൂലൈ 28, 2025', title: 'ഡോറെക് ഇന്റർനാഷണൽ 5 പുതിയ ജില്ലകളിലേക്ക് വിപുലീകരിക്കുന്നു', excerpt: 'കേരളത്തിലെ അഞ്ച് പുതിയ ജില്ലകളിലേക്ക് ഡോർകാർട്ട്സ് ശൃംഖല വിപുലീകരിക്കുന്നതായി ഡോറെക് ഇന്റർനാഷണൽ പ്രഖ്യാപിച്ചു.', featured: true },
        { cat: 'ഇവന്റ്', date: 'ജൂലൈ 15, 2025', title: 'അലയൻസ് സമ്മിറ്റ് 2025 വിജയകരമായി സമാപിച്ചു', excerpt: 'വാർഷിക അലയൻസ് സമ്മിറ്റിനായി 200-ലധികം അസോസിയേറ്റുകളും പങ്കാളികളും ഒത്തുചേർന്നു.' },
        { cat: 'യോഗം', date: 'ജൂൺ 30, 2025', title: 'Q2 ബോർഡ് യോഗ ഹൈലൈറ്റുകൾ', excerpt: 'പുതിയ ഫ്രാഞ്ചൈസ് മാർഗ്ഗനിർദ്ദേശങ്ങൾക്കും നിക്ഷേപ നയങ്ങൾക്കും ബോർഡ് അംഗീകാരം നൽകി.' },
        { cat: 'വാർത്ത', date: 'ജൂൺ 20, 2025', title: 'സോഫ്റ്റ്വെയർ ഡിവിഷൻ മൊബൈൽ ആപ്പ് പുറത്തിറക്കി', excerpt: 'ഫീൽഡ് ഓപ്പറേഷനുകൾക്കും ഡെലിവറി ട്രാക്കിംഗിനുമുള്ള പുതിയ മൊബൈൽ ആപ്ലിക്കേഷൻ.' }
      ]
    },
    gallery: {
      label: 'ഗാലറി',
      title: 'മീഡിയ ഗാലറി',
      subtitle: 'ഞങ്ങളുടെ യാത്ര ഫോട്ടോകൾ, വീഡിയോകൾ, നാഴികക്കല്ലുകൾ എന്നിവയിലൂടെ പര്യവേക്ഷണം ചെയ്യുക.',
      tabs: ['ഫോട്ടോകൾ', 'വീഡിയോകൾ', 'നേട്ടങ്ങൾ'],
      view: 'കാണുക',
      photos: [
        { title: 'കോർപ്പറേറ്റ് ഓഫീസ്', url: '' },
        { title: 'ടീം മീറ്റിംഗ്', url: '' },
        { title: 'ഉൽപ്പന്ന പ്രദർശനം', url: '' },
        { title: 'സ്റ്റോർ ഓപ്പണിംഗ്', url: '' },
        { title: 'ട്രെയിനിംഗ് സെഷൻ', url: '' },
        { title: 'അലയൻസ് സമ്മിറ്റ്', url: '' },
        { title: 'അവാർഡ് ചടങ്ങ്', url: '' },
        { title: 'എക്സിബിഷൻ', url: '' },
        { title: 'കമ്മ്യൂണിറ്റി ഇവന്റ്', url: '' }
      ],
      videos: [
        { title: 'കോർപ്പറേറ്റ് അവലോകനം', url: '' },
        { title: 'ഉൽപ്പന്ന ഡെമോ', url: '' },
        { title: 'ഫ്രാഞ്ചൈസ് ഗൈഡ്', url: '' },
        { title: 'ട്രെയിനിംഗ് ഹൈലൈറ്റുകൾ', url: '' }
      ],
      achievements: [
        { year: '2024', title: 'മികച്ച ഉയർന്നുവരുന്ന എന്റർപ്രൈസ് അവാർഡ്', desc: 'മികച്ച ബിസിനസ് വളർച്ചയ്ക്കും നവീകരണത്തിനും അംഗീകാരം.' },
        { year: '2023', title: 'കേരളത്തിലെ മികച്ച ഫ്രാഞ്ചൈസ് ശൃംഖല', desc: 'ഏറ്റവും വേഗത്തിലുള്ള ഫ്രാഞ്ചൈസ് ശൃംഖല വിപുലീകരണത്തിനുള്ള അംഗീകാരം.' },
        { year: '2023', title: 'ടെക്നോളജി എക്സലൻസ് അവാർഡ്', desc: 'ഇൻ-ഹൗസ് ERP, CRM സോഫ്റ്റ്വെയർ വികസനത്തിന്.' },
        { year: '2022', title: 'മികച്ച ഉപഭോക്തൃ സേവന അവാർഡ്', desc: 'മികച്ച ആഫ്റ്റർ-സെയിൽസ് പിന്തുണയ്ക്കുള്ള അംഗീകാരം.' },
        { year: '2021', title: 'സ്റ്റാർട്ടപ്പ് അംഗീകാരം', desc: 'കേരളത്തിലെ മികച്ച ഉയർന്നുവരുന്ന സ്റ്റാർട്ടപ്പുകളിൽ ഇടം നേടി.' }
      ]
    },
    downloads: {
      label: 'ഡൗൺലോഡുകൾ',
      title: 'ഡൗൺലോഡ് സെന്റർ',
      subtitle: 'ബ്രോഷറുകൾ, കാറ്റലോഗുകൾ, ഫോമുകൾ, പോളിസി ഡോക്യുമെന്റുകൾ എന്നിവ ആക്സസ് ചെയ്യുക.',
      download: 'ഡൗൺലോഡ്',
      items: [
        { name: 'കമ്പനി ബ്രോഷർ', type: 'PDF', size: '4.2 MB' },
        { name: 'കോർപ്പറേറ്റ് പ്രൊഫൈൽ', type: 'PDF', size: '6.8 MB' },
        { name: 'ഉൽപ്പന്ന കാറ്റലോഗ്', type: 'PDF', size: '12.5 MB' },
        { name: 'ഫ്രാഞ്ചൈസ് അപേക്ഷ', type: 'PDF', size: '1.2 MB' },
        { name: 'അസോസിയേറ്റ് അപേക്ഷ', type: 'PDF', size: '0.8 MB' },
        { name: 'ഡീലർ കരാർ', type: 'PDF', size: '2.1 MB' },
        { name: 'സ്വകാര്യതാ നയം', type: 'PDF', size: '0.5 MB' },
        { name: 'നിബന്ധനകളും വ്യവസ്ഥകളും', type: 'PDF', size: '0.7 MB' }
      ]
    },
    testimonials: {
      label: 'സാക്ഷ്യപത്രങ്ങൾ',
      title: 'ആളുകൾ എന്ത് പറയുന്നു',
      subtitle: 'ഞങ്ങളുടെ ഉപഭോക്താക്കൾ, അസോസിയേറ്റുകൾ, ഡീലർമാർ, നിക്ഷേപകർ എന്നിവരുടെ അഭിപ്രായങ്ങൾ കേൾക്കുക.',
      tabs: ['ഉപഭോക്താക്കൾ', 'അസോസിയേറ്റുകൾ', 'ഡീലർമാർ', 'നിക്ഷേപകർ'],
      items: [
        { name: 'രാജേഷ് കുമാർ', role: 'ഉപഭോക്താവ്', text: '"ഡോർകാർട്ട്സ് എന്റെ ഹോം സോളാർ സിസ്റ്റത്തിന് മികച്ച ഉൽപ്പന്നങ്ങളും ഇൻസ്റ്റലേഷൻ സേവനവും നൽകി. വളരെ പ്രൊഫഷണൽ ടീം!"', category: 'ഉപഭോക്താക്കൾ' },
        { name: 'അനിത മേനോൻ', role: 'അസോസിയേറ്റ്', text: '"ഡോറെക്കിൽ ഒരു അസോസിയേറ്റായി ചേർന്നത് ഞാൻ എടുത്ത ഏറ്റവും നല്ല ബിസിനസ് തീരുമാനമായിരുന്നു."', category: 'അസോസിയേറ്റുകൾ' },
        { name: 'മുഹമ്മദ് ഫാസിൽ', role: 'ഡീലർ', text: '"ഒരു ഡീലർ എന്ന നിലയിൽ, വിശാലമായ ഉൽപ്പന്ന ശ്രേണിയും മത്സരാധിഷ്ഠിത മാർജിനുകളും ഞാൻ വിലമതിക്കുന്നു."', category: 'ഡീലർമാർ' },
        { name: 'ഡോ. സുരേഷ് നായർ', role: 'നിക്ഷേപകൻ', text: '"സുതാര്യമായ ഭരണവും ശക്തമായ വളർച്ചാ ഗതിയും. ഡോറെക്കിലെ എന്റെ നിക്ഷേപം വളരെ ഫലപ്രദമാണ്."', category: 'നിക്ഷേപകർ' },
        { name: 'പ്രിയ കൃഷ്ണൻ', role: 'ഉപഭോക്താവ്', text: '"അവർ ഇൻസ്റ്റാൾ ചെയ്ത വാട്ടർ ട്രീറ്റ്‌മെന്റ് സിസ്റ്റം മികച്ച രീതിയിൽ പ്രവർത്തിക്കുന്നു. മികച്ച ആഫ്റ്റർ-സെയിൽസ് സപ്പോർട്ടും!"', category: 'ഉപഭോക്താക്കൾ' },
        { name: 'അരുൺ വിജയ്', role: 'അസോസിയേറ്റ്', text: '"ഡോറെക്കിന്റെ ട്രെയിനിംഗ് പ്രോഗ്രാമുകൾ എനിക്ക് യഥാർത്ഥ നൈപുണ്യങ്ങൾ വികസിപ്പിക്കാൻ സഹായിച്ചു."', category: 'അസോസിയേറ്റുകൾ' }
      ]
    },
    csr: {
      label: 'CSR',
      title: 'സാമൂഹിക ഉത്തരവാദിത്തം',
      subtitle: 'സമൂഹ വികസനം, നൈപുണ്യ പരിശീലനം, സുസ്ഥിര വളർച്ച എന്നിവയ്ക്ക് ഡോറെക് പ്രതിജ്ഞാബദ്ധമാണ്.',
      items: [
        { name: 'നൈപുണ്യ വികസനം', desc: 'ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, സോളാർ ടെക്നോളജികളിൽ യുവാക്കൾക്കുള്ള സൗജന്യ സാങ്കേതിക പരിശീലന പരിപാടികൾ.' },
        { name: 'തൊഴിൽ സൃഷ്ടി', desc: 'ഞങ്ങളുടെ ഫ്രാഞ്ചൈസ്, അസോസിയേറ്റ് ശൃംഖലയിലൂടെ നേരിട്ടും അല്ലാതെയും തൊഴിലവസരങ്ങൾ സൃഷ്ടിക്കുന്നു.' },
        { name: 'കമ്മ്യൂണിറ്റി പ്രോജക്ടുകൾ', desc: 'ഇൻഫ്രാസ്ട്രക്ചർ വികസനം, സാമൂഹ്യക്ഷേമ പരിപാടികൾ എന്നിവയിലൂടെ പ്രാദേശിക സമൂഹങ്ങളെ പിന്തുണയ്ക്കുന്നു.' },
        { name: 'ട്രെയിനിംഗ് പ്രോഗ്രാമുകൾ', desc: 'ടെക്നീഷ്യന്മാർക്കും സംരംഭകർക്കുമുള്ള പതിവ് വർക്ക്ഷോപ്പുകളും സർട്ടിഫിക്കേഷൻ കോഴ്‌സുകളും.' }
      ]
    },
    contact: {
      label: 'ബന്ധപ്പെടുക',
      title: 'ബന്ധപ്പെടുക',
      subtitle: 'അന്വേഷണങ്ങൾ, പങ്കാളിത്തങ്ങൾ, അല്ലെങ്കിൽ പിന്തുണ എന്നിവയ്ക്കായി ഞങ്ങളെ ബന്ധപ്പെടുക.',
      addressLabel: 'വിലാസം',
      phoneLabel: 'ഫോൺ നമ്പർ',
      emailLabel: 'ഇമെയിൽ വിലാസം',
      address: 'ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP\nകേരളം, ഇന്ത്യ',
      phone: '+91 XXXXX XXXXX',
      email: 'info@dorek.in',
      whatsapp: '+91 XXXXX XXXXX',
      formName: 'നിങ്ങളുടെ പേര്',
      formEmail: 'ഇമെയിൽ വിലാസം',
      formPhone: 'ഫോൺ നമ്പർ',
      formSubject: 'വിഷയം',
      formMessage: 'നിങ്ങളുടെ സന്ദേശം',
      formSubmit: 'സന്ദേശം അയയ്ക്കുക',
      formSelect: 'അന്വേഷണ തരം തിരഞ്ഞെടുക്കുക',
      formOptions: ['പൊതു അന്വേഷണം', 'ബിസിനസ് അവസരം', 'ഉൽപ്പന്ന അന്വേഷണം', 'സേവന അഭ്യർത്ഥന', 'നിക്ഷേപം', 'കരിയർ', 'മറ്റുള്ളവ'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3514059046777!2d76.3142721!3d9.9877864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4c82701d71%3A0xc3f6e166e51cc145!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    },
    footer: {
      quickLinks: 'ക്വിക്ക് ലിങ്കുകൾ',
      legal: 'നിയമപരം',
      connect: 'ഞങ്ങളുമായി ബന്ധപ്പെടുക',
      privacy: 'സ്വകാര്യതാ നയം',
      terms: 'നിബന്ധനകളും വ്യവസ്ഥകളും',
      refund: 'റീഫണ്ട് നയം',
      disclaimer: 'നിരാകരണം',
      copyright: '© 2025 ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.',
      facebook: 'https://facebook.com/dorek',
      instagram: 'https://instagram.com/dorek',
      twitter: 'https://twitter.com/dorek',
      linkedin: 'https://linkedin.com/company/dorek',
      youtube: 'https://youtube.com/@dorek',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      connect: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      refund: 'Refund Policy',
      disclaimer: 'Disclaimer',
      copyright: '© 2026 Dorek International LLP. All rights reserved.',
    },
    portal: {
      title: 'പോർട്ടൽ ലോഗിൻ',
      subtitle: 'നിങ്ങളുടെ ഡാഷ്‌ബോർഡ് ആക്സസ് ചെയ്യുക',
      portals: [
        { name: 'മെമ്പർ ലോഗിൻ', icon: 'User' },
        { name: 'ഔട്ട്‌ലെറ്റ് ലോഗിൻ', icon: 'Store' },
        { name: 'ERP ലോഗിൻ', icon: 'LayoutDashboard' },
        { name: 'കസ്റ്റമർ ലോഗിൻ', icon: 'UserCircle' },
        { name: 'ഇൻവെസ്റ്റർ ലോഗിൻ', icon: 'TrendingUp' }
      ],
      partnerPortal: 'പങ്കാളി & ജീവനക്കാരുടെ പോർട്ടൽ',
      username: 'യൂസർനെയിം / പോർട്ടൽ ID',
      password: 'പാസ്‌വേഡ്',
      enterId: 'നിങ്ങളുടെ ID നൽകുക',
      rememberMe: 'എന്നെ ഓർമ്മിക്കുക',
      login: 'ലോഗിൻ',
      forgot: 'പാസ്‌വേഡ് മറന്നോ?',
      comingSoon: 'ഉടൻ വരുന്നു'
    },
    chat: {
      title: 'ഡോറെക് അസിസ്റ്റന്റ്',
      placeholder: 'ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
      greeting: 'ഹലോ! 👋 ഡോറെക് ഇന്റർനാഷണലിലേക്ക് സ്വാഗതം. ഞാൻ എങ്ങനെ സഹായിക്കാം?',
      reply: 'നിങ്ങളുടെ സന്ദേശത്തിന് നന്ദി. ഒരു പ്രതിനിധി ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടും.',
      online: 'ഓൺലൈൻ',
      options: ['ഉൽപ്പന്നങ്ങൾ & സേവനങ്ങൾ', 'ബിസിനസ് അവസരങ്ങൾ', 'ഫ്രാഞ്ചൈസ് വിവരങ്ങൾ', 'സെയിൽസ് ബന്ധപ്പെടുക']
    }
  }
};

export default translations;
