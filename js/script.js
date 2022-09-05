const form = document.forms["contact-form"];
const contactForm = document.getElementById("contact-form");
const btnLoading = document.querySelector(".btn-loading");
const btnKirim = document.querySelector(".btn-kirim");
const alertBerhasil = document.querySelector(".alert-berhasil");

// btnLoading.style.display = 'none';

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // tampilkan tombol loading, hilangkan tombol kirim
  // btnLoading.style.display = "block";
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
      contactForm.reset();
      // btnLoading.style.display = "none";
      // window.location.href = "terimakasih.html";
      console.log("Success!", response);
    })
    .catch((e) => alert("Error occured"));
});
