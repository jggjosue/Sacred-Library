
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
