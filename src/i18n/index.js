import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: "Manipur Trails",
      tagline: "Explore the Jewel of India — Heritage, Culture & Eco-Tourism",
      nav: {
        home: "Home",
        packages: "Tour Packages",
        destinations: "Heritage Map",
        culture: "Culture Hub",
        aiPlanner: "AI Trip Planner",
        planVisit: "Plan Your Visit",
        agency: "Agency Portal",
        admin: "Admin",
      },
      hero: {
        title: "Discover the Sacred Beauty & Living Heritage of Manipur",
        subtitle: "Connect directly with verified local agencies. Experience floating islands, ancient forts, rich weaving traditions, and pristine eco-homestays.",
        searchPlaceholder: "Where in Manipur do you want to explore?",
        searchBtn: "Search Trips",
        planAiBtn: "Plan with AI",
      },
      roles: {
        traveler: "Traveler View",
        agency: "Agency View",
        admin: "Admin View",
      },
      search: {
        filterTitle: "Filter Experiences",
        priceRange: "Price Range (₹)",
        duration: "Duration",
        theme: "Trip Theme",
        ecoScore: "Eco-Score Rating",
        verifiedOnly: "Verified Agencies Only",
        sortLabel: "Sort By",
      },
      common: {
        ecoScore: "Eco Impact Score",
        verified: "Verified Local Agency",
        perPerson: "per traveler",
        bookNow: "Book Now",
        viewDetails: "View Package",
        enquire: "Enquire",
        days: "Days",
        reviews: "reviews",
      }
    }
  },
  hi: {
    translation: {
      brand: "मणिपुर ट्रिल्स",
      tagline: "भारत के रत्न की खोज करें — विरासत, संस्कृति और पर्यावरण-पर्यटन",
      nav: {
        home: "मुख्य पृष्ठ",
        packages: "टूर पैकेज",
        destinations: "विरासत मानचित्र",
        culture: "संस्कृति केंद्र",
        aiPlanner: "एआई ट्रिप प्लानर",
        planVisit: "यात्रा की योजना",
        agency: "एजेंसी पोर्टल",
        admin: "व्यवस्थापक",
      },
      hero: {
        title: "मणिपुर की पवित्र सुंदरता और जीवंत विरासत की खोज करें",
        subtitle: "सत्यापित स्थानीय एजेंसियों से सीधे जुड़ें। तैरते द्वीपों, प्राचीन किलों और समृद्ध संस्कृति का अनुभव करें।",
        searchPlaceholder: "आप मणिपुर में कहाँ घूमना चाहते हैं?",
        searchBtn: "खोजें",
        planAiBtn: "एआई के साथ योजना बनाएं",
      },
      roles: {
        traveler: "यात्री दृश्य",
        agency: "एजेंसी दृश्य",
        admin: "व्यवस्थापक दृश्य",
      },
      search: {
        filterTitle: "अनुभव फ़िल्टर करें",
        priceRange: "मूल्य सीमा (₹)",
        duration: "अवधि",
        theme: "थीम",
        ecoScore: "इको-स्कोर",
        verifiedOnly: "केवल सत्यापित एजेंसियां",
        sortLabel: "क्रमानुसाार",
      },
      common: {
        ecoScore: "इको प्रभाव स्कोर",
        verified: "सत्यापित स्थानीय एजेंसी",
        perPerson: "प्रति व्यक्ति",
        bookNow: "अभी बुक करें",
        viewDetails: "विवरण देखें",
        enquire: "पूछताछ करें",
        days: "दिन",
        reviews: "समीक्षाएं",
      }
    }
  },
  mni: {
    translation: {
      brand: "ꯃꯅꯤꯄꯨꯔ ꯇ꯭ꯔꯦꯜꯁ (Manipur Trails)",
      tagline: "ꯁꯅꯥꯂꯩꯕꯥꯛ ꯃꯅꯤꯄꯨꯔꯒꯤ ꯂꯃꯀꯣꯏ metric ꯑꯃꯁꯨꯡ ꯏꯀꯣ-ꯇꯨꯔꯤꯖꯃ",
      nav: {
        home: "ꯃꯌꯨꯝ (Home)",
        packages: "ꯇꯨꯔ ꯄꯦꯀꯦꯖ",
        destinations: "ꯂꯝꯀꯣꯏ ꯃꯦꯞ",
        culture: "ꯀꯜꯆꯔ ꯍꯕ",
        aiPlanner: "AI ꯇ꯭ꯔꯤꯞ ꯄ꯭ꯂꯥꯅꯔ",
        planVisit: "ꯂꯥꯛꯀꯗꯕꯒꯤ ꯊꯧꯔꯥꯡ",
        agency: "ꯑꯦꯖꯦꯟꯁꯤ",
        admin: "ꯑꯦꯗꯃꯤꯟ",
      },
      hero: {
        title: "ꯃꯅꯤꯄꯨꯔꯒꯤ ꯑꯉꯀꯄꯥ ꯃꯍꯧꯁꯥ ꯑꯃꯁꯨꯡ ꯂꯥꯏꯔꯦꯝꯕꯤꯒꯤ ꯂꯝꯁꯤꯡ",
        subtitle: "ꯃꯐꯝ ꯑꯗꯨꯒꯤ ꯑꯦꯖꯦꯟꯁꯤꯁꯤꯡꯒꯥ ꯁꯥꯛꯈꯉꯅꯕꯥ, ꯂꯣꯛꯇꯥꯛ ꯄꯥꯠ, ꯀꯪꯂꯥ ꯑꯃꯁꯨꯡ ꯁꯉꯥꯏ ꯁꯥꯕꯥ ꯎꯅꯕꯥ꯫",
        searchPlaceholder: "ꯃꯅꯤꯄꯨꯔꯒꯤ ꯀꯗꯥꯌꯗꯥ ꯆꯠꯅꯤꯡꯕꯒꯦ?",
        searchBtn: "ꯊꯤꯕꯥ",
        planAiBtn: "AI ꯒꯥ ꯂꯣꯏꯅꯅꯥ ꯄ꯭ꯂꯥꯟ ꯇꯧꯕꯥ",
      },
      roles: {
        traveler: "ꯇ꯭ꯔꯦꯚꯦꯂꯔ (Traveler)",
        agency: "ꯑꯦꯖꯦꯟꯁꯤ (Agency)",
        admin: "ꯑꯦꯗꯃꯤꯟ (Admin)",
      },
      search: {
        filterTitle: "ꯐꯤꯜꯇꯔ (Filter)",
        priceRange: "ꯃꯃꯜ (₹)",
        duration: "ꯅꯨꯃꯤꯠ (Days)",
        theme: "ꯊꯤꯝ (Theme)",
        ecoScore: "ꯏꯀꯣ-ꯁ꯭ꯀꯣꯔ",
        verifiedOnly: "ꯁꯥꯛꯈꯉꯂꯕꯥ ꯑꯦꯖꯦꯟꯁꯤ",
        sortLabel: "ꯃꯃꯜ ꯑꯃꯁꯨꯡ ꯔꯦꯇꯤꯡ",
      },
      common: {
        ecoScore: "ꯏꯀꯣ ꯁ꯭ꯀꯣꯔ",
        verified: "Verified Local Agency",
        perPerson: "per person",
        bookNow: "ꯕꯨꯛ ꯇꯧꯕꯥ (Book)",
        viewDetails: "ꯌꯦꯡꯕꯥ (View)",
        enquire: "ꯍꯪꯕꯥ (Enquire)",
        days: "Days",
        reviews: "reviews",
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
