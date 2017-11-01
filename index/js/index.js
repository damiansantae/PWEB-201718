var a = document.doctype.name;

var b = document.inputEncoding;


//Listener a boton de login
function checkValidation(){


    document.getElementById('password');

    //Validamos que el nombre de usuario es un nombre entre 2-20 caracteres
    var username = document.getElementById('username');
    if(!username.validity.patternMismatch){
        username.setCustomValidity('El nombre de usuario debe de tener entre 2-20 caracteres alfanuméricos')
    }


    //comprobamos formato de email

    var email = document.getElementById('email');
    if (!email.validity.typeMismatch){
        email.setCustomValidity('Use un formato adecuado de email (usuario@empresa.dominio')
    }
    //Comprobamos que las contraseñas se corresponden
    var pwd1 = document.getElementById('password');
    var pwd2 = document.getElementById('passwordr');
    if(pwd1.value !== pwd2.value){
        pwd1.setCustomValidity('Las contraseñas deben ser iguales');
    }
}
