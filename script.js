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
const whyIntermediateItems = [
  "Se facilita la redestinación; se puede crear un compilador para una máquina distinta uniendo una etapa final para la nueva máquina a una etapa inicial ya existente.",
  "Se puede aplicar a la representación intermedia un optimizador de código independiente de la máquina."
];
const sectionDividerSlides = new Set([4, 19, 34, 50, 69, 75, 91]);
const plainTextSlides = new Set([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
const interleavedLayouts = {
  22: ["text:0", "image:0", "text:1", "image:1"],
  24: ["text:0", "row:image=0+caption=1,image=1"],
  25: ["text:0", "row:image=0,image=1"],
  26: ["text:0", "image:0"],
  27: ["text:0", "image:0", "text:1"],
  30: ["text:0", "image:0", "text:1", "image:1"],
  32: ["image:0", "text:0", "text:1", "text:2", "image:1"]
};

function normalizeLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function parseSlide(rawText) {
  const groups = String(rawText || "")
    .split("|")
    .map((group) => group.split(/\r\n|\r|\n/).map(normalizeLine).filter(Boolean))
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

function inferCardTitle(lines, groupIndex) {
  const text = lines.join(" ").toLowerCase();

  if (text.includes("ejemplo")) {
    return "Ejemplo";
  }

  if (text.includes("defin") || text.includes("se define")) {
    return "Definición";
  }

  if (text.includes("ventaja") || text.includes("se facilita") || text.includes("se puede")) {
    return "Ventaja";
  }

  if (text.includes("código") || text.includes("goto") || text.includes(":=") || text.includes("param")) {
    return "Código";
  }

  if (text.includes("algoritmo") || text.includes("paso")) {
    return "Algoritmo";
  }

  if (text.includes("estructura") || text.includes("representación")) {
    return "Estructura";
  }

  if (text.includes("traducción") || text.includes("traduccion")) {
    return "Traducción";
  }

  if (text.includes("observ") || text.includes("obsérvese") || text.includes("nota")) {
    return "Observación";
  }

  if (text.includes("proceso") || text.includes("procedimiento") || text.includes("cómo") || text.includes("como")) {
    return "Proceso";
  }

  if (groupIndex === 0) {
    return "Idea clave";
  }

  if (groupIndex === 1) {
    return "Punto clave";
  }

  if (groupIndex === 2) {
    return "Conclusión";
  }

  return "Apunte";
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text) {
  let safe = escapeHtml(text);
  safe = safe.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return safe;
}

function createCard(title, lines) {
  const article = document.createElement("article");
  article.className = "card";

  if (title) {
    const heading = document.createElement("h3");
    heading.textContent = title;
    article.appendChild(heading);
  } else {
    article.classList.add("card-untitled");
  }

  if (lines.length === 0) {
    article.classList.add("card-title-only");
    return article;
  }

  if (lines.length === 1) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = renderInline(lines[0]);
    article.appendChild(paragraph);
    return article;
  }

  const list = document.createElement("ol");
  list.className = "line-list";

  lines.forEach((line) => {
    const item = document.createElement("li");
    item.innerHTML = renderInline(line);
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
      <h2>${parsed.title || "Generaci\u00f3n de C\u00f3digo Intermedio"}</h2>
      <p class="lead">Tema central de la unidad dedicado a la representaci\u00f3n intermedia y a su papel dentro del proceso de traducci\u00f3n.</p>
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

function buildWhyIntermediateSlide() {
  const files = getManifestImages(3);
  const section = document.createElement("section");
  section.className = "slide why-slide";
  section.id = "slide-3";

  const shell = document.createElement("div");
  shell.className = "slide-shell why-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <div class="slide-head-meta">
      <span class="slide-number">03</span>
      <span class="slide-label">Diapositiva 3</span>
    </div>
  `;

  const title = document.createElement("h2");
  title.className = "why-title";
  title.textContent = "¿Por qué usar código intermedio?";

  const list = document.createElement("ul");
  list.className = "why-list";

  whyIntermediateItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  shell.appendChild(head);
  shell.appendChild(title);
  shell.appendChild(list);

  if (files.length > 0) {
    const media = document.createElement("div");
    media.className = "why-media";

    files.forEach((fileName, imageIndex) => {
      const image = document.createElement("img");
      image.src = getImageSrc(fileName);
      image.alt = `Figura ${imageIndex + 1} de la diapositiva 3`;
      media.appendChild(image);
    });

    shell.appendChild(media);
  }

  section.appendChild(shell);
  return section;
}

function buildVisualCard(slideNumber, title) {
  if (slideNumber === 15) {
    return null;
  }

  const files = getManifestImages(slideNumber);

  if (files.length === 0) {
    return null;
  }

  const aside = document.createElement("aside");
  aside.className = "source-card";

  if (!plainTextSlides.has(slideNumber)) {
    const heading = document.createElement("h3");
    heading.textContent = files.length > 1 ? "Figuras del tema" : "Figura del tema";
    aside.appendChild(heading);
  } else {
    aside.classList.add("source-card-untitled");
  }

  const gallery = document.createElement("div");
  gallery.className = files.length > 1 ? "image-gallery multi" : "image-gallery";

  files.forEach((fileName, imageIndex) => {
    const image = document.createElement("img");
    image.src = getImageSrc(fileName);
    image.alt = `Figura ${imageIndex + 1} de la diapositiva ${slideNumber}: ${title}`;
    gallery.appendChild(image);
  });

  aside.appendChild(gallery);

  return aside;
}

function buildSectionDividerSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const badge = parsed.groups[0]?.[0] || parsed.badge || String(Math.ceil(slideNumber / 10)).padStart(2, "0");
  const files = getManifestImages(slideNumber);

  const section = document.createElement("section");
  section.className = "slide section-divider-slide";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell section-divider-shell";

  if (files.length > 0) {
    const media = document.createElement("div");
    media.className = files.length > 1 ? "section-divider-media multi" : "section-divider-media";

    files.forEach((fileName, imageIndex) => {
      const image = document.createElement("img");
      image.src = getImageSrc(fileName);
      image.alt = `Figura ${imageIndex + 1} de la secci\u00f3n ${badge}: ${parsed.title}`;
      media.appendChild(image);
    });

    shell.appendChild(media);
  }

  const copy = document.createElement("div");
  copy.className = "section-divider-copy";
  copy.innerHTML = `
    <p class="section-divider-number">${badge}</p>
    <h2>${parsed.title}</h2>
  `;

  shell.appendChild(copy);

  const bubbleText = parsed.groups[1]?.[0];
  if (bubbleText) {
    const bubble = document.createElement("div");
    bubble.className = "section-divider-bubble";
    bubble.textContent = bubbleText;
    shell.appendChild(bubble);
  }

  section.appendChild(shell);
  return section;
}

function buildThreeAddressTypesSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const items = [
    ["x = y op z", "Operación binaria"],
    ["x = op y", "Operación unaria"],
    ["x = y", "Proposiciones de copia"],
    ["goto E", "Salto incondicional, se ejecuta la proposición con etiqueta E"],
    ["if x oprel y goto E", "Salto condicional, si x pone oprel en relación con y"],
    ["param x y call p,n", "Secuencia de prop. de 3 direcciones para llamadas a proc."],
    ["x = y [i] ; x [i] = y", "i unidades de memoria más allá de la posición"],
    ["x := &y", "Asignación de direcciones"]
  ];

  const section = document.createElement("section");
  section.className = "slide slide-types";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell types-shell";

  const title = document.createElement("h2");
  title.className = "types-title";
  title.innerHTML = "TIPOS DE PROPOSICIONES DE TRES<br>DIRECCIONES";
  shell.appendChild(title);

  const list = document.createElement("div");
  list.className = "types-list";

  items.forEach(([statement, description], index) => {
    const row = document.createElement("div");
    row.className = "types-row";

    const number = document.createElement("span");
    number.className = "types-index";
    number.textContent = `${index + 1}.`;

    const code = document.createElement("span");
    code.className = "types-code";
    code.textContent = statement;

    const detail = document.createElement("span");
    detail.className = "types-detail";
    detail.textContent = description;

    row.appendChild(number);
    row.appendChild(code);
    row.appendChild(detail);
    list.appendChild(row);
  });

  shell.appendChild(list);
  section.appendChild(shell);
  return section;
}

function buildInterleavedSlide(entry, slideNumber, layout) {
  const parsed = parseSlide(entry.text);
  const files = getManifestImages(slideNumber);

  const section = document.createElement("section");
  section.className = "slide slide-plain slide-interleaved";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <div class="slide-head-meta">
      <span class="slide-number">${String(slideNumber).padStart(2, "0")}</span>
      <span class="slide-label">Diapositiva ${slideNumber}</span>
    </div>
  `;
  shell.appendChild(head);

  if (parsed.title) {
    const heading = document.createElement("div");
    heading.className = "section-heading";
    const title = document.createElement("h2");
    title.textContent = parsed.title;
    heading.appendChild(title);
    shell.appendChild(heading);
  }

  const stack = document.createElement("div");
  stack.className = "interleaved-stack";

  layout.forEach((token) => {
    const [kind, idxStr] = token.split(":");
    const idx = Number(idxStr);
    if (kind === "text") {
      const group = parsed.groups[idx];
      if (!group) return;
      stack.appendChild(createCard("", group));
    } else if (kind === "caption") {
      const group = parsed.groups[idx];
      if (!group) return;
      const caption = document.createElement("p");
      caption.className = "interleaved-caption";
      caption.textContent = group.join(" ");
      stack.appendChild(caption);
    } else if (kind === "image") {
      const file = files[idx];
      if (!file) return;
      const figure = document.createElement("figure");
      figure.className = "interleaved-figure";
      const img = document.createElement("img");
      img.src = getImageSrc(file);
      img.alt = `Figura ${idx + 1} de la diapositiva ${slideNumber}: ${parsed.title}`;
      figure.appendChild(img);
      stack.appendChild(figure);
    } else if (kind === "row") {
      const row = document.createElement("div");
      row.className = "interleaved-row";
      idxStr.split(",").forEach((columnToken) => {
        const column = document.createElement("div");
        column.className = "interleaved-row-cell";
        columnToken.split("+").forEach((piece) => {
          const [subKind, subIdx] = piece.split("=");
          const i = Number(subIdx);
          if (subKind === "image") {
            const file = files[i];
            if (!file) return;
            const figure = document.createElement("figure");
            figure.className = "interleaved-figure";
            const img = document.createElement("img");
            img.src = getImageSrc(file);
            img.alt = `Figura ${i + 1} de la diapositiva ${slideNumber}: ${parsed.title}`;
            figure.appendChild(img);
            column.appendChild(figure);
          } else if (subKind === "caption") {
            const group = parsed.groups[i];
            if (!group) return;
            const caption = document.createElement("p");
            caption.className = "interleaved-caption";
            caption.textContent = group.join(" ");
            column.appendChild(caption);
          } else if (subKind === "text") {
            const group = parsed.groups[i];
            if (!group) return;
            column.appendChild(createCard("", group));
          }
        });
        row.appendChild(column);
      });
      stack.appendChild(row);
    }
  });

  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildContentSlide(entry, index) {
  const slideNumber = index + 1;
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  const plainClass = plainTextSlides.has(slideNumber) ? " slide-plain" : "";
  section.className = `slide ${variants[index % variants.length]}${plainClass}`;
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <div class="slide-head-meta">
      <span class="slide-number">${String(slideNumber).padStart(2, "0")}</span>
      <span class="slide-label">Diapositiva ${slideNumber}</span>
    </div>
  `;

  const heading = document.createElement("div");
  heading.className = "section-heading";

  if (parsed.badge) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = `Bloque ${parsed.badge}`;
    heading.appendChild(eyebrow);
  }

  if (parsed.title) {
    const title = document.createElement("h2");
    if (slideNumber === 5) {
      const titleLink = document.createElement("a");
      titleLink.className = "slide-title-link";
      titleLink.href = "#slide-9";
      titleLink.textContent = parsed.title;
      title.appendChild(titleLink);
    } else {
      title.textContent = parsed.title;
    }
    heading.appendChild(title);
  }

  const contentGrid = document.createElement("div");
  contentGrid.className = "content-grid";

  const contentMain = document.createElement("div");
  contentMain.className = "content-main";
  const hasTextGroups = parsed.groups.length > 0;
  const useGroupAsCardTitle =
    parsed.groups.length > 1 &&
    parsed.groups.every((group) => group.length === 1 && group[0].length <= 32);

  const suppressLabels = plainTextSlides.has(slideNumber);

  parsed.groups.forEach((group, groupIndex) => {
    if (useGroupAsCardTitle) {
      contentMain.appendChild(createCard(group[0], []));
      return;
    }

    const cardTitle = suppressLabels ? "" : inferCardTitle(group, groupIndex);
    contentMain.appendChild(createCard(cardTitle, group));
  });

  const visualCard = buildVisualCard(slideNumber, parsed.title);
  if (!visualCard) {
    contentGrid.classList.add("content-grid-single");
  }
  if (!hasTextGroups && visualCard) {
    contentGrid.classList.add("content-grid-media-only");
  }

  shell.appendChild(head);
  shell.appendChild(heading);
  if (hasTextGroups) {
    contentGrid.appendChild(contentMain);
  }

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
  deck.appendChild(buildWhyIntermediateSlide());

  slideMetadata.slice(3).forEach((entry, index) => {
    const slideNumber = index + 4;

    if (sectionDividerSlides.has(slideNumber)) {
      deck.appendChild(buildSectionDividerSlide(entry, slideNumber));
      return;
    }

    if (slideNumber === 12) {
      deck.appendChild(buildThreeAddressTypesSlide(entry, slideNumber));
      return;
    }

    if (interleavedLayouts[slideNumber]) {
      deck.appendChild(buildInterleavedSlide(entry, slideNumber, interleavedLayouts[slideNumber]));
      return;
    }

    deck.appendChild(buildContentSlide(entry, index + 3));
  });
}

renderDeck();
