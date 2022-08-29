const contactForm = document.getElementById("contact-form");
const loader = document.querySelector(".loader");

loader.style.display = "none";

contactForm.addEventListener("submit", function (e) {
  loader.style.display = "block";
  e.preventDefault();

  const url = e.target.action;
  const formData = new FormData(contactForm);

  fetch(url, {
    method: "post",
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      //url terima kasih
      loader.style.display = "none";
      window.location.href = "terimakasih.html";
    })
    .catch((e) => alert("Error occured"));
});
