document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".info-card"));
  const searchInput = document.getElementById("searchInput");

  const modal = document.getElementById("infoModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const closeBottomBtn = document.getElementById("closeBottomBtn");
  const copyModalBtn = document.getElementById("copyModalBtn");

  const toast = document.getElementById("toast");
  let toastTimeoutId = null;

  /* --- Abrir modal con el contenido de la tarjeta --- */

  function openModalFromCard(card) {
    const titleEl = card.querySelector(".info-card__title");
    const fullTextEl = card.querySelector(".info-card__fulltext");

    if (!fullTextEl) return;

    const titleText = titleEl ? titleEl.textContent.trim() : "Detalle";
    modalTitle.textContent = titleText;
    modalBody.innerHTML = fullTextEl.innerHTML;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      // fallback
      modal.removeAttribute("hidden");
    }
    modalBackdrop.hidden = false;
  }

  function closeModal() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.setAttribute("hidden", "true");
    }
    modalBackdrop.hidden = true;
  }

  cards.forEach((card) => {
    const btn = card.querySelector(".info-card__button");
    if (!btn) return;

    btn.addEventListener("click", () => {
      openModalFromCard(card);
    });
  });

  modalCloseBtn.addEventListener("click", closeModal);
  closeBottomBtn.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", closeModal);

    // Cerrar el modal haciendo click fuera de la tarjeta
  modal.addEventListener("click", (event) => {
    // Cuando se hace click en el fondo del <dialog>, el target es el propio modal
    if (event.target === modal) {
      closeModal();
    }
  });


  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      closeModal();
    }
  });

  /* --- Copiar contenido del modal --- */

  function showToast(message) {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("toast--visible");

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    toastTimeoutId = setTimeout(() => {
      toast.classList.remove("toast--visible");
    }, 1800);
  }

  copyModalBtn.addEventListener("click", async () => {
    const text = modalBody.innerText.trim();

    if (!text) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast("Texto copiado al portapapeles");
      } else {
        // Fallback
        const tempArea = document.createElement("textarea");
        tempArea.value = text;
        document.body.appendChild(tempArea);
        tempArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempArea);
        showToast("Texto copiado al portapapeles");
      }
    } catch (err) {
      console.error("Error al copiar:", err);
      showToast("No se pudo copiar. Probá manualmente (Ctrl+C).");
    }
  });

  /* --- Buscador --- */

  function normalizar(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filtrarCards(queryRaw) {
    const query = normalizar(queryRaw.trim());
    if (!query) {
      cards.forEach((card) => card.classList.remove("info-card--hidden"));
      return;
    }

    cards.forEach((card) => {
      const titleEl = card.querySelector(".info-card__title");
      const fullTextEl = card.querySelector(".info-card__fulltext");

      const textTitle = titleEl ? titleEl.textContent : "";
      const textFull = fullTextEl ? fullTextEl.textContent : "";

      const hayMatch =
        normalizar(textTitle).includes(query) ||
        normalizar(textFull).includes(query);

      card.classList.toggle("info-card--hidden", !hayMatch);
    });
  }

  searchInput.addEventListener("input", (ev) => {
    filtrarCards(ev.target.value);
  });
});

