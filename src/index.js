import { initModal } from "./modules/modal.js";
import { initForm } from "./modules/form.js";

import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initForm();
});
