
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.bible': 'BIBLE',
    'nav.plans': 'PLANS',
    'nav.devotions': 'DEVOTIONS',
    'nav.library': 'LIBRARY',
    'nav.dashboard': 'DASHBOARD',
    'nav.favorites': 'FAVORITES',
    'nav.language': 'Language',
    'nav.signIn': 'Sign In',
    'nav.signUp': 'Sign Up',
    'nav.theme': 'Toggle Theme',
    // Hero
    'hero.dailyWisdom': 'Daily Wisdom',
    'hero.verse': 'Be still, and know that I am God. (Psalm 46:10)',
    'hero.description': 'Step into the quiet halls of infinite wisdom. Explore, reflect, and grow in your spiritual journey.',
    'hero.cta': 'Start Exploring',
    // Explore
    'explore.title': 'Explore the Collection',
    'explore.description': 'Discover a rich tapestry of spiritual resources curated to nourish your soul and guide your journey.',
    'explore.scripture': 'Holy Scripture',
    'explore.scriptureDesc': 'Explore ancient wisdom and sacred texts.',
    'explore.devotionals': 'Daily Devotionals',
    'explore.devotionalsDesc': 'Inspiring reflections for your morning walk.',
    'explore.plans': 'Guided Plans',
    'explore.plansDesc': 'Structured paths for spiritual growth.',
    'explore.browse': 'Browse Collection',
    // Journal
    'journal.title': 'Your Journal',
    'journal.subtitle': 'Capture your thoughts, prayers, and reflections.',
    'journal.placeholder': 'Write your reflection here...',
    'journal.private': 'Your entries are private and saved to your collection.',
    'journal.save': 'Save Entry',
    'journal.defaultEntry': 'In this moment of stillness, I reflect on the peace that surpasses all understanding. The promise of being still and trusting in His wisdom gives me strength to face the day with a grateful and hopeful heart.',
    // Inspiration Carousel
    'inspiration.title': 'Moments of Inspiration',
    'inspiration.subtitle': 'A curated gallery of spiritual reflections to guide your journey through beauty and truth.',
    'inspiration.item1.title': 'Eternal Peace',
    'inspiration.item1.desc': 'Finding tranquility in the vastness of the heavens.',
    'inspiration.item2.title': 'New Beginnings',
    'inspiration.item2.desc': 'Every dawn brings a fresh opportunity for grace.',
    'inspiration.item3.title': 'Steadfast Faith',
    'inspiration.item3.desc': 'Remaining rooted even when the seasons change.',
    'inspiration.item4.title': 'Sacred Light',
    'inspiration.item4.desc': 'Letting the light of truth illuminate your path.',
    'inspiration.item5.title': 'Abundant Joy',
    'inspiration.item5.desc': 'Celebrating the beauty in every small flower.',
    'inspiration.item6.title': 'Reflective Stillness',
    'inspiration.item6.desc': 'Seeing clearly when the heart is quiet.',
    'inspiration.item7.title': 'Unending Hope',
    'inspiration.item7.desc': 'Walking towards a future filled with promise.',
    'inspiration.item8.title': 'Inner Strength',
    'inspiration.item8.desc': 'A single flame can conquer any darkness.',
    'inspiration.item9.title': 'Pure Grace',
    'inspiration.item9.desc': 'The gentle touch of peace in a winter world.',
    'inspiration.item10.title': 'Spiritual Freedom',
    'inspiration.item10.desc': 'Rising above the noise to find higher perspectives.',
    'inspiration.item11.title': 'Constant Flow',
    'inspiration.item11.desc': 'The steady movement of divine love in our lives.',
    'inspiration.item12.title': 'Word of Life',
    'inspiration.item12.desc': 'Finding comfort and wisdom in sacred spaces.',
    'inspiration.item13.title': 'Faithful Promise',
    'inspiration.item13.desc': 'A reminder of the beauty after the storm.',
    'inspiration.item14.title': 'Strong Foundations',
    'inspiration.item14.desc': 'Building a life on the bridges of the past.',
    'inspiration.item15.title': 'Guiding Grace',
    'inspiration.item15.desc': 'A constant beacon in the shifting tides of life.',
    // Community
    'community.title': 'Community Circles',
    'community.description': 'Our shared spaces for prayer, discussion, and fellowship are currently being prepared. Join our waitlist to be the first to know when we open our doors.',
    'community.placeholder': 'Enter your email',
    'community.notify': 'Notify Me',
    // Personalization
    'personalization.title': 'Personalize Your Experience',
    'personalization.description': 'Select your interests to help us recommend the best content for you.',
    'personalization.growth': 'Spiritual Growth',
    'personalization.encouragement': 'Daily Encouragement',
    'personalization.bible': 'Bible Study',
    'personalization.community': 'Community',
    'personalization.service': 'Service & Missions',
    'personalization.worship': 'Worship',
    // Discover
    'discover.title': 'Discover Your Path',
    'discover.description': 'Your sanctuary for reflection. Begin a journey of structured growth, daily inspiration, and thoughtful devotion.',
    'discover.verseTitle': 'Verse of the Day',
    'discover.verseDesc': 'Start your day with inspiration. A carefully selected passage to guide your morning thoughts.',
    'discover.plansTitle': 'Reading Plans',
    'discover.plansDesc': 'Follow structured paths through Scripture. Tailored reading guides for deeper understanding.',
    // Plans Page
    'plans.title': 'Reading Plans',
    'plans.description': 'Structure your spiritual journey with guided readings.',
    'plans.myPlans': 'My Plans',
    'plans.active': 'ACTIVE',
    'plans.dayOf': 'Day',
    'plans.of': 'of',
    'plans.left': 'Days Left',
    'plans.completed': 'Completed',
    'plans.continue': 'Continue',
    'plans.recommended': 'Recommended For You',
    'plans.discover': 'Discover Plans',
    'plans.searchPlaceholder': 'Search by topic, book, or author',
    'plans.popular': 'Popular',
    'plans.new': 'New',
    'plans.short': 'Short Plans',
    'plans.browseTopic': 'Browse By Topic',
    // New Reading Plans
    'plans.nt90.title': 'New Testament in 90 Days',
    'plans.nt90.desc': 'A complete journey through the New Testament in three months.',
    'plans.proverbs.title': 'Proverbs: Daily Wisdom',
    'plans.proverbs.desc': 'A chapter a day to gain practical wisdom for your daily life.',
    'plans.psalms.title': 'Psalms: Comfort & Praise',
    'plans.psalms.desc': 'Find peace and joy in the beautiful songs and prayers of David.',
    'plans.jesus.title': 'The Life of Jesus',
    'plans.jesus.desc': 'Follow the footsteps of the Savior through the four Gospels.',
    'plans.anxiety.title': 'Overcoming Anxiety',
    'plans.anxiety.desc': 'Biblical truths to find peace in times of worry.',
    // Devotions Page
    'devotions.dailyLabel': 'DAILY DEVOTIONAL',
    'devotions.byLabel': 'by',
    'devotions.saveToLibrary': 'Save to Library',
    'devotions.share': 'Share',
    'devotions.communityReflections': 'Community Reflections',
    'devotions.postReflection': 'Post Reflection',
    'devotions.loadMore': 'Load More Reflections',
    'devotions.narratedBy': 'Narrated by',
    'devotions.nowPlaying': 'Now Playing',
    // Library Page
    'library.title': 'Library',
    'library.bibleChapters': 'Bible Chapters',
    'library.devotionalsTab': 'Devotionals',
    'library.sermonsTab': 'Sermons',
    'library.recentlyPlayed': 'Recently Played',
    'library.readNow': 'Read Now',
    'library.searchPlaceholder': 'Search the library...',
    'library.nowPlaying': 'Now Playing',
    // Studio
    'studio.publish': 'Publish',
    'studio.export': 'Export',
    'studio.share': 'Share',
    'studio.studio': 'Studio',
    'studio.canvas': 'Canvas',
    'studio.scripture': 'Scripture',
    'studio.typography': 'Typography',
    'studio.effects': 'Effects',
    'studio.help': 'Help',
    'studio.feedback': 'Feedback',
    'studio.profile': 'Profile',
    'studio.properties': 'Properties',
    'studio.refine': 'Refine details',
    'studio.filters': 'Filters',
    'studio.shadows': 'Shadows',
    'studio.outlines': 'Outlines',
    'studio.blur': 'Blur',
    'studio.offsetY': 'Offset Y',
    'studio.opacity': 'Opacity',
    'studio.color': 'Color',
    'studio.textShadow': 'Text Shadow',
    'studio.textOutline': 'Text Outline',
    'studio.enableOutline': 'Enable outline to adjust settings.',
    // Profile
    'profile.title': 'Your Journey',
    'profile.subtitle': 'Track your spiritual growth and activity.',
    'profile.memberSince': 'Sacred Library Member since',
    'profile.editProfile': 'Edit Profile',
    'profile.signOut': 'Sign Out',
    'profile.personalInfo': 'Personal Information',
    'profile.downloads': 'Downloads',
    'profile.notifications': 'Notifications',
    'profile.security': 'Security & Privacy',
    'profile.generalSettings': 'General Settings',
    'profile.savedContent': 'Saved Content',
    'profile.savedDesc': 'Verses and devotionals in your library.',
    'profile.readingHistory': 'Reading History',
    'profile.historyDesc': 'Chapters and devotionals completed.',
    'profile.recentActivity': 'Recent Activity',
    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.policy': 'Editorial Policy',
    'footer.support': 'Support',
    'footer.copy': '© 2024 Sacred Library. A space for quiet reflection.',
  },
  es: {
    // Navbar
    'nav.bible': 'BIBLIA',
    'nav.plans': 'PLANES',
    'nav.devotions': 'DEVOCIONALES',
    'nav.library': 'BIBLIOTECA',
    'nav.dashboard': 'DASHBOARD',
    'nav.favorites': 'FAVORITOS',
    'nav.language': 'Idioma',
    'nav.signIn': 'Iniciar Sesión',
    'nav.signUp': 'Registrarse',
    'nav.theme': 'Cambiar Tema',
    // Hero
    'hero.dailyWisdom': 'Sabiduría Diaria',
    'hero.verse': 'Estad quietos, y conoced que yo soy Dios. (Salmo 46:10)',
    'hero.description': 'Entra en los tranquilos pasillos de la sabiduría infinita. Explora, reflexiona y crece en tu viaje espiritual.',
    'hero.cta': 'Empezar a Explorar',
    // Explore
    'explore.title': 'Explora la Colección',
    'explore.description': 'Descubre un rico tapiz de recursos espirituales seleccionados para nutrir tu alma y guiar tu camino.',
    'explore.scripture': 'Sagradas Escrituras',
    'explore.scriptureDesc': 'Explora la sabiduría antigua y los textos sagrados.',
    'explore.devotionals': 'Devocionales Diarios',
    'explore.devotionalsDesc': 'Reflexiones inspiradoras para tu caminata matutina.',
    'explore.plans': 'Planes Guiados',
    'explore.plansDesc': 'Caminos estructurados para el crecimiento espiritual.',
    'explore.browse': 'Explorar Colección',
    // Journal
    'journal.title': 'Tu Diario',
    'journal.subtitle': 'Captura tus pensamientos, oraciones y reflexiones.',
    'journal.placeholder': 'Escribe tu reflexión aquí...',
    'journal.private': 'Tus entradas son privadas y se guardan en tu colección.',
    'journal.save': 'Guardar Entrada',
    'journal.defaultEntry': 'En este momento de quietud, reflexiono sobre la paz que sobrepasa todo entendimiento. La promesa de estar tranquilos y confiar en Su sabiduría me da fuerzas para afrontar el día con un corazón agradecido y lleno de esperanza.',
    // Inspiration Carousel
    'inspiration.title': 'Momentos de Inspiración',
    'inspiration.subtitle': 'Una galería seleccionada de reflexiones espirituales para guiar tu viaje a través de la belleza y la verdad.',
    'inspiration.item1.title': 'Paz Eterna',
    'inspiration.item1.desc': 'Encontrando la tranquilidad en la inmensidad de los cielos.',
    'inspiration.item2.title': 'Nuevos Comienzos',
    'inspiration.item2.desc': 'Cada amanecer trae una nueva oportunidad para la gracia.',
    'inspiration.item3.title': 'Fe Inquebrantable',
    'inspiration.item3.desc': 'Permaneciendo enraizado incluso cuando las estaciones cambian.',
    'inspiration.item4.title': 'Luz Sagrada',
    'inspiration.item4.desc': 'Dejando que la luz de la verdad ilumine tu camino.',
    'inspiration.item5.title': 'Alegría Abundante',
    'inspiration.item5.desc': 'Celebrando la belleza en cada pequeña flor.',
    'inspiration.item6.title': 'Quietud Reflexiva',
    'inspiration.item6.desc': 'Viendo con claridad cuando el corazón está tranquilo.',
    'inspiration.item7.title': 'Esperanza Infinita',
    'inspiration.item7.desc': 'Caminando hacia un futuro lleno de promesas.',
    'inspiration.item8.title': 'Fuerza Interior',
    'inspiration.item8.desc': 'Una sola llama puede conquistar cualquier oscuridad.',
    'inspiration.item9.title': 'Gracia Pura',
    'inspiration.item9.desc': 'El toque suave de la paz en un mundo invernal.',
    'inspiration.item10.title': 'Libertad Espiritual',
    'inspiration.item10.desc': 'Elevándose sobre el ruido para encontrar perspectivas más altas.',
    'inspiration.item11.title': 'Flujo Constante',
    'inspiration.item11.desc': 'El movimiento constante del amor divino en nuestras vidas.',
    'inspiration.item12.title': 'Palabra de Vida',
    'inspiration.item12.desc': 'Encontrando consuelo y sabiduría en espacios sagrados.',
    'inspiration.item13.title': 'Promesa Fiel',
    'inspiration.item13.desc': 'Un recordatorio de la belleza después de la tormenta.',
    'inspiration.item14.title': 'Cimientos Fuertes',
    'inspiration.item14.desc': 'Construyendo una vida sobre los puentes del pasado.',
    'inspiration.item15.title': 'Gracia Guía',
    'inspiration.item15.desc': 'Un faro constante en las mareas cambiantes de la vida.',
    // Community
    'community.title': 'Círculos Comunitarios',
    'community.description': 'Nuestros espacios compartidos para la oración, el debate y el compañerismo se están preparando actualmente. Únete a nuestra lista de espera para ser el primero en saber cuándo abrimos nuestras puertas.',
    'community.placeholder': 'Introduce tu correo',
    'community.notify': 'Avísame',
    // Personalization
    'personalization.title': 'Personaliza tu Experiencia',
    'personalization.description': 'Selecciona tus intereses para ayudarnos a recomendarte el mejor contenido.',
    'personalization.growth': 'Crecimiento Espiritual',
    'personalization.encouragement': 'Aliento Diario',
    'personalization.bible': 'Estudio Bíblico',
    'personalization.community': 'Comunidad',
    'personalization.service': 'Servicio y Misiones',
    'personalization.worship': 'Adoración',
    // Discover
    'discover.title': 'Descubre tu Camino',
    'discover.description': 'Tu santuario para la reflexión. Comienza un viaje de crecimiento estructurado, inspiración diaria y devoción reflexiva.',
    'discover.verseTitle': 'Versículo del Día',
    'discover.verseDesc': 'Comienza tu día con inspiración. Un pasaje cuidadosamente seleccionado para guiar tus pensamientos matutinos.',
    'discover.plansTitle': 'Planes de Lectura',
    'discover.plansDesc': 'Sigue caminos estructurados a través de las Escrituras. Guías de lectura adaptadas para una comprensión más profunda.',
    // Plans Page
    'plans.title': 'Planes de Lectura',
    'plans.description': 'Estructura tu viaje espiritual con lecturas guiadas.',
    'plans.myPlans': 'Mis Planes',
    'plans.active': 'ACTIVO',
    'plans.dayOf': 'Día',
    'plans.of': 'de',
    'plans.left': 'Días Restantes',
    'plans.completed': 'Completado',
    'plans.continue': 'Continuar',
    'plans.recommended': 'Recomendado Para Ti',
    'plans.discover': 'Descubrir Planes',
    'plans.searchPlaceholder': 'Buscar por tema, libro o autor',
    'plans.popular': 'Popular',
    'plans.new': 'Nuevo',
    'plans.short': 'Planes Cortos',
    'plans.browseTopic': 'Explorar por Tema',
    // New Reading Plans
    'plans.nt90.title': 'Nuevo Testamento en 90 días',
    'plans.nt90.desc': 'Un viaje completo a través del Nuevo Testamento en tres meses.',
    'plans.proverbs.title': 'Proverbios: Sabiduría Diaria',
    'plans.proverbs.desc': 'Un capítulo al día para ganar sabiduría práctica para tu vida diaria.',
    'plans.psalms.title': 'Salmos: Consuelo y Alabanza',
    'plans.psalms.desc': 'Encuentra paz y gozo en los hermosos cantos y oraciones de David.',
    'plans.jesus.title': 'La Vida de Jesús',
    'plans.jesus.desc': 'Sigue los pasos del Salvador a través de los cuatro Evangelios.',
    'plans.anxiety.title': 'Venciendo la Ansiedad',
    'plans.anxiety.desc': 'Verdades bíblicas para encontrar paz en tiempos de preocupación.',
    // Devotions Page
    'devotions.dailyLabel': 'DEVOCIONAL DIARIO',
    'devotions.byLabel': 'por',
    'devotions.saveToLibrary': 'Guardar en Biblioteca',
    'devotions.share': 'Compartir',
    'devotions.communityReflections': 'Reflexiones de la Comunidad',
    'devotions.postReflection': 'Publicar Reflexión',
    'devotions.loadMore': 'Cargar Más Reflexiones',
    'devotions.narratedBy': 'Narrado por',
    'devotions.nowPlaying': 'Reproduciendo',
    // Library Page
    'library.title': 'Biblioteca',
    'library.bibleChapters': 'Capítulos Bíblicos',
    'library.devotionalsTab': 'Devocionales',
    'library.sermonsTab': 'Sermones',
    'library.recentlyPlayed': 'Reproducido Recientemente',
    'library.readNow': 'Leer Ahora',
    'library.searchPlaceholder': 'Buscar en la biblioteca...',
    'library.nowPlaying': 'Reproduciendo',
    // Studio
    'studio.publish': 'Publicar',
    'studio.export': 'Exportar',
    'studio.share': 'Compartir',
    'studio.studio': 'Estudio',
    'studio.canvas': 'Lienzo',
    'studio.scripture': 'Escritura',
    'studio.typography': 'Tipografía',
    'studio.effects': 'Efectos',
    'studio.help': 'Ayuda',
    'studio.feedback': 'Comentarios',
    'studio.profile': 'Perfil',
    'studio.properties': 'Propiedades',
    'studio.refine': 'Refinar detalles',
    'studio.filters': 'Filtros',
    'studio.shadows': 'Sombras',
    'studio.outlines': 'Contornos',
    'studio.blur': 'Desenfoque',
    'studio.offsetY': 'Desplazamiento Y',
    'studio.opacity': 'Opacidad',
    'studio.color': 'Color',
    'studio.textShadow': 'Sombra de Texto',
    'studio.textOutline': 'Contorno de Texto',
    'studio.enableOutline': 'Habilita el contorno para ajustar la configuración.',
    // Profile
    'profile.title': 'Tu Viaje',
    'profile.subtitle': 'Sigue tu crecimiento espiritual y actividad.',
    'profile.memberSince': 'Miembro de Sacred Library desde',
    'profile.editProfile': 'Editar Perfil',
    'profile.signOut': 'Cerrar Sesión',
    'profile.personalInfo': 'Información Personal',
    'profile.downloads': 'Descargas',
    'profile.notifications': 'Notificaciones',
    'profile.security': 'Seguridad y Privacidad',
    'profile.generalSettings': 'Configuración General',
    'profile.savedContent': 'Contenido Guardado',
    'profile.savedDesc': 'Versículos y devocionales en tu biblioteca.',
    'profile.readingHistory': 'Historial de Lectura',
    'profile.historyDesc': 'Capítulos y devocionales completados.',
    'profile.recentActivity': 'Actividad Reciente',
    // Footer
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.policy': 'Política Editorial',
    'footer.support': 'Soporte',
    'footer.copy': '© 2024 Sacred Library. Un espacio para la reflexión silenciosa.',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    
    if (savedLang === 'en' || savedLang === 'es') {
      setLangState(savedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') {
        setLangState('es');
      } else {
        setLangState('en');
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
