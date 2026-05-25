const deck = document.getElementById("deck");
const slideMetadata = Array.isArray(window.slideMetadata) ? window.slideMetadata : [];
const variants = ["variant-a", "variant-b", "variant-c", "variant-d"];

function normalizeLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function parseSlide(rawText) {
  const groups = String(rawText || "")
    .split("|")
    .map((group) => group.split(/\r?\n/).map(normalizeLine).filter(Boolean))
    .filter((group) => group.length > 0);

  const flatLines = groups.flat();
  const title = flatLines.shift() || "Diapositiva sin texto extraíble";
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

function getSlideImagePath(index) {
  return `./slides-export/Diapositiva${index}.PNG`;
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
  const presenterLine = parsed.flatLines[parsed.flatLines.length - 1] || "Material base de la materia";

  const section = document.createElement("section");
  section.className = "slide";
  section.id = "slide-1";

  section.innerHTML = `
    <div class="slide-shell cover-shell">
      <p class="eyebrow">Materia: Compiladores</p>
      <h2>${parsed.title || "Generación de Código Intermedio"}</h2>
      <p class="lead">
        Presentación web construida con el contenido del PPT de referencia y adaptada al estilo de la Exposición 2.
        Se conservan el orden temático, los conceptos y la secuencia original.
      </p>
      <div class="presenter-box">
        <p class="slide-note">Autores del material base</p>
        <div class="presenter-list">
          <span>${presenterLine}</span>
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildSourceCard(index, title, useImage) {
  const aside = document.createElement("aside");
  aside.className = useImage ? "source-card" : "empty-card";

  const heading = document.createElement("h3");
  heading.textContent = useImage ? "Referencia visual del material original" : "Referencia del PPT original";
  aside.appendChild(heading);

  if (useImage) {
    const image = document.createElement("img");
    image.src = getSlideImagePath(index);
    image.alt = `Referencia visual de la diapositiva ${index}: ${title}`;
    aside.appendChild(image);
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = useImage
    ? "La figura se mantiene como apoyo visual para no redibujar diagramas o capturas del libro."
    : "Abrí la lámina original si querés comparar el contenido exacto del PPT.";
  aside.appendChild(paragraph);

  return aside;
}

function buildContentSlide(entry, index) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = `slide ${variants[index % variants.length]}`;
  section.id = `slide-${index + 1}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <span class="slide-number">${String(index + 1).padStart(2, "0")}</span>
    <a class="ref-link" href="${getSlideImagePath(index + 1)}" target="_blank" rel="noreferrer">Ver diapositiva original</a>
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
    eyebrow.textContent = `Diapositiva ${index + 1}`;
    heading.appendChild(eyebrow);
  }

  const title = document.createElement("h2");
  title.textContent = parsed.title;
  heading.appendChild(title);

  const contentGrid = document.createElement("div");
  contentGrid.className = "content-grid";

  const contentMain = document.createElement("div");
  contentMain.className = "content-main";

  const contentSide = document.createElement("div");
  contentSide.className = "content-side";

  if (parsed.groups.length <= 1 && parsed.flatLines.length <= 1) {
    const empty = document.createElement("article");
    empty.className = "card";
    empty.innerHTML = `
      <h3>Contenido gráfico o mínimo</h3>
      <p>Esta lámina depende sobre todo de la composición visual del material original. Se deja la referencia al PPT para conservar figuras o diagramas sin copiarlos con CSS.</p>
    `;
    contentMain.appendChild(empty);
    contentSide.appendChild(buildSourceCard(index + 1, parsed.title, true));
  } else {
    parsed.groups.forEach((group, groupIndex) => {
      const cardTitle = groupIndex === 0 ? "Contenido" : `Detalle ${groupIndex + 1}`;
      contentMain.appendChild(createCard(cardTitle, group));
    });

    const useImage = parsed.groups.length < 3 || parsed.flatLines.length < 6;
    contentSide.appendChild(buildSourceCard(index + 1, parsed.title, useImage));
  }

  shell.appendChild(head);
  shell.appendChild(heading);
  contentGrid.appendChild(contentMain);
  contentGrid.appendChild(contentSide);
  shell.appendChild(contentGrid);
  section.appendChild(shell);
  return section;
}

function renderDeck() {
  deck.appendChild(buildCoverSlide());
  slideMetadata.slice(1).forEach((entry, index) => {
    deck.appendChild(buildContentSlide(entry, index + 1));
  });
}

renderDeck();
