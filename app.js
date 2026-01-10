/* =========
   Menú data-driven (fácil de editar)
========= */

const LINKS = {
  // Contratos
  nda: "https://docs.google.com/document/d/1xo2ibL-DJaxytpSM6mqWRFiP-nLEkYTV/edit?usp=drive_link&ouid=101597232098541922085&rtpof=true&sd=true",
  trabajo: "https://docs.google.com/document/d/12RAj-Tu5ec1F90jeAtAFhM2T2sFh0Lln/edit?usp=sharing&ouid=101597232098541922085&rtpof=true&sd=true",
  ip: "https://docs.google.com/document/d/1EycBkBryI1VKB7CxSunkGGDcVeo9c6uN/edit?usp=sharing&ouid=101597232098541922085&rtpof=true&sd=true",

  // Alta Proveedor
  alta_personas: "https://forms.clickup.com/31001374/f/xj2ry-9334/19VWKHJ9W4BQ4BDYG8",
  alta_empresas: "https://forms.clickup.com/31001374/f/xj2ry-14494/9ZJC7FHN71JZ5XKA0V",

  // Modelo rendición
  modelo_rendicion: "https://docs.google.com/spreadsheets/d/1cfCJH5zLwb6QLa_gmQaCUK-dzQaUOn7A-Tr2V_--IXk/edit?usp=sharing"
};

const EMAILS = {
  to1: "tomas@granberta.com",
  to2: "amecible@gmail.com"
};

const NUBES = [
  { area: "Produccion", title: "Producción", url: "https://drive.google.com/drive/folders/1aAWTCSMtZy5eHfsagGcj3_WlOHFKofu8?usp=sharing" },
  { area: "Arte", title: "Arte", url: "https://drive.google.com/drive/folders/1ualxM8uxkmJOGUjA9hT44uN6mlach3dO?usp=sharing" },
  { area: "Vestuario", title: "Vestuario", url: "https://drive.google.com/drive/folders/1Wdu8oUGQtzLgqyoNtH_Xczo0vwz92RZs?usp=sharing" },
];

function altaProveedorBody(){
  return `
    <p>Completar el alta proveedor. Presione el boton <strong>"Alta"</strong> para completar</p>
    <p>Si lo ha completado previamente no es necesario por segunda vez</p>
  `;
}

function facturacionBody(){
  return `
    <p>La factura debe ser emitida a nombre de <strong>Gran Berta SRL</strong>. Se aceptan <strong>Facturas A o C</strong>.</p>
    <p>En la descripción de la Factura agregar el nombre del proyecto para el que realizó el trabajo, y si no conoce el nombre se lo debe preguntar al jefe de producción que lo contactó.</p>
  `;
}

function rendicionBody(){
  return `
    <p>Se debera hacer la rendicion lo mas detallada posible utilizando este modelo de Rendición. Para el envio del mail con la rendición, revisar <button type="button" class="linkLike" data-action="open-armado-mail">Armado de Mail</button></p>
  `;
}

function armadoMailBody(){
  // escapeHtml está hoisted (function declaration), así que se puede usar acá.
  return `
    <p>Completá estos datos y copiá el <strong>Asunto</strong> y el <strong>cuerpo</strong> del mail.</p>

    <div class="formGrid">
      <div class="field" id="amFieldProject">
        <div class="fieldLabel">Proyecto</div>
        <select class="control" id="amProject">
          <option value="LA CASONA">LA CASONA</option>
          <option value="JUBILADA Y PELIGROSA">JUBILADA Y PELIGROSA</option>
        </select>
      </div>

      <div class="field" id="amFieldArea">
        <div class="fieldLabel">Área</div>
        <select class="control" id="amArea">
          <option value="Producción">Producción</option>
          <option value="Arte">Arte</option>
          <option value="Vestuario">Vestuario</option>
          <option value="Legales">Legales</option>
        </select>
      </div>

      <div class="field" id="amFieldName">
        <div class="fieldLabel">Nombre (quien rinde)</div>
        <input class="control" id="amName" type="text" placeholder="Nombre y Apellido" autocomplete="name" />
      </div>
    </div>

    <div id="amHint" class="hint warn hidden">Cargá el nombre para que el asunto quede completo.</div>

    <div class="outGrid">
      <div class="outCard">
        <div class="outHeader">
          <div>
            <div class="outK">Asunto</div>
            <div id="amSubject" class="outVal mono"></div>
          </div>
          <button class="copyBtn" type="button" id="amCopySubject">Copiar</button>
        </div>
      </div>

      <div class="outCard">
        <div class="outHeader">
          <div style="min-width:0">
            <div class="outK">Cuerpo</div>
            <pre id="amBody" class="outVal"></pre>
          </div>
          <button class="copyBtn" type="button" id="amCopyBody">Copiar</button>
        </div>
      </div>

      <div class="recRow">
        <button class="copyBtn" type="button" id="amCopyTo">Copiar mails</button>
        <div class="recDesc">Copiar a ${escapeHtml(EMAILS.to1)} y ${escapeHtml(EMAILS.to2)}</div>
      </div>
    </div>
  `;


function nubesBody(){
  const chips = ["Todos", "Produccion", "Arte", "Vestuario"].map((c, i) => `
    <button type="button" class="chip ${i === 0 ? "active" : ""}" data-nube-filter="${c}">${c}</button>
  `).join("");

  const rows = NUBES.map((n, i) => `
    <div class="dataRow nubeRow" data-nube-area="${n.area}" data-nube-url="${escapeHtml(n.url)}">
      <div class="dataLeft">
        <div class="dataKey">${escapeHtml(n.title)}</div>
        <div class="dataVal">${escapeHtml(n.url)}</div>
      </div>
      <button class="copyBtn" type="button" data-copylink="${i}">Copiar link</button>
    </div>
  `).join("");

  return `
    <p>Accesos a nubes por área. Filtrá y entrá directo, o copiá el link.</p>
    <div class="chipBar">${chips}</div>
    <div class="dataGrid" id="nubesGrid">${rows}</div>
  `;
}
}

/* =========
   Menu
========= */
const MENU = {
  items: [
    {
      id: "proveedores",
      title: "Instructivo Proveedores",
      desc: "Alta, contratos y facturación.",
      badge: "Proveedores",
      badgeAlt: false,
      children: {
        items: [
          {
            id: "alta",
            title: "Alta como Proveedores",
            desc: "Personas o Empresas.",
            badge: "Ver",
            children: {
              items: [
                {
                  id: "alta_personas",
                  title: "Alta Personas",
                  desc: "Formulario de alta",
                  badge: "Alta",
                  badgeAlt: true,
                  modal: {
                    title: "Alta Personas",
                    kicker: "Proveedores",
                    body: altaProveedorBody(),
                    primary: { label: "Alta", onClick: () => openExternal(LINKS.alta_personas, "Formulario Alta Personas") },
                    secondary: { label: "Cerrar", onClick: closeModal }
                  }
                },
                {
                  id: "alta_empresas",
                  title: "Alta Empresas",
                  desc: "Formulario de alta",
                  badge: "Alta",
                  badgeAlt: true,
                  modal: {
                    title: "Alta Empresas",
                    kicker: "Proveedores",
                    body: altaProveedorBody(),
                    primary: { label: "Alta", onClick: () => openExternal(LINKS.alta_empresas, "Formulario Alta Empresas") },
                    secondary: { label: "Cerrar", onClick: closeModal }
                  }
                }
              ]
            }
          },
          {
            id: "contratos",
            title: "Contratos",
            desc: "Acceso directo a documentos en Drive.",
            badge: "Ver",
            children: {
              items: [
                { id: "ct", title: "Contrato de Trabajo", desc: "Abrir documento", badge: "Drive", badgeAlt: true, url: LINKS.trabajo },
                { id: "nda", title: "NDA", desc: "Abrir documento", badge: "Drive", badgeAlt: true, url: LINKS.nda },
                { id: "cip", title: "Cesión de IP", desc: "Abrir documento", badge: "Drive", badgeAlt: true, url: LINKS.ip },
              ]
            }
          },
          {
            id: "facturacion",
            title: "Facturación",
            desc: "Requisitos para emitir factura.",
            badge: "Abrir",
            modal: {
              title: "Facturación",
              kicker: "Proveedores",
              body: facturacionBody(),
              primary: {
                label: "Datos Empresa",
                onClick: () => {
                  closeModal();
                  openCompanyDataModal();
                }
              },
              secondary: { label: "Cerrar", onClick: closeModal }
            }
          },
        ]
      }
    },
    {
      id: "produccion",
      title: "Instructivo Jefes/as de Producción",
      desc: "Rendición, mail y accesos a nubes.",
      badge: "Producción",
      badgeAlt: true,
      children: {
        items: [
          {
            id: "rendicion",
            title: "Como Realizar Rendición",
            desc: "Modelo y pasos de envío.",
            badge: "Abrir",
            modal: {
              title: "Como Realizar Rendición",
              kicker: "Producción",
              body: rendicionBody(),
              primary: { label: "Modelo", onClick: () => openExternal(LINKS.modelo_rendicion, "Modelo de Rendición") },
              secondary: { label: "Cerrar", onClick: closeModal }
            }
          },
          {
            id: "mail",
            title: "Armado Mail Rendición",
            desc: "Generador de asunto + cuerpo.",
            badge: "Abrir",
            action: "armadoMail"
          },
          {
            id: "nubes",
            title: "Links a Nubes",
            desc: "Carpetas por área + filtros.",
            badge: "Abrir",
            action: "nubes"
          },
        ]
      }
    },
    {
      id: "empresa",
      title: "Datos empresa",
      desc: "Copiá datos individuales o todo junto.",
      badge: "Copiar",
      badgeAlt: false,
      action: "companyData"
    }
  ]
};

/* =========
   DOM
========= */
const menuGrid = document.getElementById("menuGrid");
const breadcrumbBar = document.getElementById("breadcrumbBar");

const overlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalBody = document.getElementById("modalBody");
const modalPrimary = document.getElementById("modalPrimary");
const modalSecondary = document.getElementById("modalSecondary");
const toast = document.getElementById("toast");

/**
 * stack items:
 * { screen: <object>, label: <string> }
 */
let stack = [{ screen: MENU, label: "Inicio" }];

/* =========
   Render
========= */
function renderCurrent(){
  renderBreadcrumbs();

  const current = stack[stack.length - 1].screen;

  menuGrid.innerHTML = "";
  (current.items || []).forEach(item => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.innerHTML = `
      <div class="tileTop">
        <div class="tileTitle">${escapeHtml(item.title)}</div>
        <div class="badge ${item.badgeAlt ? "alt" : ""}">${escapeHtml(item.badge || "Abrir")}</div>
      </div>
      <div class="tileDesc">${escapeHtml(item.desc || "")}</div>
    `;
    tile.addEventListener("click", () => onItemClick(item));
    menuGrid.appendChild(tile);
  });
}

function renderBreadcrumbs(){
  breadcrumbBar.innerHTML = "";

  stack.forEach((entry, idx) => {
    if (idx > 0){
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "›";
      breadcrumbBar.appendChild(sep);
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "crumbBtn" + (idx === stack.length - 1 ? " current" : "");
    btn.textContent = entry.label || (idx === 0 ? "Inicio" : "Sección");

    btn.addEventListener("click", () => {
      if (idx === stack.length - 1) return;
      stack = stack.slice(0, idx + 1);
      closeModal();
      renderCurrent();
    });

    breadcrumbBar.appendChild(btn);
  });
}

function pushScreen(screen, label){
  stack.push({ screen, label });
  renderCurrent();
}

function onItemClick(item){
  if (item.url){
    openExternal(item.url, "Google Drive");
    return;
  }

  if (item.children){
    pushScreen(item.children, item.title);
    return;
  }

  if (item.action === "companyData"){
    openCompanyDataModal();
    return;
  }

  if (item.action === "armadoMail"){
    openArmadoMailModal();
    return;
  }

  if (item.action === "nubes"){
    openNubesModal();
    return;
  }

  if (item.modal){
    openModal({
      title: item.modal.title,
      kicker: item.modal.kicker,
      bodyHtml: item.modal.body,
      primary: item.modal.primary,
      secondary: item.modal.secondary
    });
    return;
  }

  openModal({
    title: item.title,
    kicker: "Info",
    bodyHtml: placeholderText(item.title),
    secondary: { label: "Cerrar", onClick: closeModal }
  });
}

/* =========
   Modal
========= */
function openModal({ title, kicker, bodyHtml, primary, secondary }){
  modalTitle.textContent = title || "Detalle";
  modalKicker.textContent = kicker || "Detalle";
  modalBody.innerHTML = bodyHtml || "<p>Sin contenido.</p>";

  setupModalButtons(primary, secondary);

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  if (overlay.classList.contains("hidden")) return;
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalBody.innerHTML = "";
  setupModalButtons(null, null);
}

function setupModalButtons(primary, secondary){
  if (primary && typeof primary.onClick === "function"){
    modalPrimary.classList.remove("hidden");
    modalPrimary.textContent = primary.label || "Acción";
    modalPrimary.onclick = primary.onClick;
  } else {
    modalPrimary.classList.add("hidden");
    modalPrimary.onclick = null;
  }

  if (secondary && typeof secondary.onClick === "function"){
    modalSecondary.classList.remove("hidden");
    modalSecondary.textContent = secondary.label || "Cerrar";
    modalSecondary.onclick = secondary.onClick;
  } else {
    modalSecondary.classList.add("hidden");
    modalSecondary.onclick = null;
  }
}

/* =========
   Armado Mail (UX)
========= */
function openArmadoMailModal(){
  openModal({
    title: "Armado Mail Rendición",
    kicker: "Producción",
    bodyHtml: armadoMailBody(),
    secondary: { label: "Cerrar", onClick: closeModal }
  });
  initArmadoMailUI();
}

function initArmadoMailUI(){
  const elProject = modalBody.querySelector("#amProject");
  const elArea = modalBody.querySelector("#amArea");
  const elName = modalBody.querySelector("#amName");

  const fieldName = modalBody.querySelector("#amFieldName");
  const hint = modalBody.querySelector("#amHint");

  const outSubject = modalBody.querySelector("#amSubject");
  const outBody = modalBody.querySelector("#amBody");

  const btnCopySubject = modalBody.querySelector("#amCopySubject");
  const btnCopyBody = modalBody.querySelector("#amCopyBody");
  const btnCopyTo = modalBody.querySelector("#amCopyTo");

  if (!elProject || !elArea || !elName || !outSubject || !outBody || !btnCopySubject || !btnCopyBody || !btnCopyTo) return;

  const compute = () => {
    const project = elProject.value;
    const area = elArea.value;
    const name = (elName.value || "").trim();

    const subject = `${area} - ${project} - ${name || "[Nombre]"}`;
    const body = `Dejo en este mail la siguiente rendición de ${area}:\n\nMuchas gracias`;

    outSubject.textContent = subject;
    outBody.textContent = body;

    const ok = name.length > 0;
    fieldName?.classList.toggle("invalid", !ok);
    hint?.classList.toggle("hidden", ok);
    btnCopySubject.disabled = !ok;
  };

  compute();

  const listen = () => compute();
  elProject.addEventListener("change", listen);
  elArea.addEventListener("change", listen);
  elName.addEventListener("input", listen);

  btnCopySubject.addEventListener("click", async () => {
    await copyText(outSubject.textContent);
    showToast("Copiado: asunto");
  });

  btnCopyBody.addEventListener("click", async () => {
    await copyText(outBody.textContent);
    showToast("Copiado: cuerpo");
  });

  btnCopyTo.addEventListener("click", async () => {
    await copyText(`${EMAILS.to1}, ${EMAILS.to2}`);
    showToast("Copiado: mails");
  });

  // Enter -> copiar asunto si está OK
  elName.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btnCopySubject.disabled){
      e.preventDefault();
      btnCopySubject.click();
    }
  });

  // Autofocus al nombre
  setTimeout(() => elName.focus(), 50);
}

/* =========
   Links a Nubes (UX)
========= */
function openNubesModal(){
  openModal({
    title: "Links a Nubes",
    kicker: "Producción",
    bodyHtml: nubesBody(),
    secondary: { label: "Cerrar", onClick: closeModal }
  });
  initNubesUI();
}

function initNubesUI(){
  const chips = Array.from(modalBody.querySelectorAll("[data-nube-filter]"));
  const rows = Array.from(modalBody.querySelectorAll("[data-nube-area]"));

  const setActive = (val) => {
    chips.forEach(c => c.classList.toggle("active", c.getAttribute("data-nube-filter") === val));
    rows.forEach(r => {
      const area = r.getAttribute("data-nube-area");
      const show = (val === "Todos") || (area === val);
      r.style.display = show ? "" : "none";
    });
  };

  // Click chips
  chips.forEach(c => {
    c.addEventListener("click", () => setActive(c.getAttribute("data-nube-filter")));
  });

  // Click row -> open link
  rows.forEach(r => {
    r.addEventListener("click", () => {
      const url = r.getAttribute("data-nube-url");
      if (url) openExternal(url, "Nube");
    });
  });

  // Stop propagation on copy buttons so it doesn't open the link
  modalBody.querySelectorAll("[data-copylink]").forEach(btn => {
    btn.addEventListener("click", (e) => e.stopPropagation());
  });

  // Default
  setActive("Todos");
}
/* =========
   Datos empresa
========= */
const COMPANY = [
  { key: "Razón Social", value: "Gran Berta SRL" },
  { key: "CUIT", value: "33715736549" },
  { key: "IVA", value: "Responsable Inscripto" }
];

function openCompanyDataModal(){
  const rows = COMPANY.map((row, idx) => `
    <div class="dataRow">
      <div class="dataLeft">
        <div class="dataKey">${escapeHtml(row.key)}</div>
        <div class="dataVal">${escapeHtml(row.value)}</div>
      </div>
      <button class="copyBtn" type="button" data-copy="${idx}">Copiar</button>
    </div>
  `).join("");

  const body = `
    <p>Copiá un dato puntual o llevate todo junto en un solo copy/paste.</p>
    <div class="dataGrid">${rows}</div>
  `;

  openModal({
    title: "Datos empresa",
    kicker: "Empresa",
    bodyHtml: body,
    primary: {
      label: "Copiar todo",
      onClick: async () => {
        const all = COMPANY.map(r => `${r.key}: ${r.value}`).join("\n");
        await copyText(all);
        showToast("Copiado: todos los datos");
      }
    },
    secondary: { label: "Cerrar", onClick: closeModal }
  });

  modalBody.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const i = Number(e.currentTarget.getAttribute("data-copy"));
      await copyText(COMPANY[i].value);
      showToast(`Copiado: ${COMPANY[i].key}`);
    });
  });
}

/* =========
   Helpers
========= */
function openExternal(url, label){
  window.open(url, "_blank", "noopener,noreferrer");
  showToast(`Abierto: ${label}`);
}

function placeholderText(sectionTitle){
  return `
    <p><strong>${escapeHtml(sectionTitle)}</strong></p>
    <p>Este contenido es de prueba por ahora. Acá después pegamos el instructivo real, links, PDFs o lo que necesites.</p>
  `;
}

function placeholderLinks(){
  return `
    <p>Acá podés poner links a Drive, Dropbox, Frame.io, etc.</p>
    <div class="dataGrid">
      <div class="dataRow">
        <div class="dataLeft">
          <div class="dataKey">Carpeta principal</div>
          <div class="dataVal">https://ejemplo.com/carpeta</div>
        </div>
        <button class="copyBtn" type="button" data-copylink="0">Copiar link</button>
      </div>

      <div class="dataRow">
        <div class="dataLeft">
          <div class="dataKey">Planillas</div>
          <div class="dataVal">https://ejemplo.com/planillas</div>
        </div>
        <button class="copyBtn" type="button" data-copylink="1">Copiar link</button>
      </div>
    </div>
  `;
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

let toastTimer = null;
function showToast(message){
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2000);
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========
   Cerrar modal
========= */
modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* =========
   Inline actions inside modal body
========= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.getAttribute("data-action");
  if (action === "open-armado-mail"){
    closeModal();
    openArmadoMailModal();
  }
});

/* =========
   Init
========= */
renderCurrent();

// Copiar links placeholder (nubes)
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copylink]");
  if (!btn) return;
  const row = btn.closest(".dataRow");
  const val = row?.querySelector(".dataVal")?.textContent?.trim();
  if (val){
    await copyText(val);
    showToast("Copiado: link");
  }
});
