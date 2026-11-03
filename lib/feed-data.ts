export type FeedTab = "aula" | "mateo";

export type MediaItem = {
  src: string;
  alt: string;
  overlay?: string;
  overlayIcon?: string;
  overlayType?: "pill" | "gradient";
  badge?: string;
};

export type FeedComment = {
  id: string;
  author: string;
  time: string;
  body: string;
  avatarIcon: string;
  tone: "family" | "teacher" | "other";
  badge?: string;
  nested?: boolean;
  fresh?: boolean;
};

export type ActivityPost = {
  kind: "activity";
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
    roleTone: "primary" | "secondary";
  };
  time: string;
  badges: {
    icon?: string;
    text: string;
    strong?: string;
    tone: "primary" | "secondary" | "neutral";
  }[];
  title: string;
  body: string;
  media: MediaItem[];
  gallerySize: "tall" | "short";
  tags: string[];
  reactions: {
    emojis: string[];
    summary: string;
    summaryUnliked?: string;
    comments: number;
    saves: number;
    liked: boolean;
    saved: boolean;
  };
  comments?: FeedComment[];
  interactive: boolean;
};

export type MealPost = {
  kind: "meal";
  id: string;
  icon: string;
  time: string;
  title: string;
  subtitle: string;
  status: string;
  dish: { name: string; note: string; image: string };
};

export type WorkshopPost = {
  kind: "workshop";
  id: string;
  icon: string;
  time: string;
  title: string;
  subtitle: string;
  body: string;
  albumLabel: string;
  statusIcon?: string;
};

export type FeedEntry = ActivityPost | MealPost | WorkshopPost;

export type FeedData = {
  school: { name: string; room: string };
  viewer: {
    name: string;
    role: string;
    child: string;
    age: string;
    stage: string;
    avatar: string;
  };
  tabs: { id: FeedTab; label: string; icon: string; dot?: boolean }[];
  navigation: {
    id: string;
    label: string;
    shortLabel?: string;
    icon: string;
  }[];
  entries: FeedEntry[];
};

export const feedData: FeedData = {
  school: { name: "Pequeños Pasos", room: "Sala Rayito de Sol" },
  viewer: {
    name: "Mateo González",
    role: "Familia Tutor",
    child: "Mateo",
    age: "14 m",
    stage: "Lactante Mayor",
    avatar: "/images/feed/mateo-avatar.jpg",
  },
  tabs: [
    { id: "aula", label: "Actividades de Sala", icon: "groups" },
    { id: "mateo", label: "Momentos de Mateo", icon: "face_2", dot: true },
  ],
  navigation: [
    {
      id: "feed",
      label: "1. Feed",
      shortLabel: "Feed",
      icon: "dynamic_feed",
    },
    {
      id: "resumen-del-dia",
      label: "2. Resumen del Día",
      shortLabel: "Resumen",
      icon: "calendar_today",
    },
    {
      id: "mi-cuenta",
      label: "3. Mi Cuenta",
      shortLabel: "Mi Cuenta",
      icon: "account_circle",
    },
    {
      id: "notificaciones",
      label: "Avisos y Alertas",
      icon: "notifications",
    },
  ],
  entries: [
    {
      kind: "activity",
      id: "pintura-vegetal",
      author: {
        name: "Mtra. Claudia Moreno",
        role: "Educadora Titular",
        avatar: "/images/feed/claudia-avatar.jpg",
        verified: true,
        roleTone: "primary",
      },
      time: "Hoy, 11:15 AM",
      badges: [
        {
          icon: "award_star",
          text: "Protagonista de hoy: Mateo G. y compañeros",
          strong: "Mateo G.",
          tone: "secondary",
        },
        {
          text: "🎨 Sensorial & Psicomotricidad",
          tone: "neutral",
        },
      ],
      title:
        "Descubrimiento sensorial con pintura vegetal comestible y texturas suaves 🎨👶",
      body:
        "Hoy Mateo y sus amiguitos experimentaron con masas suaves y tintas naturales elaboradas con betabel y espinaca. Mateo demostró gran curiosidad táctil, sonrió espontáneamente al sentir la textura fresca entre sus deditos y compartió juguetes con Sofía con muchísima dulzura.",
      media: [
        {
          src: "/images/feed/paint-main.jpg",
          alt:
            "Authentic joyful candid photo of 14 month old baby Mateo sitting happily on safe foam play mat with hands covered in safe natural red beet edible paint, smiling brightly at camera, natural daylight in cozy nursery, Serene Hearth aesthetic, mint and amber accents",
          overlay: "Mateo descubriendo colores",
          overlayIcon: "photo_camera",
          overlayType: "pill",
        },
        {
          src: "/images/feed/sensory-dough.jpg",
          alt:
            "Two adorable toddlers in daycare playroom sharing soft colorful sensory dough, gentle warm colors, happy focused expressions, clean modern Scandinavian nursery decor",
          overlay: "Con Sofía y Leo",
          overlayType: "gradient",
        },
        {
          src: "/images/feed/spinach-paint.jpg",
          alt:
            "Sweet detail shot of tiny baby hands pressing into light green spinach edible paint on large white paper sheet, tactile learning moment, warm safe atmosphere",
          badge: "+3 fotos",
        },
      ],
      gallerySize: "tall",
      tags: ["#MotricidadFina", "#ExploraciónTáctil", "#ConvivenciaTemprana"],
      reactions: {
        emojis: ["❤️", "⭐"],
        summary: "Tú y 13 familias más",
        summaryUnliked: "13 familias de la sala",
        comments: 6,
        saves: 4,
        liked: true,
        saved: false,
      },
      comments: [
        {
          id: "comentario-papa",
          author: "Tú (Familia de Mateo)",
          time: "Hace 45 min",
          body:
            "¡Qué hermosa foto! En casa le encanta tocar texturas suaves. Muchas gracias Claudia por estimularlo con tanto amor y paciencia ❤️👶",
          avatarIcon: "person",
          tone: "family",
        },
        {
          id: "comentario-claudia",
          author: "Mtra. Claudia Moreno",
          time: "",
          body:
            "¡Es un amor! Mateo disfrutó muchísimo la textura tibia y nos alegró el mediodía a todos 🥰✨",
          avatarIcon: "school",
          tone: "teacher",
          badge: "Educadora",
          nested: true,
        },
        {
          id: "comentario-sofia",
          author: "Mamá de Sofía V.",
          time: "Hace 20 min",
          body:
            "¡Sofí llegó feliz contando de las pinturas de colores! Se ven preciosos todos juntos compartiendo 👏🎨",
          avatarIcon: "family_restroom",
          tone: "other",
        },
      ],
      interactive: true,
    },
    {
      kind: "meal",
      id: "colacion-manana",
      icon: "restaurant",
      time: "10:00 AM",
      title: "Colación de la Mañana",
      subtitle: "Menú nutritivo supervisado",
      status: "100% ingerido",
      dish: {
        name: "Papaya picada & Avena suave",
        note: "Mateo comió con mucho apetito e hidratación completa.",
        image: "/images/feed/papaya-snack.jpg",
      },
    },
    {
      kind: "activity",
      id: "musica-sonajas",
      author: {
        name: "Mtra. Claudia & Lic. Andrea",
        role: "Estimulación Musical",
        avatar: "/images/feed/claudia-avatar.jpg",
        verified: true,
        roleTone: "secondary",
      },
      time: "Hoy, 09:30 AM",
      badges: [
        {
          icon: "music_note",
          text: "Ritmo & Melodía Infantil",
          tone: "primary",
        },
        {
          text: "🪘 Coordinación Auditiva",
          tone: "neutral",
        },
      ],
      title: "Música y ritmo con sonajas de madera y cuentos cantados 🎶🥁",
      body:
        "Iniciamos la mañana con círculos de percusión suave. Mateo siguió el compás con su maraca artesanal de madera, aplaudió contento con la canción 'El barquito chiquitito' e imitó los sonidos de los pajaritos junto a sus compañeros.",
      media: [
        {
          src: "/images/feed/sensory-dough.jpg",
          alt:
            "Toddlers sitting in a circle in cozy early childhood center playing with natural wooden rattles and soft drums, natural bright daylight",
          overlay: "Círculo rítmico matutino",
          overlayIcon: "graphic_eq",
          overlayType: "pill",
        },
        {
          src: "/images/feed/paint-main.jpg",
          alt:
            "Toddler holding wooden musical instrument, joyful expression, clean safe play environment",
          overlay: "Mateo con sonaja",
          overlayType: "gradient",
        },
        {
          src: "/images/feed/spinach-paint.jpg",
          alt:
            "Sensory baby hands holding organic wooden toys on educational rug",
          badge: "+2 fotos",
        },
      ],
      gallerySize: "short",
      tags: ["#LenguajeMusical", "#AtenciónAuditiva", "#VínculoGrupal"],
      reactions: {
        emojis: ["❤️", "🎶"],
        summary: "11 familias reaccionaron",
        comments: 4,
        saves: 3,
        liked: false,
        saved: false,
      },
      interactive: false,
    },
    {
      kind: "workshop",
      id: "taller-exploradores",
      icon: "potted_plant",
      time: "Ayer, 4:00 PM",
      title: "Taller de Pequeños Exploradores",
      subtitle: "Jardín Sensorial • Sala Rayito de Sol",
      body:
        "Mateo exploró hojas de menta fresca y lavanda. Disfrutó tocar la tierra fértil con sus manitas y regar las plantitas del huerto pedagógico junto a la maestra.",
      albumLabel: "Ver álbum completo (8 fotos)",
      statusIcon: "check_circle",
    },
  ],
};
