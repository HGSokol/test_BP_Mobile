export function ajax({
  url,
  method = "GET",
  body = null,
  headers = {},
  onSuccess,
  onError,
}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  for (const [key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (onSuccess) onSuccess(response);
        } catch (error) {
          if (onError) onError(error);
        }
      } else {
        if (onError)
          onError(new Error(`Ошибка: ${xhr.status} ${xhr.statusText}`));
      }
    }
  };

  xhr.onerror = function () {
    if (onError) onError(new Error("Ошибка сети или CORS"));
  };

  xhr.send(body ? JSON.stringify(body) : null);
}
