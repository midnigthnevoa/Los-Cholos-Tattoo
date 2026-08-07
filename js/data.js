/* =========================================================
   LOS CHOLOS TATTOO — Configuração central
   =========================================================
   >>> TUDO QUE É EDITÁVEL ESTÁ AQUI <<<
   As imagens ficam na pasta "img/" do site e são referenciadas
   aqui (ex: "img/trabalho-1.png"). Para adicionar/trocar fotos,
   coloque o arquivo na pasta img/ e atualize o nome abaixo.
   ========================================================= */

const SITE = {
  /* ---------- Contatos ---------- */
  artist: "Gustavo Silva",
  alias: "Tatuador & Artista Visual",
  studio: "Los Cholos Tattoo",
  whatsapp: "553198127551",
  phoneDisplay: "+55 31 9812-7551",
  whatsappBase: "https://wa.me/553198127551",
  email: "gustavoalbertons@gmail.com",
  instagram: "https://www.instagram.com/russ__ink/",
  instagramHandle: "@russ__ink",

  /* ---------- Localização ---------- */
  addressLine1: "R. Póvoa de Varzim, 240",
  addressLine2: "Paquetá",
  addressLine3: "Belo Horizonte - MG, CEP 31340-060",
  coords: "LAT: -19.8569 / LONG: -43.9566",

  /* ---------- Protocolo (textos técnicos) ---------- */
  protocol: "Los Cholos Protocol v.2026",
  copyright: "Los Cholos Tattoo // Blackwork & Dark Ornamental"
};

function wa(texto) {
  return SITE.whatsappBase + "?text=" + encodeURIComponent(texto);
}

/* ---------- Projetos da home (slider) ---------- */
const PROJECTS = [
  {
    id: "01",
    label: "Blackwork",
    title: "Contraste Absoluto",
    image: "img/trabalho-1.png",
    desc: "Preto sólido em composições de alto contraste. Texturas densas e formas que respeitam a anatomia do corpo em trabalhos de grande impacto.",
    features: ["Preto Sólido", "Contraste Dramático"]
  },
  {
    id: "02",
    label: "Dark Ornamental",
    title: "Manto Ornamental",
    image: "img/trabalho-2.png",
    desc: "Ornamentos escuros com filigranas e mandalas. Um estudo de densidade e respiro que envolve o corpo em desenhos de precisão milimétrica.",
    features: ["Filigranas", "Densidade"]
  },
  {
    id: "03",
    label: "Blackwork",
    title: "Composição Autoral",
    image: "img/trabalho-3.png",
    desc: "Desenhos que nascem do zero em parceria com cada cliente. Cada composição é única, pensada para dialogar com o corpo e a história de quem usa.",
    features: ["Design Exclusivo", "Autoral"]
  },
  {
    id: "04",
    label: "Chicano",
    title: "Cultura Latina",
    image: "img/trabalho-4.png",
    desc: "Homenagem às raízes da tatuagem latina: caligrafia marcante, simbologia e estética chicana com acabamento clássico.",
    features: ["Caligrafia", "Estética Latina"]
  },
  {
    id: "05",
    label: "Dark Ornamental",
    title: "Projeto Detalhado",
    image: "img/trabalho-5.png",
    desc: "Peças de fôlego longo, com sombreamento progressivo e micro detalhamento. Do traço à finalização, tudo sob curadoria no estúdio privado.",
    features: ["Micro Detalhamento", "Curadoria"]
  }
];

/* ---------- Catálogo de estilos ---------- */
const CATALOG = [
  {
    slug: "blackwork",
    title: "Blackwork",
    first: "Black",
    rest: "work",
    desc: "Preto absoluto com sombreamento preciso. Trabalhos que valorizam o contraste e a permanência do pigmento, do traço simples ao fechamento completo.",
    features: ["Preto Sólido", "Contraste Dramático", "Acabamento Puro"],
    images: [
      "img/trabalho-1.png",
      "img/trabalho-2.png"
    ]
  },
  {
    slug: "dark-ornamental",
    title: "Dark Ornamental",
    first: "Dark",
    rest: "Ornamental",
    desc: "Ornamentos escuros, filigranas e mandalas construídas com geometria precisa. Composições densas que fluem com a anatomia do corpo.",
    features: ["Filigranas", "Geometria Sagrada", "Alta Densidade"],
    images: [
      "img/trabalho-3.png"
    ]
  },
  {
    slug: "chicano",
    title: "Chicano & Cultura Latina",
    first: "Chicano",
    rest: "& Cultura Latina",
    desc: "A essência da cultura latina na pele: caligrafia, simbologia e estética chicana. Traços marcantes que contam histórias e homenageiam raízes.",
    features: ["Caligrafia", "Estética Latina", "Simbologia"],
    images: [
      "img/trabalho-4.png"
    ]
  },
  {
    slug: "projetos-autorais",
    title: "Projetos Autorais",
    first: "Projetos",
    rest: "Autorais",
    desc: "Composições desenhadas do zero em atendimento exclusivo. Sua história vira um design único, criado em parceria com o artista no estúdio privado.",
    features: ["Design Exclusivo", "Atendimento Privado", "Curadoria"],
    images: [
      "img/trabalho-5.png"
    ]
  }
];

/* ---------- Outras habilidades técnicas ---------- */
const SKILLS = [
  "Fechamento de Costas",
  "Blackwork Completo",
  "Dark Ornamental",
  "Chicano & Letras",
  "Projeto Autoral"
];

/* ---------- Imagens fixas ---------- */
const IMG = {
  artist: "img/artista.png",
  studio: "img/estudio.jpeg"
};
