import regeneratedSalonImg from '@/src/assets/images/regenerated_image_1785000416312.png';
import service1Img from '@/src/assets/images/regenerated_image_1785002876784.jpg';
import service2Img from '@/src/assets/images/regenerated_image_1785002880851.jpg';
import modelBeforeImg from '@/src/assets/images/regenerated_image_1785009577668.jpg';

export const getImgSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && typeof img.src === 'string') return img.src;
  return String(img);
};

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  price: string;
  priceNum: number;
  featured?: boolean;
  image: string;
  productsUsed: string[];
  keyBenefits: string[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  awards: string;
  bio: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  desc: string;
  price: string;
  image: string;
  rating: number;
  highlight: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  stylist: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hair' | 'Skin' | 'Bridal' | 'Interior' | 'Nails';
  image: string;
  cameraInfo: string;
  modelDetails: string;
}

export interface RoomWalkthrough {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  highlights: string[];
  ambience: string;
}

export const SALON_CONFIG = {
  brand: {
    name: "Aura The Salon",
    shortName: "AURA",
    tagline: "Luxury. Confidence. Transformation.",
    established: "2021",
    rating: "4.9",
    totalReviews: 128,
    phone: "86688 06851",
    phoneClean: "8668806851",
    email: "ariseplay3@gmail.com",
    address: {
      line1: "Aside SBI, Nagpur Road",
      line2: "Bapat Nagar Square, Civil Lines",
      city: "Chandrapur",
      state: "Maharashtra",
      pincode: "442401",
      full: "Aside SBI, Nagpur Road, Bapat Nagar Square, Civil Lines, Chandrapur, Maharashtra 442401"
    },
    hours: "10:00 AM – 10:00 PM (Mon - Sun)",
    googleMapsUrl: "https://maps.google.com/?q=Aside+SBI+Nagpur+Road+Chandrapur",
    instagramUrl: "https://instagram.com/aurathesalon_official",
    whatsappNumber: "918668806851"
  },

  hero: {
    headline: "India's Royal Luxury Salon Sanctuary.",
    subheadline: "Where timeless Indian grace meets world-class couture. Experience bespoke hair transformations, Ayurvedic scalp rituals, and royal Maharani bridal makeovers in our sanctuary with gold oval halo mirrors and crimson leather stations.",
    videoFallbackImg: getImgSrc(regeneratedSalonImg),
    badgeText: "Royal Indian Couture Salon & Spa",
    stats: [
      { value: "4.9★", label: "Google Rating" },
      { value: "15,000+", label: "Royal Transformations" },
      { value: "Signature", label: "Gold Oval Halo Mirrors" },
      { value: "15+", label: "Indian Master Stylists" }
    ]
  },

  story: {
    title: "The Heritage of Indian Royal Luxury",
    subtitle: "AN ETHEREAL SANCTUARY OF ELEGANCE & REFINEMENT",
    paragraphs: [
      "Aura was founded on a singular vision: celebrating the rich heritage of Indian beauty through bespoke craftsmanship and world-class luxury.",
      "From the moment you step onto our polished white marble floors under glowing gold track lights, the static of the outside world dissolves. Designed with signature gold-framed oval backlit LED halo mirrors, plush crimson tufted leather stations, and private bridal dressing suites, every corner honors your royalty.",
      "Our team of renowned Indian master stylists and bridal artists bring decades of fashion-week and bollywood couture mastery. From custom multi-tonal hair color formulated for Indian dark hair textures to traditional Ayurvedic Kansa head champis and royal bridal makeovers, we create timeless transformations that radiate confidence."
    ],
    signatureQuote: "We do not merely style hair. We honor the royal aura within you.",
    founderName: "Aura Royal Directorate"
  },

  walkthroughRooms: [
    {
      id: "reception",
      name: "Royal Reception & Chai Lounge",
      tagline: "Champagne Bronze & White Marble Entryway",
      desc: "An ethereal entryway featuring polished marble floors, soft ambient illumination, and complimentary saffron-cardamom artisanal chai or cold rose brew upon arrival.",
      image: getImgSrc(modelBeforeImg),
      highlights: ["Signature Masala Chai & Saffron Brew", "Private Valet Concierge", "Mogra & Sandalwood Ambient Fragrance"],
      ambience: "Warm Indian Royalty • 24°C Climate"
    },
    {
      id: "hair-stations",
      name: "Gold Oval Halo Hair Atelier",
      tagline: "Gold Oval LED Halo Mirrors & Crimson Leather Stations",
      desc: "Featuring signature gold-framed oval backlit LED halo mirrors, plush crimson tufted leather chairs on polished gold hydraulic pedestals, and precision track spotlights over Italian white marble.",
      image: getImgSrc(service2Img),
      highlights: ["Gold-Framed Oval LED Halo Mirrors", "Crimson Leather & Gold Pedestals", "Italian White Marble & Track Lighting"],
      ambience: "Gold Ambient Glow • Precision Daylight"
    },
    {
      id: "hair-wash",
      name: "Ayurvedic Champi & Scalp Suite",
      tagline: "Reclining Shampoo Beds & Kansa Wand Scalp Massage",
      desc: "Recline into full-flat shampoo beds with warm floral-infused water, hot towel wraps, and traditional Kansa wand scalp relaxation.",
      image: getImgSrc(regeneratedSalonImg),
      highlights: ["Ayurvedic Kansa Scalp Massage", "Chromotherapy Starlight Ceiling", "Jasmine & Hibiscus Infused Water"],
      ambience: "Deep Relaxation • Soft Raga Ambient Harmonies"
    },
    {
      id: "facial-room",
      name: "Kundan & Ubtan Skin Sanctuary",
      tagline: "Private Suite for Royal Radiance & Glass Skin",
      desc: "Sound-insulated private facial suites with 24K gold Kundan foil masks, herbal steam misting, and advanced medical HydraFacial towers.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1600",
      highlights: ["24K Kundan Gold Foil Mask", "HydraFacial Elite Resurfacing", "Saffron & Ubtan Radiance Detox"],
      ambience: "Tranquil • Botanical Mogra Aroma"
    },
    {
      id: "bridal-room",
      name: "Maharani Royal Bridal Suite",
      tagline: "Private Couture Dressing & Mehendi Suite",
      desc: "Spacious private suite equipped with full-length gold mirrors, jewelry vanity setting stations, HD airbrush station, and saree/lehenga draping assistants.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=85&w=1200",
      highlights: ["HD Airbrush Vanity Mirror", "Saree & Lehenga Couture Draping", "Private Refreshment & Family Lounge"],
      ambience: "Royal Regal Celebration"
    }
  ] as RoomWalkthrough[],

  serviceCategories: [
    "All Services",
    "Bridal & Maharani Couture",
    "Hair Color & Balayage",
    "Keratin & Smoothing",
    "Ayurvedic Scalp & Hair Spa",
    "Kundan & Glass Skin Facials",
    "Hair Styling & Cut",
    "Royal Pedicure & Spa"
  ],

  services: [
    {
      id: "maharani-bridal-couture",
      name: "Maharani Royal Bridal Transformation",
      category: "Bridal & Maharani Couture",
      shortDesc: "HD Airbrush bridal makeup, 3D lashes, royal hair couture styling, saree/lehenga draping & body gold glow.",
      fullDesc: "An immersive 4-hour royal transformation for your auspicious wedding day. Includes pre-wedding trial, HD Airbrush sweatproof makeup, 3D mink lashes, royal hair couture, saree/lehenga draping, jewelry setting, and 24K body illuminator.",
      duration: "240 mins",
      price: "₹18,000 - ₹35,000",
      priceNum: 18000,
      featured: true,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1200",
      productsUsed: ["TEMPTU HD Airbrush", "Dior Backstage", "Tom Ford Beauty", "Charlotte Tilbury"],
      keyBenefits: ["24-Hour camera-ready finish", "Sweatproof & tearproof formula", "Full saree/lehenga draping included"]
    },
    {
      id: "hair-color-balayage",
      name: "Royal Honey Balayage & Silk Gloss",
      category: "Hair Color & Balayage",
      shortDesc: "Bespoke hand-painted dimensional highlights crafted for dark Indian hair textures with Olaplex bond repair.",
      fullDesc: "Our signature hair coloring technique tailored for dark natural Indian hair. Master colorists hand-paint warm caramel, honey, or chestnut highlights without brassiness. Includes Olaplex bond multiplier, silk gloss toner, and Dyson blowout.",
      duration: "180 - 240 mins",
      price: "₹7,500 - ₹12,000",
      priceNum: 7500,
      featured: true,
      image: getImgSrc(service2Img),
      productsUsed: ["L'Oréal Professionnel French Balayage", "Olaplex Bond Multiplier", "Wella Shinefinity Gloss"],
      keyBenefits: ["Flawless anti-brass finish", "Deep dimensional shine", "In-built bond reconstruction"]
    },
    {
      id: "ayurvedic-kansa-champi",
      name: "Royal Ayurvedic Kansa Head Champi & Spa",
      category: "Ayurvedic Scalp & Hair Spa",
      shortDesc: "Warm Mogra & Bhringraj oil head champi, Kansa wand pressure points, hot towel wrap & hair mask.",
      fullDesc: "A traditional Indian royal head champi using warm organic Bhringraj, Hibiscus, and Mogra infused oils. Includes 30-minute Kansa wand pressure point stimulation, neck and shoulder reflexology, micro-mist steam, and nourishing hair mask.",
      duration: "75 mins",
      price: "₹2,500 - ₹4,200",
      priceNum: 2500,
      featured: true,
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=85&w=1000",
      productsUsed: ["Cold-Pressed Bhringraj & Mogra Oil", "Kérastase Chronologiste", "Warm Botanical Floral Water"],
      keyBenefits: ["Relieves deep mental stress", "Stimulates hair growth", "Intense scalp nourishment"]
    },
    {
      id: "kundan-gold-facial",
      name: "24K Kundan Gold & Ubtan Radiance Facial",
      category: "Kundan & Glass Skin Facials",
      shortDesc: "Clinical vortex extractions, saffron-turmeric detox, 24K gold foil mask, and RF skin tightening.",
      fullDesc: "An opulent skin ritual combining modern HydraFacial vortex suction with ancient Indian saffron, sandalwood, and pure 24K gold foil sheets. Delivers glass skin luminescence and instant wedding-ready glow.",
      duration: "90 mins",
      price: "₹4,500 - ₹7,500",
      priceNum: 4500,
      featured: true,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=85&w=1000",
      productsUsed: ["HydraFacial MD Serums", "24K Kundan Gold Foil", "Organic Kashmiri Saffron & Sandalwood"],
      keyBenefits: ["Instant bridal glass skin", "Deep pore extraction", "Reduces pigmentation"]
    },
    {
      id: "keratin-botox",
      name: "Silk Keratin & Amazonian Hair Botox",
      category: "Keratin & Smoothing",
      shortDesc: "Formol-free deep restorative smoothing treatment eliminating 95% frizz for humidity-resistant hair.",
      fullDesc: "Infuses liquid silk proteins and hyaluronic acid deep into the hair shaft. Designed for Indian weather humidity, it eliminates frizz for up to 5 months while retaining natural bounce and movement.",
      duration: "150 mins",
      price: "₹6,500 - ₹10,500",
      priceNum: 6500,
      featured: false,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=85&w=1000",
      productsUsed: ["Global Keratin Juvexin", "Amazon Series Hair Botox", "Moroccanoil Treatment"],
      keyBenefits: ["95% frizz elimination", "Smooth silk texture", "Lasts 4 - 5 months"]
    },
    {
      id: "master-haircut-styling",
      name: "Artisanal Layered Cut & Dyson Styling",
      category: "Hair Styling & Cut",
      shortDesc: "Face-contouring precision cut customized to your face shape, scalp massage, and Dyson Airwrap waves.",
      fullDesc: "Includes detailed face-shape consultation, scalp detox shampoo, stress-relief neck massage, custom Indian couture haircut, and Dyson Supersonic blowout or Airwrap soft waves.",
      duration: "60 mins",
      price: "₹1,200 - ₹2,500",
      priceNum: 1200,
      featured: false,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=85&w=1000",
      productsUsed: ["Moroccanoil Volumizing Mousse", "L'Oréal Mythic Oil", "Dyson Pro Tools"],
      keyBenefits: ["Custom face contouring", "Weightless bounce", "Long-lasting style hold"]
    },
    {
      id: "royal-pedicure-spa",
      name: "Royal Rose & Mogra Hydro-Gel Pedicure",
      category: "Royal Pedicure & Spa",
      shortDesc: "Warm rose petal & milk foot soak, callus peel, dead sea salt scrub, hot stone massage & gel polish.",
      fullDesc: "Unwind on our whirlpool hydrotherapy thrones. Feet are soaked in fresh rose petals and warm scented milk, treated with organic ubtan exfoliation, hot basalt stone massage, and long-wear OPI gel polish.",
      duration: "90 mins",
      price: "₹1,800 - ₹3,200",
      priceNum: 1800,
      featured: false,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=85&w=1000",
      productsUsed: ["OPI GelColor", "Footlogix Medical Care", "Organic Rose & Mogra Oils"],
      keyBenefits: ["Deep heel crack repair", "Silk soft feet", "3-week chip-free wear"]
    }
  ] as ServiceItem[],

  gallery: [
    {
      id: "g1",
      title: "Chestnut Honey Balayage & Silk Wave",
      category: "Hair",
      image: getImgSrc(service2Img),
      cameraInfo: "Shot on Hasselblad X2D 100C • 90mm f/1.8 • Studio Softbox",
      modelDetails: "Model: Ananya S. • Styled by Senior Master Stylist"
    },
    {
      id: "g2",
      title: "Royal Indian HD Bridal Glow",
      category: "Bridal",
      image: getImgSrc(service1Img),
      cameraInfo: "Shot on Leica SL3 • 50mm f/1.4 • Golden Hour Lighting",
      modelDetails: "Bride: Radhika M. • Makeup by Director Makeup Artist"
    },
    {
      id: "g3",
      title: "Glass Skin 24K Gold Hydra Facial",
      category: "Skin",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=85&w=1200",
      cameraInfo: "Shot on Sony A1 • 85mm f/1.2 • Macro Beauty Lens",
      modelDetails: "Client: Priya K. • Treatment: 24K Gold HydraFacial"
    },
    {
      id: "g4",
      title: "Gold Oval Halo Mirrors & Crimson Salon Atelier",
      category: "Interior",
      image: getImgSrc(regeneratedSalonImg),
      cameraInfo: "Shot on Canon R5 Mark II • 24mm f/2.8 • Architectural HDR",
      modelDetails: "Aura Hair Atelier • Styling Suite 01"
    },
    {
      id: "g5",
      title: "Couture Metallic Rose Nail Art",
      category: "Nails",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=85&w=1200",
      cameraInfo: "Shot on Hasselblad X2D • Macro f/2.8 • Soft Ring Light",
      modelDetails: "OPI Gel Chrome Finish & Hand-Set Crystals"
    },
    {
      id: "g6",
      title: "Velvet Smooth Keratin Hair Movement",
      category: "Hair",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=85&w=1200",
      cameraInfo: "Shot on Leica SL3 • 120fps Slow-Motion Capture",
      modelDetails: "Client: Sonali T. • Treatment: Amazonian Botox Hair Repair"
    }
  ] as GalleryItem[],

  beforeAfter: [
    {
      id: "ba1",
      title: "Bleach Damage Repair to Silky Honey Balayage",
      category: "Hair Colour & Repair",
      description: "Client presented with frizzy, dry, unevenly bleached brassy hair (Before). Fiber bond reconstruction & rich honey gloss restored silky softness, mirror shine, and healthy weightless movement (After).",
      beforeImg: getImgSrc(modelBeforeImg),
      afterImg: getImgSrc(service2Img),
      duration: "3.5 Hours",
      stylist: "Rahul V., Master Colorist"
    }
  ] as BeforeAfterItem[],

  products: [
    {
      id: "p1",
      name: "Dyson Supersonic™ Professional Dryer",
      brand: "Dyson Beauty",
      category: "Styling Tech",
      desc: "Fast drying with intelligent heat control to protect hair natural shine.",
      price: "₹38,900",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=85&w=600",
      rating: 5.0,
      highlight: "In-salon Official Styling Partner"
    },
    {
      id: "p2",
      name: "Moroccanoil Original Argan Treatment",
      brand: "Moroccanoil",
      category: "Hair Elixir",
      desc: "Nourishing argan oil infused conditioning, styling, and finishing elixir.",
      price: "₹3,850",
      image: "https://images.unsplash.com/photo-1608248597309-1581403c683c?auto=format&fit=crop&q=85&w=600",
      rating: 4.9,
      highlight: "Pure Cold-Pressed Argan Oil"
    },
    {
      id: "p3",
      name: "Kérastase Chronologiste Caviar Mask",
      brand: "Kérastase Paris",
      category: "Hair Care",
      desc: "Regenerating hair mask with Hyaluronic Acid, Abyssine and Vitamin E.",
      price: "₹5,200",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=85&w=600",
      rating: 4.9,
      highlight: "Ultimate Youth Restorative"
    },
    {
      id: "p4",
      name: "L'Oréal Professionnel Metal Detox Serum",
      brand: "L'Oréal Pro",
      category: "Color Care",
      desc: "Neutralizes Glicoamine metal particles inside hair fibers before coloring.",
      price: "₹2,600",
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=85&w=600",
      rating: 4.8,
      highlight: "87% Breakage Reduction"
    }
  ] as Product[],

  experts: [
    {
      id: "e1",
      name: "Rahul Verma",
      role: "Creative Hair Director & Balayage Specialist",
      experience: "14+ Years Experience",
      specialties: ["French Balayage", "Precision Layered Cuts", "Scalp Trichology"],
      awards: "Winner • L'Oréal Color Trophy 2023",
      bio: "Trained in Paris and Mumbai, Rahul brings editorial runway precision to everyday hair transformations.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: "e2",
      name: "Meera Kapoor",
      role: "Bridal Makeup Director & Skin Specialist",
      experience: "11+ Years Experience",
      specialties: ["HD Airbrush Bridal", "Glass Skin Facials", "Celebrity Aesthetics"],
      awards: "Top 10 Indian Bridal Artists 2024",
      bio: "Master of weightless HD Airbrush makeup that enhances real skin texture without heavy masking.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: "e3",
      name: "Anand Sharma",
      role: "Senior Texture & Keratin Artist",
      experience: "9+ Years Experience",
      specialties: ["Amazonian Hair Botox", "Formol-Free Keratin", "Curls Re-Sculpting"],
      awards: "Certified Global Keratin Master",
      bio: "Specializes in restructuring damaged & rebellious hair into mirror-like smooth silk.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=85&w=800"
    }
  ] as Stylist[],

  reviews: [
    {
      id: "r1",
      author: "Dr. Sunita Deshmukh",
      role: "Dermatologist • Chandrapur",
      rating: 5,
      date: "2 weeks ago",
      text: "Aura is unmatched. I was skeptical about salons in Chandrapur until I walked into Aura. The hygiene standards, shadowless lighting, and Olaplex Balayage quality rival top Mumbai salons. Absolute perfection.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=85&w=200",
      verified: true
    },
    {
      id: "r2",
      author: "Pooja & Rohan W.",
      role: "Bridal Client",
      rating: 5,
      date: "1 month ago",
      text: "Meera and her bridal team made my wedding day unforgettable! The HD airbrush makeup survived 14 hours of ceremony lighting without a single smudge. My hair remained weightless and glossy.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=200",
      verified: true
    },
    {
      id: "r3",
      author: "Amitabh K.",
      role: "Executive • Civil Lines",
      rating: 5,
      date: "3 weeks ago",
      text: "The complimentary pour-over espresso, Dyson pro haircut, and scalp massage experience make every rupee worth it. It feels like stepping into a 5-star hotel salon.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=85&w=200",
      verified: true
    }
  ],

  timeline: [
    {
      step: "01",
      title: "Royal Welcome & Refreshment",
      desc: "Private valet greeting, coat drop, and complimentary selection of fresh cardamon saffron masala chai, chilled rose brew, or cold-pressed juices."
    },
    {
      step: "02",
      title: "Microscopic Hair & Scalp Analysis",
      desc: "High-magnification microscopic scanner to analyze porosity, scalp sebum balance, and natural pigment undertones."
    },
    {
      step: "03",
      title: "Indian Master Stylist Consultation",
      desc: "Bespoke face-shape contouring and undertone match evaluation with your assigned Indian Master Director."
    },
    {
      step: "04",
      title: "Precision Hair, Scalp & Skin Ritual",
      desc: "Execution of your custom honey balayage, Ayurvedic Kansa champi, or 24K Kundan gold facial in our signature gold halo mirror stations."
    },
    {
      step: "05",
      title: "Dyson Couture Styling & Reveal",
      desc: "Sculptural Dyson Supersonic blowout or Airwrap waves, vanity lighting presentation, and portrait moment."
    },
    {
      step: "06",
      title: "Prescription Care & Maintenance Regimen",
      desc: "Personalized home maintenance guide and luxury hair elixirs to preserve your royal shine and color for months."
    }
  ],

  faq: [
    {
      q: "How far in advance should I book my appointment?",
      a: "For weekend sessions, hair color/balayage, or bridal consultations, we recommend booking 3 to 5 days in advance. VIP walk-ins are accommodated based on master stylist availability."
    },
    {
      q: "Are the hair colors and keratin treatments safe and ammonia-free?",
      a: "Yes. 100% of our hair color formulas are ammonia-free or low-ammonia enriched with essential oils. Our Keratin and Hair Botox treatments are 100% Formol-Free and safe for sensitive scalps."
    },
    {
      q: "Can I request a private room for facial, bridal, or hijab-friendly services?",
      a: "Yes. Aura features soundproof, private VIP suites specifically designed for ultimate modesty, deep relaxation, and bridal dressing."
    },
    {
      q: "Where is Aura located in Chandrapur?",
      a: "We are situated in Civil Lines at Bapat Nagar Square, right Aside SBI on Nagpur Road, Chandrapur, Maharashtra."
    }
  ]
};
