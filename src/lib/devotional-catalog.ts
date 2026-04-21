export type DevotionalCatalogItem = {
  id: string;
  title: { en: string; es: string };
  author: string;
  tradition: { en: string; es: string };
  scripture: string;
  summary: { en: string; es: string };
};

export const DEVOTIONAL_CATALOG: DevotionalCatalogItem[] = [
  {
    id: "spurgeon-grace",
    title: { en: "Morning Grace", es: "Gracia de la Manana" },
    author: "Charles H. Spurgeon",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Lamentations 3:22-23",
    summary: {
      en: "The mercy of God is renewed each morning for the weary heart.",
      es: "La misericordia de Dios se renueva cada manana para el corazon cansado.",
    },
  },
  {
    id: "piper-joy",
    title: { en: "Joy in God", es: "Gozo en Dios" },
    author: "John Piper",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Psalm 16:11",
    summary: {
      en: "True joy is not found in circumstances but in the presence of God.",
      es: "El gozo verdadero no esta en las circunstancias sino en la presencia de Dios.",
    },
  },
  {
    id: "stanley-trust",
    title: { en: "Trusting the Path", es: "Confiar en el Camino" },
    author: "Charles Stanley",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Proverbs 3:5-6",
    summary: {
      en: "God directs those who surrender their plans and trust His wisdom.",
      es: "Dios dirige a quienes rinden sus planes y confian en su sabiduria.",
    },
  },
  {
    id: "warren-purpose",
    title: { en: "A Life of Purpose", es: "Una Vida con Proposito" },
    author: "Rick Warren",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Ephesians 2:10",
    summary: {
      en: "You were created on purpose and for the works prepared by God.",
      es: "Fuiste creado con proposito y para las obras que Dios preparo.",
    },
  },
  {
    id: "beth-steadfast",
    title: { en: "Steadfast Heart", es: "Corazon Firme" },
    author: "Beth Moore",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Isaiah 26:3",
    summary: {
      en: "Peace comes when the mind remains fixed on the Lord.",
      es: "La paz llega cuando la mente permanece fija en el Senor.",
    },
  },
  {
    id: "keller-gospel",
    title: { en: "Gospel Identity", es: "Identidad del Evangelio" },
    author: "Timothy Keller",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Romans 8:1",
    summary: {
      en: "In Christ there is no condemnation, only grace that transforms.",
      es: "En Cristo no hay condenacion, solo gracia que transforma.",
    },
  },
  {
    id: "sproul-holiness",
    title: { en: "The Holy God", es: "El Dios Santo" },
    author: "R. C. Sproul",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Isaiah 6:3",
    summary: {
      en: "Seeing God's holiness deepens reverence and dependence.",
      es: "Ver la santidad de Dios profundiza la reverencia y la dependencia.",
    },
  },
  {
    id: "packer-known",
    title: { en: "Knowing God", es: "Conocer a Dios" },
    author: "J. I. Packer",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Jeremiah 9:23-24",
    summary: {
      en: "The greatest treasure is not achievement but knowing the Lord.",
      es: "El mayor tesoro no es el logro, sino conocer al Senor.",
    },
  },
  {
    id: "ferguson-union",
    title: { en: "United with Christ", es: "Unidos a Cristo" },
    author: "Sinclair Ferguson",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "John 15:5",
    summary: {
      en: "Abiding in Christ is the source of lasting fruitfulness.",
      es: "Permanecer en Cristo es la fuente de una vida fructifera.",
    },
  },
  {
    id: "lloyd-jones-power",
    title: { en: "Strength in Weakness", es: "Fortaleza en Debilidad" },
    author: "Martyn Lloyd-Jones",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "2 Corinthians 12:9",
    summary: {
      en: "God's power is made perfect where human strength ends.",
      es: "El poder de Dios se perfecciona donde termina la fuerza humana.",
    },
  },
  {
    id: "wesley-holiness",
    title: { en: "Practical Holiness", es: "Santidad Practica" },
    author: "John Wesley",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "1 Peter 1:15-16",
    summary: {
      en: "Holiness is love expressed in everyday obedience.",
      es: "La santidad es amor expresado en obediencia diaria.",
    },
  },
  {
    id: "oswald-surrender",
    title: { en: "Absolute Surrender", es: "Rendicion Total" },
    author: "Oswald Chambers",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "Luke 9:23",
    summary: {
      en: "Discipleship begins when we yield everything to Christ.",
      es: "El discipulado comienza cuando rendimos todo a Cristo.",
    },
  },
  {
    id: "tozer-hunger",
    title: { en: "Holy Hunger", es: "Hambre Santa" },
    author: "A. W. Tozer",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "Psalm 42:1",
    summary: {
      en: "A thirsty soul seeks God above all temporary satisfactions.",
      es: "Un alma sedienta busca a Dios sobre toda satisfaccion temporal.",
    },
  },
  {
    id: "e-stanley-prayer",
    title: { en: "Prayer and Perseverance", es: "Oracion y Perseverancia" },
    author: "Elijah Hedding Stanley",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "1 Thessalonians 5:17",
    summary: {
      en: "A praying church becomes a persevering church.",
      es: "Una iglesia que ora se convierte en una iglesia perseverante.",
    },
  },
  {
    id: "frances-newheart",
    title: { en: "New Heart", es: "Corazon Nuevo" },
    author: "Frances Asbury",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "Ezekiel 36:26",
    summary: {
      en: "The Spirit renews the heart for a life of mission and grace.",
      es: "El Espiritu renueva el corazon para una vida de mision y gracia.",
    },
  },
  {
    id: "iciar-olayo-quiet",
    title: { en: "Quiet Before God", es: "Quietud Ante Dios" },
    author: "Pastor Jose Olayo",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Psalm 46:10",
    summary: {
      en: "Stillness is not emptiness; it is space for hearing God's voice.",
      es: "La quietud no es vacio; es espacio para escuchar la voz de Dios.",
    },
  },
  {
    id: "iciar-luis-renew",
    title: { en: "Renewed Mind", es: "Mente Renovada" },
    author: "Diacono Luis H.",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Romans 12:2",
    summary: {
      en: "Transformation starts in the mind and is visible in daily choices.",
      es: "La transformacion inicia en la mente y se refleja en decisiones diarias.",
    },
  },
  {
    id: "iciar-raquel-mercy",
    title: { en: "New Mercies", es: "Misericordias Nuevas" },
    author: "Hermana Raquel S.",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Lamentations 3:22-23",
    summary: {
      en: "Every morning brings enough mercy for today's burden.",
      es: "Cada manana trae misericordia suficiente para la carga de hoy.",
    },
  },
  {
    id: "iciar-maria-trust",
    title: { en: "Trust with All Your Heart", es: "Confia con Todo tu Corazon" },
    author: "Maria Fernanda C.",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Proverbs 3:5-6",
    summary: {
      en: "God straightens paths when we stop leaning on our own logic.",
      es: "Dios endereza caminos cuando dejamos de apoyarnos en nuestra propia logica.",
    },
  },
  {
    id: "iciar-community-hope",
    title: { en: "Community of Hope", es: "Comunidad de Esperanza" },
    author: "Equipo ICIAR Nayarit",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Hebrews 10:24-25",
    summary: {
      en: "Faith grows stronger when we gather, serve, and encourage one another.",
      es: "La fe crece cuando nos reunimos, servimos y nos animamos mutuamente.",
    },
  },
  {
    id: "spurgeon-faithfulness",
    title: { en: "Faithful Through Trials", es: "Fiel en la Prueba" },
    author: "Charles H. Spurgeon",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Isaiah 43:2",
    summary: {
      en: "God walks with His people through deep waters and fire.",
      es: "Dios camina con su pueblo en aguas profundas y en el fuego.",
    },
  },
  {
    id: "adoniram-missions",
    title: { en: "Heart for the Nations", es: "Corazon para las Naciones" },
    author: "Adoniram Judson",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Matthew 24:14",
    summary: {
      en: "The gospel advances through sacrifice, prayer, and perseverance.",
      es: "El evangelio avanza con sacrificio, oracion y perseverancia.",
    },
  },
  {
    id: "lottie-prayer",
    title: { en: "Pray and Send", es: "Ora y Envia" },
    author: "Lottie Moon",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Romans 10:14-15",
    summary: {
      en: "Mission grows when the church prays and gives generously.",
      es: "La mision crece cuando la iglesia ora y da con generosidad.",
    },
  },
  {
    id: "mullins-freedom",
    title: { en: "Freedom in Truth", es: "Libertad en la Verdad" },
    author: "E. Y. Mullins",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "John 8:31-32",
    summary: {
      en: "Spiritual freedom is found by abiding in Christ's word.",
      es: "La libertad espiritual se encuentra permaneciendo en la palabra.",
    },
  },
  {
    id: "moody-revival",
    title: { en: "Revive Us, Lord", es: "Avivanos, Senor" },
    author: "D. L. Moody",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Habakkuk 3:2",
    summary: {
      en: "Revival begins in repentant hearts hungry for God.",
      es: "El avivamiento comienza en corazones arrepentidos y hambrientos.",
    },
  },
  {
    id: "keller-city",
    title: { en: "Seek the City's Good", es: "Busca el Bien de la Ciudad" },
    author: "Timothy Keller",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Jeremiah 29:7",
    summary: {
      en: "Christians serve their city with justice, mercy, and humility.",
      es: "El creyente sirve su ciudad con justicia, misericordia y humildad.",
    },
  },
  {
    id: "sproul-grace",
    title: { en: "Astonished by Grace", es: "Asombrados por la Gracia" },
    author: "R. C. Sproul",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Ephesians 2:8-9",
    summary: {
      en: "Salvation is God's gift from beginning to end.",
      es: "La salvacion es regalo de Dios de principio a fin.",
    },
  },
  {
    id: "ferguson-humility",
    title: { en: "The Way of Humility", es: "El Camino de la Humildad" },
    author: "Sinclair Ferguson",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Philippians 2:3-5",
    summary: {
      en: "Christlike humility restores relationships and honors God.",
      es: "La humildad de Cristo restaura relaciones y honra a Dios.",
    },
  },
  {
    id: "packer-spirit",
    title: { en: "Walk by the Spirit", es: "Camina en el Espiritu" },
    author: "J. I. Packer",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Galatians 5:16",
    summary: {
      en: "The Spirit empowers holiness in ordinary daily choices.",
      es: "El Espiritu capacita para santidad en decisiones diarias.",
    },
  },
  {
    id: "lloyd-jones-prayer",
    title: { en: "Power in Prayer", es: "Poder en la Oracion" },
    author: "Martyn Lloyd-Jones",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Ephesians 6:18",
    summary: {
      en: "Prayer is not backup; it is the battle line of faith.",
      es: "La oracion no es respaldo; es la linea de batalla de la fe.",
    },
  },
  {
    id: "wesley-love",
    title: { en: "Perfecting Love", es: "Perfeccionando el Amor" },
    author: "John Wesley",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "1 John 4:18",
    summary: {
      en: "God's perfect love drives out fear and shapes holy living.",
      es: "El amor perfecto de Dios echa fuera el temor y forma la santidad.",
    },
  },
  {
    id: "oswald-faith",
    title: { en: "Faith Beyond Feeling", es: "Fe Mas Alla del Sentir" },
    author: "Oswald Chambers",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "2 Corinthians 5:7",
    summary: {
      en: "Faith obeys the Word even when emotions feel weak.",
      es: "La fe obedece la Palabra aun cuando las emociones son debiles.",
    },
  },
  {
    id: "tozer-worship",
    title: { en: "Holy Worship", es: "Adoracion Santa" },
    author: "A. W. Tozer",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "John 4:23-24",
    summary: {
      en: "True worship flows from truth, awe, and surrender.",
      es: "La adoracion verdadera nace de la verdad, el asombro y la rendicion.",
    },
  },
  {
    id: "frances-obedience",
    title: { en: "Simple Obedience", es: "Obediencia Sencilla" },
    author: "Frances Asbury",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "John 14:15",
    summary: {
      en: "Loving Christ is seen through concrete obedience.",
      es: "Amar a Cristo se ve en una obediencia concreta.",
    },
  },
  {
    id: "hedding-grace",
    title: { en: "Grace for the Journey", es: "Gracia para el Camino" },
    author: "Elijah Hedding Stanley",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "Hebrews 4:16",
    summary: {
      en: "In every need, God offers timely grace at His throne.",
      es: "En toda necesidad, Dios ofrece gracia oportuna en su trono.",
    },
  },
  {
    id: "iciar-pastoral-care",
    title: { en: "Pastoral Care", es: "Cuidado Pastoral" },
    author: "Pastor Jose Olayo",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "1 Peter 5:2-3",
    summary: {
      en: "Shepherding reflects Christ when done with humility and love.",
      es: "Pastorear refleja a Cristo cuando se hace con humildad y amor.",
    },
  },
  {
    id: "iciar-family-prayer",
    title: { en: "Family Prayer", es: "Oracion en Familia" },
    author: "Equipo ICIAR Familias",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Joshua 24:15",
    summary: {
      en: "Homes that seek the Lord become altars of peace.",
      es: "Los hogares que buscan al Senor se vuelven altares de paz.",
    },
  },
  {
    id: "iciar-youth-fire",
    title: { en: "Youth on Fire", es: "Jovenes en Fuego" },
    author: "Ministerio Juvenil ICIAR",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "1 Timothy 4:12",
    summary: {
      en: "Young believers can model faith, purity, and courage.",
      es: "Los jovenes pueden modelar fe, pureza y valentia.",
    },
  },
  {
    id: "iciar-service",
    title: { en: "Serve with Joy", es: "Servir con Gozo" },
    author: "Diacono Luis H.",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Galatians 5:13",
    summary: {
      en: "Serving others in love reveals Christ to the world.",
      es: "Servir a otros con amor revela a Cristo al mundo.",
    },
  },
  {
    id: "iciar-women-hope",
    title: { en: "Hope for Women", es: "Esperanza para Mujeres" },
    author: "Ministerio de Damas ICIAR",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Psalm 62:5",
    summary: {
      en: "Rest in God renews strength for every season of life.",
      es: "Descansar en Dios renueva fuerzas en cada temporada.",
    },
  },
  {
    id: "edwards-resolve",
    title: { en: "Holy Resolve", es: "Resolucion Santa" },
    author: "Jonathan Edwards",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Colossians 3:17",
    summary: {
      en: "Every action can become worship when done in Jesus' name.",
      es: "Toda accion puede ser adoracion cuando se hace en el nombre de Jesus.",
    },
  },
  {
    id: "calvin-scripture",
    title: { en: "Scripture and Life", es: "Escritura y Vida" },
    author: "John Calvin",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Psalm 119:105",
    summary: {
      en: "God's Word illuminates the path of faithful living.",
      es: "La Palabra de Dios ilumina el camino de una vida fiel.",
    },
  },
  {
    id: "knox-courage",
    title: { en: "Courage in Truth", es: "Valentia en la Verdad" },
    author: "John Knox",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Acts 4:29",
    summary: {
      en: "Bold faith speaks truth even in hostile times.",
      es: "La fe valiente habla verdad aun en tiempos hostiles.",
    },
  },
  {
    id: "tim-bridges-grace",
    title: { en: "Disciplined by Grace", es: "Disciplinados por la Gracia" },
    author: "Jerry Bridges",
    tradition: { en: "Presbyterian", es: "Presbiteriano" },
    scripture: "Titus 2:11-12",
    summary: {
      en: "Grace trains believers to live godly in the present age.",
      es: "La gracia entrena al creyente para vivir piadosamente hoy.",
    },
  },
  {
    id: "bunyan-pilgrim",
    title: { en: "Pilgrim's Hope", es: "Esperanza del Peregrino" },
    author: "John Bunyan",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Hebrews 11:13-16",
    summary: {
      en: "Believers walk as pilgrims toward a better country.",
      es: "Los creyentes caminan como peregrinos hacia una patria mejor.",
    },
  },
  {
    id: "carey-go",
    title: { en: "Expect Great Things", es: "Espera Grandes Cosas" },
    author: "William Carey",
    tradition: { en: "Baptist", es: "Bautista" },
    scripture: "Mark 16:15",
    summary: {
      en: "Mission starts with faith that God can do the impossible.",
      es: "La mision inicia creyendo que Dios puede hacer lo imposible.",
    },
  },
  {
    id: "luther-righteousness",
    title: { en: "Righteous by Faith", es: "Justos por Fe" },
    author: "Martin Luther",
    tradition: { en: "Methodist", es: "Metodista" },
    scripture: "Romans 1:17",
    summary: {
      en: "The righteous live by faith in Christ alone.",
      es: "El justo vive por la fe en Cristo solamente.",
    },
  },
  {
    id: "iciar-evangelism",
    title: { en: "Witness with Love", es: "Testifica con Amor" },
    author: "Equipo de Evangelismo ICIAR",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "1 Peter 3:15",
    summary: {
      en: "Share your hope with gentleness, respect, and conviction.",
      es: "Comparte tu esperanza con mansedumbre, respeto y conviccion.",
    },
  },
  {
    id: "iciar-discipleship-path",
    title: { en: "Path of Discipleship", es: "Ruta de Discipulado" },
    author: "Ministerio de Discipulado ICIAR",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Matthew 4:19",
    summary: {
      en: "Following Jesus means learning, serving, and multiplying.",
      es: "Seguir a Jesus implica aprender, servir y multiplicar.",
    },
  },
  {
    id: "iciar-gratitude",
    title: { en: "Grateful Heart", es: "Corazon Agradecido" },
    author: "Comunidad ICIAR Nayarit",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "1 Thessalonians 5:18",
    summary: {
      en: "Gratitude reframes daily life under God's goodness.",
      es: "La gratitud reordena la vida diaria bajo la bondad de Dios.",
    },
  },
  {
    id: "iciar-peace",
    title: { en: "Peace in the Storm", es: "Paz en la Tormenta" },
    author: "Pastoral ICIAR",
    tradition: { en: "ICIAR", es: "ICIAR" },
    scripture: "Mark 4:39-40",
    summary: {
      en: "Christ speaks peace over storms outside and within.",
      es: "Cristo habla paz sobre tormentas externas e internas.",
    },
  },
];

