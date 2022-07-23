const reveals = document.querySelectorAll('.reveal');
const playLogin = document.querySelector('#id01');
const loginForm = document.querySelector('.login-btn')
const logoutForm = document.querySelector('.logout-btn');
    // console.log(reveals);
const storageEmail = localStorage.getItem('email');
const storagePassword = localStorage.getItem('password');
// console.log(storagePassword);
const btnLogin = document.querySelector('#submit_login');
const modal = document.querySelector('.modal');
const showWellcome = document.querySelector('#wellcome');
const showMoblie = document.querySelector('.header_mobile');
const menu = document.querySelector('#menu');

window.addEventListener('load', () => {
    const users_name = localStorage.getItem('email');
    if (users_name != "") {
        document.getElementById('email').value = users_name;
    }else {
        document.getElementById('email').value = "";
    }
})

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    showMoblie.classList.toggle('active');
});
// playLogin.onclick  = function() {
//     email.value = storageEmail
// }
const elm = JSON.parse(localStorage.getItem("users"))
console.log(elm);
const storageName = localStorage.getItem('fullName')?localStorage.getItem('fullName'):'';
console.log(storageName);
    if(storageName!='')
        {
          alert('Please visit profile');
          window.reload();
        }

btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    let stroage = new Array()
    stroage = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(stroage.some(function(value) {
        return value.email === email && value.password === password
    })) {
        
        modal.style.display = 'none';
        // const delay = (duration / 1000).toFixed(2);
        loginForm.style.display = 'none';
        logoutForm.style.display = 'block';
        let current_user = stroage.filter((v)=>{return v.email==email && v.password==password})[0]
        //console.log(current_user);
        localStorage.setItem('name', current_user.name);
        localStorage.setItem('email',current_user.email);
        const user_name = localStorage.getItem('name',current_user.name);
        showWellcome.className = 'show'
        showWellcome.style.animation = `slideInLeft ease 1s, fadeOut linear 0.3s 2.5s forwards`;
        showWellcome.innerHTML = ` Chào mừng ${user_name} đã đăng nhập `;
        setTimeout(function(){ 
            showWellcome.className = showWellcome.className.replace("show", ""); 
        }, 3000);
    }else {
        modal.style.display = 'none';
        showWellcome.className = 'show'
        showWellcome.style.animation = `slideInLeft ease 1s, fadeOut linear 0.3s 2.5s forwards`;
        showWellcome.innerHTML = "Tên tài khoản hoặc mật khẩu không chính xác";
        setTimeout(function(){ showWellcome.className = showWellcome.className.replace("show", ""); }, 3000);
    }
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener('scroll', function() {
    for(var i = 0; i < reveals.length; i++) {
        // var scroll = this.window.scrollY;
        // console.log(scroll);

        // if(scroll > 600) {
        //     reveals[i].classList.add('apper');
        // }
        var windowHeight = window.innerHeight;
        // console.log(windowHeight)
        var productTop = reveals[i].getBoundingClientRect().top;//trả về kích thước của một phần tử và vị trí của nó so với khung nhìn.
        //thức trả về một đối tượng DOMRect với tám thuộc tính: left, top, right, bottom, x, y, width, height
        // console.log(productTop);
        var revealPoint = 200;

            if(productTop < windowHeight - revealPoint) {
                reveals[i].classList.add('apper');
            }else {
                // reveal[i].classList.remove('show');
            }
    }
    
});

logoutForm.addEventListener('click', function() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    window.location.reload();
});