var a = document.doctype.name;
var b = document.inputEncoding;



function checkValidation(){

    //Validamos que el nombre de usuario es un nombre entre 2-20 caracteres
    var username = document.getElementById('username');
    if(username.validity.patternMismatch === true){
        username.setCustomValidity('El nombre de usuario debe de tener entre 2-20 caracteres alfanuméricos');
    }else{
        username.setCustomValidity('');
    }

   /* //comprobamos formato de email
    var email = document.getElementById('email');
    if (email.validity.typeMismatch){
        email.setCustomValidity('Use un formato adecuado de email (usuario@empresa.dominio')
    }*/



    //Comprobamos que la contraseña debe tener una mayuscula, una minuscula, un numero y minimo 8 caracteres
    var pwd1 = document.getElementById('password');

   if (pwd1.validity.patternMismatch === true){
        pwd1.setCustomValidity('La contraseña debe tener una mayúscula, una minúscula, un número y minimo 8 caracteres');
    } else{
       pwd1.setCustomValidity('');
       //Comprobamos que las contraseñas se corresponden
        var pwd2 = document.getElementById('passwordr');
        if(pwd1.value != pwd2.value){
            pwd1.setCustomValidity('Las contraseñas deben ser iguales');
    }
    }

}

function checkLogin() {
   var dummyUser = document.getElementById('user-login');
   var dummyPwd = document.getElementById('password-login');


   if(dummyUser.value == 'damian' && dummyPwd.value == 'Password1'){
       window.location.href = "../MainFrame/mainFrame.html";
   }else{
       dummyUser.setCustomValidity('Nombre de usuario y contraseña inválidos');
   }

}
