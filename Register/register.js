const onRegister = document.querySelector('.form-submit');

// console.log(fullName, email, password, passwordConfirm)

onRegister.addEventListener('click', function() {
//    var saveLocalStorageFullName =localStorage.setItem('fullName', fullName.value);
//    var saveLocalStorageEmail = localStorage.setItem('email', email.value);
//    var saveLocalStoragePassword = localStorage.setItem('password', password.value);
//    var saveLocalStoragePasswordConfirmation = localStorage.setItem('passwordConfirmation', passwordConfirm.value);
    const fullName = document.querySelector('#fullname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password_confirmation').value;
    console.log(fullName, email, password, passwordConfirm)

    let stroage = new Array()
    stroage = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if (stroage.some(function (v) { return v.email === email; })) { 
        alert('tk đã đk')
        // console.log(JSON.parse(localStorage.getItem('users')));
    }
    else{
        stroage.push({
            "name": fullName,
            "email": email,
            "password": password,
            "passwordConfirm": passwordConfirm,
        })
        localStorage.setItem('users', JSON.stringify(stroage));
        alert('bạn đã đăng ký thành công');
        location.href = "..//index.html";

    }
})