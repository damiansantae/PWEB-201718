var x = document.doctype.name;
var y = document.inputEncoding;


var isLogged = false;

function setLoging(islogged) {
    isLogged = islogged;
}


function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    if (!!evt) {
        evt.currentTarget.className += " active";
    }

}

function checkLoginState() {
    var b = document.getElementById('loggedContent');
    var c = document.getElementById('notLoggedContent');
    var userAction = document.getElementById('logout');
    var loginForm = document.getElementById('login-form');

    if (isLogged === false) {

        b.style.display = "none";
        c.style.display = "block";
        userAction.style.display = "none";
        loginForm.style.display = "block";


    } else {

        b.style.display = "block";
        c.style.display = "none";
        userAction.style.display = "block";
        loginForm.style.display = "none";

    }
}

/**************************************************
 * Funciones para inicio y registro de sesion****
 * *********************************************/
function checkValidation() {

    //Validamos que el nombre de usuario es un nombre entre 2-20 caracteres
    var username = document.getElementById('username');
    if (username.validity.patternMismatch === true) {
        username.setCustomValidity('El nombre de usuario debe de tener entre 2-20 caracteres alfanuméricos');
    } else {
        username.setCustomValidity('');
    }
    /* //comprobamos formato de email
     var email = document.getElementById('email');
     if (email.validity.typeMismatch){
         email.setCustomValidity('Use un formato adecuado de email (usuario@empresa.dominio')
     }*/

    //Comprobamos que la contraseña debe tener una mayuscula, una minuscula, un numero y minimo 8 caracteres
    var pwd1 = document.getElementById('password');

    if (pwd1.validity.patternMismatch === true) {
        pwd1.setCustomValidity('La contraseña debe tener una mayúscula, una minúscula, un número y minimo 8 caracteres');
    } else {
        pwd1.setCustomValidity('');
        //Comprobamos que las contraseñas se corresponden
        var pwd2 = document.getElementById('passwordr');
        if (pwd1.value != pwd2.value) {
            pwd1.setCustomValidity('Las contraseñas deben ser iguales');
        }
    }

}

function checkLogin() {
    var dummyUser = document.getElementById('user-login');
    var dummyPwd = document.getElementById('password-login');


    if (dummyUser.value == 'damian' && dummyPwd.value == 'Password1') {
        setLoging(true);

    } else {
        dummyUser.setCustomValidity('Nombre de usuario y contraseña inválidos');
    }
    checkLoginState()

}


function logOut() {
    setLoging(false);
    checkLoginState();

}

