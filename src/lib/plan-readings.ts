export type PlanReading = {
  number: number;
  book: string;
  chapter: number;
  verses?: string;
  topic?: { en: string; es: string };
};

export const BOOK_USFM: Record<string, string> = {
  Genesis: "GEN",
  Exodus: "EXO",
  Leviticus: "LEV",
  Numbers: "NUM",
  Deuteronomy: "DEU",
  Joshua: "JOS",
  Judges: "JDG",
  Ruth: "RUT",
  "1 Samuel": "1SA",
  "2 Samuel": "2SA",
  "1 Kings": "1KI",
  "2 Kings": "2KI",
  "1 Chronicles": "1CH",
  "2 Chronicles": "2CH",
  Ezra: "EZR",
  Nehemiah: "NEH",
  Esther: "EST",
  Job: "JOB",
  Psalms: "PSA",
  Proverbs: "PRO",
  Ecclesiastes: "ECC",
  "Song of Songs": "SNG",
  Isaiah: "ISA",
  Jeremiah: "JER",
  Lamentations: "LAM",
  Ezekiel: "EZK",
  Daniel: "DAN",
  Hosea: "HOS",
  Joel: "JOL",
  Amos: "AMO",
  Obadiah: "OBA",
  Jonah: "JON",
  Micah: "MIC",
  Nahum: "NAM",
  Habakkuk: "HAB",
  Zephaniah: "ZEP",
  Haggai: "HAG",
  Zechariah: "ZEC",
  Malachi: "MAL",
  Matthew: "MAT",
  Mark: "MRK",
  Luke: "LUK",
  John: "JHN",
  Acts: "ACT",
  Romans: "ROM",
  "1 Corinthians": "1CO",
  "2 Corinthians": "2CO",
  Galatians: "GAL",
  Ephesians: "EPH",
  Philippians: "PHP",
  Colossians: "COL",
  "1 Thessalonians": "1TH",
  "2 Thessalonians": "2TH",
  "1 Timothy": "1TI",
  "2 Timothy": "2TI",
  Titus: "TIT",
  Philemon: "PHM",
  Hebrews: "HEB",
  James: "JAS",
  "1 Peter": "1PE",
  "2 Peter": "2PE",
  "1 John": "1JN",
  "2 John": "2JN",
  "3 John": "3JN",
  Jude: "JUD",
  Revelation: "REV",
};

export const BOOK_NAMES_ES: Record<string, string> = {
  Genesis: "Génesis",
  Exodus: "Éxodo",
  Leviticus: "Levítico",
  Numbers: "Números",
  Deuteronomy: "Deuteronomio",
  Joshua: "Josué",
  Judges: "Jueces",
  Ruth: "Rut",
  "1 Samuel": "1 Samuel",
  "2 Samuel": "2 Samuel",
  "1 Kings": "1 Reyes",
  "2 Kings": "2 Reyes",
  "1 Chronicles": "1 Crónicas",
  "2 Chronicles": "2 Crónicas",
  Ezra: "Esdras",
  Nehemiah: "Nehemías",
  Esther: "Ester",
  Job: "Job",
  Psalms: "Salmos",
  Proverbs: "Proverbios",
  Ecclesiastes: "Eclesiastés",
  "Song of Songs": "Cantares",
  Isaiah: "Isaías",
  Jeremiah: "Jeremías",
  Lamentations: "Lamentaciones",
  Ezekiel: "Ezequiel",
  Daniel: "Daniel",
  Hosea: "Oseas",
  Joel: "Joel",
  Amos: "Amós",
  Obadiah: "Abdías",
  Jonah: "Jonás",
  Micah: "Miqueas",
  Nahum: "Nahum",
  Habakkuk: "Habacuc",
  Zephaniah: "Sofonías",
  Haggai: "Hageo",
  Zechariah: "Zacarías",
  Malachi: "Malaquías",
  Matthew: "Mateo",
  Mark: "Marcos",
  Luke: "Lucas",
  John: "Juan",
  Acts: "Hechos",
  Romans: "Romanos",
  "1 Corinthians": "1 Corintios",
  "2 Corinthians": "2 Corintios",
  Galatians: "Gálatas",
  Ephesians: "Efesios",
  Philippians: "Filipenses",
  Colossians: "Colosenses",
  "1 Thessalonians": "1 Tesalonicenses",
  "2 Thessalonians": "2 Tesalonicenses",
  "1 Timothy": "1 Timoteo",
  "2 Timothy": "2 Timoteo",
  Titus: "Tito",
  Philemon: "Filemón",
  Hebrews: "Hebreos",
  James: "Santiago",
  "1 Peter": "1 Pedro",
  "2 Peter": "2 Pedro",
  "1 John": "1 Juan",
  "2 John": "2 Juan",
  "3 John": "3 Juan",
  Jude: "Judas",
  Revelation: "Apocalipsis",
};

export function formatReadingReference(
  reading: PlanReading,
  lang: "en" | "es"
): string {
  const book =
    lang === "es" && BOOK_NAMES_ES[reading.book]
      ? BOOK_NAMES_ES[reading.book]
      : reading.book;
  let ref = `${book} ${reading.chapter}`;
  if (reading.verses) ref += `:${reading.verses}`;
  return ref;
}

export function parseVerseRange(
  verses: string | undefined
): { start: number; end: number } | null {
  if (!verses) return null;
  const trimmed = verses.trim();
  const rangeMatch = trimmed.match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if (rangeMatch) {
    return { start: Number(rangeMatch[1]), end: Number(rangeMatch[2]) };
  }
  const singleMatch = trimmed.match(/^(\d+)$/);
  if (singleMatch) {
    const n = Number(singleMatch[1]);
    return { start: n, end: n };
  }
  return null;
}

/* ------------------------ helpers ------------------------ */

type ReadingInput = Omit<PlanReading, "number">;

const numbered = (items: ReadingInput[]): PlanReading[] =>
  items.map((item, i) => ({ ...item, number: i + 1 }));

const range = (book: string, from: number, to: number): ReadingInput[] =>
  Array.from({ length: to - from + 1 }, (_, i) => ({
    book,
    chapter: from + i,
  }));

/* ------------------------ Shared catalogs ------------------------ */

// Topical/emotional plans
const AMOR: PlanReading[] = numbered([
  { book: "1 Corinthians", chapter: 13, topic: { en: "The way of love", es: "El camino del amor" } },
  { book: "1 John", chapter: 4, verses: "7-21", topic: { en: "God is love", es: "Dios es amor" } },
  { book: "John", chapter: 15, verses: "9-17", topic: { en: "Love one another", es: "Ámense unos a otros" } },
  { book: "Romans", chapter: 13, verses: "8-14", topic: { en: "Love fulfills the law", es: "El amor cumple la ley" } },
  { book: "Ephesians", chapter: 3, verses: "14-21", topic: { en: "Rooted in love", es: "Arraigados en el amor" } },
  { book: "Colossians", chapter: 3, verses: "12-17", topic: { en: "Put on love", es: "Vístanse de amor" } },
  { book: "John", chapter: 3, verses: "16-21", topic: { en: "God so loved", es: "De tal manera amó Dios" } },
  { book: "1 John", chapter: 3, verses: "11-24", topic: { en: "Love in action", es: "Amor en acción" } },
  { book: "Galatians", chapter: 5, verses: "13-26", topic: { en: "Serve through love", es: "Servirse por amor" } },
  { book: "Romans", chapter: 12, verses: "9-21", topic: { en: "Sincere love", es: "Amor sin fingimiento" } },
]);

const ANSIEDAD: PlanReading[] = numbered([
  { book: "Philippians", chapter: 4, verses: "6-7", topic: { en: "Do not be anxious", es: "Por nada estéis afanosos" } },
  { book: "Matthew", chapter: 6, verses: "25-34", topic: { en: "Do not worry about tomorrow", es: "No os afanéis por el mañana" } },
  { book: "Psalms", chapter: 23, topic: { en: "The Lord is my Shepherd", es: "El Señor es mi Pastor" } },
  { book: "1 Peter", chapter: 5, verses: "6-7", topic: { en: "Cast your cares on Him", es: "Echen toda ansiedad sobre Él" } },
  { book: "Isaiah", chapter: 41, verses: "10", topic: { en: "Do not fear, I am with you", es: "No temas, yo estoy contigo" } },
  { book: "John", chapter: 14, verses: "27", topic: { en: "Peace I leave with you", es: "La paz os dejo" } },
  { book: "Psalms", chapter: 46, topic: { en: "Our refuge", es: "Nuestro refugio" } },
]);

const SANIDAD: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 53, topic: { en: "By His wounds we are healed", es: "Por su llaga fuimos sanados" } },
  { book: "Psalms", chapter: 103, topic: { en: "He heals all your diseases", es: "Él sana todas tus dolencias" } },
  { book: "James", chapter: 5, verses: "13-20", topic: { en: "The prayer of faith heals", es: "La oración de fe sanará" } },
  { book: "Mark", chapter: 5, verses: "21-43", topic: { en: "Jesus heals completely", es: "Jesús sana por completo" } },
  { book: "Matthew", chapter: 8, verses: "1-17", topic: { en: "He took our infirmities", es: "Él tomó nuestras enfermedades" } },
  { book: "John", chapter: 5, verses: "1-15", topic: { en: "Do you want to be well?", es: "¿Quieres ser sano?" } },
  { book: "Psalms", chapter: 30, topic: { en: "Healing and praise", es: "Sanidad y alabanza" } },
  { book: "Jeremiah", chapter: 17, verses: "14", topic: { en: "Heal me, O Lord", es: "Sáname, Señor" } },
  { book: "Exodus", chapter: 15, verses: "22-27", topic: { en: "The Lord who heals", es: "El Señor que sana" } },
  { book: "1 Peter", chapter: 2, verses: "21-25", topic: { en: "The Shepherd of our souls", es: "El Pastor de nuestras almas" } },
]);

const ENOJO: PlanReading[] = numbered([
  { book: "Ephesians", chapter: 4, verses: "25-32", topic: { en: "Do not let the sun go down on your anger", es: "No se ponga el sol sobre vuestro enojo" } },
  { book: "Proverbs", chapter: 15, verses: "1-18", topic: { en: "A soft answer turns wrath", es: "La blanda respuesta quita la ira" } },
  { book: "James", chapter: 1, verses: "19-27", topic: { en: "Slow to anger", es: "Tardo para airarse" } },
  { book: "Proverbs", chapter: 29, verses: "11-22", topic: { en: "The fool gives full vent", es: "El necio da rienda suelta a su ira" } },
  { book: "Matthew", chapter: 5, verses: "21-26", topic: { en: "Reconcile quickly", es: "Reconcíliate pronto" } },
  { book: "Colossians", chapter: 3, verses: "5-17", topic: { en: "Put off anger", es: "Despójense del enojo" } },
  { book: "Psalms", chapter: 37, verses: "1-11", topic: { en: "Do not fret", es: "No te impacientes" } },
]);

const ESPERANZA: PlanReading[] = numbered([
  { book: "Jeremiah", chapter: 29, verses: "11-14", topic: { en: "Plans of welfare", es: "Pensamientos de paz" } },
  { book: "Romans", chapter: 15, verses: "4-13", topic: { en: "God of hope", es: "Dios de esperanza" } },
  { book: "Psalms", chapter: 42, topic: { en: "Hope in God", es: "Espera en Dios" } },
  { book: "Lamentations", chapter: 3, verses: "19-26", topic: { en: "New every morning", es: "Nuevas cada mañana" } },
  { book: "Romans", chapter: 5, verses: "1-11", topic: { en: "Hope does not put to shame", es: "La esperanza no avergüenza" } },
  { book: "1 Peter", chapter: 1, verses: "3-9", topic: { en: "A living hope", es: "Una esperanza viva" } },
  { book: "Psalms", chapter: 71, topic: { en: "My hope from my youth", es: "Mi esperanza desde mi juventud" } },
  { book: "Hebrews", chapter: 11, verses: "1-6", topic: { en: "Faith and hope", es: "Fe y esperanza" } },
  { book: "Romans", chapter: 8, verses: "18-39", topic: { en: "Future glory", es: "La gloria venidera" } },
  { book: "Isaiah", chapter: 40, verses: "28-31", topic: { en: "Those who hope renew strength", es: "Los que esperan renovarán sus fuerzas" } },
]);

const TERRITORIO_FE: PlanReading[] = numbered([
  { book: "Hebrews", chapter: 11, topic: { en: "Heroes of faith", es: "Héroes de la fe" } },
  { book: "Romans", chapter: 4, topic: { en: "Justified by faith", es: "Justificados por la fe" } },
  { book: "James", chapter: 2, verses: "14-26", topic: { en: "Faith without works is dead", es: "La fe sin obras es muerta" } },
  { book: "Galatians", chapter: 3, verses: "1-14", topic: { en: "Living by faith", es: "Viviendo por fe" } },
  { book: "Ephesians", chapter: 2, verses: "1-10", topic: { en: "Saved by grace through faith", es: "Por gracia mediante la fe" } },
  { book: "Luke", chapter: 7, verses: "1-10", topic: { en: "Great faith of the centurion", es: "Gran fe del centurión" } },
  { book: "Matthew", chapter: 14, verses: "22-33", topic: { en: "Faith over the storm", es: "Fe sobre la tormenta" } },
  { book: "Mark", chapter: 5, verses: "21-43", topic: { en: "Only believe", es: "Solo cree" } },
  { book: "John", chapter: 20, verses: "24-31", topic: { en: "Blessed who believe", es: "Bienaventurados los que creen" } },
  { book: "Hebrews", chapter: 12, verses: "1-3", topic: { en: "Author of our faith", es: "Autor de la fe" } },
  { book: "Philippians", chapter: 3, verses: "7-14", topic: { en: "Pressing toward the goal", es: "Prosigo a la meta" } },
  { book: "2 Timothy", chapter: 4, verses: "1-8", topic: { en: "Fight the good fight", es: "La buena batalla" } },
  { book: "Matthew", chapter: 17, verses: "14-21", topic: { en: "Mustard seed faith", es: "Fe como grano de mostaza" } },
  { book: "1 Peter", chapter: 1, verses: "3-9", topic: { en: "Faith tested by fire", es: "Fe probada por fuego" } },
]);

/* ------------------------ Isaiah plans ------------------------ */

const ISAIAS_CONFIANZA: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 6, topic: { en: "Here am I, send me", es: "Heme aquí, envíame" } },
  { book: "Isaiah", chapter: 12 },
  { book: "Isaiah", chapter: 26, topic: { en: "Perfect peace", es: "Paz perfecta" } },
  { book: "Isaiah", chapter: 30, verses: "15-18" },
  { book: "Isaiah", chapter: 35 },
  { book: "Isaiah", chapter: 40 },
  { book: "Isaiah", chapter: 41 },
  { book: "Isaiah", chapter: 43 },
  { book: "Isaiah", chapter: 49 },
  { book: "Isaiah", chapter: 53 },
  { book: "Isaiah", chapter: 55 },
  { book: "Isaiah", chapter: 58 },
  { book: "Isaiah", chapter: 61 },
  { book: "Isaiah", chapter: 66 },
]);

const ISAIAS_SALVACION: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 1 },
  { book: "Isaiah", chapter: 7, topic: { en: "Immanuel", es: "Emanuel" } },
  { book: "Isaiah", chapter: 9, topic: { en: "A Son is given", es: "Nos es dado un Hijo" } },
  { book: "Isaiah", chapter: 11, topic: { en: "The Branch of Jesse", es: "Vara del tronco de Isaí" } },
  { book: "Isaiah", chapter: 12 },
  { book: "Isaiah", chapter: 25 },
  { book: "Isaiah", chapter: 35 },
  { book: "Isaiah", chapter: 42 },
  { book: "Isaiah", chapter: 43 },
  { book: "Isaiah", chapter: 49 },
  { book: "Isaiah", chapter: 52 },
  { book: "Isaiah", chapter: 53, topic: { en: "The suffering Servant", es: "El Siervo sufriente" } },
  { book: "Isaiah", chapter: 55 },
  { book: "Isaiah", chapter: 61 },
]);

const ISAIAS_INMERSION: PlanReading[] = numbered(range("Isaiah", 1, 30));

const ISAIAS_5_DIAS: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 6, topic: { en: "The holy calling", es: "El llamado santo" } },
  { book: "Isaiah", chapter: 40, topic: { en: "Comfort my people", es: "Consolad a mi pueblo" } },
  { book: "Isaiah", chapter: 53, topic: { en: "The suffering Servant", es: "El Siervo sufriente" } },
  { book: "Isaiah", chapter: 55, topic: { en: "Come to the waters", es: "Venid a las aguas" } },
  { book: "Isaiah", chapter: 61, topic: { en: "The year of grace", es: "El año de gracia" } },
]);

const ISAIAS_RECORRIDO: PlanReading[] = numbered(range("Isaiah", 1, 66));

/* ------------------------ Ministry of Jesus ------------------------ */

const SOBRE_ESTA_ROCA: PlanReading[] = numbered([
  { book: "Matthew", chapter: 16, verses: "13-28", topic: { en: "On this rock", es: "Sobre esta roca" } },
  { book: "Ephesians", chapter: 2, verses: "11-22", topic: { en: "One temple in Christ", es: "Un solo templo en Cristo" } },
  { book: "1 Peter", chapter: 2, verses: "1-12", topic: { en: "Living stones", es: "Piedras vivas" } },
  { book: "1 Corinthians", chapter: 3, verses: "1-17", topic: { en: "God's temple", es: "Templo de Dios" } },
  { book: "Acts", chapter: 2, verses: "37-47", topic: { en: "The first church", es: "La primera iglesia" } },
  { book: "Ephesians", chapter: 4, verses: "1-16", topic: { en: "One body, one Lord", es: "Un solo cuerpo, un solo Señor" } },
  { book: "Romans", chapter: 12, topic: { en: "Members of one body", es: "Miembros de un solo cuerpo" } },
  { book: "1 Corinthians", chapter: 12, topic: { en: "Many members, one body", es: "Muchos miembros, un cuerpo" } },
  { book: "Colossians", chapter: 1, verses: "15-29", topic: { en: "Christ, head of the church", es: "Cristo, cabeza de la iglesia" } },
  { book: "Matthew", chapter: 28, verses: "16-20", topic: { en: "The Great Commission", es: "La Gran Comisión" } },
  { book: "Hebrews", chapter: 10, verses: "19-25", topic: { en: "Gather together", es: "No dejemos de congregarnos" } },
  { book: "Acts", chapter: 20, verses: "17-38", topic: { en: "Shepherds of the flock", es: "Pastores del rebaño" } },
  { book: "Ephesians", chapter: 1, verses: "15-23", topic: { en: "Christ over all", es: "Cristo sobre todo" } },
  { book: "Revelation", chapter: 2, verses: "1-7", topic: { en: "Return to your first love", es: "Vuelve a tu primer amor" } },
]);

const PASCUA_PREPARACION: PlanReading[] = numbered([
  { book: "Matthew", chapter: 21 },
  { book: "Psalms", chapter: 22 },
  { book: "Matthew", chapter: 22 },
  { book: "Psalms", chapter: 31 },
  { book: "Matthew", chapter: 23 },
  { book: "Psalms", chapter: 69 },
  { book: "Matthew", chapter: 24 },
  { book: "Psalms", chapter: 88 },
  { book: "Matthew", chapter: 25 },
  { book: "Psalms", chapter: 110 },
  { book: "Matthew", chapter: 26 },
  { book: "Matthew", chapter: 27 },
  { book: "Psalms", chapter: 118 },
  { book: "Matthew", chapter: 28 },
]);

const MILAGROS_JESUS: PlanReading[] = numbered([
  { book: "John", chapter: 2, verses: "1-11", topic: { en: "Water to wine", es: "Agua en vino" } },
  { book: "John", chapter: 4, verses: "46-54", topic: { en: "Healing the official's son", es: "Sana al hijo del oficial" } },
  { book: "Luke", chapter: 5, verses: "1-11", topic: { en: "Miraculous catch", es: "La pesca milagrosa" } },
  { book: "Mark", chapter: 1, verses: "21-28", topic: { en: "Cleansing a demon", es: "Expulsión del demonio" } },
  { book: "Mark", chapter: 1, verses: "29-34" },
  { book: "Mark", chapter: 1, verses: "40-45", topic: { en: "Cleansing the leper", es: "Sanando al leproso" } },
  { book: "Mark", chapter: 2, verses: "1-12", topic: { en: "The paralytic", es: "El paralítico" } },
  { book: "Mark", chapter: 3, verses: "1-6" },
  { book: "Mark", chapter: 4, verses: "35-41", topic: { en: "Calming the storm", es: "Calma la tormenta" } },
  { book: "Mark", chapter: 5, verses: "1-20" },
  { book: "Mark", chapter: 5, verses: "21-43" },
  { book: "Matthew", chapter: 14, verses: "13-21", topic: { en: "Feeding 5,000", es: "Alimenta a los 5,000" } },
  { book: "Matthew", chapter: 14, verses: "22-33", topic: { en: "Walking on water", es: "Camina sobre el agua" } },
  { book: "Mark", chapter: 7, verses: "24-30" },
  { book: "Mark", chapter: 7, verses: "31-37" },
  { book: "Mark", chapter: 8, verses: "1-10" },
  { book: "Mark", chapter: 8, verses: "22-26" },
  { book: "Matthew", chapter: 17, verses: "1-13", topic: { en: "The Transfiguration", es: "La Transfiguración" } },
  { book: "Mark", chapter: 9, verses: "14-29" },
  { book: "Mark", chapter: 10, verses: "46-52", topic: { en: "Bartimaeus", es: "Bartimeo" } },
  { book: "John", chapter: 11, verses: "1-44", topic: { en: "Raising Lazarus", es: "Resucita a Lázaro" } },
]);

const EPIFANIA_CRISTO: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 60 },
  { book: "Matthew", chapter: 2, verses: "1-12", topic: { en: "The Magi", es: "Los Magos" } },
  { book: "Numbers", chapter: 24, verses: "15-19" },
  { book: "Micah", chapter: 5, verses: "1-5" },
  { book: "Luke", chapter: 2, verses: "22-40" },
  { book: "John", chapter: 1, verses: "1-18", topic: { en: "The Word became flesh", es: "El Verbo hecho carne" } },
  { book: "Matthew", chapter: 3, verses: "13-17", topic: { en: "The Baptism", es: "El Bautismo" } },
  { book: "John", chapter: 2, verses: "1-11" },
  { book: "Luke", chapter: 4, verses: "14-30" },
  { book: "Matthew", chapter: 17, verses: "1-13" },
  { book: "2 Peter", chapter: 1, verses: "16-21" },
  { book: "Revelation", chapter: 1, verses: "9-20" },
]);

const BUSCAR_REINO: PlanReading[] = numbered([
  { book: "Matthew", chapter: 6, verses: "25-34", topic: { en: "Seek first the Kingdom", es: "Buscad primero el Reino" } },
  { book: "Matthew", chapter: 13, topic: { en: "Parables of the Kingdom", es: "Parábolas del Reino" } },
  { book: "Luke", chapter: 17, verses: "20-37" },
  { book: "Mark", chapter: 1, verses: "14-20" },
  { book: "Matthew", chapter: 5 },
  { book: "Matthew", chapter: 6 },
  { book: "Matthew", chapter: 7 },
  { book: "Luke", chapter: 9, verses: "57-62" },
  { book: "Matthew", chapter: 18, verses: "1-14" },
  { book: "Matthew", chapter: 19, verses: "16-30" },
  { book: "Luke", chapter: 10, verses: "1-24" },
  { book: "Luke", chapter: 14, verses: "15-35" },
  { book: "Matthew", chapter: 25, verses: "31-46" },
  { book: "Acts", chapter: 1, verses: "1-11" },
]);

const TIERRA_SANTA: PlanReading[] = numbered([
  { book: "Genesis", chapter: 12, topic: { en: "The call of Abram", es: "El llamado de Abram" } },
  { book: "Genesis", chapter: 22, topic: { en: "Moriah", es: "Moriah" } },
  { book: "Genesis", chapter: 28, topic: { en: "Bethel", es: "Betel" } },
  { book: "Exodus", chapter: 3, topic: { en: "Horeb", es: "Horeb" } },
  { book: "Joshua", chapter: 6, topic: { en: "Jericho", es: "Jericó" } },
  { book: "1 Samuel", chapter: 17, topic: { en: "Elah", es: "Ela" } },
  { book: "2 Samuel", chapter: 5, topic: { en: "Zion", es: "Sion" } },
  { book: "1 Kings", chapter: 18, topic: { en: "Mount Carmel", es: "Monte Carmelo" } },
  { book: "Luke", chapter: 2, topic: { en: "Bethlehem", es: "Belén" } },
  { book: "Matthew", chapter: 3, topic: { en: "The Jordan", es: "El Jordán" } },
  { book: "Mark", chapter: 9, topic: { en: "Mount of Transfiguration", es: "Monte de la Transfiguración" } },
  { book: "John", chapter: 19, topic: { en: "Golgotha", es: "Gólgota" } },
]);

const ESTERIL_FRUCTIFERO: PlanReading[] = numbered([
  { book: "Genesis", chapter: 17, verses: "15-21", topic: { en: "Sarah", es: "Sara" } },
  { book: "Genesis", chapter: 25, verses: "19-26", topic: { en: "Rebekah", es: "Rebeca" } },
  { book: "1 Samuel", chapter: 1, topic: { en: "Hannah", es: "Ana" } },
  { book: "Judges", chapter: 13, topic: { en: "Manoah's wife", es: "La esposa de Manoa" } },
  { book: "Luke", chapter: 1, verses: "5-25", topic: { en: "Elizabeth", es: "Elisabet" } },
  { book: "John", chapter: 15, verses: "1-17", topic: { en: "The True Vine", es: "La Vid verdadera" } },
  { book: "Isaiah", chapter: 54, verses: "1-10" },
]);

const CORAZONES_ANSIOSOS: PlanReading[] = numbered([
  { book: "Philippians", chapter: 4, verses: "4-9" },
  { book: "Matthew", chapter: 6, verses: "25-34" },
  { book: "1 Peter", chapter: 5, verses: "6-11" },
  { book: "Psalms", chapter: 55 },
  { book: "Psalms", chapter: 139 },
  { book: "Isaiah", chapter: 41, verses: "10" },
  { book: "John", chapter: 14, verses: "1-6" },
  { book: "Romans", chapter: 8, verses: "28-39" },
  { book: "2 Corinthians", chapter: 4, verses: "7-18" },
  { book: "Psalms", chapter: 23 },
  { book: "Psalms", chapter: 46 },
  { book: "Hebrews", chapter: 4, verses: "14-16" },
  { book: "Jeremiah", chapter: 17, verses: "5-10" },
  { book: "Proverbs", chapter: 3, verses: "5-12" },
]);

const VIAJE_JUAN: PlanReading[] = numbered(range("John", 1, 21));

/* ------------------------ Proverbios (keep existing) ------------------------ */

const PROVERBIOS: PlanReading[] = numbered(range("Proverbs", 1, 31));

/* ------------------------ Redemption story ------------------------ */

const HISTORIA_REDENCION: PlanReading[] = numbered([
  { book: "Genesis", chapter: 1, topic: { en: "Creation", es: "Creación" } },
  { book: "Genesis", chapter: 3, topic: { en: "The fall", es: "La caída" } },
  { book: "Genesis", chapter: 12, topic: { en: "The call of Abraham", es: "Llamado de Abraham" } },
  { book: "Genesis", chapter: 22 },
  { book: "Exodus", chapter: 12, topic: { en: "Passover", es: "La Pascua" } },
  { book: "Exodus", chapter: 19 },
  { book: "Leviticus", chapter: 16, topic: { en: "Day of Atonement", es: "Día de la Expiación" } },
  { book: "Numbers", chapter: 21, verses: "4-9" },
  { book: "Deuteronomy", chapter: 30 },
  { book: "Joshua", chapter: 24 },
  { book: "2 Samuel", chapter: 7, topic: { en: "Davidic covenant", es: "Pacto con David" } },
  { book: "Psalms", chapter: 22 },
  { book: "Isaiah", chapter: 53, topic: { en: "The suffering Servant", es: "El Siervo sufriente" } },
  { book: "Jeremiah", chapter: 31, verses: "31-34", topic: { en: "New covenant", es: "Nuevo pacto" } },
  { book: "Ezekiel", chapter: 36, verses: "22-38" },
  { book: "Daniel", chapter: 7, verses: "13-14" },
  { book: "Matthew", chapter: 1 },
  { book: "Luke", chapter: 2 },
  { book: "John", chapter: 1, verses: "1-18" },
  { book: "Matthew", chapter: 3 },
  { book: "Matthew", chapter: 5 },
  { book: "John", chapter: 3, verses: "1-21" },
  { book: "Mark", chapter: 10, verses: "32-45" },
  { book: "John", chapter: 13 },
  { book: "Luke", chapter: 23 },
  { book: "Luke", chapter: 24, topic: { en: "The resurrection", es: "La resurrección" } },
  { book: "Acts", chapter: 2 },
  { book: "Romans", chapter: 8 },
  { book: "Revelation", chapter: 21 },
  { book: "Revelation", chapter: 22 },
]);

/* ------------------------ Whole-Bible plans ------------------------ */

const BIBLIA_ANO_CLASICO: PlanReading[] = (() => {
  const books: { book: string; chapters: number }[] = [
    { book: "Genesis", chapters: 50 },
    { book: "Exodus", chapters: 40 },
    { book: "Leviticus", chapters: 27 },
    { book: "Numbers", chapters: 36 },
    { book: "Deuteronomy", chapters: 34 },
    { book: "Joshua", chapters: 24 },
    { book: "Judges", chapters: 21 },
    { book: "Ruth", chapters: 4 },
    { book: "1 Samuel", chapters: 31 },
    { book: "2 Samuel", chapters: 24 },
    { book: "1 Kings", chapters: 22 },
    { book: "2 Kings", chapters: 25 },
    { book: "Ezra", chapters: 10 },
    { book: "Nehemiah", chapters: 13 },
    { book: "Esther", chapters: 10 },
    { book: "Matthew", chapters: 28 },
    { book: "Mark", chapters: 16 },
  ];
  const out: PlanReading[] = [];
  let day = 1;
  for (const b of books) {
    for (let ch = 1; ch <= b.chapters && day <= 365; ch++) {
      out.push({ number: day, book: b.book, chapter: ch });
      day++;
    }
    if (day > 365) break;
  }
  let psalmIdx = 1;
  while (out.length < 365) {
    out.push({ number: out.length + 1, book: "Psalms", chapter: psalmIdx });
    psalmIdx += 1;
    if (psalmIdx > 150) psalmIdx = 1;
  }
  return out;
})();

const CRONOLOGICO: PlanReading[] = (() => {
  // Simplified chronological order (selected flagship books in rough historical sequence)
  const sequence: { book: string; chapters: number }[] = [
    { book: "Genesis", chapters: 50 },
    { book: "Job", chapters: 42 },
    { book: "Exodus", chapters: 40 },
    { book: "Leviticus", chapters: 27 },
    { book: "Numbers", chapters: 21 },
  ];
  const out: PlanReading[] = [];
  let day = 1;
  for (const b of sequence) {
    for (let ch = 1; ch <= b.chapters && day <= 180; ch++) {
      out.push({ number: day, book: b.book, chapter: ch });
      day++;
    }
    if (day > 180) break;
  }
  return out;
})();

const EVANGELIO_MES: PlanReading[] = numbered([
  ...range("Matthew", 1, 28),
  { book: "Matthew", chapter: 5 },
  { book: "Matthew", chapter: 6 },
  ...range("Mark", 1, 16),
  ...range("Mark", 1, 14).slice(0, 14),
  ...range("Luke", 1, 24),
  { book: "Luke", chapter: 15 },
  { book: "Luke", chapter: 24 },
  { book: "Luke", chapter: 1 },
  { book: "Luke", chapter: 2 },
  { book: "Luke", chapter: 10 },
  { book: "Luke", chapter: 11 },
  ...range("John", 1, 21),
  { book: "John", chapter: 3 },
  { book: "John", chapter: 14 },
  { book: "John", chapter: 15 },
  { book: "John", chapter: 17 },
  { book: "John", chapter: 20 },
  { book: "John", chapter: 21 },
  { book: "John", chapter: 10 },
  { book: "John", chapter: 6 },
]).slice(0, 120);

const PLAN_TEMATICO: PlanReading[] = numbered([
  // Month 1 — Faith
  { book: "Hebrews", chapter: 11, topic: { en: "Faith", es: "Fe" } },
  { book: "Romans", chapter: 4 },
  { book: "James", chapter: 2 },
  { book: "Galatians", chapter: 3 },
  { book: "Ephesians", chapter: 2 },
  // Month 2 — Prayer
  { book: "Matthew", chapter: 6, topic: { en: "Prayer", es: "Oración" } },
  { book: "Luke", chapter: 11 },
  { book: "John", chapter: 17 },
  { book: "Philippians", chapter: 4 },
  { book: "James", chapter: 5 },
  // Month 3 — Holy Spirit
  { book: "John", chapter: 14, topic: { en: "Holy Spirit", es: "Espíritu Santo" } },
  { book: "John", chapter: 16 },
  { book: "Acts", chapter: 2 },
  { book: "Romans", chapter: 8 },
  { book: "Galatians", chapter: 5 },
  // Month 4 — Church
  { book: "Acts", chapter: 2, topic: { en: "Church", es: "Iglesia" } },
  { book: "1 Corinthians", chapter: 12 },
  { book: "Ephesians", chapter: 4 },
  { book: "Colossians", chapter: 1 },
  { book: "1 Peter", chapter: 2 },
  // Month 5 — Wisdom
  { book: "Proverbs", chapter: 1, topic: { en: "Wisdom", es: "Sabiduría" } },
  { book: "Proverbs", chapter: 3 },
  { book: "Proverbs", chapter: 8 },
  { book: "Ecclesiastes", chapter: 3 },
  { book: "James", chapter: 3 },
  // Month 6 — Evangelism
  { book: "Matthew", chapter: 28, topic: { en: "Evangelism", es: "Evangelismo" } },
  { book: "Acts", chapter: 1 },
  { book: "Acts", chapter: 8 },
  { book: "Romans", chapter: 10 },
  { book: "2 Timothy", chapter: 4 },
]);

const SALMOS_150: PlanReading[] = numbered(range("Psalms", 1, 150));

const NT_90: PlanReading[] = (() => {
  const all: ReadingInput[] = [
    ...range("Matthew", 1, 28),
    ...range("Mark", 1, 16),
    ...range("Luke", 1, 24),
    ...range("John", 1, 21),
    { book: "Acts", chapter: 1 },
  ];
  return numbered(all).slice(0, 90);
})();

const AT_180: PlanReading[] = (() => {
  const seq: { book: string; chapters: number }[] = [
    { book: "Genesis", chapters: 50 },
    { book: "Exodus", chapters: 40 },
    { book: "Leviticus", chapters: 27 },
    { book: "Numbers", chapters: 36 },
    { book: "Deuteronomy", chapters: 27 },
  ];
  const out: PlanReading[] = [];
  let day = 1;
  for (const b of seq) {
    for (let ch = 1; ch <= b.chapters && day <= 180; ch++) {
      out.push({ number: day, book: b.book, chapter: ch });
      day++;
    }
  }
  return out;
})();

const BIBLIA_CON_JESUS: PlanReading[] = numbered([
  { book: "Genesis", chapter: 3, topic: { en: "The first promise", es: "La primera promesa" } },
  { book: "Genesis", chapter: 22 },
  { book: "Exodus", chapter: 12, topic: { en: "The Passover Lamb", es: "El Cordero pascual" } },
  { book: "Leviticus", chapter: 16, topic: { en: "The Atonement", es: "La Expiación" } },
  { book: "Numbers", chapter: 21, verses: "4-9" },
  { book: "Deuteronomy", chapter: 18, verses: "15-22" },
  { book: "Joshua", chapter: 5, verses: "13-15" },
  { book: "Ruth", chapter: 4 },
  { book: "1 Samuel", chapter: 16 },
  { book: "2 Samuel", chapter: 7 },
  { book: "Psalms", chapter: 2 },
  { book: "Psalms", chapter: 16 },
  { book: "Psalms", chapter: 22 },
  { book: "Psalms", chapter: 23 },
  { book: "Psalms", chapter: 110 },
  { book: "Proverbs", chapter: 8 },
  { book: "Isaiah", chapter: 7 },
  { book: "Isaiah", chapter: 9 },
  { book: "Isaiah", chapter: 11 },
  { book: "Isaiah", chapter: 42 },
  { book: "Isaiah", chapter: 53 },
  { book: "Isaiah", chapter: 61 },
  { book: "Jeremiah", chapter: 23, verses: "1-6" },
  { book: "Jeremiah", chapter: 31, verses: "31-34" },
  { book: "Ezekiel", chapter: 34 },
  { book: "Daniel", chapter: 7 },
  { book: "Hosea", chapter: 11 },
  { book: "Joel", chapter: 2 },
  { book: "Micah", chapter: 5 },
  { book: "Zechariah", chapter: 9 },
  { book: "Malachi", chapter: 3 },
  ...range("Matthew", 1, 28).map((r) => ({ book: r.book, chapter: r.chapter })),
  { book: "Mark", chapter: 8 },
  { book: "Mark", chapter: 10 },
  { book: "Luke", chapter: 1 },
  { book: "Luke", chapter: 2 },
  { book: "Luke", chapter: 9 },
  { book: "Luke", chapter: 15 },
  { book: "Luke", chapter: 24 },
  { book: "John", chapter: 1 },
  { book: "John", chapter: 3 },
  { book: "John", chapter: 6 },
  { book: "John", chapter: 10 },
  { book: "John", chapter: 14 },
  { book: "John", chapter: 17 },
  { book: "John", chapter: 19 },
  { book: "John", chapter: 20 },
  { book: "Acts", chapter: 2 },
  { book: "Romans", chapter: 5 },
  { book: "Romans", chapter: 8 },
  { book: "1 Corinthians", chapter: 15 },
  { book: "Galatians", chapter: 3 },
  { book: "Ephesians", chapter: 1 },
  { book: "Philippians", chapter: 2 },
  { book: "Colossians", chapter: 1 },
  { book: "Hebrews", chapter: 1 },
  { book: "Hebrews", chapter: 7 },
  { book: "Hebrews", chapter: 10 },
  { book: "Hebrews", chapter: 12 },
  { book: "1 Peter", chapter: 1 },
  { book: "1 John", chapter: 4 },
  { book: "Revelation", chapter: 1 },
  { book: "Revelation", chapter: 5 },
  { book: "Revelation", chapter: 21 },
]).slice(0, 90);

const RENOVAR_FE_10: PlanReading[] = numbered([
  { book: "Psalms", chapter: 51, topic: { en: "A clean heart", es: "Un corazón limpio" } },
  { book: "Psalms", chapter: 23 },
  { book: "Isaiah", chapter: 40 },
  { book: "Matthew", chapter: 5 },
  { book: "Luke", chapter: 15 },
  { book: "John", chapter: 15 },
  { book: "Acts", chapter: 2 },
  { book: "Romans", chapter: 8 },
  { book: "Philippians", chapter: 3 },
  { book: "2 Timothy", chapter: 2 },
]);

const PREPARACION_PASION_14: PlanReading[] = numbered([
  { book: "Matthew", chapter: 21 },
  { book: "Matthew", chapter: 22 },
  { book: "Matthew", chapter: 23 },
  { book: "Matthew", chapter: 24 },
  { book: "Matthew", chapter: 25 },
  { book: "Matthew", chapter: 26 },
  { book: "Matthew", chapter: 27 },
  { book: "Matthew", chapter: 28 },
  { book: "Psalms", chapter: 22 },
  { book: "Psalms", chapter: 88 },
  { book: "Psalms", chapter: 110 },
  { book: "Isaiah", chapter: 53 },
  { book: "John", chapter: 18 },
  { book: "John", chapter: 20 },
]);

/* ------------------------ Holy Week plans ------------------------ */

const DOMINGO_RESURRECCION: PlanReading[] = numbered([
  { book: "Matthew", chapter: 28 },
  { book: "Mark", chapter: 16 },
  { book: "Luke", chapter: 24 },
  { book: "John", chapter: 20 },
  { book: "John", chapter: 21 },
  { book: "1 Corinthians", chapter: 15 },
  { book: "Acts", chapter: 2 },
]);

const SABADO_SILENCIO: PlanReading[] = numbered([
  { book: "Matthew", chapter: 27, verses: "57-66" },
  { book: "Psalms", chapter: 88 },
  { book: "Lamentations", chapter: 3, verses: "1-24" },
]);

const SIETE_PALABRAS: PlanReading[] = numbered([
  { book: "Luke", chapter: 23, verses: "34", topic: { en: "Father, forgive them", es: "Padre, perdónalos" } },
  { book: "Luke", chapter: 23, verses: "43", topic: { en: "Today you will be with me", es: "Hoy estarás conmigo" } },
  { book: "John", chapter: 19, verses: "26-27", topic: { en: "Behold your mother", es: "He ahí tu madre" } },
  { book: "Matthew", chapter: 27, verses: "46", topic: { en: "My God, my God", es: "Dios mío, Dios mío" } },
  { book: "John", chapter: 19, verses: "28", topic: { en: "I thirst", es: "Tengo sed" } },
  { book: "John", chapter: 19, verses: "30", topic: { en: "It is finished", es: "Consumado es" } },
  { book: "Luke", chapter: 23, verses: "46", topic: { en: "Into your hands", es: "En tus manos encomiendo mi espíritu" } },
]);

const VIERNES_MUERTE: PlanReading[] = numbered([
  { book: "Matthew", chapter: 27 },
  { book: "Mark", chapter: 15 },
  { book: "Luke", chapter: 23 },
  { book: "John", chapter: 19 },
]);

const JUEVES_MESA: PlanReading[] = numbered([
  { book: "Matthew", chapter: 26, verses: "17-56" },
  { book: "Mark", chapter: 14, verses: "12-52" },
  { book: "Luke", chapter: 22, verses: "7-53" },
  { book: "John", chapter: 13 },
  { book: "John", chapter: 14 },
  { book: "John", chapter: 17 },
]);

const MIERCOLES_DESCANSO: PlanReading[] = numbered([
  { book: "Matthew", chapter: 26, verses: "1-16" },
  { book: "Mark", chapter: 14, verses: "1-11" },
  { book: "Luke", chapter: 22, verses: "1-6" },
]);

const MARTES_CONTROVERSIA: PlanReading[] = numbered([
  { book: "Matthew", chapter: 21, verses: "23-46" },
  { book: "Matthew", chapter: 22 },
  { book: "Matthew", chapter: 23 },
  { book: "Matthew", chapter: 24 },
  { book: "Matthew", chapter: 25 },
]);

const LUNES_AUTORIDAD: PlanReading[] = numbered([
  { book: "Matthew", chapter: 21, verses: "12-22" },
  { book: "Mark", chapter: 11, verses: "12-26" },
  { book: "Luke", chapter: 19, verses: "45-48" },
]);

const ENTRADA_TRIUNFAL: PlanReading[] = numbered([
  { book: "Zechariah", chapter: 9, verses: "9-12", topic: { en: "Prophecy of the King", es: "Profecía del Rey" } },
  { book: "Matthew", chapter: 21, verses: "1-11" },
  { book: "Mark", chapter: 11, verses: "1-11" },
  { book: "Luke", chapter: 19, verses: "28-44" },
  { book: "John", chapter: 12, verses: "12-19" },
]);

/* ------------------------ New thematic plans ------------------------ */

const DISCIPULADO_VIDA_10: PlanReading[] = numbered([
  { book: "Luke", chapter: 9, verses: "23-27", topic: { en: "Take up your cross", es: "Toma tu cruz" } },
  { book: "John", chapter: 13, verses: "34-35", topic: { en: "Love as Jesus loved", es: "Amar como Jesus amo" } },
  { book: "Matthew", chapter: 28, verses: "18-20", topic: { en: "The Great Commission", es: "La Gran Comision" } },
  { book: "Acts", chapter: 2, verses: "42-47", topic: { en: "Life in community", es: "Vida en comunidad" } },
  { book: "Romans", chapter: 12, verses: "1-2", topic: { en: "Renewed mind", es: "Mente renovada" } },
  { book: "Galatians", chapter: 5, verses: "22-26", topic: { en: "Fruit of the Spirit", es: "Fruto del Espiritu" } },
  { book: "Ephesians", chapter: 4, verses: "1-6", topic: { en: "Walk worthy", es: "Andar digno" } },
  { book: "Colossians", chapter: 3, verses: "12-17", topic: { en: "Put on Christ", es: "Vestirse de Cristo" } },
  { book: "2 Timothy", chapter: 2, verses: "1-7", topic: { en: "Faithful disciples", es: "Discipulos fieles" } },
  { book: "James", chapter: 1, verses: "22-27", topic: { en: "Doers of the word", es: "Hacedores de la palabra" } },
]);

const SANIDAD_INTERIOR_7: PlanReading[] = numbered([
  { book: "Psalms", chapter: 34, verses: "17-20", topic: { en: "God near the brokenhearted", es: "Dios cerca del quebrantado" } },
  { book: "Psalms", chapter: 147, verses: "1-6", topic: { en: "He heals the broken", es: "El sana a los quebrantados" } },
  { book: "Isaiah", chapter: 53, verses: "4-6", topic: { en: "By his wounds", es: "Por sus heridas" } },
  { book: "Matthew", chapter: 11, verses: "28-30", topic: { en: "Come and rest", es: "Vengan y descansen" } },
  { book: "Mark", chapter: 5, verses: "25-34", topic: { en: "Healing by faith", es: "Sanidad por la fe" } },
  { book: "Luke", chapter: 4, verses: "18-19", topic: { en: "Good news for the wounded", es: "Buenas nuevas para el herido" } },
  { book: "1 Peter", chapter: 5, verses: "6-11", topic: { en: "Cast your anxiety", es: "Echa tu ansiedad" } },
]);

const ANSIEDAD_CONFIANZA_7: PlanReading[] = numbered([
  { book: "Philippians", chapter: 4, verses: "4-9", topic: { en: "Prayer over anxiety", es: "Oracion sobre ansiedad" } },
  { book: "Matthew", chapter: 6, verses: "25-34", topic: { en: "Do not worry", es: "No se afanen" } },
  { book: "Psalms", chapter: 46, verses: "1-11", topic: { en: "God is our refuge", es: "Dios es nuestro refugio" } },
  { book: "Isaiah", chapter: 41, verses: "8-13", topic: { en: "Do not fear", es: "No temas" } },
  { book: "1 Peter", chapter: 5, verses: "6-10", topic: { en: "He cares for you", es: "El tiene cuidado de ustedes" } },
  { book: "John", chapter: 14, verses: "1-6", topic: { en: "Let not your heart be troubled", es: "No se turbe su corazon" } },
  { book: "Romans", chapter: 8, verses: "31-39", topic: { en: "Nothing can separate us", es: "Nada nos separa" } },
]);

const SABIDURIA_DIARIA_14: PlanReading[] = numbered([
  { book: "Proverbs", chapter: 1, verses: "1-7" },
  { book: "Proverbs", chapter: 2, verses: "1-11" },
  { book: "Proverbs", chapter: 3, verses: "1-12" },
  { book: "Proverbs", chapter: 4, verses: "20-27" },
  { book: "Proverbs", chapter: 9, verses: "10-12" },
  { book: "Proverbs", chapter: 10, verses: "1-12" },
  { book: "Proverbs", chapter: 11, verses: "1-8" },
  { book: "Proverbs", chapter: 12, verses: "15-22" },
  { book: "Proverbs", chapter: 13, verses: "1-6" },
  { book: "Proverbs", chapter: 14, verses: "26-32" },
  { book: "Proverbs", chapter: 15, verses: "1-7" },
  { book: "Proverbs", chapter: 16, verses: "1-9" },
  { book: "Proverbs", chapter: 17, verses: "22-28" },
  { book: "James", chapter: 3, verses: "13-18", topic: { en: "Wisdom from above", es: "Sabiduria de lo alto" } },
]);

const VOCES_PROFETICAS_10: PlanReading[] = numbered([
  { book: "Isaiah", chapter: 6, verses: "1-8", topic: { en: "Here I am, send me", es: "Heme aqui, enviame" } },
  { book: "Jeremiah", chapter: 1, verses: "4-10", topic: { en: "Called from youth", es: "Llamado desde joven" } },
  { book: "Ezekiel", chapter: 37, verses: "1-10", topic: { en: "Dry bones live", es: "Huesos secos viven" } },
  { book: "Daniel", chapter: 2, verses: "20-23", topic: { en: "God reveals mysteries", es: "Dios revela misterios" } },
  { book: "Hosea", chapter: 6, verses: "1-3", topic: { en: "Return to the Lord", es: "Volvamos al Senor" } },
  { book: "Joel", chapter: 2, verses: "28-32", topic: { en: "I will pour out my Spirit", es: "Derramare mi Espiritu" } },
  { book: "Micah", chapter: 6, verses: "6-8", topic: { en: "What the Lord requires", es: "Lo que Dios demanda" } },
  { book: "Zechariah", chapter: 4, verses: "6-10", topic: { en: "Not by might", es: "No con ejercito" } },
  { book: "Malachi", chapter: 3, verses: "1-4", topic: { en: "The Lord is coming", es: "Viene el Senor" } },
  { book: "Acts", chapter: 2, verses: "14-21", topic: { en: "Prophecy fulfilled in Christ", es: "Profecia cumplida en Cristo" } },
]);

/* ------------------------ Registry ------------------------ */

export const PLAN_READINGS: Record<string, PlanReading[]> = {
  amor: AMOR,
  ansiedad: ANSIEDAD,
  sanidad: SANIDAD,
  enojo: ENOJO,
  esperanza: ESPERANZA,
  territorioFe: TERRITORIO_FE,
  isaiasConfianza: ISAIAS_CONFIANZA,
  isaiasSalvacion: ISAIAS_SALVACION,
  isaiasInmersion: ISAIAS_INMERSION,
  isaias5Dias: ISAIAS_5_DIAS,
  isaiasRecorrido: ISAIAS_RECORRIDO,
  sobreEstaRoca: SOBRE_ESTA_ROCA,
  pascuaPreparacion: PASCUA_PREPARACION,
  milagrosJesus: MILAGROS_JESUS,
  epifaniaCristo: EPIFANIA_CRISTO,
  buscarReino: BUSCAR_REINO,
  tierraSanta: TIERRA_SANTA,
  esterilFructifero: ESTERIL_FRUCTIFERO,
  corazonesAnsiosos: CORAZONES_ANSIOSOS,
  viajeJuan: VIAJE_JUAN,
  proverbios: PROVERBIOS,
  historiaRedencion: HISTORIA_REDENCION,
  bibliaAnoClasico: BIBLIA_ANO_CLASICO,
  cronologico: CRONOLOGICO,
  evangelioMes: EVANGELIO_MES,
  planTematico: PLAN_TEMATICO,
  salmos150: SALMOS_150,
  nt90: NT_90,
  at180: AT_180,
  bibliaConJesus: BIBLIA_CON_JESUS,
  renovarFe10: RENOVAR_FE_10,
  preparacionPasion14: PREPARACION_PASION_14,
  domingoResurreccion: DOMINGO_RESURRECCION,
  sabadoSilencio: SABADO_SILENCIO,
  sietePalabras: SIETE_PALABRAS,
  viernesMuerte: VIERNES_MUERTE,
  juevesMesa: JUEVES_MESA,
  miercolesDescanso: MIERCOLES_DESCANSO,
  martesControversia: MARTES_CONTROVERSIA,
  lunesAutoridad: LUNES_AUTORIDAD,
  entradaTriunfal: ENTRADA_TRIUNFAL,
  discipuladoVida10: DISCIPULADO_VIDA_10,
  sanidadInterior7: SANIDAD_INTERIOR_7,
  ansiedadConfianza7: ANSIEDAD_CONFIANZA_7,
  sabiduriaDiaria14: SABIDURIA_DIARIA_14,
  vocesProfeticas10: VOCES_PROFETICAS_10,
};

export function getPlanReadings(planId: string): PlanReading[] {
  return PLAN_READINGS[planId] ?? [];
}
