

function searchExercise() {
    var input, filter, list, exercises, p, i;
    input = document.getElementById("searchBarInput");
    filter = input.value.toUpperCase();
    list = document.getElementById("exercises_list");
    exercises = list.getElementsByTagName("li");
    for (i = 0; i < exercises.length; i++) {
        p = exercises[i].getElementsByTagName("h3")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            exercises[i].style.display = "";
        } else {
            exercises[i].style.display = "none";

        }
    }


}
function insertDay(id) {
    var routineNumber = id.substring(8, 9);
    var table_parent = document.getElementById('routine_'+routineNumber);
    var nDays = table_parent.getElementsByTagName('td').length;

    var newDay = document.createElement('td');
    var table = table_parent.getElementsByTagName('tr').item(0);
    newDay.setAttribute('id','routine_'+routineNumber+'_'+nDays);
    newDay.innerHTML = "<h3>"+nDays+"</h3>";
    table.appendChild(newDay);
}

function insertRoutine(name,id) {
  var divParent = document.getElementById('routines_nav');
  var nRoutines = divParent.getElementsByClassName('routine_row').length;
  var newRoutine = document.createElement('div');
  newRoutine.setAttribute('id','routine_'+id);
  newRoutine.setAttribute('class','routine_row');
  newRoutine.setAttribute('onmouseover','isHovered(this)');
  newRoutine.setAttribute('onmouseout','finishHover(this)');

  newRoutine.innerHTML = "<div class=\"routine_master hd-12\" >\n" +
      "                    <img src=\"../MainFrame/assets/images/press_banca.JPG\" class=\"hd-2\">\n" +
      "                    <p>Routina "+name+"</p>\n" +
      "                </div>\n" +
      "                <div class=\"routine_detail hd-12\">\n" +
      "                    <table>\n" +
      "                        <tr class=\"table_days\">\n" +
      "                            <td> <button id=\"routine_"+id+"_btn\" class=\"small_btn w3-xlarge w3-circle w3-white w3-card-4\"  onclick=\"insertDay(this.id)\">+</button></td>\n" +
      "                            <td id=\"routine_"+id+"_1\"> <h3>1</h3></td>\n" +
      "                        </tr>\n" +
      "                    </table>\n" +
      "                </div>";



    //Eliminamos boton de añadir para que no aparezca arriba de la nueva routina añadida
    var btn = document.getElementById("add_routine_btn");
    btn.parentNode.removeChild(btn);

divParent.appendChild(newRoutine);      //Añadimos la routina
    divParent.appendChild(btn);         //Añadimos el boton

}


function dragstart_handler(ev) {
    console.log("dragStart");
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);

    ev.dataTransfer.dropEffect = "copy";
}

function dragover_handler(ev) {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "copy"
}

function drop_handler(ev) {
    ev.preventDefault();
    var targetID= ev.target.id;
    var rowNumber =targetID.substring(14, 15);

    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");

    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "exercise_"+rowNumber;
    ev.target.appendChild(nodeCopy);

    //hacemos que no se pueda volver a hacer drop en la fila
    var divDropped = document.getElementById(targetID);
    divDropped.removeAttribute("ondrop");
    divDropped.removeAttribute("ondragover");


}


function insertExercise(){
    var table = document.getElementById('exercise_nav').getElementsByTagName('table').item(0);
    var nRows = table.getElementsByTagName('tr').length;
    var newRow = document.createElement('tr');
    newRow.setAttribute('id','row_exercise_'+nRows);
    newRow.setAttribute('class','d-12 exercise_row');
    newRow.innerHTML = "<td class=\"hd-8 img\" id=\"exer_descript_"+nRows+"\" ondrop=\"drop_handler(event);\" ondragover=\"dragover_handler(event);\"></td>\n" +
        "              <td class=\"hd-2\"> <input class=\"short-input\" type=\"number\" step=\"1\" placeholder=\"0\" min=\"0\"></td>\n" +
        "              <td class=\"hd-2\"><input class=\"short-input\" type=\"number\" step=\"1\" placeholder=\"0\" min=\"0\"></td>";

//Eliminamos boton de añadir para que no aparezca arriba de la nueva routina añadida
    var btn = document.getElementById("add_new_ex_row");
    btn.parentNode.removeChild(btn);

    table.appendChild(newRow);//Añadimos nueva columna
    table.appendChild(btn);         //Añadimos el boton
}

function  isHovered(x) {
 var divToDisplay= x.lastElementChild;
 divToDisplay.style.display = 'block';


}
function finishHover(x){
    var divToDisplay= x.lastElementChild;
    divToDisplay.style.display = 'none';
}









var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {

    try {
        var xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        xmlHttp = false;
    }

    if (!xmlHttp) alert('Error creating XMLHttpRequest object.');
    else return xmlHttp;

}

// make asynchronous HTTP request using XMLHttpRequest object
function process() {
// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        name = encodeURIComponent(
            document.getElementById("myName").value);
// execute quickstart.php page from server
        xmlHttp.open("GET", "getUserRoutines.php?user=" + name, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);
}

function handleServerResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('('+xmlHttp.responseText+')');

            for(var i=0;i<jsonResponse.routines.length;i++){
                insertRoutine(jsonResponse.routines[i].name,jsonResponse.routines[i].id);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}