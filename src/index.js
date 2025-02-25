import { i18n } from "./modules/i18n.js";
import { select } from "./modules/select.js";

import "./styles/index.css";

document.addEventListener("DOMContentLoaded", () => {
  i18n();
  select();
});
