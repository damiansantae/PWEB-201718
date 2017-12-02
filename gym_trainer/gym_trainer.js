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
function getCurrentDayId(){
    var exercise_nav = document.getElementById('exercise_nav');
    var table = exercise_nav.getElementsByTagName('table').item(0);
    var table_id = table.id;
    var n = table_id.indexOf("_") + 1;
    return table_id.substring(n);
}

function insertDay(name,id,routine_id) {


    var table_parent = document.getElementById('routine_' + routine_id);

    var newDay = document.createElement('td');
    var table = table_parent.getElementsByTagName('tr').item(0);
    newDay.setAttribute('id', 'routine_' + routine_id + '_' + id);
    newDay.setAttribute('onclick','dayClicked(this.id)');
    newDay.innerHTML = "<h3>" + name+ "</h3>";
    table.appendChild(newDay);
}

function insertRoutine(name, id) {
    var divParent = document.getElementById('routines_nav');
    var nRoutines = divParent.getElementsByClassName('routine_row').length;
    var newRoutine = document.createElement('div');
    newRoutine.setAttribute('id', 'routine_' + id);
    newRoutine.setAttribute('class', 'routine_row');
    newRoutine.setAttribute('onmouseover', 'isHovered(this)');
    newRoutine.setAttribute('onmouseout', 'finishHover(this)');

    newRoutine.innerHTML = "<div class=\"routine_master hd-12\" >\n" +
        "                    <img src=\"../MainFrame/assets/images/press_banca.JPG\" class=\"hd-2\">\n" +
        "                    <p>" + name + "</p>\n" +
        "                </div>\n" +
        "                <div class=\"routine_detail hd-12\">\n" +
        "                    <table>\n" +
        "                        <tr class=\"table_days\">\n" +
        "                            <td> <button id=\"routine_" + id + "_btn\" class=\"small_btn w3-xlarge w3-circle w3-white w3-card-4\"  onclick=\"insertDayOnDB(this.id)\">+</button></td>\n" +
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
    var targetID = ev.target.id;
    var exercise_nav = document.getElementById('exercise_nav');
    var table = exercise_nav.getElementsByTagName('table').item(0);
    var table_id = table.id;
    var n = table_id.indexOf("_") + 1;
    var day_id= table_id.substring(n);

    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var n = data.indexOf("_") + 1;
    var exercise_id= data.substring(n);
    insertExerciseOnDB(exercise_id,day_id);


    /*var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "exercise_" + rowNumber;
    ev.target.appendChild(nodeCopy);

    //hacemos que no se pueda volver a hacer drop en la fila
    var divDropped = document.getElementById(targetID);
    divDropped.removeAttribute("ondrop");
    divDropped.removeAttribute("ondragover");*/


}

function insertExerciseOnDB(exercise_id,day_id){

// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/insert_exercise.php?exercise_id=" +exercise_id+"&day_id="+day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerInsertExerciseResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);

}


function handleServerInsertExerciseResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {


                dayClicked(getCurrentDayId());

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function insertDayOnDB(routine_id){




    var n = routine_id.indexOf("_") + 1;
    var l = routine_id.indexOf("_",n);
    var routine_idf = routine_id.substring(n,l);


// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/insert_new_day.php?routine_id=" +routine_idf, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerInsertDayResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);

}


function handleServerInsertDayResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {

            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertDay(jsonResponse[i].name,jsonResponse[i].id,jsonResponse[i].routine_id);
            }



        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}
function insertExercise(exercise_id,exercise_name,exercise_image_url,exercise_day_id) {


var exercise_row = document.getElementById('row-exercise_'+exercise_day_id);


exercise_row.innerHTML = '<td class="hd-8" id="exer_descript_'+exercise_id+'"\n' +
    '                          >' +
    '<div id="exer_div_'+exercise_id+'" class="ex_row" \n' +
    '                        >\n' +
    '                        <h3>'+exercise_name+'</h3>\n' +
    '                    </div></td>\n' +
    '                      <td class="hd-2"><input class="short-input" type="number" step="1" placeholder="0" min="0"></td>\n' +
    '                      <td class="hd-2"><input class="short-input" type="number" step="1" placeholder="0" min="0"></td>';

}





function isHovered(x) {
    var divToDisplay = x.lastElementChild;
    divToDisplay.style.display = 'block';


}

function finishHover(x) {
    var divToDisplay = x.lastElementChild;
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
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/get_user_routines.php?id=" + id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);

}


function dayClicked(day_id) {
    var n = day_id.indexOf("_") + 1;
    var l = day_id.indexOf("_", n);
    var startOfIndexDayId = day_id.indexOf("_", l);
    var day_index_id = day_id.substring(startOfIndexDayId + 1);
    var parent =document.getElementById('exercise_nav');
    var table = parent.getElementsByTagName('table').item(0);

    var newTable =createNewTable(day_index_id);
    parent.replaceChild(newTable,table);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_id_of_exercises_day.php?day_id="+day_index_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExercisesIdResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);


}


function handleServerExercisesIdResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertExerciseRow(jsonResponse[i].id);
            }

            getExercisesOfCurrentDay();

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function getExercisesOfCurrentDay() {
    var exercise_nav = document.getElementById('exercise_nav');
    var table = exercise_nav.getElementsByTagName('table').item(0);
    var table_id = table.id;
    var n = table_id.indexOf("_") + 1;
    var day_id= table_id.substring(n);


    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_exercises_of_routine_day.php?day_id="+day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExercisesResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);


}
function insertExerciseRow(exercise_day_id) {
    var table = document.getElementById('exercise_nav').getElementsByTagName('table').item(0);
    var newRow = document.createElement('tr');
    newRow.setAttribute('id', 'row-exercise_' + exercise_day_id);
    newRow.setAttribute('class', 'hd-12 exercise_row');

//Eliminamos boton de añadir para que no aparezca arriba de la nueva routina añadida
    var btn = document.getElementById("add_new_ex_row");
    var parent = btn.parentNode;
    parent.removeChild(btn);


    table.appendChild(newRow);//Añadimos nueva columna
    parent.appendChild(btn);         //Añadimos el boton

}
function  createNewTable(day_id) {
    var table = document.createElement('table');
    table.setAttribute('id','table_'+day_id);
    table.setAttribute('class','hd-12');
    table.setAttribute('style','margin-top: 50px');
    table.innerHTML= " <tr>\n" +
        "                    <td class=\"hd-8\"><h3>Ejercicios</h3></td>\n" +
        "                    <td class=\"hd-2\"><h3>Repeticiones</h3></td>\n" +
        "                    <td class=\"hd-2\"><h3>Series</h3></td>\n" +
        "                </tr>";
    return table;


}

function handleServerResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                console.log('routine with name ' + jsonResponse[i].name + ' and id: ' + jsonResponse[i].id);
                insertRoutine(jsonResponse[i].name, jsonResponse[i].id);
            }

            getDaysOfRoutines()

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function getDaysOfRoutines(){


    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/get_days_of_routines.php", true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerDaysOfRoutineResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);

}

function handleServerDaysOfRoutineResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertDay(jsonResponse[i].name,jsonResponse[i].id,jsonResponse[i].routine_id);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}


function handleServerExercisesResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {

                insertExercise(jsonResponse[i].id,jsonResponse[i].name,jsonResponse[i].image_url,jsonResponse[i].exercise_day_id);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function loadAllExercises(){

console.log("Hola llego aqui")
    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/get_all_exercises.php", true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerGetAllExercisesResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('loadAllExercises()', 1000);

}

function handleServerGetAllExercisesResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertLeftColumnExercise(jsonResponse[i].id,jsonResponse[i].name, jsonResponse[i].image_url);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function insertLeftColumnExercise(id, name, imageURL) {
    var divParent = document.getElementById('exercises_list');
    var newExercise = document.createElement('li');

    newExercise.innerHTML =  "<div id='exercise_" + id + "' class=\"ex_row\" draggable=\"true\" ondragstart=\"dragstart_handler(event)\"\n" +
        "                         style=\"background-image: url('" + imageURL + "')\">\n" +
        "                        <h3>" + name + "</h3>\n" +
        "                    </div>";

    divParent.appendChild(newExercise);      //Añadimos el ejercicio
}



