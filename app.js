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

const PROJECTS = [
  "LA CASONA",
  "JUBILADA Y PELIGROSA",
];

const AREAS = [
  "PRODUCCIÓN",
  "ARTE",
  "VESTUARIO",
  "LEGALES",
];

const AREAS_NUBES = [
  "PRODUCCIÓN",
  "ARTE",
  "VESTUARIO",
];

const NUBES = [
  { project: "LA CASONA", area: "PRODUCCIÓN", url: "https://drive.google.com/drive/folders/1aAWTCSMtZy5eHfsagGcj3_WlOHFKofu8?usp=sharing" },
  { project: "LA CASONA", area: "ARTE", url: "https://drive.google.com/drive/folders/1ualxM8uxkmJOGUjA9hT44uN6mlach3dO?usp=sharing" },
  { project: "LA CASONA", area: "VESTUARIO", url: "https://drive.google.com/drive/folders/1Wdu8oUGQtzLgqyoNtH_Xczo0vwz92RZs?usp=sharing" },
  { project: "JUBILADA Y PELIGROSA", area: "PRODUCCIÓN", url: "https://drive.google.com/drive/folders/1aAWTCSMtZy5eHfsagGcj3_WlOHFKofu8?usp=sharing" },
  { project: "JUBILADA Y PELIGROSA", area: "ARTE", url: "https://drive.google.com/drive/folders/1ualxM8uxkmJOGUjA9hT44uN6mlach3dO?usp=sharing" },
  { project: "JUBILADA Y PELIGROSA", area: "VESTUARIO", url: "https://drive.google.com/drive/folders/1Wdu8oUGQtzLgqyoNtH_Xczo0vwz92RZs?usp=sharing" },
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
    <p>Se debera hacer la rendicion lo mas detallada posible utilizando este modelo de Rendición. Para el envio del mail con la rendición, revisar <button type="button" class="linkLike" data-action="open-armado-mail" data-category="RENDICIÓN">Comunicación por Mail</button></p>
  `;

}

function garantiasBody(){
  return `
    <p>Las garantias que puedan solicitar los proveedores seran entregadas mediante <strong>cheque electronico</strong>.</p>
    <p>Enviar mail mediante <button type="button" class="linkLike" data-action="open-armado-mail" data-category="RENDICIÓN">Comunicación por Mail</button> y colocar en el cuerpo del mail el pedido lo mas detallado posible, sobretodo el monto, Razon social y CUIT de la empresa o persona.</p>
  `;
}

function efectivoBody(){
  return `
    <p>Los gastos que superen los $50mil pesos, deberan ser abonados por medio de factura a nombre de la empresa.</p>
    <p>El efectivo debe ser solicitado con 48 horas de anticipación a amecible@gmail.com y tomas@granberta.com, y es entregado en las oficinas en Mendoza 2364, Belgrano, CABA. Utilizar <button type="button" class="linkLike" data-action="open-armado-mail" data-category="EFECTIVO">Comunicación por Mail</button></p>
    <p>La entrega es de Martes a Jueves de 9 a 18.</p>
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
          <option value="PRODUCCIÓN">PRODUCCIÓN</option>
          <option value="ARTE">ARTE</option>
          <option value="VESTUARIO">VESTUARIO</option>
          <option value="LEGALES">LEGALES</option>
        </select>
      </div>


      <div class="field" id="amFieldCategory">
        <div class="fieldLabel">Categoría</div>
        <select class="control" id="amCategory">
          <option value="RENDICIÓN">RENDICIÓN</option>
          <option value="PAGOS Y CONTRATOS">PAGOS Y CONTRATOS</option>
          <option value="GARANTÍAS">GARANTÍAS</option>
          <option value="EFECTIVO">EFECTIVO</option>
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

      <div class="recRow">
        <button class="copyBtn" type="button" id="amCopyTo">Copiar mails</button>
        <div class="recDesc">Copiar a ${escapeHtml(EMAILS.to1)} y ${escapeHtml(EMAILS.to2)}</div>
      </div>
    </div>
  `;
}

function nubesBody(){
  const chips = ["TODOS", ...AREAS_NUBES].map((c, i) => `
    <button type="button" class="chip ${i === 0 ? "active" : ""}" data-nube-filter="${c}">${c}</button>
  `).join("");

  const projectOpts = [`<option value="TODOS">TODOS LOS PROYECTOS</option>`]
    .concat(PROJECTS.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`))
    .join("");

  const rows = NUBES.map((n, i) => `
    <div class="dataRow nubeRow" data-nube-area="${escapeHtml(n.area)}" data-nube-project="${escapeHtml(n.project)}" data-nube-url="${escapeHtml(n.url)}">
      <div class="dataLeft">
        <div class="dataKey nubeTitle">${escapeHtml(n.project)}</div>
        <div class="dataVal nubeMeta">${escapeHtml(n.area)}</div>
      </div>
      <button class="copyBtn" type="button" data-copylink="${i}">Copiar link</button>
    </div>
  `).join("");

  return `
    <p>Accesos a nubes por área y proyecto. Filtrá, entrá directo o copiá el link.</p>
    <div class="nubesTop">
      <div class="chipBar">${chips}</div>
      <div class="nubesProject">
        <select id="nubesProject" class="control controlSm" aria-label="Proyecto">
          ${projectOpts}
        </select>
      </div>
    </div>
    <div class="dataGrid" id="nubesGrid">${rows}</div>
  `;
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
          theme: "proveedores",
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
                    actionsAlign: "left",
                    kicker: "Proveedores",
                    body: altaProveedorBody(),
                    primary: { label: "ALTA", onClick: () => openExternal(LINKS.alta_personas, "Formulario Alta Personas") },
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
                    actionsAlign: "left",
                    kicker: "Proveedores",
                    body: altaProveedorBody(),
                    primary: { label: "ALTA", onClick: () => openExternal(LINKS.alta_empresas, "Formulario Alta Empresas") },
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
                    actionsAlign: "left",
              kicker: "Proveedores",
              body: facturacionBody(),
              primary: {
                label: "DATOS EMPRESA",
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
      title: "Instructivo Areas de Produccion",
      desc: "Rendición, mail y accesos a nubes.",
      badge: "Producción",
      badgeAlt: true,
      children: {
          theme: "produccion",
        items: [
          {
            id: "rendicion",
            title: "Como Realizar Rendición",
            desc: "Modelo y pasos de envío.",
            badge: "Abrir",
            modal: {
              title: "Como Realizar Rendición",
                    actionsAlign: "left",
              kicker: "Producción",
              body: rendicionBody(),
              primary: { label: "MODELO", onClick: () => openExternal(LINKS.modelo_rendicion, "Modelo de Rendición") },
              extra: {
                label: "COMUNICACIÓN POR MAIL",
                onClick: () => {
                  closeModal();
                  openArmadoMailModal({ category: "RENDICIÓN" });
                }
              },
              secondary: { label: "Cerrar", onClick: closeModal }
            }
          },
          {
            id: "mail",
            title: "Comunicación por Mail",
            desc: "Generador de asunto.",
            badge: "Abrir",
            action: "armadoMail"
          },
          {
            id: "garantias",
            title: "Garantias",
            desc: "Cheques electrónicos + mail de pedido.",
            badge: "Abrir",
            modal: {
              title: "Garantias",
              kicker: "Producción",
              body: garantiasBody(),
              primary: {
                label: "COMUNICACIÓN POR MAIL",
                onClick: () => {
                  closeModal();
                  openArmadoMailModal({ category: "GARANTÍAS" });
                }
              },
              secondary: { label: "Cerrar", onClick: closeModal }
            }
          },
          {
            id: "efectivo",
            title: "Efectivo",
            desc: "Reglas y horarios de entrega.",
            badge: "Abrir",
            modal: {
              title: "Efectivo",
              kicker: "Producción",
              body: efectivoBody(),
              primary: {
                label: "COMUNICACIÓN POR MAIL",
                onClick: () => {
                  closeModal();
                  openArmadoMailModal({ category: "EFECTIVO" });
                }
              },
              secondary: { label: "Cerrar", onClick: closeModal }
            }
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
const modalExtra = document.getElementById("modalExtra");
const modalFooter = document.querySelector(".modalFooter");
const toast = document.getElementById("toast");

/* =========
   Contexto usuario (local)
========= */
const ctxBar = document.getElementById("ctxBar");
const ctxProject = document.getElementById("ctxProject");
const ctxArea = document.getElementById("ctxArea");

const LS_PROFILE_PROJECT = "gb_profile_project";
const LS_PROFILE_AREA = "gb_profile_area";
const LS_NUBES_PROJECT = "gb_nubes_project";
const LS_NUBES_AREA = "gb_nubes_area";

function lsGet(key){
  try { return localStorage.getItem(key) || ""; } catch(e){ return ""; }
}
function lsSet(key, val){
  try {
    if (val) localStorage.setItem(key, val);
    else localStorage.removeItem(key);
  } catch(e){}
}
function getProfile(){
  return { project: lsGet(LS_PROFILE_PROJECT), area: lsGet(LS_PROFILE_AREA) };
}

function initCtxBar(){
  if (!ctxBar || !ctxProject || !ctxArea) return;

  ctxProject.innerHTML =
    `<option value="">PROYECTO (OPCIONAL)</option>` +
    PROJECTS.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("");

  ctxArea.innerHTML =
    `<option value="">ÁREA (OPCIONAL)</option>` +
    AREAS.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");

  const sync = () => {
    const prof = getProfile();
    ctxProject.value = PROJECTS.includes(prof.project) ? prof.project : "";
    ctxArea.value = AREAS.includes(prof.area) ? prof.area : "";
  };

  sync();
  window.__syncCtxBar = sync;

  ctxProject.addEventListener("change", () => {
    const val = ctxProject.value || "";
    lsSet(LS_PROFILE_PROJECT, val);
    showToast(val ? `Proyecto: ${val}` : "Proyecto: sin seleccionar");
  });

  ctxArea.addEventListener("change", () => {
    const val = ctxArea.value || "";
    lsSet(LS_PROFILE_AREA, val);
    showToast(val ? `Área: ${val}` : "Área: sin seleccionar");
  });
}

function updateCtxBarVisibility(){
  if (!ctxBar) return;
  const theme = document.body.dataset.section || "";
  const show = theme === "produccion";
  ctxBar.classList.toggle("hidden", !show);
  if (show && window.__syncCtxBar) window.__syncCtxBar();
}


/**
 * stack items:
 * { screen: <object>, label: <string> }
 */
let stack = [{ screen: MENU, label: "Inicio" }];

/* =========
   Render
========= */

const ICONS = {
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 13h.01"/><path d="M15 13h.01"/><path d="M9 17h.01"/><path d="M15 17h.01"/></svg>`,
  fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>`,
  receipt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12v20l-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M9 6h6"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.5A4.5 4.5 0 0 0 18 9h-1.2A7 7 0 1 0 4 15.7"/><path d="M7 17h10"/><path d="M9 21h6"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  banknote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 10h.01"/><path d="M18 14h.01"/></svg>`,
  idCard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10"/><path d="M7 12h6"/><path d="M8 17c1.2-2 4.8-2 6 0"/></svg>`,
  clapper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7l4-5h5l-4 5"/><path d="M12 7l4-5h5l-4 5"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  copyright: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9a4 4 0 1 0 0 6"/></svg>`
};

const ICON_BY_ID = {
  proveedores: "fileText",
  alta: "users",
  alta_personas: "users",
  alta_empresas: "building",
  contratos: "fileText",
  ct: "fileText",
  nda: "lock",
  cip: "copyright",
  facturacion: "receipt",

  produccion: "clapper",
  rendicion: "receipt",
  mail: "mail",
  nubes: "cloud",
  garantias: "shieldCheck",
  efectivo: "banknote",

  empresa: "idCard"
};

function getTileIcon(item){
  const key =
    ICON_BY_ID[item.id] ||
    (item.url ? "externalLink" : (item.children ? "chevronRight" : "info"));
  return ICONS[key] || ICONS.info;
}

function applyTheme(){
  const theme =
    [...stack].reverse().map(e => e.screen && e.screen.theme).find(Boolean) || "";
  if (theme) document.body.dataset.section = theme;
  else document.body.removeAttribute("data-section");
}

function renderCurrent(){
  applyTheme();
  renderBreadcrumbs();
  updateCtxBarVisibility();

  const current = stack[stack.length - 1].screen;

  menuGrid.innerHTML = "";
  (current.items || []).forEach(item => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    // Tema por botón (para el menú principal)
    const itemTheme = (item.children && item.children.theme) || item.theme || "";
    if (itemTheme) tile.dataset.theme = itemTheme;

    tile.innerHTML = `
      <div class="tileTop">
        <div class="tileTitle">${escapeHtml(item.title)}</div>
        <div class="tileIcon" aria-hidden="true">${getTileIcon(item)}</div>
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
      initCtxBar();
renderCurrent();
    });

    breadcrumbBar.appendChild(btn);
  });
}

function pushScreen(screen, label){
  stack.push({ screen, label });
  initCtxBar();
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
      secondary: item.modal.secondary,
      extra: item.modal.extra,
      actionsAlign: item.modal.actionsAlign
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
function openModal({ title, kicker, bodyHtml, primary, secondary, extra, actionsAlign }){
  modalTitle.textContent = title || "Detalle";
  modalKicker.textContent = kicker || "Detalle";
  modalBody.innerHTML = bodyHtml || "<p>Sin contenido.</p>";

  setupModalButtons(primary, secondary, extra);
  applyFooterLayout();

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
  setupModalButtons(null, null, null);
  if (modalFooter) modalFooter.classList.remove("left", "split");
  if (modalFooter) modalFooter.classList.remove("left");
}

function applyFooterLayout(){
  // Layout se resuelve por CSS (#modalSecondary margin-left:auto)
  if (!modalFooter) return;
  modalFooter.classList.remove("left", "split");
}

function setupModalButtons(primary, secondary, extra){
  const setBtn = (btn, spec, fallbackLabel) => {
    if (!btn) return;
    if (spec && typeof spec.onClick === "function"){
      btn.classList.remove("hidden");
      btn.textContent = spec.label || fallbackLabel;
      btn.onclick = spec.onClick;
    } else {
      btn.classList.add("hidden");
      btn.onclick = null;
    }
  };

  setBtn(modalPrimary, primary, "Acción");
  setBtn(modalExtra, extra, "Acción");
  setBtn(modalSecondary, secondary, "Cerrar");
}

/* =========
   Armado Mail (UX)
========= */
function openArmadoMailModal(preset = {}){
  openModal({
    title: "Comunicación por Mail",
    kicker: "Producción",
    bodyHtml: armadoMailBody(),
    actionsAlign: "left",
    secondary: { label: "Cerrar", onClick: closeModal }
  });
  initArmadoMailUI(preset);
}

function initArmadoMailUI(preset = {}){
  const elProject = modalBody.querySelector("#amProject");
  const elArea = modalBody.querySelector("#amArea");
  const elCategory = modalBody.querySelector("#amCategory");
  const elName = modalBody.querySelector("#amName");

  const fieldName = modalBody.querySelector("#amFieldName");
  const hint = modalBody.querySelector("#amHint");

  const outSubject = modalBody.querySelector("#amSubject");

  const btnCopySubject = modalBody.querySelector("#amCopySubject");
  const btnCopyTo = modalBody.querySelector("#amCopyTo");

  if (!elProject || !elArea || !elCategory || !elName || !outSubject || !btnCopySubject || !btnCopyTo) return;

  const compute = () => {
    const project = elProject.value;
    const area = elArea.value;
    const name = (elName.value || "").trim();

    const category = elCategory.value;

    const subject = `${project} - ${area} - ${category} - ${name || "[Nombre]"}`;

    outSubject.textContent = subject;

    const ok = name.length > 0;
    fieldName?.classList.toggle("invalid", !ok);
    hint?.classList.toggle("hidden", ok);
    btnCopySubject.disabled = !ok;
  };

  // Prefill desde contexto (si el usuario lo cargó arriba)
  const prof = getProfile();
  if (!preset.project && PROJECTS.includes(prof.project)) elProject.value = prof.project;
  if (!preset.area && AREAS.includes(prof.area)) elArea.value = prof.area;

  // Presets (por ejemplo, categoría por defecto)
  if (preset.project) elProject.value = preset.project;
  if (preset.area) elArea.value = preset.area;
  if (preset.category) elCategory.value = preset.category;
  if (preset.name) elName.value = preset.name;

  compute();

  const listen = () => compute();
  elProject.addEventListener("change", listen);
  elArea.addEventListener("change", listen);
  elCategory.addEventListener("change", listen);
  elName.addEventListener("input", listen);

  btnCopySubject.addEventListener("click", async () => {
    await copyText(outSubject.textContent);
    showToast("Copiado: asunto");
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
  const selProject = modalBody.querySelector("#nubesProject");

  const prof = getProfile();
  const savedArea = lsGet(LS_NUBES_AREA);
  const savedProject = lsGet(LS_NUBES_PROJECT);

  const normalizeAreaDefault = (val) => {
    if (!val) return "TODOS";
    if (val === "Produccion") return "PRODUCCIÓN";
    if (val === "PRODUCCIÓN" || val === "ARTE" || val === "VESTUARIO") return val;
    return "TODOS";
  };

  const getDefaultArea = () => normalizeAreaDefault(savedArea || prof.area);
  const getDefaultProject = () => {
    const v = savedProject || prof.project;
    return PROJECTS.includes(v) ? v : "TODOS";
  };

  let activeArea = getDefaultArea();
  let activeProject = getDefaultProject();

  const apply = () => {
    chips.forEach(c => c.classList.toggle("active", c.getAttribute("data-nube-filter") === activeArea));
    rows.forEach(r => {
      const area = r.getAttribute("data-nube-area");
      const project = r.getAttribute("data-nube-project");
      const showArea = (activeArea === "TODOS") || (area === activeArea);
      const showProject = (activeProject === "TODOS") || (project === activeProject);
      r.classList.toggle("collapsed", !(showArea && showProject));
    });
  };

  // Chips: área
  chips.forEach(c => {
    c.addEventListener("click", () => {
      activeArea = c.getAttribute("data-nube-filter");
      lsSet(LS_NUBES_AREA, activeArea === "TODOS" ? "" : activeArea);
      apply();
    });
  });

  // Select: proyecto
  if (selProject){
    selProject.value = activeProject;
    selProject.addEventListener("change", () => {
      activeProject = selProject.value || "TODOS";
      lsSet(LS_NUBES_PROJECT, activeProject === "TODOS" ? "" : activeProject);
      apply();
    });
  }

  // Click row -> open link
  rows.forEach(r => {
    r.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copylink]");
      if (btn) return;
      const url = r.getAttribute("data-nube-url");
      if (url) openExternal(url, "Nube");
    });
  });

  // Stop propagation on copy buttons so it doesn't open the link
  modalBody.querySelectorAll("[data-copylink]").forEach(btn => {
    btn.addEventListener("click", (e) => e.stopPropagation());
  });

  // Default
  activeArea = activeArea || "TODOS";
  if (!chips.some(c => c.getAttribute("data-nube-filter") === activeArea)) activeArea = "TODOS";
  activeProject = activeProject || "TODOS";
  if (selProject) selProject.value = activeProject;

  apply();
}
/* =========
   Datos empresa
========= */
const COMPANY = [
  { key: "Razón Social", value: "Gran Berta SRL" },
  { key: "CUIT e IIBB", value: "33715736549" },
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
    const category = btn.getAttribute("data-category");
    closeModal();
    openArmadoMailModal({ category: category || undefined });
  }
});

/* =========
   Init
========= */
initCtxBar();
renderCurrent();

// Copiar links (Nubes)
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copylink]");
  if (!btn) return;

  const row = btn.closest(".dataRow");
  const url = row?.getAttribute("data-nube-url") || row?.dataset?.nubeUrl || "";

  if (url){
    await copyText(url);
    showToast("Copiado: link");
    return;
  }

  // Fallback: intenta leer un valor visible
  const val = row?.querySelector(".dataVal")?.textContent?.trim();
  if (val){
    await copyText(val);
    showToast("Copiado");
  }
});
