var x = document.doctype.name;
var y = document.inputEncoding;




var isLogged = 0;

function setLoging (islogged){
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
    evt.currentTarget.className += " active";
}
function checkLogin() {

onLogged = 1;
    if (isLogged === 0) {

        var x = document.getElementById('tabGymTrainer');
        x.className += " disable";
        x.innerHTML = "Login To see this content";
        alert('hola')
    }


}