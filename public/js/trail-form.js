const form = document.querySelector(".adminForm");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => {
      el.textContent = "";
    });

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });

      const data = await response.json();

      // Handle validation errors
      if (!response.ok) {
        if (data.errors) {
          for (const [field, message] of Object.entries(data.errors)) {
            const errorElement = document.querySelector(`#${field}-error`);

            if (errorElement) {
              errorElement.textContent = message;
            }
          }
        } else if (data.error) {
          alert(data.error);
        }

        return;
      }

      // Handle successful submission
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  });
}
