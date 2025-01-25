export function initModal() {
  const MODAL_OPEN_DELAY = 250;
  const BODY_SCROLL_LOCK = "hidden";

  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal__content");
  const modalText = document.querySelector(".modal h2");
  const openButton = document.querySelector(".open--modal");
  const closeButton = modal?.querySelector(".modal--close");

  let comboCount = 0;
  let timer = null;

  const openModal = () => {
    modal.classList.add("modal--open");

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = BODY_SCROLL_LOCK;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const closeModal = () => {
    comboCount = 0;
    openButton.textContent = "Нажми";
    modal.classList.remove("modal--open");

    setTimeout(() => {
      document.body.style = "";
    }, MODAL_OPEN_DELAY);
  };

  function getScrollbarWidth() {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    return windowWidth - documentWidth;
  }

  const handleOpenButtonClick = () => {
    clearTimeout(timer);

    comboCount += 1;
    modalText.textContent = `Результат ${comboCount}\nА теперь попробуй нажать несколько раз`;
    openButton.textContent = `Нажми ${comboCount}`;

    if (comboCount > 1) {
      openButton.classList.add("button_combo");
      modalText.textContent = `Комбо\nРезультат ${comboCount}`;
    }

    timer = setTimeout(() => {
      openModal();
      openButton.classList.remove("button_combo");
    }, MODAL_OPEN_DELAY);
  };

  const handleCloseButtonClick = () => closeModal();

  const handleOutsideClick = (e) => {
    if (
      modal.classList.contains("modal--open") &&
      !modalContent.contains(e.target)
    ) {
      closeModal();
    }
  };

  openButton.addEventListener("click", handleOpenButtonClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
  document.addEventListener("click", handleOutsideClick);
}
