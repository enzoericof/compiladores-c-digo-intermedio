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
const removedSourceSlides = new Set([39]);
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

function buildRepresentationOverviewSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-representations";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell representations-shell";

  const head = document.createElement("div");
  head.className = "slide-head";
  head.innerHTML = `
    <div class="slide-head-meta">
      <span class="slide-number">${String(slideNumber).padStart(2, "0")}</span>
      <span class="slide-label">Diapositiva ${slideNumber}</span>
    </div>
  `;

  const intro = document.createElement("div");
  intro.className = "representations-intro";
  intro.innerHTML = `
    <h2>${parsed.title || "Código de tres direcciones"}</h2>
    <p>
      Ya conocemos dos representaciones intermedias. En esta parte incorporamos una tercera,
      que servirá como base para generar y organizar instrucciones más simples.
    </p>
  `;

  const grid = document.createElement("div");
  grid.className = "representation-grid";

  const knownCard = document.createElement("article");
  knownCard.className = "representation-card representation-card-known";
  knownCard.innerHTML = `
    <p class="representation-label">Ya conocidas</p>
    <div class="representation-items">
      <div class="representation-chip representation-chip-known">Árboles sintácticos</div>
      <div class="representation-chip representation-chip-known">Notación postfija</div>
    </div>
    <p class="representation-note">
      Estas representaciones ya nos permiten describir expresiones y su estructura.
    </p>
  `;

  const newCard = document.createElement("article");
  newCard.className = "representation-card representation-card-new";
  newCard.innerHTML = `
    <p class="representation-label">Nueva representación</p>
    <div class="representation-items">
      <div class="representation-chip representation-chip-new">Código de tres direcciones</div>
    </div>
    <p class="representation-note">
      Introduce instrucciones simples, una operación por proposición, y prepara el camino para los ejemplos que siguen.
    </p>
    <a class="representation-button" href="#slide-9">Ver ejemplo de código de tres direcciones</a>
  `;

  grid.appendChild(knownCard);
  grid.appendChild(newCard);

  shell.appendChild(head);
  shell.appendChild(intro);
  shell.appendChild(grid);
  section.appendChild(shell);
  return section;
}

function buildVisualCard(slideNumber, sourceSlideNumber, title) {
  if (sourceSlideNumber === 15) {
    return null;
  }

  const files = getManifestImages(sourceSlideNumber);

  if (files.length === 0) {
    return null;
  }

  const aside = document.createElement("aside");
  aside.className = "source-card";

  if (!plainTextSlides.has(sourceSlideNumber)) {
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

function buildSectionDividerSlide(entry, slideNumber, sourceSlideNumber) {
  const parsed = parseSlide(entry.text);
  const badge = parsed.groups[0]?.[0] || parsed.badge || String(Math.ceil(slideNumber / 10)).padStart(2, "0");
  const files = getManifestImages(sourceSlideNumber);

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

function buildThreeAddressIntroSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-three-address-intro";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell three-address-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  const layout = document.createElement("div");
  layout.className = "three-address-layout";

  const definition = document.createElement("article");
  definition.className = "card";
  definition.innerHTML = `
    <h3>Definición</h3>
    <p>${parsed.groups[0]?.join(" ") || ""}</p>
  `;

  const form = document.createElement("article");
  form.className = "card three-address-form";
  form.innerHTML = `
    <h3>Forma general</h3>
    <p class="three-address-expression">x := y op z</p>
    <div class="three-address-legend">
      <p><strong>x</strong>: lugar donde se guarda el resultado</p>
      <p><strong>y</strong>: primer operando</p>
      <p><strong>z</strong>: segundo operando</p>
      <p><strong>op</strong>: operador</p>
    </div>
  `;

  const temporals = document.createElement("article");
  temporals.className = "card";
  temporals.innerHTML = `
    <h3>Variables temporales</h3>
    <p>${parsed.groups[2]?.join(" ") || ""}</p>
  `;

  const why = document.createElement("article");
  why.className = "card";
  why.innerHTML = `
    <h3>Nombre</h3>
    <p>${parsed.groups[3]?.join(" ") || ""}</p>
  `;

  layout.appendChild(definition);
  layout.appendChild(form);
  layout.appendChild(temporals);
  layout.appendChild(why);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(layout);
  section.appendChild(shell);
  return section;
}

function buildSyntaxDirectedTranslationSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-sdt";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell sdt-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  const flow = document.createElement("div");
  flow.className = "sdt-flow";
  flow.innerHTML = `
    <div class="sdt-flow-box">Gramática + reglas semánticas</div>
    <div class="sdt-flow-arrow">↓</div>
    <div class="sdt-flow-box sdt-flow-result">Código de tres direcciones</div>
  `;

  const grid = document.createElement("div");
  grid.className = "sdt-grid";

  const attributes = document.createElement("article");
  attributes.className = "card";
  attributes.innerHTML = `
    <h3>Qué guarda cada expresión E</h3>
    <div class="sdt-code-block">
      <p><strong>E.lugar</strong> → variable o temporal donde queda el resultado</p>
      <p><strong>E.código</strong> → instrucciones necesarias para calcular E</p>
    </div>
  `;

  const example = document.createElement("article");
  example.className = "card";
  example.innerHTML = `
    <h3>Ejemplo</h3>
    <p class="sdt-inline-example">a := b * c + d</p>
  `;

  const translation = document.createElement("article");
  translation.className = "card";
  translation.innerHTML = `
    <h3>Traducción generada</h3>
    <div class="sdt-code-block sdt-code-lines">
      <p>t1 := b * c</p>
      <p>t2 := t1 + d</p>
      <p>a := t2</p>
    </div>
  `;

  const keyIdea = document.createElement("article");
  keyIdea.className = "card";
  keyIdea.innerHTML = `
    <h3>Idea clave</h3>
    <p>Primero se calcula la expresión en temporales. Luego se asigna el resultado final a la variable.</p>
  `;

  grid.appendChild(attributes);
  grid.appendChild(example);
  grid.appendChild(translation);
  grid.appendChild(keyIdea);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(flow);
  shell.appendChild(grid);
  section.appendChild(shell);
  return section;
}

function buildTriplesSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-triples";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell triples-shell";

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
  heading.innerHTML = `<h2>Triples</h2>`;

  const layout = document.createElement("div");
  layout.className = "triples-layout";

  const structure = document.createElement("article");
  structure.className = "card";
  structure.innerHTML = `
    <h3>Estructura</h3>
    <div class="triples-table-wrap">
      <table class="triples-table">
        <thead>
          <tr>
            <th>índice</th>
            <th>op</th>
            <th>arg1</th>
            <th>arg2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(0)</td>
            <td>menosu</td>
            <td>c</td>
            <td></td>
          </tr>
          <tr>
            <td>(1)</td>
            <td>*</td>
            <td>b</td>
            <td>(0)</td>
          </tr>
          <tr>
            <td>(2)</td>
            <td>+</td>
            <td>(1)</td>
            <td>(1)</td>
          </tr>
          <tr>
            <td>(3)</td>
            <td>:=</td>
            <td>a</td>
            <td>(2)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="triples-note">El resultado de cada operación se identifica usando el número de fila.</p>
  `;

  const example = document.createElement("article");
  example.className = "card";
  example.innerHTML = `
    <h3>Ejemplo</h3>
    <p class="triples-expression">a := b * -c + b * -c</p>
  `;

  const interpretation = document.createElement("article");
  interpretation.className = "card";
  interpretation.innerHTML = `
    <h3>Interpretación</h3>
    <div class="triples-code-lines">
      <p>(0) → t1 := -c</p>
      <p>(1) → t2 := b * t1</p>
      <p>(2) → t3 := t2 + t2</p>
      <p>(3) → a := t3</p>
    </div>
  `;

  const keyIdea = document.createElement("article");
  keyIdea.className = "card";
  keyIdea.innerHTML = `
    <h3>Idea clave</h3>
    <p>En triples no se guardan temporales explícitos. Los resultados se referencian usando el número de instrucción.</p>
  `;

  layout.appendChild(structure);
  layout.appendChild(example);
  layout.appendChild(interpretation);
  layout.appendChild(keyIdea);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(layout);
  section.appendChild(shell);
  return section;
}

function buildTempReuseProblemSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-temp-reuse";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell temp-reuse-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  const stack = document.createElement("div");
  stack.className = "temp-reuse-stack";

  const problem = document.createElement("article");
  problem.className = "card";
  problem.innerHTML = `
    <h3>Problema</h3>
    <p>Cuando se genera código de tres direcciones, cada operación puede crear un temporal nuevo.</p>
    <p class="temp-reuse-expression">x := a*b + c*d - e*f</p>
  `;

  const withoutReuse = document.createElement("article");
  withoutReuse.className = "card";
  withoutReuse.innerHTML = `
    <h3>Sin reutilización</h3>
    <div class="temp-reuse-code">
      <p>t1 := a * b</p>
      <p>t2 := c * d</p>
      <p>t3 := t1 + t2</p>
      <p>t4 := e * f</p>
      <p>t5 := t3 - t4</p>
      <p>x  := t5</p>
    </div>
    <p>Se crean muchos temporales.</p>
  `;

  const keyIdea = document.createElement("article");
  keyIdea.className = "card";
  keyIdea.innerHTML = `
    <h3>Idea clave</h3>
    <p>Un temporal puede reutilizarse cuando su valor ya no será necesario.</p>
  `;

  stack.appendChild(problem);
  stack.appendChild(withoutReuse);
  stack.appendChild(keyIdea);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildTempReuseSolutionSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-temp-reuse";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell temp-reuse-shell";

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
  heading.innerHTML = `<h2>Ejemplo - Reutilización de nombres temporales</h2>`;

  const stack = document.createElement("div");
  stack.className = "temp-reuse-stack";

  const withReuse = document.createElement("article");
  withReuse.className = "card";
  withReuse.innerHTML = `
    <h3>Con reutilización</h3>
    <div class="temp-reuse-code">
      <p>$0 := a * b</p>
      <p>$1 := c * d</p>
      <p>$0 := $0 + $1</p>
      <p>$1 := e * f</p>
      <p>$0 := $0 - $1</p>
      <p>x  := $0</p>
    </div>
    <p>Ahora solo se usan dos temporales: <strong>$0</strong> y <strong>$1</strong>.</p>
  `;

  const benefit = document.createElement("article");
  benefit.className = "card";
  benefit.innerHTML = `
    <h3>Beneficio</h3>
    <p>Problema: demasiados temporales. Solución: reutilizar los que ya no se necesitan. Beneficio: menor uso de nombres y memoria.</p>
  `;

  const speech = document.createElement("article");
  speech.className = "card";
  speech.innerHTML = `
    <h3>Resumen</h3>
    <p>La reutilización de temporales busca evitar crear un nombre nuevo para cada resultado intermedio. Cuando un temporal ya fue usado y su valor no se necesita más, el compilador puede reciclar ese nombre para guardar otro resultado.</p>
  `;

  stack.appendChild(withReuse);
  stack.appendChild(benefit);
  stack.appendChild(speech);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildMatrixAccessGrammarSlide(entry, slideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-matrix-grammar";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell matrix-grammar-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  const stack = document.createElement("div");
  stack.className = "matrix-grammar-stack";

  const keyIdea = document.createElement("article");
  keyIdea.className = "card";
  keyIdea.innerHTML = `
    <h3>Idea clave</h3>
    <p>El compilador debe distinguir entre una variable simple y un elemento de matriz.</p>
  `;

  const examples = document.createElement("article");
  examples.className = "card";
  examples.innerHTML = `
    <h3>Ejemplos</h3>
    <div class="matrix-grammar-code">
      <p>x := 10        → x es una variable simple</p>
      <p>A[i] := 10     → A[i] es un elemento de matriz</p>
      <p>A[i,j] := 10   → A[i,j] usa dos índices</p>
    </div>
  `;

  const grammar = document.createElement("article");
  grammar.className = "card";
  grammar.innerHTML = `
    <h3>Uso de la gramática</h3>
    <div class="matrix-grammar-code">
      <p>L → id          variable simple</p>
      <p>L → listaE ]    referencia a matriz</p>
      <p>listaE → id [ E primer índice</p>
      <p>listaE → listaE , E índice adicional</p>
    </div>
  `;

  const conclusion = document.createElement("article");
  conclusion.className = "card";
  conclusion.innerHTML = `
    <h3>Conclusión</h3>
    <p>listaE sirve para juntar los índices de la matriz y calcular su desplazamiento en memoria.</p>
    <p class="matrix-grammar-oral">Esta parte introduce una gramática para que el compilador pueda reconocer referencias a matrices. L representa el lado izquierdo de una asignación, que puede ser una variable simple como x o una posición de matriz como A[i]. listaE representa la lista de índices, por ejemplo i, i,j o i,j,k. Con esa información el compilador puede calcular el desplazamiento real en memoria.</p>
  `;

  stack.appendChild(keyIdea);
  stack.appendChild(examples);
  stack.appendChild(grammar);
  stack.appendChild(conclusion);

  shell.appendChild(head);
  shell.appendChild(heading);
  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildMatrixTranslationDetailSlide(entry, slideNumber, sourceSlideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-matrix-detail";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell matrix-detail-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  const visualCard = buildVisualCard(slideNumber, sourceSlideNumber, parsed.title);
  if (visualCard) {
    visualCard.classList.add("matrix-detail-visual");
    shell.appendChild(head);
    shell.appendChild(heading);
    shell.appendChild(visualCard);
  } else {
    shell.appendChild(head);
    shell.appendChild(heading);
  }

  const stack = document.createElement("div");
  stack.className = "matrix-detail-stack";

  const explanation = document.createElement("article");
  explanation.className = "card";
  explanation.innerHTML = `
    <h3>Qué representa</h3>
    <p>Esta parte del esquema muestra cómo se calcula la dirección real de un elemento de matriz a partir de sus índices.</p>
  `;

  const keys = document.createElement("article");
  keys.className = "card";
  keys.innerHTML = `
    <h3>Puntos clave</h3>
    <p><strong>L.desplazamiento</strong> es un temporal nuevo que representa el primer término del cálculo del desplazamiento.</p>
    <p><strong>ancho(listaE.matriz)</strong> devuelve el ancho de los elementos de la matriz.</p>
    <p><strong>L.lugar</strong> representa el otro término del cálculo de dirección, obtenido a partir de la información de la matriz.</p>
  `;

  stack.appendChild(explanation);
  stack.appendChild(keys);
  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildMatrixRuleSlide(entry, slideNumber, sourceSlideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  section.className = "slide slide-matrix-detail";
  section.id = `slide-${slideNumber}`;

  const shell = document.createElement("div");
  shell.className = "slide-shell matrix-detail-shell";

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
  heading.innerHTML = `<h2>${parsed.title}</h2>`;

  shell.appendChild(head);
  shell.appendChild(heading);

  const visualCard = buildVisualCard(slideNumber, sourceSlideNumber, parsed.title);
  if (visualCard) {
    visualCard.classList.add("matrix-detail-visual");
    shell.appendChild(visualCard);
  }

  const stack = document.createElement("div");
  stack.className = "matrix-detail-stack";

  parsed.groups.forEach((group) => {
    if (group.length === 0) {
      return;
    }

    const [cardTitle, ...rest] = group;
    stack.appendChild(createCard(String(cardTitle).replace(/:\s*$/, ""), rest));
  });

  shell.appendChild(stack);
  section.appendChild(shell);
  return section;
}

function buildInterleavedSlide(entry, slideNumber, sourceSlideNumber, layout) {
  const parsed = parseSlide(entry.text);
  const files = getManifestImages(sourceSlideNumber);

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

function buildContentSlide(entry, slideNumber, sourceSlideNumber) {
  const parsed = parseSlide(entry.text);
  const section = document.createElement("section");
  const plainClass = plainTextSlides.has(sourceSlideNumber) ? " slide-plain" : "";
  section.className = `slide ${variants[(slideNumber - 1) % variants.length]}${plainClass}`;
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

  const suppressLabels = plainTextSlides.has(sourceSlideNumber);

  parsed.groups.forEach((group, groupIndex) => {
    if (useGroupAsCardTitle) {
      contentMain.appendChild(createCard(group[0], []));
      return;
    }

    const cardTitle = suppressLabels ? "" : inferCardTitle(group, groupIndex);
    contentMain.appendChild(createCard(cardTitle, group));
  });

  const visualCard = buildVisualCard(slideNumber, sourceSlideNumber, parsed.title);
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

  let slideNumber = 4;
  slideMetadata.slice(3).forEach((entry) => {
    const sourceSlideNumber = entry.slide ?? slideNumber;

    if (removedSourceSlides.has(sourceSlideNumber)) {
      return;
    }

    if (sectionDividerSlides.has(sourceSlideNumber)) {
      deck.appendChild(buildSectionDividerSlide(entry, slideNumber, sourceSlideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 5) {
      deck.appendChild(buildRepresentationOverviewSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 9) {
      deck.appendChild(buildThreeAddressIntroSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 13) {
      deck.appendChild(buildSyntaxDirectedTranslationSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 17) {
      deck.appendChild(buildTriplesSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 36) {
      deck.appendChild(buildTempReuseProblemSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 37) {
      deck.appendChild(buildTempReuseSolutionSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 40) {
      deck.appendChild(buildMatrixAccessGrammarSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber >= 41 && sourceSlideNumber <= 48) {
      deck.appendChild(buildMatrixRuleSlide(entry, slideNumber, sourceSlideNumber));
      slideNumber += 1;
      return;
    }

    if (sourceSlideNumber === 12) {
      deck.appendChild(buildThreeAddressTypesSlide(entry, slideNumber));
      slideNumber += 1;
      return;
    }

    if (interleavedLayouts[sourceSlideNumber]) {
      deck.appendChild(buildInterleavedSlide(entry, slideNumber, sourceSlideNumber, interleavedLayouts[sourceSlideNumber]));
      slideNumber += 1;
      return;
    }

    deck.appendChild(buildContentSlide(entry, slideNumber, sourceSlideNumber));
    slideNumber += 1;
  });
}

renderDeck();
