import IMask from "imask";
import { ajax } from "./ajax.js";

export function initForm() {
  const form = document.querySelector(".feedback-form");
  const phoneInput = form.querySelector("#phone");

  IMask(phoneInput, { mask: "+{375}(29)000-00-00" });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageElement = document.querySelector(".form-message");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const errors = validateForm(data);

    clearErrors(form);
    if (Object.keys(errors).length) {
      showErrors(form, errors);
      messageElement.textContent = "";
      return;
    }

    ajax({
      url: "/submit",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
      onSuccess: (result) => {
        if (result.status === "error") {
          showErrors(form, result.fields);
        } else {
          form.reset();
          messageElement.textContent = result.msg || "Форма успешно отправлена";
          messageElement.classList.add("success");
        }
      },
      onError: (error) => {
        console.error("Ошибка AJAX-запроса:", error);
        messageElement.textContent = "Произошла ошибка отправки формы.";
        messageElement.classList.add("error");
      },
    });
  });
}

function validateForm(data) {
  const errors = {};

  if (!data.name) errors.name = "Имя обязательно.";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Введите корректный email.";
  }
  if (!data.phone) errors.phone = "Телефон обязателен.";
  if (!data.message) errors.message = "Сообщение обязательно.";

  return errors;
}

function clearErrors(form) {
  form.querySelectorAll(".error").forEach((errorElement) => {
    errorElement.textContent = "";
  });
  form.querySelectorAll(".invalid").forEach((input) => {
    input.classList.remove("invalid");
  });
}

function showErrors(form, errors) {
  for (const [field, message] of Object.entries(errors)) {
    const input = form.querySelector(`#${field}`);
    const errorElement = form.querySelector(`.error-${field}`);
    if (input) input.classList.add("invalid");
    if (errorElement) errorElement.textContent = message;
  }
}
