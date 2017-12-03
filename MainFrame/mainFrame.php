<?php include '../assets/core/init.php' ?>

<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--<link rel="stylesheet" type="text/css" href="css/estilo.css"/>-->
    <link rel="stylesheet" type="text/css" href="../assets/css/general.css">
    <link rel="stylesheet" type="text/css" href="assets/css/sweetalert.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../muscular_groups/muscular_groups.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/mainFrame.js"></script>
    <script type="text/javascript" src="js/sweetalert.min.js"></script>

    <title>XPort</title>


</head>
<body>
<header class="hd-12">

    <div id="right-content" class="hd-12">
        <div class="tab hd-7">

            <button class="tablinks" onclick="openTab(event, 'Intro')">Intro</button>
            <button class="tablinks" onclick="openTab(event, 'Ejercicios')"> Ejercicios</button>
            <button id="tabGymTrainer" class="tablinks" onclick="openTab(event, 'MyPersonalTrainer')">
                MyPersonalTrainer
            </button>
            <button class="tablinks" onclick="openTab(event, 'OtraCosa')">Otros</button>
        </div>



        <?php
            if (!empty($_SESSION['user_id'])) {
                echo "
                    <div id=\"logout\" class=\"user-action hd-1\">
                        <div class=\"hd-6\">
                            <a href=\"sign_out.php\"><img style='width: 30px;' src=\"../index/assets/img/logout.png\" alt=\"logout\"/></a>
                        </div>
                        <div class=\"hd-6\">
                            <img src=\"../index/assets/img/settings-work-tool.png\" id=\"icons-h\" class=\"icons-h\" alt=\"stt\"/>
                        </div>
                    </div>
                ";
            }
            else {
                echo "
                    <form id=\"login-form\" class=\"hd-3\">
                        <input id=\"user-login\" name=\"username\" class=\"login-input w3-border w3-round-large\" placeholder=\"username\" required>
                        <input type=\"password\" name=\"password\" class=\"login-input w3-border w3-round-large\" id=\"password-login\" placeholder=\"password\" required>
                        <input id=\"btn-login\" type=\"submit\" class=\"login-btn w3-round-large w3-white\" name=\"login\" value=\"Login\">
                        <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Forgotten Password ?</button>
                    </form>
                                        
                    
                ";
            }
        ?>


    </div>


</header>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

        <form id="forgotten_password_form">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Forgotten Password ?</h4>
                </div>
                <div class="modal-body">
                    <p>Please enter your email address.</p>
                    <input style="width: 75%" id="user-login" name="email_address" type="email" class="login-input w3-border w3-round-large" placeholder="Email Address" required>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="forgotten_password_form_submit" class="btn btn-success">Submit</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>


    </div>
</div>


<div id="Intro" class="tabcontent">

</div>
<div id="Ejercicios" class="tabcontent">
    <iframe id="muscular_groups" height="1080px" width="100%" src="../muscular_groups/muscular_groups.html" name="iframe_m" style="border:none;"></iframe>
    <iframe id="exercises" height="1080px" width="100%" src="../exercises/exercises.html" name="iframe_e" style="display: none"></iframe>
</div>

<div id="MyPersonalTrainer" class="tabcontent">

    <?php
        if (!empty($_SESSION['user_id'])) {
            echo "
                <div id=\"loggedContent\">
                    <iframe height=\"1080px\" width=\"100%\" src=\"../gym_trainer/gym_trainer.html\" name=\"iframe_c\" style=\"border:none;\"></iframe>
                </div>
            ";
        }
        else {
            echo "
                <div id=\"notLoggedContent\">
                    <iframe height=\"1080px\" width=\"100%\" src=\"../index/index.php\" name=\"iframe_a\" style=\"border:none;\"></iframe>
                </div>
            ";
        }
    ?>



</div>

<div id="OtraCosa" class="tabcontent">
    <iframe height="1080px" width="100%" src="nearby/nearby.html"></iframe>

</div>

<script>

    openTab(null, 'MyPersonalTrainer');
    $('#tabGymTrainer').addClass("active");

    $('#forgotten_password_form_submit').click(function (event) {
        event.preventDefault();
        var formData = $( "#forgotten_password_form" ).serializeArray();
        console.log(formData);

        $.ajax({
            url: "forgotten_password.php",
            data: formData,
            type: "POST",
            dataType: "json",
            success: function (result) {

                if (result == "email address doesn't exist") {
                    swal("Unable to reset password", "Email Address doesn't exist ! ", "error");
                }

                else if (result == "failed") {
                    swal("No fue posible resetear la contrasena", "Intentalo de nuevo mas tarde", "error");
                }

                else if (result == "success") {

                    swal({
                        title: "Ya has solicitado tu contrasena",
                        type: "success",
                        confirmButtonColor: "#289a36",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false,
                        html: false
                    }, function(){
                        location.reload();
                    });

                }
            }
        });

    });


    $( "#login-form" ).submit(function( event ) {
        event.preventDefault();
        var formData = $( "#login-form" ).serializeArray();
        console.log(formData);

        $.ajax({
            url: "sign_in.php",
            data: formData,
            type: "POST",
            dataType: "json",
            success: function (result) {

                if (result == "email address and password combination does not match") {
                    swal("No fue posible realizar el log in", "La combinacion de usuario y contrasena no es correcta", "error");
                }

                else if (result == "username doesn't exist") {
                    swal("No fue posible realizar el log in", "No existe este nombre de usuario ", "error");
                }

                else if (result == "passwords not same") {
                    swal("No fue posible crear la cuenta", "Las contrase;as no coinciden", "error");
                }

                else if (result == "success") {

                    swal({
                        title: "Logueado correctamente",
                        type: "success",
                        confirmButtonColor: "#289a36",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false,
                        html: false
                    }, function(){
                        location.reload();
                    });

                }
            }
        });
    });


</script>

<div class="footer">
    <p id="copyright">Copyright by XDroid Inc.</p>
</div>

</body>
</html>