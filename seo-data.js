const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://classictowservice.com';
const PHONE_DISPLAY = '+91 96542 84747';
const PHONE_TEL = '+919654284747';
const WA_LINK = 'https://wa.me/919654284747?text=Hi%2C%20I%20need%20a%20tow.%20Sharing%20my%20location%3A%20';
const EMAIL = 'support@classictowservice.com';
const ADDRESS_STREET = 'Near ABES Engineering College, Vijay Nagar';
const ADDRESS_CITY = 'Ghaziabad';
const ADDRESS_STATE = 'Uttar Pradesh';
const ADDRESS_POSTAL = '201009';

// 8 Target Regions with detailed metadata
const CITIES = [
  {
    slug: 'delhi',
    name: 'Delhi',
    fullName: 'Delhi NCT',
    h1: 'Professional Towing Services in Delhi',
    heroSubtitle: '24/7 rapid vehicle recovery, zero-degree flatbed towing, heavy commercial wrecker dispatch, and accident assistance across Central, South, North, West, and East Delhi.',
    intro: 'Classic Tow Service delivers dependable, round-the-clock towing and emergency vehicle recovery across the entire National Capital Territory of Delhi. Whether you are stranded on the busy Outer Ring Road, experiencing a breakdown in Connaught Place, or requiring heavy commercial towing near Okhla Industrial Area, our GPS-coordinated fleet is ready for immediate dispatch. In technical collaboration with RSA Crane Service, we operate modern hydraulic zero-degree flatbeds, heavy underlift wreckers, and mobile crane units capable of safely managing two-wheelers, luxury sedans, electric vehicles, commercial food trucks, and multi-axle freight trucks.',
    landmarks: [
      { name: 'India Gate & Kartavya Path', desc: 'Fast emergency recovery covering Central Vista, Tilak Marg, and Connaught Place arterials.' },
      { name: 'Connaught Place & Barakhamba', desc: 'Rapid basement parking extraction, flatbed transport, and inner/outer circle roadside assistance.' },
      { name: 'Okhla Industrial Area & Nehru Place', desc: 'Commercial fleet relocation, commercial trailer hauling, and South Delhi industrial towing.' },
      { name: 'Aerocity & Mahipalpur (NH-48)', desc: 'Immediate breakdown support near IGI Airport, Gurugram border transit, and hotel district.' },
      { name: 'Akshardham & Mayur Vihar', desc: 'Direct access to Delhi-Meerut Expressway entry, East Delhi ring roads, and Trans-Yamuna corridors.' },
      { name: 'Dwarka & Janakpuri', desc: 'Comprehensive West Delhi coverage along Najafgarh Road, Dwarka Expressway links, and metro routes.' }
    ],
    localities: [
      'Connaught Place', 'Karol Bagh', 'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri',
      'Lajpat Nagar', 'Saket', 'Vasant Kunj', 'Okhla Industrial Area', 'Nehru Place',
      'Mayapuri Industrial Area', 'Naraina', 'Mundka', 'Narela', 'Shahdara',
      'Anand Vihar', 'Mayur Vihar', 'Greater Kailash', 'Aerocity', 'Mahipalpur', 'Mehrauli'
    ],
    highways: ['Ring Road', 'Outer Ring Road', 'NH-48 (Delhi-Gurugram Corridor)', 'Delhi-Meerut Expressway (DME)', 'Mathura Road', 'DND Flyway', 'Rohtak Road'],
    faqs: [
      {
        q: 'How quickly can a tow truck reach my breakdown in Delhi?',
        a: 'Our dispatch team coordinates the nearest available tow truck based on live GPS location and prevailing Delhi traffic. We typically arrive within 20 to 45 minutes across central, south, west, and trans-Yamuna zones.'
      },
      {
        q: 'Do you offer zero-degree flatbed towing for luxury cars and EVs in Delhi?',
        a: 'Yes. Our zero-degree hydraulic flatbeds tilt down completely flush with the ground, eliminating undercarriage damage for low-ground-clearance luxury cars (BMW, Mercedes-Benz, Audi, Porsche) and electric vehicles.'
      },
      {
        q: 'Can you tow heavy commercial trucks and buses within Delhi?',
        a: 'Absolutely. We operate high-tonnage heavy wreckers with underlift attachments and auxiliary pneumatic lines, backed by RSA Crane Service mobile cranes for complex heavy recoveries on Ring Roads and industrial zones.'
      },
      {
        q: 'What is the procedure for accident vehicle recovery in Delhi?',
        a: 'When you call our 24/7 hotline at +91 96542 84747, our team assists with scene safety, takes necessary documentation for insurance claims, winches the damaged vehicle safely, and transports it directly to your authorized workshop.'
      },
      {
        q: 'Do you tow food trucks and customized catering trailers in Delhi?',
        a: 'Yes. We specialize in transporting commercial food trucks, mobile kitchens, and event trailers safely across Delhi, ensuring kitchen appliances, grills, and structural fittings remain completely secure.'
      },
      {
        q: 'Are your towing services available late night and on public holidays in Delhi?',
        a: 'Classic Tow Service operates 24 hours a day, 365 days a year across Delhi NCR without pause, including national holidays, late nights, and festival periods.'
      }
    ]
  },
  {
    slug: 'noida',
    name: 'Noida',
    fullName: 'Noida (Gautam Buddha Nagar)',
    h1: 'Professional Towing Services in Noida',
    heroSubtitle: '24/7 zero-degree flatbed towing, heavy commercial recovery, and expressway roadside assistance across all Noida sectors from Sector 1 to Sector 150.',
    intro: 'Classic Tow Service provides top-tier towing and roadside assistance throughout Noida, covering commercial hubs, high-density residential sectors, and fast-moving transit corridors like the Noida-Greater Noida Expressway and DND Flyway. Our strategically stationed recovery trucks allow rapid mobilization to Sector 18, Sector 62, Sector 63 IT & industrial hubs, and newly developed expressway sectors (137, 142, 150). Whether you need specialized flatbed hauling for a sports coupe, commercial fleet relocation, or emergency winching following a collision, our licensed recovery crew ensures safe, professional execution.',
    landmarks: [
      { name: 'DLF Mall of India & Sector 18', desc: 'Central retail and business district recovery, multi-level parking extraction, and Atta market assistance.' },
      { name: 'Sector 62 & 63 IT/Industrial Hubs', desc: 'Heavy fleet towing, commercial transport, and corporate park emergency breakdown service.' },
      { name: 'Noida-Greater Noida Expressway', desc: 'High-speed corridor towing, breakdown clearance, and accident vehicle recovery near Advant Navis & Sector 137.' },
      { name: 'Botanical Garden & Sector 38A', desc: 'High-traffic metro interchange hub assistance, multi-axle vehicle support, and battery/tyre RSA.' },
      { name: 'Ved Van Park (Sector 78)', desc: 'Residential sector cluster coverage spanning Sectors 74, 75, 76, 77, 78, and 79.' },
      { name: 'Rashtriya Dalit Prerna Sthal (Sector 95)', desc: 'Immediate dispatch along expressway entry, Mahamaya Flyover, and Kalindi Kunj arterial route.' }
    ],
    localities: [
      'Sector 1', 'Sector 18', 'Sector 27', 'Sector 29', 'Sector 32', 'Sector 33',
      'Sector 38', 'Sector 44', 'Sector 50', 'Sector 51', 'Sector 62', 'Sector 63',
      'Sector 76', 'Sector 78', 'Sector 93', 'Sector 95', 'Sector 104', 'Sector 125',
      'Sector 132', 'Sector 135', 'Sector 137', 'Sector 142', 'Sector 150'
    ],
    highways: ['Noida-Greater Noida Expressway', 'DND Flyway', 'Vikas Marg / Kalindi Kunj Road', 'FNG Expressway Corridor', 'Dadri Main Road', 'Master Plan Roads (MP-1, MP-2, MP-3)'],
    faqs: [
      {
        q: 'Where do you offer towing services in Noida?',
        a: 'We cover every sector in Noida from Sector 1 to Sector 150, including Sector 18, Sector 62, Sector 63, Sector 104, Sector 137, Sector 150, and the entire stretch of the Noida-Greater Noida Expressway and DND Flyway.'
      },
      {
        q: 'How fast can you reach a breakdown on the Noida Expressway?',
        a: 'Because our recovery vehicles actively patrol and are stationed near key expressway exits like Mahamaya Flyover, Sector 125, and Sector 137, average response time on the Noida Expressway is typically 20 to 30 minutes.'
      },
      {
        q: 'Can you transport a non-starting automatic or EV in Noida without transmission damage?',
        a: 'Yes. We utilize true zero-degree flatbeds where the entire bed slides down flush with the road, lifting all 4 wheels off the ground to prevent drivetrain friction or battery pack impact.'
      },
      {
        q: 'Do you tow commercial trucks and tempo fleets in Sector 63 Noida?',
        a: 'Yes, our heavy-duty fleet handles light commercial vehicles (LCVs), delivery tempos, container trucks, and large industrial machinery in and around Sector 62 and 63.'
      },
      {
        q: 'Can you drop my accidental car directly at an authorized showroom in Noida?',
        a: 'Yes. We provide direct door-to-workshop transport to authorized body shops and private garages across Noida, Greater Noida, or Delhi as chosen by the client.'
      },
      {
        q: 'What should I do while waiting for the tow truck in Noida?',
        a: 'Turn on hazard warning blinkers, place an emergency triangle 30–50 meters behind the vehicle if on the expressway, stay safely behind the crash barrier, and share your live GPS location on WhatsApp.'
      }
    ]
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    fullName: 'Gurugram (Gurgaon)',
    h1: 'Professional Towing Services in Gurugram',
    heroSubtitle: '24/7 premium flatbed towing, heavy commercial truck recovery, and emergency roadside assistance across DLF Cyber City, Golf Course Road, Sohna Road, and Manesar.',
    intro: 'Classic Tow Service offers premier 24/7 towing and heavy vehicle recovery throughout Gurugram (Gurgaon) and the surrounding industrial belts. From corporate corridors along DLF CyberHub and Golf Course Road to heavy logistics hubs in Manesar and Udyog Vihar, our advanced recovery trucks provide reliable assistance. We cater to high-end luxury sedans, sports cars, SUVs, multi-axle freight carriers, and commercial food trucks. Powered by modern equipment and an alliance with RSA Crane Service, we tackle difficult basement extractions, highway breakdowns on NH-48, and major rollover recoveries.',
    landmarks: [
      { name: 'DLF CyberHub & Cyber City', desc: 'Corporate district towing, basement parking recovery, and Rapid Metro corridor assistance.' },
      { name: 'Leisure Valley Park & Sector 29', desc: 'City center entertainment and institutional zone recovery, flatbed EV hauling, and tyre/battery RSA.' },
      { name: 'Golf Course Road & Extension', desc: 'Luxury vehicle flatbed towing, underpass clearance, and residential community dispatch.' },
      { name: 'Udyog Vihar (Phases I–V)', desc: 'Industrial fleet logistics, commercial tempo towing, and Delhi-Gurugram border recovery.' },
      { name: 'IMT Manesar & KMP Interchange', desc: 'Heavy commercial truck towing, multi-axle trailer recovery, and industrial machinery transport.' },
      { name: 'Aravalli Biodiversity Park (MG Road)', desc: 'Mehrauli-Gurgaon arterial transit recovery and rapid response near Sikanderpur.' }
    ],
    localities: [
      'DLF Cyber City', 'Udyog Vihar', 'MG Road', 'Sector 29', 'Sector 14', 'Sector 17',
      'Sector 18', 'Sector 31', 'Sector 44', 'Sector 56', 'Sohna Road', 'Golf Course Road',
      'Golf Course Extension Road', 'Manesar', 'Farrukhnagar', 'Badshahpur', 'Palam Vihar',
      'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5'
    ],
    highways: ['NH-48 (Delhi-Jaipur Expressway)', 'Golf Course Road Elevated & Underpasses', 'Sohna Elevated Expressway', 'KMP Expressway (Western Peripheral)', 'Dwarka Expressway', 'Old Delhi-Gurgaon Road'],
    faqs: [
      {
        q: 'Do you tow luxury cars and low-clearance vehicles in Gurugram?',
        a: 'Yes. Gurugram is home to many premium vehicles. Our zero-degree hydraulic flatbeds ensure that luxury sedans, sports cars, and low-clearance imports are loaded without bumper scraping or frame contact.'
      },
      {
        q: 'How do you handle heavy commercial breakdowns in IMT Manesar?',
        a: 'We deploy specialized heavy wreckers equipped with heavy winches and underlift rigs, coordinating with partner RSA Crane Service for mobile crane lifts whenever required for overturned trailers or factory equipment.'
      },
      {
        q: 'Can you extract a broken-down car from a multi-level basement parking in DLF Cyber City?',
        a: 'Yes. We operate compact low-profile wheel-lift tow trucks designed specifically for tight parking garages with low ceiling heights where standard flatbeds cannot enter.'
      },
      {
        q: 'How fast can you reach NH-48 near Rajiv Chowk or IFFCO Chowk in Gurgaon?',
        a: 'Our recovery units are positioned near major expressway interchanges. Average dispatch time to Rajiv Chowk, IFFCO Chowk, or Shankar Chowk is 20 to 35 minutes.'
      },
      {
        q: 'What details should I provide when calling for towing in Gurgaon?',
        a: 'Please share your vehicle model, current condition (functional steering/wheels or locked), exact GPS pin or landmark, and destination workshop or residence.'
      },
      {
        q: 'Are your towing prices transparent in Gurugram?',
        a: 'Yes. We provide clear, upfront quotes based on vehicle category, distance, and specialized recovery requirements before dispatching our truck. No hidden surprises.'
      }
    ]
  },
  {
    slug: 'greater-noida',
    name: 'Greater Noida',
    fullName: 'Greater Noida',
    h1: 'Professional Towing Services in Greater Noida',
    heroSubtitle: '24/7 flatbed towing, heavy vehicle recovery, and Yamuna Expressway emergency response across Pari Chowk, Knowledge Park, and Surajpur.',
    intro: 'Classic Tow Service delivers rapid, professional vehicle recovery across Greater Noida, covering industrial complexes, educational hubs, and critical intercity highway junctions. From the bustling roundabout of Pari Chowk to the academic corridors of Knowledge Park (1–4), Ecotech manufacturing zones, and the entry stretches of the Yamuna Expressway, our fleet is equipped for all vehicular emergencies. Partnered with RSA Crane Service, we provide seamless heavy towing for industrial trailers, flatbed transport for EVs, and swift clearance of highway breakdowns.',
    landmarks: [
      { name: 'Pari Chowk & Alpha Commercial Belt', desc: 'Central junction recovery connecting Noida Expressway, Surajpur, and Yamuna Expressway.' },
      { name: 'India Expo Centre & Mart (KP II)', desc: 'Event logistics, exhibition vehicle transport, food truck towing, and corporate transit support.' },
      { name: 'Buddh International Circuit (BIC)', desc: 'High-speed track event towing, sports car flatbed transport, and Yamuna Expressway recovery.' },
      { name: 'The Grand Venice Mall (Site IV)', desc: 'Retail hub breakdown assistance, passenger car towing, and underground parking recovery.' },
      { name: 'Gautam Buddha University Campus', desc: 'Western Greater Noida coverage, Yamuna Expressway exit assistance, and battery/tyre RSA.' },
      { name: 'Surajpur Industrial Area & Wetland', desc: 'Commercial factory fleet towing, warehouse machinery hauling, and industrial trailer recovery.' }
    ],
    localities: [
      'Pari Chowk', 'Knowledge Park 1', 'Knowledge Park 2', 'Knowledge Park 3', 'Knowledge Park 4',
      'Alpha 1', 'Alpha 2', 'Beta 1', 'Beta 2', 'Gamma 1', 'Gamma 2', 'Delta 1', 'Delta 2',
      'Surajpur', 'Ecotech 1', 'Ecotech 2', 'Ecotech 3', 'Kasna', 'Jaypee Greens', 'Yamuna Expressway', 'Techzone'
    ],
    highways: ['Yamuna Expressway (Jewar / Agra Route)', 'Noida-Greater Noida Expressway', 'Eastern Peripheral Expressway (EPE Interchange)', 'Surajpur-Kasna Road', 'Dadri Main Road'],
    faqs: [
      {
        q: 'Do you provide emergency breakdown towing on the Yamuna Expressway?',
        a: 'Yes. We provide 24/7 emergency response along the Yamuna Expressway starting from the Zero Point in Greater Noida, reaching broken-down or accident vehicles rapidly.'
      },
      {
        q: 'Can you tow heavy industrial machinery and commercial trucks in Ecotech Greater Noida?',
        a: 'Yes. Our heavy-duty wreckers and crane-assist fleet in partnership with RSA Crane Service handle heavy trucks, containers, manufacturing machinery, and industrial trailers throughout Ecotech zones.'
      },
      {
        q: 'How fast can a tow truck reach Pari Chowk or Knowledge Park?',
        a: 'With units stationed close to Pari Chowk and Surajpur, our typical arrival time in Greater Noida core sectors is between 20 and 30 minutes.'
      },
      {
        q: 'Do you offer food truck towing for events at India Expo Mart?',
        a: 'Yes. We regularly haul mobile kitchen food trucks and event trailers to and from the India Expo Centre & Mart with complete safety for commercial cooking setups.'
      },
      {
        q: 'Can you transport my car from Greater Noida to Delhi or Gurugram?',
        a: 'Yes, we provide both local inter-sector towing and intercity long-distance flatbed vehicle transportation across the entire Delhi NCR region.'
      },
      {
        q: 'How do I pay for towing services in Greater Noida?',
        a: 'We accept all convenient digital payment modes including UPI (Google Pay, PhonePe, Paytm), net banking, and cash upon delivery.'
      }
    ]
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    fullName: 'Ghaziabad (GZB)',
    h1: 'Professional Towing Services in Ghaziabad',
    heroSubtitle: '24/7 flatbed towing, heavy commercial recovery, and Delhi-Meerut Expressway emergency assistance across Indirapuram, Vaishali, Raj Nagar, and Sahibabad.',
    intro: 'Headquartered near ABES Engineering College in Vijay Nagar, Classic Tow Service provides fast, dependable towing and vehicle recovery across all of Ghaziabad. We maintain an immediate physical presence along the NH-9 / NH-24 corridor and the Delhi-Meerut Expressway (DME), allowing response times as fast as 15 to 25 minutes. From residential townships like Indirapuram, Vaishali, and Raj Nagar Extension to dense manufacturing belts like Sahibabad Industrial Area, our fleet handles two-wheelers, passenger cars, zero-degree flatbed luxury transports, and heavy commercial vehicles in alliance with RSA Crane Service.',
    landmarks: [
      { name: 'Swarna Jayanti Park (Indirapuram)', desc: 'Core Trans-Hindon residential hub coverage including Vaibhav Khand, Ahinsa Khand, and Shipra Mall.' },
      { name: 'Dudheshwar Nath Mahadev Temple', desc: 'Old Ghaziabad arterial recovery near Ghantaghar, GT Road, and Railway Station junction.' },
      { name: 'City Forest & Mohan Nagar', desc: 'Key junction connecting GT Road, Loni, Sahibabad Industrial Area, and Hindon Airbase road.' },
      { name: 'ISKCON Temple (Raj Nagar Extension)', desc: 'Northern Ghaziabad township coverage, Meerut Road bypass, and elevated corridor exits.' },
      { name: 'Indirapuram Habitat Centre (IHC)', desc: 'Commercial area towing, EV flatbed hauling, and quick roadside battery/puncture service.' },
      { name: 'Drizzling Land (Dasna - DME Junction)', desc: 'Expressway interchange assistance connecting Eastern Peripheral Expressway and NH-9.' }
    ],
    localities: [
      'Indirapuram', 'Vaishali', 'Vasundhara', 'Kaushambi', 'Raj Nagar', 'Raj Nagar Extension',
      'Kavi Nagar', 'Shastri Nagar', 'Crossing Republik', 'Pratap Vihar', 'Siddharth Vihar',
      'Govindpuram', 'Mohan Nagar', 'Sahibabad Industrial Area', 'Loni', 'Muradnagar', 'Modinagar', 'Dasna'
    ],
    highways: ['Delhi-Meerut Expressway (DME / NH-9)', 'NH-24 Corridor', 'Hindon Elevated Road', 'GT Road (Mohan Nagar to Meerut)', 'Eastern Peripheral Expressway (Dasna Interchange)'],
    faqs: [
      {
        q: 'Where is Classic Tow Service physically located in Ghaziabad?',
        a: 'Our operational headquarters is located near ABES Engineering College, Vijay Nagar, Ghaziabad (UP 201009), right on the NH-9 corridor. This allows rapid dispatch to all Ghaziabad localities.'
      },
      {
        q: 'How fast can you reach Indirapuram or Vaishali?',
        a: 'Because our trucks are based along NH-9 and the Hindon Elevated corridor, we can typically reach any point in Indirapuram, Vaishali, or Vasundhara in 15 to 25 minutes.'
      },
      {
        q: 'Do you provide heavy towing in Sahibabad Industrial Area?',
        a: 'Yes. In technical partnership with RSA Crane Service, we tow industrial trucks, multi-axle freight carriers, cranes, and heavy machinery throughout Sahibabad, Loni, and Mohan Nagar.'
      },
      {
        q: 'Can you recover vehicles broken down on the Delhi-Meerut Expressway?',
        a: 'Yes. We specialize in expressway rapid clearance on DME from Ghazipur border past Dasna up to the Meerut toll plaza, adhering to all safety protocols.'
      },
      {
        q: 'What towing equipment do you operate in Ghaziabad?',
        a: 'Our fleet includes hydraulic zero-degree flatbeds, heavy-duty underlift wreckers, recovery winches, wheel-lift tow trucks, and mobile cranes for heavy uprighting.'
      },
      {
        q: 'Can I call for on-site roadside assistance without needing a full tow?',
        a: 'Yes! We offer RSA assistance in Ghaziabad including battery jump-starts, flat tyre spare installation, emergency fuel delivery, and lockout support.'
      }
    ]
  },
  {
    slug: 'meerut',
    name: 'Meerut',
    fullName: 'Meerut',
    h1: 'Professional Towing Services in Meerut',
    heroSubtitle: '24/7 commercial vehicle towing, heavy wrecker recovery, and Delhi-Meerut Expressway emergency response across Partapur, Modipuram, and Meerut Bypass.',
    intro: 'Classic Tow Service provides 24/7 professional towing and heavy vehicle recovery across Meerut and the connecting express corridors. As the northern anchor of the Delhi-Meerut Expressway (DME) and NH-58, Meerut experiences heavy commercial transit, industrial movement, and daily commuter traffic. Whether you face an unexpected breakdown in Partapur Industrial Area, a heavy truck malfunction on the Meerut Bypass, or require specialized flatbed transport near Modipuram, our dispatch team ensures prompt, professional service. Operating in technical alliance with RSA Crane Service, we handle commercial fleet recoveries, accident extraction, and industrial hauling with utmost safety.',
    landmarks: [
      { name: 'Shahid Smarak & Begum Bridge', desc: 'Central Meerut urban coverage, commercial district breakdown support, and passenger vehicle towing.' },
      { name: 'Augarnath Temple (Kalipaltan Mandir)', desc: 'Historic Cantonment area access, Roorkee Road arterials, and urban roadside assistance.' },
      { name: 'Partapur Industrial Area & Interchange', desc: 'Heavy commercial fleet towing, industrial machinery transport, and DME entry/exit recovery.' },
      { name: 'Modipuram & Sardar Vallabhbhai Patel Univ', desc: 'Northern highway corridor support, Dehradun/Haridwar transit towing, and bypass breakdown service.' },
      { name: 'Shopprix Mall & Delhi Road', desc: 'High-density commercial route coverage, flatbed car transport, and local garage drop-offs.' },
      { name: 'Meerut Bypass (NH-58)', desc: '24/7 express transit assistance, long-distance freight wrecker towing, and accident clearance.' }
    ],
    localities: [
      'Meerut City', 'Shastri Nagar', 'Pallavpuram', 'Modipuram', 'Ganga Nagar',
      'Delhi Road', 'Garh Road', 'Begum Bridge', 'Partapur', 'Rithani', 'Kanker Khera',
      'Sardhana Road', 'Mawana Road', 'Meerut Bypass', 'Abu Lane'
    ],
    highways: ['Delhi-Meerut Expressway (DME Section 4)', 'Meerut Bypass (NH-58)', 'Delhi Road', 'Garh Road (NH-709A)', 'Roorkee Road', 'Mawana Road'],
    faqs: [
      {
        q: 'Do you cover the entire Delhi-Meerut Expressway up to Meerut?',
        a: 'Yes. We provide continuous 24/7 coverage along the entire Delhi-Meerut Expressway (DME), including the final high-speed stretch terminating at Partapur, Meerut.'
      },
      {
        q: 'Can you handle heavy-duty truck towing on the Meerut Bypass?',
        a: 'Yes. Our heavy-duty wreckers with high-capacity underlifts and winches, combined with RSA Crane Service heavy mobile cranes, easily recover multi-axle freight trucks and buses.'
      },
      {
        q: 'How fast can a tow truck reach Partapur or Modipuram?',
        a: 'Average response time across primary Meerut highway corridors and industrial areas like Partapur and Modipuram is 25 to 40 minutes.'
      },
      {
        q: 'Do you tow accident-damaged vehicles in Meerut to Delhi or Ghaziabad workshops?',
        a: 'Yes. We regularly execute intercity accident transport, safely hauling damaged cars directly to authorized dealership workshops across Ghaziabad, Noida, or Delhi.'
      },
      {
        q: 'Can you tow food trucks or commercial mobile kitchens in Meerut?',
        a: 'Yes, our zero-degree hydraulic flatbed trucks accommodate customized food trucks, catering vans, and commercial food trailers without damaging delicate interior installations.'
      },
      {
        q: 'Are your Meerut towing services available during night hours?',
        a: 'Yes. Our dispatch team is active 24 hours a day, 7 days a week, ensuring you are never stranded on the highway at night.'
      }
    ]
  },
  {
    slug: 'hapur',
    name: 'Hapur',
    fullName: 'Hapur',
    h1: 'Professional Towing Services in Hapur',
    heroSubtitle: '24/7 highway towing, commercial trailer relocation, and heavy wrecker recovery across Hapur City, Pilkhuwa, Babugarh, and the NH-9 corridor.',
    intro: 'Classic Tow Service provides 24/7 towing and heavy vehicle recovery throughout Hapur district and the busy NH-9 highway corridor connecting Delhi NCR to Western Uttar Pradesh. Strategically located to serve commercial transit through Pilkhuwa’s industrial handloom zone, Hapur City, and the pilgrimage corridor toward Garhmukteshwar (Brijghat), our recovery fleet offers rapid response for both private automobiles and heavy commercial freight. Supported by RSA Crane Service for heavy crane lifts and rollover uprighting, we guarantee secure, dependable vehicle extraction day or night.',
    landmarks: [
      { name: 'Pilkhuwa Industrial & Handloom Hub', desc: 'Commercial factory tempo towing, industrial trailer transport, and NH-9 highway assistance.' },
      { name: 'Garhmukteshwar Brijghat Ganges Ghats', desc: 'Highway corridor transit recovery, pilgrim vehicle emergency breakdown service, and long-distance towing.' },
      { name: 'Hapur Bypass & Chandi Mandir', desc: 'Bypass freight clearance, multi-axle truck recovery, and city center flatbed assistance.' },
      { name: 'Babugarh Agricultural & Equine Zone', desc: 'Rural highway assistance, tractor/commercial vehicle winching, and transit breakdown towing.' },
      { name: 'Dhaulana Mega Industrial Park', desc: 'Industrial logistics recovery, factory fleet relocation, and heavy equipment transport.' },
      { name: 'Simbhaoli Sugar Mill & Transit Corridor', desc: 'Heavy carrier recovery, agricultural transport assistance, and Moradabad highway link.' }
    ],
    localities: [
      'Hapur City', 'Pilkhuwa', 'Babugarh', 'Garhmukteshwar', 'Dhaulana',
      'Simbhaoli', 'Hapur Bypass', 'Meerut Road', 'Delhi Road (NH-9)'
    ],
    highways: ['NH-9 (Delhi-Ghaziabad-Hapur-Lucknow Highway)', 'Hapur Bypass', 'Meerut-Hapur Road (NH-334)', 'Bulandshahr-Hapur Road (NH-334B)', 'Pilkhuwa-Dhaulana Road'],
    faqs: [
      {
        q: 'Where do you provide towing services in Hapur district?',
        a: 'We cover Hapur City, Pilkhuwa, Babugarh, Garhmukteshwar (Brijghat), Dhaulana Industrial Area, Simbhaoli, and the entire NH-9 bypass route.'
      },
      {
        q: 'Can you tow heavy commercial trucks broken down on NH-9 near Pilkhuwa or Hapur?',
        a: 'Yes. In technical partnership with RSA Crane Service, our high-capacity commercial wreckers and mobile crane units manage high-tonnage freight trucks, trailers, and tankers.'
      },
      {
        q: 'How fast can a tow truck reach Hapur Bypass or Pilkhuwa?',
        a: 'From our operational base along the NH-9 corridor in Ghaziabad, our recovery vehicles typically reach Pilkhuwa within 20–30 minutes and Hapur Bypass within 30–40 minutes.'
      },
      {
        q: 'Do you transport broken-down cars from Hapur to Ghaziabad, Noida, or Delhi?',
        a: 'Yes. We frequently carry vehicles needing major repairs from Hapur directly to company service centers and authorized workshops in Ghaziabad, Noida, and Delhi.'
      },
      {
        q: 'What should I do if my vehicle breaks down on the highway near Garhmukteshwar?',
        a: 'Pull over to the hard shoulder if possible, switch on hazard lights, stay clear of passing traffic behind safety barriers, and call our 24/7 dispatch at +91 96542 84747.'
      },
      {
        q: 'Do you tow food trucks or catering trailers in Hapur?',
        a: 'Yes. Our zero-degree flatbeds are designed to safely load and transport commercial food trailers, catering vans, and exhibition displays without incline scrapes.'
      }
    ]
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    fullName: 'National Capital Region (Delhi NCR)',
    h1: '24/7 Regional Towing & Fleet Recovery Across Delhi NCR',
    heroSubtitle: 'Comprehensive interstate towing, commercial fleet logistics, heavy crane extraction, and zero-degree flatbed recovery connecting all NCR cities and expressways.',
    intro: 'Classic Tow Service operates as the primary regional towing authority across the National Capital Region (Delhi NCR), unifying breakdown dispatch across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Faridabad, Meerut, and Hapur. Our regional network covers thousands of kilometers of arterial expressways including the Delhi-Meerut Expressway (DME), Eastern Peripheral Expressway (KGP), Western Peripheral Expressway (KMP), Yamuna Expressway, NH-48, and NH-9. Whether managing an unexpected breakdown on a crowded urban ring road or mobilizing heavy-duty wreckers and mobile cranes with our partner RSA Crane Service for a complex expressway rollover, our licensed team ensures prompt, secure, and professional recovery.',
    landmarks: [
      { name: 'Delhi-Meerut Expressway (DME)', desc: '14-lane high-speed expressway recovery connecting Ghazipur, Indirapuram, Dasna, and Meerut Partapur.' },
      { name: 'Eastern Peripheral Expressway (KGP / NE-II)', desc: 'Bypass freight clearance, inter-state truck recovery, and heavy industrial vehicle hauling.' },
      { name: 'Western Peripheral Expressway (KMP)', desc: 'Long-haul container transport recovery, Manesar-Kundli corridor assistance, and commercial towing.' },
      { name: 'Yamuna Expressway (Jewar / Agra Corridor)', desc: 'High-speed corridor towing, multi-car collision recovery, and zero-degree flatbed dispatch.' },
      { name: 'NH-48 (Delhi-Gurugram-Jaipur Highway)', desc: 'Critical commercial artery recovery, airport corridor breakdown clearance, and luxury car towing.' },
      { name: 'DND Flyway & Mayur Vihar Link', desc: 'Seamless trans-Yamuna transit clearance connecting South Delhi, Central Delhi, and Noida.' }
    ],
    localities: [
      'Delhi (Central, South, North, West, East)', 'Noida (Sectors 1 to 150)',
      'Greater Noida & Yamuna Expressway', 'Ghaziabad & Indirapuram',
      'Gurugram & Manesar IMT', 'Faridabad & Ballabhgarh', 'Meerut & Meerut Bypass', 'Hapur & Pilkhuwa'
    ],
    highways: ['Delhi-Meerut Expressway (DME)', 'Eastern Peripheral Expressway (KGP)', 'Western Peripheral Expressway (KMP)', 'Yamuna Expressway', 'NH-48', 'NH-9', 'DND Flyway', 'Noida-Greater Noida Expressway'],
    faqs: [
      {
        q: 'Which cities are included under Classic Tow Service Delhi NCR regional coverage?',
        a: 'Our Delhi NCR regional coverage encompasses Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Faridabad, Meerut, and Hapur, including all connecting national highways and peripheral expressways.'
      },
      {
        q: 'Can you transport a vehicle from one NCR city to another (e.g., Meerut to Gurgaon)?',
        a: 'Yes. We specialize in inter-city regional transport across Delhi NCR. We safely move passenger cars, commercial vans, food trucks, and heavy commercial vehicles between any two points in the region.'
      },
      {
        q: 'What is your partnership with RSA Crane Service?',
        a: 'Classic Tow Service operates in official technical alliance with RSA Crane Service (https://rsacraneservice.com/). This partnership allows us to deploy heavy hydraulic mobile cranes alongside our towing fleet for overturned trucks, ditch recoveries, and industrial equipment lifting.'
      },
      {
        q: 'What vehicle types can you tow across Delhi NCR?',
        a: 'We tow all vehicle classes: two-wheelers, luxury sedans, electric vehicles (EVs), SUVs, commercial food trucks, delivery tempos (LCVs), heavy commercial trucks (HCVs), buses, and multi-axle freight trailers.'
      },
      {
        q: 'Do you offer emergency accident assistance on NCR expressways?',
        a: 'Yes. Our crews are trained for high-speed expressway safety, carrying hazard triangles, hydraulic winches, fluid spill containment, and soft recovery straps to prevent further structural damage.'
      },
      {
        q: 'How do I request emergency towing in Delhi NCR?',
        a: 'Call our 24/7 regional dispatch center at +91 96542 84747 or click "Send Your Location on WhatsApp" on any page of our website for instant GPS-based dispatch.'
      }
    ]
  }
];

// 3 Core Services for City-Service Pages
const SERVICES = [
  {
    slug: 'food-truck-towing',
    name: 'Food Truck Towing',
    shortTitle: 'Food Truck Towing',
    serviceType: 'Commercial Mobile Kitchen Relocation',
    badge: 'Food Truck Towing Emblem.webp',
    summary: 'Specialized low-incline zero-degree flatbed towing and commercial kitchen trailer relocation ensuring cooking equipment, propane fittings, and chassis integrity remain 100% secure.'
  },
  {
    slug: 'heavy-towing',
    name: 'Heavy Towing',
    shortTitle: 'Heavy Towing',
    serviceType: 'High-Tonnage Commercial Vehicle & Wrecker Recovery',
    badge: 'Heavy Tow Crane Emblem.webp',
    summary: 'Heavy-duty wrecker services, underlift boom towing, and auxiliary pneumatic air line connections for commercial trucks, buses, trailers, and industrial vehicles with RSA Crane Service mobile crane support.'
  },
  {
    slug: 'accident-recovery',
    name: 'Accident Recovery',
    shortTitle: 'Accident Recovery',
    serviceType: 'Emergency Collision Extraction & Garage Transport',
    badge: 'Accident Recovery Tow Truck Badge.webp',
    summary: '24/7 emergency roadside extraction, rollover uprighting, ditch winching, and damage-free flatbed transport directly to authorized dealerships and insurance inspection garages.'
  }
];

console.log(`Loaded ${CITIES.length} cities and ${SERVICES.length} primary services.`);
module.exports = { BASE_URL, PHONE_DISPLAY, PHONE_TEL, WA_LINK, EMAIL, ADDRESS_STREET, ADDRESS_CITY, ADDRESS_STATE, ADDRESS_POSTAL, CITIES, SERVICES };
