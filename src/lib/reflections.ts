export type Reflection = {
  id: number;
  name: string;
  tradition: string;
  avatar: string;
  time: { en: string; es: string };
  content: { en: string; es: string };
  likes: number;
};

export const REFLECTIONS: Reflection[] = [
  {
    id: 1,
    name: "Pastor José Olayo",
    tradition: "ICIAR Nayarit",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    time: { en: "1 hour ago", es: "hace 1 hora" },
    content: {
      en: "“Be still, and know that I am God.” Today, pause before you plan. Trust that the One who holds the universe also holds your day. Stillness is not waste — it is worship.",
      es: "«Estad quietos, y conoced que yo soy Dios» (Salmo 46:10). Hoy, detente antes de planear. Confía en que quien sostiene el universo también sostiene tu día. El silencio no es pérdida: es adoración.",
    },
    likes: 42,
  },
  {
    id: 2,
    name: "Charles H. Spurgeon",
    tradition: "Baptist · London (1834–1892)",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
    time: { en: "3 hours ago", es: "hace 3 horas" },
    content: {
      en: "“The less of self and the more of Jesus — this is the measure of every believer's growth.” Spurgeon reminds us that sanctification is not about adding more effort, but about emptying ourselves so Christ can fill.",
      es: "«Menos de mí y más de Jesús — esa es la medida del crecimiento de todo creyente». Spurgeon nos recuerda que la santificación no es añadir más esfuerzo, sino vaciarnos para que Cristo llene.",
    },
    likes: 28,
  },
  {
    id: 3,
    name: "John Wesley",
    tradition: "Methodist · Oxford (1703–1791)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    time: { en: "5 hours ago", es: "hace 5 horas" },
    content: {
      en: "“Do all the good you can, by all the means you can, in all the ways you can, in all the places you can, to all the people you can, as long as ever you can.” Holiness without action is a contradiction.",
      es: "«Haz todo el bien que puedas, por todos los medios que puedas, de todas las maneras que puedas, en todos los lugares que puedas, a todas las personas que puedas, durante todo el tiempo que puedas». La santidad sin acción es una contradicción.",
    },
    likes: 67,
  },
  {
    id: 4,
    name: "A. W. Tozer",
    tradition: "Alliance Pastor & Evangelical",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
    time: { en: "6 hours ago", es: "hace 6 horas" },
    content: {
      en: "“What comes into our minds when we think about God is the most important thing about us.” Our theology shapes our worship, and our worship shapes our life.",
      es: "«Lo que viene a nuestra mente cuando pensamos en Dios es lo más importante de nosotros». Nuestra teología da forma a nuestra adoración, y nuestra adoración da forma a nuestra vida.",
    },
    likes: 35,
  },
  {
    id: 5,
    name: "María Fernanda C.",
    tradition: "ICIAR · Comunidad de oración",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    time: { en: "8 hours ago", es: "hace 8 horas" },
    content: {
      en: "This week I memorized Proverbs 3:5-6. “Trust in the Lord with all your heart, and do not lean on your own understanding.” Every time anxiety knocks, I repeat it aloud. It truly works.",
      es: "Esta semana memoricé Proverbios 3:5-6. «Fíate del Señor con todo tu corazón, y no te apoyes en tu propia prudencia». Cada vez que la ansiedad toca la puerta, lo repito en voz alta. Verdaderamente funciona.",
    },
    likes: 19,
  },
  {
    id: 6,
    name: "Billy Graham",
    tradition: "Evangelical · Southern Baptist",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    time: { en: "10 hours ago", es: "hace 10 horas" },
    content: {
      en: "“My home is in heaven. I'm just traveling through this world.” Never forget that your true citizenship is in another Kingdom — walk today like a pilgrim with a destination.",
      es: "«Mi hogar está en el cielo. Solo estoy de paso por este mundo». No olvides que tu verdadera ciudadanía está en otro Reino: camina hoy como un peregrino con un destino.",
    },
    likes: 54,
  },
  {
    id: 7,
    name: "Dietrich Bonhoeffer",
    tradition: "Lutheran · Germany (1906–1945)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    time: { en: "12 hours ago", es: "hace 12 horas" },
    content: {
      en: "“Cheap grace is the deadly enemy of our Church. Costly grace is the treasure hidden in the field.” True grace always calls us to follow, and following costs everything — yet it is worth everything.",
      es: "«La gracia barata es la enemiga mortal de nuestra Iglesia. La gracia costosa es el tesoro escondido en el campo». La verdadera gracia siempre nos llama a seguir, y seguir cuesta todo — pero vale todo.",
    },
    likes: 41,
  },
  {
    id: 8,
    name: "Rick Warren",
    tradition: "Baptist · Saddleback Church",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    time: { en: "14 hours ago", es: "hace 14 horas" },
    content: {
      en: "“It's not about you.” The first line of The Purpose-Driven Life reframes everything. Life is a gift, God is the author, and purpose is found when we surrender the pen.",
      es: "«No se trata de ti». La primera línea de Una Vida con Propósito reenmarca todo. La vida es un regalo, Dios es el autor, y el propósito se encuentra cuando entregamos la pluma.",
    },
    likes: 31,
  },
  {
    id: 9,
    name: "C. S. Lewis",
    tradition: "Anglican · Oxford (1898–1963)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    time: { en: "16 hours ago", es: "hace 16 horas" },
    content: {
      en: "“Put first things first and we get second things thrown in. Put second things first and we lose both first and second things.” Seek His kingdom, and everything else finds its place.",
      es: "«Pon primero lo primero y recibirás lo segundo como bonificación. Pon primero lo segundo y perderás ambas cosas». Busca su Reino, y todo lo demás encuentra su lugar.",
    },
    likes: 38,
  },
  {
    id: 10,
    name: "John Piper",
    tradition: "Baptist · Desiring God",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop",
    time: { en: "18 hours ago", es: "hace 18 horas" },
    content: {
      en: "“God is most glorified in us when we are most satisfied in Him.” Joy is not optional for the Christian — it is the very fuel of worship.",
      es: "«Dios es más glorificado en nosotros cuando estamos más satisfechos en Él». El gozo no es opcional para el cristiano: es el combustible mismo de la adoración.",
    },
    likes: 47,
  },
  {
    id: 11,
    name: "Timothy Keller",
    tradition: "Presbyterian · Redeemer NYC",
    avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&h=200&fit=crop",
    time: { en: "1 day ago", es: "hace 1 día" },
    content: {
      en: "“The gospel is this: We are more sinful and flawed in ourselves than we ever dared believe, yet at the same time we are more loved and accepted in Jesus Christ than we ever dared hope.”",
      es: "«El evangelio es esto: Somos más pecadores y defectuosos de lo que jamás nos atrevimos a creer, y al mismo tiempo somos más amados y aceptados en Jesucristo de lo que jamás nos atrevimos a esperar».",
    },
    likes: 52,
  },
  {
    id: 12,
    name: "Diácono Luis H.",
    tradition: "ICIAR · Discipulado",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
    time: { en: "1 day ago", es: "hace 1 día" },
    content: {
      en: "Romans 12:2 reminded me that true transformation does not begin outside, but in the mind. Today I will fast from one negative thought and replace it with a truth from Scripture.",
      es: "Romanos 12:2 me recordó que la verdadera transformación no empieza afuera, sino en la mente. Hoy ayunaré de un pensamiento negativo y lo cambiaré por una verdad de la Escritura.",
    },
    likes: 22,
  },
  {
    id: 13,
    name: "Charles Stanley",
    tradition: "Southern Baptist · In Touch Ministries",
    avatar: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=200&h=200&fit=crop",
    time: { en: "1 day ago", es: "hace 1 día" },
    content: {
      en: "“Our intimacy with God — His highest priority for our lives — determines the impact of our lives.” The depth of the root determines the strength of the fruit.",
      es: "«Nuestra intimidad con Dios — su más alta prioridad para nuestras vidas — determina el impacto de nuestras vidas». La profundidad de la raíz determina la firmeza del fruto.",
    },
    likes: 29,
  },
  {
    id: 14,
    name: "Elisabeth Elliot",
    tradition: "Evangelical missionary",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    time: { en: "2 days ago", es: "hace 2 días" },
    content: {
      en: "“God is God. Because He is God, He is worthy of my trust and obedience. I will find rest nowhere but in His holy will, a will that is unspeakably beyond my largest notion.”",
      es: "«Dios es Dios. Porque Él es Dios, es digno de mi confianza y obediencia. No encontraré descanso en ningún otro lugar que en su santa voluntad, una voluntad infinitamente más grande que mi mayor idea».",
    },
    likes: 33,
  },
  {
    id: 15,
    name: "Francis Chan",
    tradition: "Evangelical · Cornerstone",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    time: { en: "2 days ago", es: "hace 2 días" },
    content: {
      en: "“Our greatest fear should not be of failure but of succeeding at things in life that don't really matter.” Re-examine your goals in the light of eternity.",
      es: "«Nuestro mayor miedo no debería ser el fracaso, sino tener éxito en cosas que realmente no importan». Reexamina tus metas a la luz de la eternidad.",
    },
    likes: 44,
  },
  {
    id: 16,
    name: "Augustín de Hipona",
    tradition: "Patrística · (354–430)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    time: { en: "2 days ago", es: "hace 2 días" },
    content: {
      en: "“You have made us for yourself, O Lord, and our heart is restless until it rests in you.” Every human longing points to Him. Do not waste today filling the infinite with finite.",
      es: "«Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti». Todo anhelo humano apunta a Él. No desperdicies hoy intentando llenar lo infinito con lo finito.",
    },
    likes: 61,
  },
  {
    id: 17,
    name: "Beth Moore",
    tradition: "Southern Baptist · Living Proof",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
    time: { en: "3 days ago", es: "hace 3 días" },
    content: {
      en: "“If we're not regularly seeing God show up in our lives, it may be because we're not really looking for Him.” Open your eyes today. His fingerprints are everywhere.",
      es: "«Si no vemos regularmente a Dios manifestarse en nuestras vidas, puede ser porque realmente no lo estamos buscando». Abre tus ojos hoy. Sus huellas están en todas partes.",
    },
    likes: 26,
  },
  {
    id: 18,
    name: "D. L. Moody",
    tradition: "Evangelical · Moody Bible Inst.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
    time: { en: "3 days ago", es: "hace 3 días" },
    content: {
      en: "“Our greatest fear should not be of failure, but of succeeding at things in life that don't really matter.” The Bible was not given to increase our knowledge but to change our lives.",
      es: "«La Biblia no fue dada para aumentar nuestro conocimiento, sino para cambiar nuestra vida». Que la lectura de hoy no termine en tu cabeza, sino en tus manos y tus pasos.",
    },
    likes: 37,
  },
  {
    id: 19,
    name: "Hermana Raquel S.",
    tradition: "ICIAR · Ministerio de Damas",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
    time: { en: "4 days ago", es: "hace 4 días" },
    content: {
      en: "Lamentations 3:22-23 carried me through a hard week. “His mercies are new every morning.” If yesterday was heavy, today there is fresh mercy waiting for you.",
      es: "Lamentaciones 3:22-23 me sostuvo en una semana difícil. «Sus misericordias son nuevas cada mañana». Si ayer fue pesado, hoy hay una misericordia fresca esperándote.",
    },
    likes: 18,
  },
  {
    id: 20,
    name: "Jonathan Edwards",
    tradition: "Puritan · New England (1703–1758)",
    avatar: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=200&h=200&fit=crop",
    time: { en: "5 days ago", es: "hace 5 días" },
    content: {
      en: "“Resolved, that I will live so as I shall wish I had done when I come to die.” Make your day today count for eternity — one decision at a time.",
      es: "«Resuelvo vivir como querría haberlo hecho cuando llegue mi muerte». Haz que tu día de hoy cuente para la eternidad — una decisión a la vez.",
    },
    likes: 40,
  },
];
