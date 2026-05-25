const deck = document.getElementById("deck");
const coverAuthors = ["Ram\u00f3n Chacal", "Enzo Erico"];
const slideMetadata = Array.isArray(window.slideMetadata) ? window.slideMetadata : [];
const slideImages = window.slideImages || {};
const variants = ["variant-a", "variant-b", "variant-c", "variant-d"];
const agendaItems = [
  "Lenguajes intermedios",
  "Declaraciones",
  "Proposiciones de Asignaci\u00f3n",
  "Expresiones Booleanas",
  "Proposiciones Case",
  "Relleno con retroceso",
  "Llamada a procedimientos"
];

function normalizeLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function parseSlide(rawText) {
  const groups = String(rawText || "")
    .split("|")
    .map((group) => group.split(/\r?\n/).map(normalizeLine).filter(Boolean))
    .filter((group) => group.length > 0);

  const flatLines = groups.flat();
  const title = flatLines.shift() || "";
  let badge = "";

  if (flatLines[0] && /^\d+\.?$/.test(flatLines[0])) {
    badge = flatLines.shift();
  }

  return {
    title,
    badge,
    groups: groups.slice(1).map((group) => group.filter(Boolean)).filter((group) => group.length > 0),
    flatLines
  };
}

function getManifestImages(slideNumber) {
  return Array.isArray(slideImages[slideNumber]) ? slideImages[slideNumber] : [];
}

function getImageSrc(fileName) {
  return `./Im%C3%A1genes/${encodeURIComponent(fileName)}`;
}

function createCard(title, lines) {
  const article = document.createElement("article");
  article.className = "card";

  const heading = document.createElement("h3");
  heading.textContent = title;
  article.appendChild(heading);

  if (lines.length === 1) {
    const paragraph = document.createElement("p");
    paragraph.textContent = lines[0];
    article.appendChild(paragraph);
    return article;
  }

  const list = document.createElement("ol");
  list.className = "line-list";

  lines.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    list.appendChild(item);
  });

  article.appendChild(list);
  return article;
}

function buildCoverSlide() {
  const firstSlide = slideMetadata[0] ?? { text: "" };
  const parsed = parseSlide(firstSlide.text);

  const section = document.createElement("section");
  section.className = "slide";
  section.id = "slide-1";

  section.innerHTML = `
    <div class="slide-shell cover-shell">
      <p class="eyebrow">Materia: Compiladores</p>
      <h2>${parsed.title || "Generación de Código Intermedio"}</h2>
      <p class="lead">Tema central de la unidad dedicado a la representación intermedia y a su papel dentro del proceso de traducción.</p>
      <div class="presenter-box">
        <p class="slide-note">Autores</p>
        <div class="presenter-list">
          ${coverAuthors.map((author) => `<span>${author}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildAgendaSlide() {
  const section = document.createElement("section");
  section.className = "slide agenda-slide";
  section.id = "slide-2";

  const shell = document.createElement("div");
  shell.className = "slide-shell agenda-shell";

  const list = document.createElement("ol");
  list.className = "agenda-list";

  agendaItems.forEach((item) => {
    const entry = document.createElement("li");
    entry.innerHTML = `<span>${item}</span>`;
    list.appendChild(entry);
  });

  shell.appendChild(list);
  section.appendChild(shell);
  return section;
}

function buildVisualCard(slideNumber, title) {
  const files = getManifestImages(slideNumber);

  if (files.length === 0) {
    return null;
  }

  const aside = document.createElement("aside");
  aside.className = "source-card";

  const heading = document.createElement("h3");
  heading.textContent = files.length > 1 ? "Figuras del tema" : "Figura del tema";
  aside.appendChild(heading);

  const gallery = document.createElement("div");
  gallery.className = files.length > 1 ? "image-gallery multi" : "image-gallery";

  files.forEach((fileName, imageIndex) => {
    const image = document.createElement("img");
    image.src = getImageSrc(fileName);
    image.alt = `Figura ${imageIndex + 1} de la diapositiva ${slideNumber}: ${title}`;
    gallery.appendChild(image);
  });

  aside.appendChild(gallery);

  const paragraph = document.createElement("p");
  paragraph.textContent = "Figura de apoyo para acompañar la explicación del concepto.";
  aside.appendChild(paragraph);

  return aside;
}

function buildContentSlide(entry, index) {
  const slideNumber = index + 1;
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = `slide ${variants[index % variants.length]}`;
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <span class="slide-number">${String(slideNumber).padStart(2, "0")}</span>
  `;

  const heading = document.createElement("div");
  heading.className = "section-heading";

  if (parsed.badge) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = `Bloque ${parsed.badge}`;
    heading.appendChild(eyebrow);
  } else {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = `Diapositiva ${slideNumber}`;
    heading.appendChild(eyebrow);
  }

  if (parsed.title) {
    const title = document.createElement("h2");
    title.textContent = parsed.title;
    heading.appendChild(title);
  }

  const contentGrid = document.createElement("div");
  contentGrid.className = "content-grid";

  const contentMain = document.createElement("div");
  contentMain.className = "content-main";

  parsed.groups.forEach((group, groupIndex) => {
    const cardTitle = groupIndex === 0 ? "Contenido" : `Detalle ${groupIndex + 1}`;
    contentMain.appendChild(createCard(cardTitle, group));
  });

  const visualCard = buildVisualCard(slideNumber, parsed.title);
  if (!visualCard) {
    contentGrid.classList.add("content-grid-single");
  }

  shell.appendChild(head);
  shell.appendChild(heading);
  contentGrid.appendChild(contentMain);

  if (visualCard) {
    const contentSide = document.createElement("div");
    contentSide.className = "content-side";
    contentSide.appendChild(visualCard);
    contentGrid.appendChild(contentSide);
  }

  shell.appendChild(contentGrid);
  section.appendChild(shell);
  return section;
}

function renderDeck() {
  deck.appendChild(buildCoverSlide());
  deck.appendChild(buildAgendaSlide());
  slideMetadata.slice(2).forEach((entry, index) => {
    deck.appendChild(buildContentSlide(entry, index + 2));
  });
}

renderDeck();
