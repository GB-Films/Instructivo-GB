/* =========
   Menú data-driven (fácil de editar)
========= */

const LINKS = {
  // Contratos
  nda: "https://docs.google.com/document/d/1xo2ibL-DJaxytpSM6mqWRFiP-nLEkYTV/edit?usp=drive_link&ouid=101597232098541922085&rtpof=true&sd=true",
  trabajo: "https://docs.google.com/document/d/12RAj-Tu5ec1F90jeAtAFhM2T2sFh0Lln/edit?usp=sharing&ouid=101597232098541922085&rtpof=true&sd=true",
  ip: "https://docs.google.com/document/d/1EycBkBryI1VKB7CxSunkGGDcVeo9c6uN/edit?usp=sharing&ouid=101597232098541922085&rtpof=true&sd=true",

  // Alta Proveedor (por ahora mismo link en ambos)
  alta_personas: "https://forms.clickup.com/31001374/f/xj2ry-9334/19VWKHJ9W4BQ4BDYG8",
  alta_empresas: "https://forms.clickup.com/31001374/f/xj2ry-9334/19VWKHJ9W4BQ4BDYG8"
};

function altaProveedorBody(){
  return `
    <p>Completar el alta proveedor. Presione el boton <strong>"Alta"</strong> para completar</p>
    <p>Si lo ha completado previamente no es necesario por segunda vez</p>
  `;
}

const MENU = {
  title: "",
  subtitle: "",
  items: [
    {
      id: "proveedores",
      title: "Instructivo Proveedores",
      desc: "Alta, contratos y facturación.",
      badge: "Proveedores",
      badgeAlt: false,
      children: {
        title: "",
        subtitle: "",
        items: [
          {
            id: "alta",
            title: "Alta como Proveedores",
            desc: "Personas o Empresas.",
            badge: "Ver",
            children: {
              title: "",
              subtitle: "",
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
                    primary: { label: "Alta", onClick: () => openExternal(LINKS.alta_personas, "Formulario de alta") }
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
                    primary: { label: "Alta", onClick: () => openExternal(LINKS.alta_empresas, "Formulario de alta") }
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
              title: "",
              subtitle: "",
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
            desc: "Requisitos y envío (placeholder).",
            badge: "Abrir",
            modal: { title: "Facturación", kicker: "Proveedores", body: placeholderText("Facturación") }
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
        title: "",
        subtitle: "",
        items: [
          { id: "rendicion", title: "Como Realizar Rendición", desc: "Checklist (placeholder).", badge: "Abrir", modal: { title: "Como Realizar Rendición", kicker: "Producción", body: placeholderText("Como Realizar Rendición") } },
          { id: "mail", title: "Armado Mail Rendición", desc: "Plantilla (placeholder).", badge: "Abrir", modal: { title: "Armado Mail Rendición", kicker: "Producción", body: placeholderText("Armado Mail Rendición") } },
          { id: "nubes", title: "Links a Nubes", desc: "Accesos rápidos (placeholder).", badge: "Abrir", modal: { title: "Links a Nubes", kicker: "Producción", body: placeholderLinks() } },
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
const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");

const overlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalBody = document.getElementById("modalBody");
const modalPrimary = document.getElementById("modalPrimary");
const modalSecondary = document.getElementById("modalSecondary");
const toast = document.getElementById("toast");

let stack = [MENU];

/* =========
   Render
========= */
function renderCurrent(){
  const current = stack[stack.length - 1];

  backBtn.classList.toggle("hidden", stack.length <= 1);

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

function onItemClick(item){
  if (item.url){
    openExternal(item.url, "Google Drive");
    return;
  }

  if (item.children){
    stack.push(item.children);
    renderCurrent();
    return;
  }

  if (item.action === "companyData"){
    openCompanyDataModal();
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
    bodyHtml: placeholderText(item.title)
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
    }
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
   Navegación
========= */
backBtn.addEventListener("click", () => {
  if (stack.length > 1) stack.pop();
  renderCurrent();
});

homeBtn.addEventListener("click", () => {
  stack = [MENU];
  renderCurrent();
  closeModal();
});

/* =========
   Cerrar modal
========= */
modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
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
