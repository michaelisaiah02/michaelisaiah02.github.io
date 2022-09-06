// Navbar Aktif
const sections = document.querySelectorAll("section");
const navLink = document.querySelectorAll("nav .container ul li");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 4) {
      current = section.getAttribute("id");
    }
  });
  navLink.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});

// Contact Form
const form = document.forms["contact-form"];
const contactForm = document.getElementById("contact-form");
const btnLoading = document.querySelector(".btn-loading");
const btnKirim = document.querySelector(".btn-kirim");
const alertBerhasil = document.querySelector(".alert-berhasil");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");

  const url = e.target.action;
  const formData = new FormData(contactForm);

  fetch(url, {
    method: "post",
    body: formData,
    mode: "no-cors",
  })
    .then((response) => {
      // tampilkan tombol kirim, hilangkan tombol loading
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      // tampilkan alert
      alertBerhasil.classList.toggle("d-none");
      // reset formnya
      form.reset();
      console.log("Success!", response);
    })
    .catch((e) => alert("Error occured"));
});
