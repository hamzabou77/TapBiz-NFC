import { ClientProfile, SiteSettings, Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-carte-noire',
    title: 'Carte NFC Simple Noire',
    description: 'Carte de visite connectée NFC ultra-élégante finition noir mat premium. Partagez l\'ensemble de vos coordonnées professionnelles, liens réseaux sociaux, WhatsApp et site web par simple contact sans application.',
    price: 150,
    category: 'Cartes',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true,
    features: [
      'Puce NFC haute sensibilité compatible iPhone et Android',
      'QR Code dynamique de secours au verso',
      'Profil digital modifiable 24/7 en ligne sans réimpression',
      'Bouton 1-clic "Enregistrer le Contact" (vCard direct)',
      'Finition noir mat anti-traces et étanche'
    ]
  },
  {
    id: 'prod-carte-blanche',
    title: 'Carte NFC Simple Blanche',
    description: 'Carte de visite connectée NFC épurée et moderne finition blanc satiné. Transmettez vos coordonnées en 1 seconde avec un simple tapotement sur n\'importe quel smartphone.',
    price: 150,
    category: 'Cartes',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true,
    features: [
      'Compatibilité universelle 100% smartphones (iOS & Android)',
      'Design blanc minimaliste haute durabilité',
      'QR Code dynamique haute définition',
      'Hébergement de profil illimité (Zéro abonnement)',
      'Livraison express 24/48h partout au Maroc'
    ]
  },
  {
    id: 'prod-google-review',
    title: 'Plaque / Carte Google Review',
    description: 'Multipliez vos avis 5 étoiles sur Google Maps en toute simplicité. Idéal pour comptoirs d\'accueil, restaurants, agences de location, cabinets et boutiques.',
    price: 150,
    category: 'Supports',
    badge: 'CLASSIQUE',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e557b63f?w=800&auto=format&fit=crop&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1556742049-0a67e557b63f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: true,
    features: [
      'Redirection directe vers votre page d\'avis Google',
      'Booste votre référencement local Google Maps',
      'Zéro friction : le client n\'a rien à chercher',
      'Puce NFC + QR Code intégré',
      'Socle acrylique résistant inclus'
    ]
  },
  {
    id: 'prod-social-card',
    title: 'Carte NFC WhatsApp Social',
    description: 'Connectez instantanément vos clients à votre messagerie WhatsApp Business ou vos réseaux sociaux en un seul contact sans avoir à dicter votre numéro.',
    price: 150,
    category: 'Plaques',
    badge: 'SOCIAL',
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=80'
    ],
    isPopular: false,
    features: [
      'Lancement direct de la discussion WhatsApp',
      'Message d\'accueil personnalisé automatique',
      'Compatible salons, stands et points de vente',
      'Couleur verte signature WhatsApp vibrante',
      'Paiement à la livraison au Maroc'
    ]
  }
];

export const FEATURED_SHOWCASE_PROFILES: ClientProfile[] = [
  {
    id: 'client-hamza',
    business_name: 'Touchbizz NFC',
    full_name: 'Hamza Boaly',
    job_title: 'Directeur Général & Fondateur',
    slug: 'hamza',
    themeColor: 'blue',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    cover_image: '',
    tagline: 'Cartes de Visite NFC & Profils Connectés',
    description: 'Partagez vos coordonnées professionnelles, réseaux sociaux et catalogue en un seul contact sans application.',
    bio: 'Pionnier des cartes de visite connectées NFC au Maroc.',
    city: 'Marrakech, Maroc',
    phone: '+212620799395',
    whatsapp: '+212620799395',
    email: 'boalyhicham@gmail.com',
    website: 'https://touchbizz.ma',
    instagram: 'https://instagram.com/touchbizz.ma',
    facebook: 'https://facebook.com/touchbizz',
    tiktok: 'https://tiktok.com/@touchbizz',
    linkedin: 'https://linkedin.com/company/touchbizz',
    google_maps_url: 'https://maps.google.com/?q=Avenue+Mohammed+V+Gueliz+Marrakech',
    google_review_url: 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    address: 'Avenue Mohammed V, Guéliz, Marrakech, Maroc',
    status: 'active',
    views_count: 520,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-02-20T12:00:00.000Z',
  },
  {
    id: 'client-1',
    business_name: 'Ahmed Car Rental',
    full_name: 'Ahmed Bennani',
    job_title: 'Responsable Agence',
    slug: 'ahmed-car-rental',
    themeColor: 'emerald',
    logo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80',
    tagline: 'Location de Voitures Premium & Économiques',
    description: 'Flotte moderne de véhicules, SUV et berlines avec livraison aéroport 24/7 à Marrakech et Casablanca.',
    city: 'Marrakech, Maroc',
    phone: '+212620799395',
    whatsapp: '+212620799395',
    email: 'contact@ahmedcarrental.ma',
    website: 'https://ahmedcarrental.ma',
    instagram: 'https://instagram.com/ahmedcarrental.ma',
    facebook: 'https://facebook.com/ahmedcarrentalmaroc',
    tiktok: 'https://tiktok.com/@ahmedcarrental',
    linkedin: 'https://linkedin.com/company/ahmedcarrental',
    google_maps_url: 'https://maps.google.com/?q=Avenue+Mohammed+VI+Gueliz+Marrakech',
    google_review_url: 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    address: 'Avenue Mohammed VI, Guéliz, Marrakech, Maroc',
    status: 'active',
    views_count: 342,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-02-10T14:30:00.000Z',
  },
  {
    id: 'client-3',
    business_name: 'Marrakech Luxury Cars',
    full_name: 'Yassine Alami',
    job_title: 'Directeur Commercial',
    slug: 'marrakech-cars',
    themeColor: 'purple',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000&auto=format&fit=crop&q=80',
    tagline: 'Supercars & Voitures de Luxe avec Chauffeur VIP',
    description: 'Location exclusive de Range Rover, Porsche et Mercedes Classe G pour événements VIP et mariages.',
    city: 'Casablanca, Maroc',
    phone: '+212620799395',
    whatsapp: '+212620799395',
    email: 'booking@marrakechluxurycars.ma',
    website: 'https://marrakechluxurycars.ma',
    instagram: 'https://instagram.com/marrakechluxurycars',
    facebook: 'https://facebook.com/marrakechluxurycars',
    google_maps_url: 'https://maps.google.com/?q=Boulevard+Al+Massira+Al+Khadra+Casablanca',
    google_review_url: 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    address: 'Boulevard Al Massira Al Khadra, Casablanca, Maroc',
    status: 'active',
    views_count: 275,
    created_at: '2025-02-01T15:00:00.000Z',
    updated_at: '2025-02-18T16:45:00.000Z',
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = FEATURED_SHOWCASE_PROFILES;

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'Touchbizz',
  tagline: 'Plateforme de Cartes de Visite NFC & Profils Connectés',
  contact_phone: '+212620799395',
  contact_whatsapp: '+212620799395',
  contact_email: 'boalyhicham@gmail.com',
  currency: 'MAD',
  custom_domain: 'https://touchbizz.ma',
  pricing_plans: [
    {
      id: 'plan-basic',
      name: 'Classique',
      price: 150,
      currency: 'MAD',
      billing_period: 'paiement unique',
      popular: false,
      description: 'Idéal pour professionnels indépendants et entrepreneurs souhaitant moderniser leur réseau.',
      features: [
        '1x Carte NFC personnalisée Noir ou Blanc',
        'Profil digital mobile responsive haute vitesse',
        'Lien URL unique personnalisé (ex. /votre-nom)',
        'QR Code dynamique de secours inclus',
        'Bouton 1-clic "Enregistrer le Contact" (vCard direct)',
        'Modifications illimitées 24/7 en ligne sans réimpression',
        'Support client par WhatsApp'
      ]
    },
    {
      id: 'plan-pro',
      name: 'Professionnel',
      price: 250,
      currency: 'MAD',
      billing_period: 'paiement unique',
      popular: true,
      description: 'Le choix privilégié des entreprises, commerces, agences et professionnels exigeants.',
      features: [
        '1x Carte NFC Premium avec logo haute précision',
        'Profil digital complet avec sélection de thème couleur',
        'Bouton direct Avis Google 5 Étoiles',
        'Navigation GPS Google Maps intégrée',
        'Bouton de discussion WhatsApp directe',
        'Tous vos liens réseaux sociaux (Instagram, LinkedIn...)',
        'Téléchargement du QR Code vectoriel HD',
        'Livraison express au Maroc'
      ]
    },
    {
      id: 'plan-business',
      name: 'Pack Entreprise (3 Cartes)',
      price: 390,
      currency: 'MAD',
      billing_period: 'pack 3 cartes',
      popular: false,
      description: 'Parfait pour équipes commerciales, cabinets, agences et points de vente.',
      features: [
        '3x Cartes NFC personnalisées avec vos logos',
        '3 Profils digitaux distincts et configurables',
        'Tableau de bord centralisé pour tout administrer',
        'Intégration Avis Google & Localisation Maps',
        'Couleurs de thèmes personnalisées par carte',
        'Hébergement à vie sans abonnement mensuel',
        'Assistance technique dédiée'
      ]
    }
  ]
};
