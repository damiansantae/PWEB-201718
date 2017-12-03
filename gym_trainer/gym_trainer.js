var userid;


/**********************************
 * Filtro de busqueda de ejercicio***
 *************************************/
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

/************************************************************
 * Función que retorna el día actual mostrado en la pantalla***
 ****************************************************************/
function getCurrentDayId() {
    var exercise_nav = document.getElementById('exercise_nav');
    var table = exercise_nav.getElementsByTagName('table').item(0);
    var table_id = table.id;
    var n = table_id.indexOf("_") + 1;
    return table_id.substring(n);
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Funciones de animación para mostrar los ejercicios de una determinada rutina
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function isHovered(x) {
    var divToDisplay = x.lastElementChild;
    divToDisplay.style.display = 'block';
}

function finishHover(x) {
    var divToDisplay = x.lastElementChild;
    divToDisplay.style.display = 'none';
}


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Creacion y definicion del objeto xmlHttpt para poder hacer peticiones al servidor +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +*/

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

/*****************************************************************************************************
 * Crea una nueva columna con el nombre del dia dentro de la fila correspondiente a la rutina del dia*
 * @param name                                                                                       *
 * @param id                                                                                         *
 * @param routine_id                                                                                 *
 *****************************************************************************************************/
function insertDay(name, id, routine_id) {
    var table_parent = document.getElementById('routine_' + routine_id);
    var newDay = document.createElement('td');
    var table = table_parent.getElementsByTagName('tr').item(0);
    newDay.setAttribute('id', 'routine_' + routine_id + '_' + id);
    newDay.innerHTML = "<div id=\"day_" + id + "\" onclick=\"dayClicked(this.id)\" style='cursor: pointer'>\n" +
        "                                    <p>" + name + "</p>\n" +
        "                                </div>\n" +
        "                               <div> <button id=\"day_" + id + "_delete_btn\" class=\"small_btn w3-xlarge w3-circle w3-white w3-card-4\"\n" +
        "                                         onclick=\"deleteDay(this.id)\">-\n" +
        "                                </button> </div>";
    table.appendChild(newDay);
}

/******************************************************************************************************
 * Inserta un nuevo div correspondiente a una nueva rutina de usuario, con su correspondiente tabla   *
 * de días                                                                                            *
 * @param name                                                                                        *
 * @param id                                                                                          *
 ******************************************************************************************************/
function insertRoutine(name, id) {
    var divParent = document.getElementById('routines_nav');
    var newRoutine = document.createElement('div');
    newRoutine.setAttribute('id', 'routine_' + id);
    newRoutine.setAttribute('class', 'routine_row');
    newRoutine.setAttribute('onmouseover', 'isHovered(this)');
    newRoutine.setAttribute('onmouseout', 'finishHover(this)');

    newRoutine.innerHTML = "<div class=\"routine_master hd-12\" >\n" +
        "                    <img src=\"../MainFrame/assets/images/press_banca.JPG\" class=\"hd-2\">\n" +
        "                    <h2>" + name + "</h2>\n" +
        " <button id=\"delete_" + id + "_btn\" class=\"small_btn w3-xlarge w3-circle w3-white w3-card-4\"\n" +
        "                            onclick=\"deleteRoutine(this.id)\">-\n" +
        "                    </button>" +
        "                </div>\n" +
        "                <div class=\"routine_detail hd-12\">\n" +
        "                    <table>\n" +
        "                        <tr class=\"table_days\">\n" +
        "                            <td> <button id=\"routine_" + id + "_btn\" class=\"small_btn w3-xlarge w3-circle w3-white w3-card-4\"  onclick=\"insertDayOnDB(this.id)\">+</button></td>\n" +
        "<td class='loader' id='loader-routine_" + id + "' style='display: none'> </td>         " +
        "                        </tr>\n" +
        "                    </table>\n" +
        "                </div>";


    //Eliminamos boton de añadir para que no aparezca arriba de la nueva routina añadida
    var btn = document.getElementById("add_routine_btn");
    btn.parentNode.removeChild(btn);

    divParent.appendChild(newRoutine);      //Añadimos la routina
    divParent.appendChild(btn);         //Añadimos el boton

}

/*+++++++++++++++++++++++++++++++++++++++
Eventos de Drag&Drop para ejercicios+++++
 ++++++++++++++++++++++++++++++++++++++++*/

function dragstart_handler(ev) {
    console.log("dragStart");

    var img = new Image();
    img.src = '../assets/images/weight.png';
    img.height = '50px';
    img.width = '50px';
    ev.dataTransfer.setDragImage(img, 10, 10);

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
    var day_id = table_id.substring(n);

    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    var n = data.indexOf("_") + 1;
    var exercise_id = data.substring(n);
    insertExerciseOnDB(exercise_id, day_id);


    /*var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "exercise_" + rowNumber;
    ev.target.appendChild(nodeCopy);

    //hacemos que no se pueda volver a hacer drop en la fila
    var divDropped = document.getElementById(targetID);
    divDropped.removeAttribute("ondrop");
    divDropped.removeAttribute("ondragover");*/


}


/**
 * Una vez arrastrado un ejercicio hacia el botón de añadir en un dia de una rutina,
 * se dispara esta función, que se comunica con el servidor, con el fin de añadir
 * dicho ejercicio a la base de datos
 * @param exercise_id
 * @param day_id
 */
function insertExerciseOnDB(exercise_id, day_id) {

// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/insert_exercise.php?exercise_id=" + exercise_id + "&day_id=" + day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerInsertExerciseResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('insertExerciseOnDB(exercise_id, day_id)', 1000);

}

/**
 * Una vez que el servidor añade a la base de datos un nuevo ejercicio a un dia de una rutina
 * se dispara esta función que llama al método dayClicked pasandole por parámetro el día que se
 * encuentra mostrado en pantalla actualmente, con el fin de refrescar los ejercicios
 */
function handleServerInsertExerciseResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {


            refreshExercisesOfDay(getCurrentDayId());

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Función de comunicación cliente-servidor, para añadir un nuevo día de una rutina
 * a la base de datos
 * @param routine_id
 */
function insertDayOnDB(routine_id) {


    var n = routine_id.indexOf("_") + 1;
    var l = routine_id.indexOf("_", n);
    var routine_idf = routine_id.substring(n, l);

    var btn = document.getElementById('routine_' + routine_idf + '_btn');
    var parent = btn.parentNode;
    parent.style.display = "none";
    var loader = document.getElementById('loader-routine_' + routine_idf);
    loader.style.display = "inline-block";

// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form
        id = 1;
// execute quickstart.php page from server
        xmlHttp.open("GET", "php/insert_new_day.php?routine_id=" + routine_idf, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerInsertDayResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('insertDayOnDB(routine_id)', 1000);

}

/**
 * Funcion disparada tras añadir un nuevo día a una rutina específica.
 * Llama al método insertDay para añadir al html dicho nuevo día
 */
function handleServerInsertDayResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {

            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertDay(jsonResponse[i].name, jsonResponse[i].id, jsonResponse[i].routine_id);
            }

            var btn = document.getElementById('routine_' + jsonResponse[0].routine_id + '_btn');
            var parent = btn.parentNode;
            parent.style.display = "table-cell";
            var loader = document.getElementById('loader-routine_' + jsonResponse[0].routine_id);
            loader.style.display = "none";


        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Inserta en el html un determinado ejercicio (imagen, nombre,repeticiones y series) dentro de la columna de ejercicios de un
 * determinado día de una rutina.
 * @param exercise_id
 * @param exercise_name
 * @param exercise_image_url
 * @param exercise_day_id
 */
function insertExercise(exercise_id, exercise_name, exercise_image_url, exercise_day_id) {


    var exercise_row = document.getElementById('row-exercise_' + exercise_day_id);


    exercise_row.innerHTML = '<td class="hd-6" id="exer_descript_' + exercise_id + '"\n' +
        '                          >' +
        '<div id="exer_div_' + exercise_id + '" class="ex_row" \n' +
        '                        >\n' +
        '                        <h3>' + exercise_name + '</h3>\n' +
        '                    </div></td>\n' +
        '                      <td  class="hd-2"><input id="repetitions_' + exercise_day_id + '" class="short-input" type="number" step="1" placeholder="0" min="0" onchange="repetitionChange(this.id)"></td>\n' +
        '                      <td  class="hd-2"><input id="sets_' + exercise_day_id + '" class="short-input" type="number" step="1" placeholder="0" min="0" onchange="setChange(this.id)"></td>' +
        '   <td class="hd-2"> <button id="delete_' + exercise_day_id + '_btn" class="w3-button w3-xlarge w3-circle w3-red w3-card-4" type="button"\n' +
        '                                                 onclick="deleteExercise(this.id)">-\n' +
        '                      </button>';

}


/**
 * Función llamada cuando se selecciona la página de MyGymTrainer que carga las rutinas del
 * usuario logueado y los días de dichas rutinas, para ello se comunica con el servidor para
 * obtener las rutinas de la base de datos
 */
function process() {
    console.log('entro en process');


// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form

// execute quickstart.php page from server
        console.log('ESTOY AQUI');

        xmlHttp.open("GET", "php/get_user_routines.php?id=" + userid, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('process()', 1000);

}

function getCurrentUserId() {
console.log('entro en getCurrentUserId');

// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
// retrieve name typed by user on form

// execute quickstart.php page from server

        xmlHttp.open("GET", "php/get_user_id.php", true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleUserIdResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('getCurrentUserId()', 1000);

}

function handleUserIdResponse() {
    console.log('dentro de la recepcion');

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');
            console.log(jsonResponse);
            userid = jsonResponse;

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Función que se dispara tras recibir una respuesta del servidor con las rutinas del usuario.
 * Llama al método insertRoutine(name,id) y a continuacin llama al metodo getDaysOfRoutines()
 * con el objetivo de obtener los días de la las rutinas mostradas de la DB
 */
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
            document.getElementById("col-2_loader").style.display = "none";
            document.getElementById("add_routine_btn").style.display = "inline-block";
            getDaysOfRoutines()

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function dayClicked(day_id) {

    document.getElementById('col_3_loader').style.display = "inline-table";
    document.getElementById('add_new_ex_row').style.display = "none";
    var n = day_id.indexOf("_") + 1;
    var day_index_id = day_id.substring(n);
    var parent = document.getElementById('exercise_nav');
    var table = parent.getElementsByTagName('table').item(0);

    var newTable = createNewTable(day_index_id);
    parent.replaceChild(newTable, table);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_id_of_exercises_day.php?day_id=" + day_index_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExercisesIdResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('dayClicked(day_id)', 1000);


}

function refreshExercisesOfDay(day_id) {
    document.getElementById('col_3_loader').style.display = "inline-table";
    document.getElementById('add_new_ex_row').style.display = "none";


    var parent = document.getElementById('exercise_nav');
    var table = parent.getElementsByTagName('table').item(0);

    var newTable = createNewTable(day_id);
    parent.replaceChild(newTable, table);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_id_of_exercises_day.php?day_id=" + day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExercisesIdResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('refreshExercisesOfDay(day_id)', 1000);


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
    var day_id = table_id.substring(n);


    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_exercises_of_routine_day.php?day_id=" + day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExercisesResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('getExercisesOfCurrentDay()', 1000);


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

function createNewTable(day_id) {
    var table = document.createElement('table');
    table.setAttribute('id', 'table_' + day_id);
    table.setAttribute('class', 'hd-12');
    table.setAttribute('style', 'margin-top: 50px');
    table.innerHTML = " <tr>\n" +
        "                    <td class=\"hd-6\"><h3>Ejercicios</h3></td>\n" +
        "                    <td class=\"hd-2\"><h3>Repeticiones</h3></td>\n" +
        "                    <td class=\"hd-2\"><h3>Series</h3></td>\n" +
        "<td class='hd-2'></td>" +
        "                </tr>";
    return table;


}

/**
 * Función de comunicación cliente-servidor para obtener los días de las rutinas
 */
function getDaysOfRoutines() {


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
        setTimeout('getDaysOfRoutines()', 1000);

}

/**
 * Funcion que se dispara tras la respuesta del servidor con los dias de las rutinas
 * Llama al método insertDay para insertar dentro de la estructura html dichos días
 */
function handleServerDaysOfRoutineResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertDay(jsonResponse[i].name, jsonResponse[i].id, jsonResponse[i].routine_id);
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

                insertExercise(jsonResponse[i].id, jsonResponse[i].name, jsonResponse[i].image_url, jsonResponse[i].exercise_day_id);
            }
            document.getElementById('col_3_loader').style.display = "none";

            var add_btn = document.getElementById('add_new_ex_row');
            add_btn.style.display = "inline-table";
            getStepsAndReps();
        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion llamada tras pulsar en el botón eliminar de una rutina específica.
 * Se comunica con el servidor, para eliminar la rutina correspondiente
 * de la base de datos
 * @param btn_id
 */
function deleteRoutine(btn_id) {

    var n = btn_id.indexOf("_") + 1;
    var l = btn_id.indexOf("_", n);
    var routine_id = btn_id.substring(n, l);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/delete_routine.php?routine_id=" + routine_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerRoutineDeleteResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('deleteRoutine(btn_id)', 1000);
}

/**
 * Funcion disparada tras eliminar una rutina de la base de datos.
 * Llama a la funcion removeRoutine, para quitar el la rutina eliminada
 * y sus hijos del HTML
 */
function handleServerRoutineDeleteResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            removeRoutine(jsonResponse[0]);
        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion que elimina el los elementos correspondientes a la rutina pasada por
 * parámetro del HTML (el elemento y sus hijos)
 * @param routine_id
 */
function removeRoutine(routine_id) {
    var routine_div = document.getElementById('routine_' + routine_id);
    routine_div.parentNode.removeChild(routine_div);

}

/**
 * Funcion que se conecta con el servidor para eliminar un dia de una rutina determinada
 * @param btn_id
 */
function deleteDay(btn_id) {
    var n = btn_id.indexOf("_") + 1;
    var l = btn_id.indexOf("_", n);
    var day_id = btn_id.substring(n, l);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/delete_day.php?day_id=" + day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerDayDeleteResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('deleteDay(btn_id)', 1000);

}

/**
 * Funcion que se dispara tras recibir una respuesta del servidor
 * una vez que ha eliminado un dia de una rutina.
 * Llama a la funcion removeDay(day_id) para actualizar el html,
 * eliminando los elementos relacionados con dicho dia
 */
function handleServerDayDeleteResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            removeDay(jsonResponse.day_id, jsonResponse.routine_id);
        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion que elimina el elemento del HTML e hijos del dia que se le pasa por
 * parametro
 * @param day_id
 * @param routine_id
 */
function removeDay(day_id, routine_id) {
    var dayToDelete = document.getElementById('routine_' + routine_id + '_' + day_id);
    var parent = dayToDelete.parentNode;
    parent.removeChild(dayToDelete);


}

/**
 * Funtion que se comunica con el servidor para eliminar un ejercicio de un determinado
 * dia de una rutina de la base de datos
 * @param btn_id
 */
function deleteExercise(btn_id) {
    var n = btn_id.indexOf("_") + 1;
    var l = btn_id.indexOf("_", n);
    var exercise_day_id = btn_id.substring(n, l);


    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/delete_exercise_day.php?exercise_day_id=" + exercise_day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerExerciseOfDayDeleteResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('deleteExercise(btn_id)', 1000);
}

/**
 * Funcion que se dispara tras recibir una respuesta del servidor tras eliminar un determinado ejercicio
 * de la tabla de ejercicios de un dia
 */
function handleServerExerciseOfDayDeleteResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');
            removeExercise(jsonResponse);
        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion que elimina el ejercicio pasado por parametro
 * de la estructura HTML
 * @param exercise_day_id
 */
function removeExercise(exercise_day_id) {

    var exercise_row = document.getElementById('row-exercise_' + exercise_day_id);
    var parent = exercise_row.parentNode;
    parent.removeChild(exercise_row);

}

/**
 * Funcion que es llamada tras cambiar el numero de repeticiones de
 * un determinado ejercicio
 * @param exercise_day_id
 */
function repetitionChange(exercise_day_id) {
    var rep_input = document.getElementById(exercise_day_id);
    var rep_value = rep_input.value;
    var n = exercise_day_id.indexOf("_") + 1;
    var exercise_day_idf = exercise_day_id.substring(n);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/update_reps.php?exercise_day_id=" + exercise_day_idf + "&value=" + rep_value, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerRepetitionChangeResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('repetitionChange(exercise_day_id)', 1000);
}

/**
 * Funcion dispara tras la respuesta del servidor al actualizar el valor de
 * las repeticiones de un determinado ejercicio
 */
function handleServerRepetitionChangeResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');
        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion que es llamada tras cambiar el numero de repeticiones de
 * un determinado ejercicio
 * @param exercise_day_id
 */
function setChange(exercise_day_id) {
    var set_input = document.getElementById(exercise_day_id);
    var set_value = set_input.value;


    var n = exercise_day_id.indexOf("_") + 1;

    var exercise_day_idf = exercise_day_id.substring(n);

    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/update_sets.php?exercise_day_id=" + exercise_day_idf + "&value=" + set_value, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerSetChangeResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('setChange(exercise_day_id)', 1000);
}


/**
 * Funcion dispara tras la respuesta del servidor al actualizar el valor de
 * las series de un determinado ejercicio
 */
function handleServerSetChangeResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {

            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Funcion que solicita al servidor las repeticiones y las series
 * de los ejercicios del dia mostrado
 */
function getStepsAndReps() {
    var exercise_nav = document.getElementById('exercise_nav');
    var table = exercise_nav.getElementsByTagName('table').item(0);
    var table_id = table.id;
    var n = table_id.indexOf("_") + 1;
    var day_id = table_id.substring(n);


    // proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {


        xmlHttp.open("GET", "php/get_reps_and_sets.php?day_id=" + day_id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerStepsAndRepsResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('getStepsAndReps()', 1000);
}


/**
 * Funcion que se dispara al recibir la respuesta del servidor
 * al solicitar las repeticiones y series de los ejercicios del dia
 * mostrado en pantalla
 */
function handleServerStepsAndRepsResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {

                changeSetAndRepValue(jsonResponse[i].day_exercise_id, jsonResponse[i].set_value, jsonResponse[i].rep_value);
            }


        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

/**
 * Función llamada al iniciar la página GymTrainer para cargar los ejercicios
 * que el usuario podra añadir a sus rutinas
 */
function loadAllExercises() {

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

/**
 * Funcion disparada al recibir una respuesta por parte del servidor
 * tras haber solicitado todos los ejercicios que existen en la base de datos
 */
function handleServerGetAllExercisesResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
// extract JSON retrieved from server
            var jsonResponse = eval('(' + xmlHttp.responseText + ')');

            for (var i = 0; i < jsonResponse.length; i++) {
                insertLeftColumnExercise(jsonResponse[i].id, jsonResponse[i].name, jsonResponse[i].image_url);
            }
            document.getElementById('col-1_loader').style.display = "none";

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}


function insertLeftColumnExercise(id, name, imageURL) {
    var divParent = document.getElementById('exercises_list');
    var newExercise = document.createElement('li');

    newExercise.innerHTML = "<div id='exercise_" + id + "' class=\"ex_row\" draggable=\"true\" ondragstart=\"dragstart_handler(event)\"\n" +
        "                         style=\"background-image: url('" + imageURL + "')\">\n" +
        "                        <h3>" + name + "</h3>\n" +
        "                    </div>";

    divParent.appendChild(newExercise);      //Añadimos el ejercicio
}


/**
 * Funcion que actualiza el valor de las repeticiones y series mostrados en los inputs
 correspondientes a los guardados en la base de datos del ejercicio correspondiente
 al id pasado por parametros

 * @param day_exercise_id
 * @param set_value
 * @param rep_value
 */
function changeSetAndRepValue(day_exercise_id, set_value, rep_value) {
    var rep_input = document.getElementById('repetitions_' + day_exercise_id);
    var set_input = document.getElementById('sets_' + day_exercise_id);

    rep_input.value = rep_value;
    set_input.value = set_value;


}

function openDetail() {
    document.getElementById("detail-overlay").style.display = "block";
}

function closeDetail() {
    document.getElementById("detail-overlay").style.display = "none";
    document.getElementById("input-name").value = "";
}

function insertNewRoutine() {
    var routineName = document.getElementById("input-name").value;
    var userID = 1;
    insertNewRoutineIntoDB(routineName, userID);
}

function insertNewRoutineIntoDB(name, id) {


// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/insert_routine.php?name=" + name + "&id=" + id, true);
// define method to handle server responses
        xmlHttp.onreadystatechange = handleServerInsertNewRoutineIntoDBResponse;
// make server request
        xmlHttp.send(null);
    } else
// if connection is busy, try again after one second
        setTimeout('insertNewRoutineIntoDB(name, id)', 1000);

}

/**
 * Una vez que el servidor añade a la base de datos un nuevo ejercicio a un dia de una rutina
 * se dispara esta función que llama al método dayClicked pasandole por parámetro el día que se
 * encuentra mostrado en pantalla actualmente, con el fin de refrescar los ejercicios
 */
function handleServerInsertNewRoutineIntoDBResponse() {

    if (xmlHttp.readyState == 4) { // transaction has completed
// status of 200 indicates transaction completed successfully

        if (xmlHttp.status == 200) {
            console.log("Status 200 OK");
            process();

        } else { // HTTP status different than 200 signals error
        }
    }
}
