export function select() {
  const buttonsContainer = document.querySelector(".buttons_container");
  if (!buttonsContainer) return;

  const pricingButtons = buttonsContainer.querySelectorAll(".pricing");
  const continueButton = buttonsContainer.querySelector(".continue");

  if (!pricingButtons.length || !continueButton) return;

  const linkData = {
    yearly: "https://apple.com/",
    weekly: "https://google.com/",
  };

  let selectedLink = linkData.yearly;

  function updateSelectedButton(selectedButton) {
    pricingButtons.forEach((button) => button.classList.remove("selected"));

    selectedButton.classList.add("selected");

    if (selectedButton.querySelector(".title").textContent.includes("YEARLY")) {
      selectedLink = linkData.yearly;
    } else {
      selectedLink = linkData.weekly;
    }
  }

  pricingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateSelectedButton(button);
    });
  });

  continueButton.addEventListener("click", () => {
    window.location.href = selectedLink;
  });

  updateSelectedButton(pricingButtons[0]);
}
