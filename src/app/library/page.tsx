
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Search, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';
import { applyNarratorSettings } from '@/lib/speech';

const PSALM_23_TEXT = {
  es: `Salmo 23. El Señor es mi pastor; nada me faltará.
En lugares de delicados pastos me hará descansar.
Junto a aguas de reposo me pastoreará.
Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.
Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo;
tu vara y tu cayado me infundirán aliento.
Aderezas mesa delante de mí en presencia de mis angustiadores;
unges mi cabeza con aceite; mi copa está rebosando.
Ciertamente el bien y la misericordia me seguirán todos los días de mi vida,
y en la casa del Señor moraré por largos días.`,
  en: `Psalm 23. The Lord is my shepherd; I shall not want.
He makes me lie down in green pastures.
He leads me beside still waters.
He restores my soul.
He leads me in paths of righteousness for his name's sake.
Even though I walk through the valley of the shadow of death, I will fear no evil,
for you are with me; your rod and your staff, they comfort me.
You prepare a table before me in the presence of my enemies;
you anoint my head with oil; my cup overflows.
Surely goodness and mercy shall follow me all the days of my life,
and I shall dwell in the house of the Lord forever.`,
} as const;

const BOOK_PLAYER_SEGMENTS = {
  es: {
    psalms: [
      {
        title: 'El Libro de los Salmos',
        subtitle: 'Capítulo 23:1-2 - Un Salmo de David',
        text: 'El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar. Junto a aguas de reposo me pastoreará.',
      },
      {
        title: 'El Libro de los Salmos',
        subtitle: 'Capítulo 23:3-4 - Confianza en el valle',
        text: 'Confortará mi alma; me guiará por sendas de justicia por amor de su nombre. Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.',
      },
      {
        title: 'El Libro de los Salmos',
        subtitle: 'Capítulo 23:5-6 - Bondad para siempre',
        text: 'Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando. Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa del Señor moraré por largos días.',
      },
    ],
    genesis: [
      {
        title: 'El Libro de Génesis',
        subtitle: 'Capítulo 1 - En el principio',
        text: 'En el principio creó Dios los cielos y la tierra. Y dijo Dios: Sea la luz; y fue la luz. Y vio Dios que la luz era buena.',
      },
      {
        title: 'El Libro de Génesis',
        subtitle: 'Capítulo 2 - El huerto del Edén',
        text: 'Fueron, pues, acabados los cielos y la tierra, y todo el ejército de ellos. Tomó, pues, Jehová Dios al hombre, y lo puso en el huerto de Edén.',
      },
      {
        title: 'El Libro de Génesis',
        subtitle: 'Capítulo 3 - La caída',
        text: 'Pero la serpiente era astuta. Y vio la mujer que el árbol era bueno para comer. Entonces fueron abiertos los ojos de ambos.',
      },
    ],
    proverbs: [
      {
        title: 'El Libro de Proverbios',
        subtitle: 'Capítulo 1 - El principio de la sabiduría',
        text: 'El principio de la sabiduría es el temor de Jehová; los insensatos desprecian la sabiduría y la enseñanza.',
      },
      {
        title: 'El Libro de Proverbios',
        subtitle: 'Capítulo 2 - Tesoros de sabiduría',
        text: 'Porque Jehová da la sabiduría, y de su boca viene el conocimiento y la inteligencia. Él provee de sana sabiduría a los rectos.',
      },
      {
        title: 'El Libro de Proverbios',
        subtitle: 'Capítulo 3 - Confía en el Señor',
        text: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
      },
    ],
    john: [
      {
        title: 'El Evangelio según Juan',
        subtitle: 'Capítulo 1 - El Verbo hecho carne',
        text: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Y aquel Verbo fue hecho carne, y habitó entre nosotros.',
      },
      {
        title: 'El Evangelio según Juan',
        subtitle: 'Capítulo 2 - Las bodas de Caná',
        text: 'Y al tercer día se hicieron unas bodas en Caná de Galilea. Este principio de señales hizo Jesús, y manifestó su gloria.',
      },
      {
        title: 'El Evangelio según Juan',
        subtitle: 'Capítulo 3 - Nacer de nuevo',
        text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
      },
    ],
  },
  en: {
    psalms: [
      {
        title: 'The Book of Psalms',
        subtitle: 'Chapter 23:1-2 - A Psalm of David',
        text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.',
      },
      {
        title: 'The Book of Psalms',
        subtitle: 'Chapter 23:3-4 - Confidence in the valley',
        text: 'He restores my soul. He leads me in paths of righteousness for his name\'s sake. Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
      },
      {
        title: 'The Book of Psalms',
        subtitle: 'Chapter 23:5-6 - Goodness forever',
        text: 'You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows. Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.',
      },
    ],
    genesis: [
      {
        title: 'The Book of Genesis',
        subtitle: 'Chapter 1 - In the beginning',
        text: 'In the beginning God created the heavens and the earth. And God said, Let there be light: and there was light. And God saw the light, that it was good.',
      },
      {
        title: 'The Book of Genesis',
        subtitle: 'Chapter 2 - The garden of Eden',
        text: 'Thus the heavens and the earth were finished. And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it.',
      },
      {
        title: 'The Book of Genesis',
        subtitle: 'Chapter 3 - The fall',
        text: 'Now the serpent was more subtil than any beast of the field. And when the woman saw that the tree was good for food, she took of the fruit.',
      },
    ],
    proverbs: [
      {
        title: 'The Book of Proverbs',
        subtitle: 'Chapter 1 - The beginning of wisdom',
        text: 'The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction.',
      },
      {
        title: 'The Book of Proverbs',
        subtitle: 'Chapter 2 - Treasures of wisdom',
        text: 'For the Lord gives wisdom: out of his mouth comes knowledge and understanding. He lays up sound wisdom for the righteous.',
      },
      {
        title: 'The Book of Proverbs',
        subtitle: 'Chapter 3 - Trust in the Lord',
        text: 'Trust in the Lord with all your heart; and lean not unto your own understanding. In all your ways acknowledge him, and he shall direct your paths.',
      },
    ],
    john: [
      {
        title: 'The Gospel of John',
        subtitle: 'Chapter 1 - The Word made flesh',
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God. And the Word was made flesh, and dwelt among us.',
      },
      {
        title: 'The Gospel of John',
        subtitle: 'Chapter 2 - The wedding at Cana',
        text: 'And the third day there was a marriage in Cana of Galilee. This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory.',
      },
      {
        title: 'The Gospel of John',
        subtitle: 'Chapter 3 - You must be born again',
        text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believes in him should not perish, but have everlasting life.',
      },
    ],
  },
} as const;

const BIBLE_DIVISIONS = {
  es: {
    oldTestamentTitle: 'Antiguo Testamento (39 libros)',
    newTestamentTitle: 'Nuevo Testamento (27 libros)',
    old: [
      { label: 'La Ley (5)', books: ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio'] },
      { label: 'Históricos (12)', books: ['Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester'] },
      { label: 'Poéticos (5)', books: ['Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares'] },
      { label: 'Profetas Mayores (5)', books: ['Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel'] },
      { label: 'Profetas Menores (12)', books: ['Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías'] },
    ],
    new: [
      { label: 'Evangelios (4)', books: ['Mateo', 'Marcos', 'Lucas', 'Juan'] },
      { label: 'Histórico (1)', books: ['Hechos'] },
      { label: 'Epístolas Paulinas (13)', books: ['Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón'] },
      { label: 'Epístolas Generales (8)', books: ['Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas'] },
      { label: 'Profético (1)', books: ['Apocalipsis'] },
    ],
  },
  en: {
    oldTestamentTitle: 'Old Testament (39 books)',
    newTestamentTitle: 'New Testament (27 books)',
    old: [
      { label: 'Law (5)', books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'] },
      { label: 'History (12)', books: ['Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther'] },
      { label: 'Poetry (5)', books: ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs'] },
      { label: 'Major Prophets (5)', books: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel'] },
      { label: 'Minor Prophets (12)', books: ['Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'] },
    ],
    new: [
      { label: 'Gospels (4)', books: ['Matthew', 'Mark', 'Luke', 'John'] },
      { label: 'History (1)', books: ['Acts'] },
      { label: 'Pauline Epistles (13)', books: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon'] },
      { label: 'General Epistles (8)', books: ['Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude'] },
      { label: 'Prophetic (1)', books: ['Revelation'] },
    ],
  },
} as const;

export default function LibraryPage() {
  const { t, lang } = useI18n();
  const psalmsHero = PlaceHolderImages.find(img => img.id === 'psalms-hero');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeBook, setActiveBook] = React.useState<'psalms' | 'genesis' | 'proverbs' | 'john'>('psalms');
  const [currentSegment, setCurrentSegment] = React.useState(0);
  const [selectedVerseText, setSelectedVerseText] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(70);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = React.useRef<number | null>(null);
  const activeSegments = BOOK_PLAYER_SEGMENTS[lang === 'es' ? 'es' : 'en'][activeBook];
  const segment = activeSegments[currentSegment] ?? activeSegments[0];
  const currentVerses = React.useMemo(
    () =>
      segment.text
        .split(/(?<=[.!?])\s+/)
        .map((verse) => verse.trim())
        .filter(Boolean),
    [segment.text]
  );
  const recentlyPlayed = React.useMemo(
    () => [
      {
        id: 'genesis' as const,
        title: lang === 'es' ? 'Génesis' : 'Genesis',
        subtitle: lang === 'es' ? 'Capítulo 1 - En el principio' : 'Chapter 1 - In the beginning',
        image: PlaceHolderImages.find((img) => img.id === 'genesis-card'),
      },
      {
        id: 'proverbs' as const,
        title: lang === 'es' ? 'Proverbios' : 'Proverbs',
        subtitle: lang === 'es' ? 'Capítulo 3 - Confía en el Señor' : 'Chapter 3 - Trust in the Lord',
        image: PlaceHolderImages.find((img) => img.id === 'proverbs-card'),
      },
      {
        id: 'john' as const,
        title: lang === 'es' ? 'Juan' : 'John',
        subtitle: lang === 'es' ? 'Capítulo 14 - El Camino, la Verdad' : 'Chapter 14 - The Way, the Truth',
        image: PlaceHolderImages.find((img) => img.id === 'john-card'),
      },
    ],
    [lang]
  );
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRecentlyPlayed = React.useMemo(() => {
    if (!normalizedQuery) return recentlyPlayed;
    return recentlyPlayed.filter((item) =>
      `${item.title} ${item.subtitle}`.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery, recentlyPlayed]);
  const bibleDivisions = BIBLE_DIVISIONS[lang === 'es' ? 'es' : 'en'];

  const clearProgressTimer = React.useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const stopPsalmAudio = React.useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    clearProgressTimer();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    utteranceRef.current = null;
  }, [clearProgressTimer]);

  const startProgressTimer = React.useCallback(() => {
    clearProgressTimer();
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 2800);
  }, [clearProgressTimer]);

  const playPsalmAudio = React.useCallback((segmentText?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const textToPlay = segmentText ?? selectedVerseText ?? segment.text;
    const isManualSegmentChange = typeof segmentText === 'string';

    if (isPlaying && isPaused && !isManualSegmentChange) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      startProgressTimer();
      return;
    }

    if (isPlaying && !isPaused && !isManualSegmentChange) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      clearProgressTimer();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToPlay);
    utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
    applyNarratorSettings(utterance);
    utterance.volume = Math.max(0, Math.min(1, volume / 100));

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
      startProgressTimer();
    };

    utterance.onend = () => {
      clearProgressTimer();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      clearProgressTimer();
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [clearProgressTimer, isPaused, isPlaying, lang, segment.text, selectedVerseText, startProgressTimer, volume]);

  const goToSegment = React.useCallback((direction: 'prev' | 'next') => {
    setCurrentSegment((prev) => {
      const total = activeSegments.length;
      const nextIndex = direction === 'next'
        ? (prev + 1) % total
        : (prev - 1 + total) % total;
      const nextSegment = activeSegments[nextIndex];
      setSelectedVerseText(null);
      playPsalmAudio(nextSegment.text);
      return nextIndex;
    });
  }, [activeSegments, playPsalmAudio]);

  const handleBookCardClick = React.useCallback((bookId: 'genesis' | 'proverbs' | 'john') => {
    const libraryByLang = BOOK_PLAYER_SEGMENTS[lang === 'es' ? 'es' : 'en'];
    const firstChapter = libraryByLang[bookId][0];
    setActiveBook(bookId);
    setCurrentSegment(0);
    setSelectedVerseText(null);
    playPsalmAudio(firstChapter.text);
  }, [lang, playPsalmAudio]);

  const handleVerseSelect = React.useCallback((verseText: string) => {
    setSelectedVerseText(verseText);
    playPsalmAudio(verseText);
  }, [playPsalmAudio]);

  React.useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, [volume]);

  React.useEffect(() => {
    setCurrentSegment(0);
    setSelectedVerseText(null);
    stopPsalmAudio();
  }, [lang, stopPsalmAudio]);

  React.useEffect(() => {
    return () => {
      stopPsalmAudio();
    };
  }, [stopPsalmAudio]);

  const renderBibleChapters = () => (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Audio Player Hero */}
      <div className="relative h-[450px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl">
        <Image
          src={psalmsHero?.imageUrl || ''}
          alt="Audio Player Background"
          fill
          className="object-cover"
          priority
          data-ai-hint="forest sunlight"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end md:flex-row md:items-end md:justify-between gap-12">
          <div className="text-white space-y-4 max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">
              {lang === 'es' ? 'REPRODUCIENDO' : t('library.nowPlaying')}
            </span>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              {segment.title}
            </h2>
            <p className="text-lg md:text-xl font-medium text-white/80">
              {segment.subtitle}
            </p>
            <div className="max-w-2xl flex flex-wrap gap-2">
              {currentVerses.map((verse) => {
                const isSelected = selectedVerseText === verse;
                return (
                  <button
                    key={verse}
                    onClick={() => handleVerseSelect(verse)}
                    className={cn(
                      "text-left text-sm md:text-base leading-relaxed px-2 py-1 rounded-md transition-colors",
                      isSelected
                        ? "bg-white/25 text-white"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {verse}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full md:w-[380px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={() => goToSegment('prev')}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={lang === 'es' ? 'Detener audio' : 'Stop audio'}
              >
                <SkipBack className="w-6 h-6 fill-current" />
              </button>
              <button
                onClick={() => playPsalmAudio()}
                className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
                aria-label={
                  isPlaying && !isPaused
                    ? lang === 'es'
                      ? 'Pausar audio'
                      : 'Pause audio'
                    : lang === 'es'
                      ? 'Reproducir audio'
                      : 'Play audio'
                }
              >
                {isPlaying && !isPaused ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </button>
              <button
                onClick={() => goToSegment('next')}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={lang === 'es' ? 'Reproducir audio' : 'Play audio'}
              >
                <SkipForward className="w-6 h-6 fill-current" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-white/50 tracking-widest">
                <span>0:00</span>
                <span>-4:32</span>
              </div>
              <Slider value={[progress]} max={100} step={1} className="w-full" />
            </div>

            <div className="flex items-center gap-4 group">
              <Volume2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0] ?? 70)}
                max={100}
                step={1}
                className="flex-1"
              />
              <Volume2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-12">
            <button
              className={cn(
                "pb-6 text-sm font-bold tracking-tight transition-all relative text-blue-600",
                "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
              )}
            >
              {t('library.bibleChapters')}
            </button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600" />
          <Input 
            placeholder={t('library.searchPlaceholder')} 
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-14 h-14 bg-slate-50/50 dark:bg-slate-900/40 border-none rounded-full text-slate-900 dark:text-slate-100 placeholder:text-slate-300"
          />
        </div>

        {/* Recently Played */}
        <div className="space-y-10">
          <h3 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">{t('library.recentlyPlayed')}</h3>
          {filteredRecentlyPlayed.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRecentlyPlayed.map((item, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => handleBookCardClick(item.id)}>
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src={item.image?.imageUrl || ''}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.image?.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-blue-600">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 px-4">
                  <h4 className="text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{item.subtitle}</p>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 p-8 text-slate-500 dark:text-slate-400">
              {lang === 'es'
                ? 'No se encontraron capítulos con ese texto.'
                : 'No chapters found for that search.'}
            </div>
          )}
        </div>

        <div className="space-y-10">
          <h3 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">
            {lang === 'es' ? 'Libros de la Biblia' : 'Books of the Bible'}
          </h3>

          <div className="space-y-6">
            <div className="inline-flex px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold">
              {bibleDivisions.oldTestamentTitle}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {bibleDivisions.old.map((group) => (
                <div key={group.label} className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/10 p-4 space-y-3">
                  <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">{group.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.books.map((book) => (
                      <span key={book} className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 border border-amber-100 dark:border-amber-900/30">
                        {book}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
              {bibleDivisions.newTestamentTitle}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {bibleDivisions.new.map((group) => (
                <div key={group.label} className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-900/10 p-4 space-y-3">
                  <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300">{group.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.books.map((book) => (
                      <span key={book} className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 border border-blue-100 dark:border-blue-900/30">
                        {book}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-10">
          <h1 className="text-6xl font-headline font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('library.title')}
          </h1>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-blue-600 text-white shadow-xl shadow-blue-200">
              {t('explore.scripture')}
            </button>
          </div>
        </header>

        {renderBibleChapters()}
      </main>

      <Footer />
    </div>
  );
}
