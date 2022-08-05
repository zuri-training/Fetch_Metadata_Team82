const togglePassword = document.querySelector('#togglePassword', '#togglePassword2');
const password = document.querySelector('#c-psw, #psw');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});


// setTimeout(() => {
//   const alert = document.getElementById('alert');
//   alert.style.display = 'none';
// }, 1000);

// $("#alert").show().delay(5000).fadeOut();



// prevent from submit
// const form = document.querySelector("form");
//         form.addEventListener('submit', function (e) {
//             e.preventDefault();
//         }); 