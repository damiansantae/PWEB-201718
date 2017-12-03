<?php include '../assets/core/init.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
    <script src="http://code.jquery.com/jquery-git2.js"></script>
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/sweetalert.css">
    <script type="text/javascript" src="assets/js/sweetalert.min.js"></script>

</head>
<body>

<!-- <header class="col-12">
     <div id="logo" class="col-3">
    &lt;!&ndash;     <img src="assets/img/2ND%20LOGO.png" alt="logo" width="300" height="100"/>&ndash;&gt;
     </div>
 </header>-->
<div id="main-container" class="col-12">

    <section id="explanation-wrapper" class="col-4">
        <h2> ¿Qué es NombreDeLaWeb? </h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis mi id risus vestibulum varius.
        Praesent ac leo eget urna imperdiet elementum sit amet ac leo. Cras sagittis tortor ut enim imperdiet, in
        pulvinar turpis vehicula. Vivamus a suscipit ipsum, sit amet dapibus orci. Duis in rhoncus mauris. Donec
        blandit, tellus sit amet cursus tincidunt, quam mi finibus ante, et vehicula erat ante quis nisi. Morbi
        vitae nisi et massa commodo euismod. Nunc in augue neque. Interdum et malesuada fames ac ante ipsum primis
        in faucibus.
    </section>
    <section id="register-wrapper" class="col-4">
        <h2>Registrate gratis</h2>
        <form id="signup_form">
            <input id="input-name" v-text="Nombre" name="firstname" class="w3-border w3-round-large"
                   placeholder="Nombre"
                   required> <br>
            <input id="input-apellidos" v-text="Apellidos" name="lastname" class="w3-input w3-border w3-round-large"
                   placeholder="Apellidos" required><br>
            <input id="input-apellidos" name="email_address" class="w3-input w3-border w3-round-large"
                   placeholder="Email Address" type="email" required><br>
            <input id="username" class="w3-input w3-border w3-round-large" name="username"
                   placeholder="Nombre de usuario" required
                   pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"><br>
            <input type="password" id="password" name="password" class="w3-input w3-border w3-round-large"
                   placeholder="Contraseña nueva" required
                   pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"><br>
            <input type="password" id="passwordr" name="retype_passwordr" class="w3-input w3-border w3-round-large"
                   placeholder="Repetir contraseña" required><br>
            <input name="weigh" class="short-input w3-border w3-round-large" placeholder="0,0" type="text" min="0">
            <select name="weigh_unit" class="w3-border w3-round-large short-input">
                <option> kg</option>
                <option> lb</option>
            </select>
            Año de nacimiento
            <input name="birth_year" class=" short-input w3-border w3-round-large" placeholder="0"
                   type="number"><br>
            <div id="rb-sex">
                <input type="radio" name="gender" value="hombre" class="w3-radio"> Hombre
                <input type="radio" name="gender" value="mujer" class="w3-radio"> Mujer
            </div>
            <br>

            <input id="btn-register" class="w3-button w3-round-large w3-red" type="submit" name="register"
                   value="Register" onclick="checkValidation()">
        </form>
    </section>


    <footer>
        <script type="text/javascript" src="../MainFrame/js/mainFrame.js"></script>
    </footer>

</div>

<script>
    $( document ).ready(function() {
        $( "#signup_form" ).submit(function( event ) {
            event.preventDefault();
            var formData = $( "#signup_form" ).serializeArray();

            swal({
                    title: "Seguro que quieres registrarte?",
                    text: "Esta accion no puede ser revertida",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Registrate!",
                    closeOnConfirm: false
                },
                function(){
                    $.ajax({
                        url: "user.php",
                        data: formData,
                        type: "POST",
                        dataType: "json",
                        success: function (result) {

                            if (result == "username taken") {
                                swal("No se pudo crear la cuenta", "El nombre de usuario ya esta en uso ", "error");
                            }

                            else if (result == "email taken") {
                                swal("No se pudo crear la cuenta", "Esta direccion de correo ya pertenece a otro usuario ", "error");
                            }

                            else if (result == "passwords not same") {
                                swal("No se pudo crear la cuenta", "Las contrasenas no coinciden", "error");
                            }

                            else if (result == "Cuenta creada exitosamente") {

                                swal({
                                    title: "Successfully created account!",
                                    text: " Your account has been created successfully.",
                                    type: "success",
                                    confirmButtonColor: "#289a36",
                                    confirmButtonText: "Okay",
                                    closeOnConfirm: false,
                                    html: false
                                }, function(){
                                    window.location.replace("../MainFrame/mainFrame.php");
                                });

                            }

                            else if (result == "failed to created") {
                                swal("Unable to create the account!", "Please try again later!", "error");
                            } else{
                                swal({
                                    title: "Successfully created account!",
                                    text: "Now you can log in to access your personal trainer!.",
                                    type: "success",
                                    confirmButtonColor: "#289a36",
                                    confirmButtonText: "Okay",
                                    closeOnConfirm: false,
                                    html: false
                                });
                            }
                        }
                    });
                });
        });
    });
</script>

</body>
</html>

