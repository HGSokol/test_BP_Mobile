export function i18n() {
  const supportedLanguages = ["de", "en", "es", "fr", "ja", "pt"];
  const defaultLanguage = "en";
  const dynamicValues = {
    yearly_year: "$39.99",
    yearly_week: "$0.48",
    weekly_week: "$6.99",
  };

  function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const systemLanguage = navigator.language.split("-")[0];

    const selectedLanguage = supportedLanguages.includes(langParam)
      ? langParam
      : supportedLanguages.includes(systemLanguage)
      ? systemLanguage
      : defaultLanguage;

    document.documentElement.lang = selectedLanguage;

    return selectedLanguage;
  }

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`/public/i18n/${lang}.json`);

      if (!response.ok)
        throw new Error(`Failed to load language file: ${lang}`);

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function updateElements(translations) {
    if (!translations) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const priceKey = el.getAttribute("data-price");

      if (translations[key]) {
        el.innerHTML = translations[key].replace(
          "{{price}}",
          dynamicValues[priceKey] || ""
        );
      }
    });
  }

  (async () => {
    const currentLanguage = getCurrentLanguage();
    const translations = await loadLanguage(currentLanguage);
    updateElements(translations);
  })();
}
