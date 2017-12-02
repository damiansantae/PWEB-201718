
function openDetail(name, videoUrl) {

    document.getElementById("video").src = videoUrl;
    document.getElementById("exerciseTitle").innerHTML = name;
    document.getElementById("detail-overlay").style.display = "block";
}

function closeDetail() {
    document.getElementById("detail-overlay").style.display = "none";
}

function backToMuscularGroups(){
    parent.document.getElementById("exercises").style.display = "none";
    parent.document.getElementById("muscular_groups").style.display = "block";
    document.getElementById("row_chest_exercises").style.display = "none";
    document.getElementById("row_dorsals_exercises").style.display = "none";
}

document.addEventListener("storage", displayExercises);

function displayExercises(){
    var divParent = document.getElementById("row_exercises");
    while(divParent.firstChild){
        divParent.removeChild(divParent.firstChild)
    }
    var muscularGroupID = sessionStorage.getItem("muscular_group_id");
    console.log("Id recuperado: " + muscularGroupID);
    process(muscularGroupID);
    document.getElementById("row_exercises").style.display = "block";

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
function process(muscularGroupID) {

// proceed only if xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/get_exercises.php?id=" + muscularGroupID, true);
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

            for(var i=0;i<jsonResponse.length;i++){
                console.log('Longitud respuesta json: ' + jsonResponse.length);
                insertExercise(jsonResponse[i].id,jsonResponse[i].name, jsonResponse[i].video_url, jsonResponse[i].description, jsonResponse[i].image_url);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function insertExercise(id, name, video_url, description, image_url) {
    var divParent = document.getElementById('row_exercises');
    var newExercise = document.createElement('div');
    newExercise.setAttribute('id','muscular_group_'+ id);

    newExercise.innerHTML =  "<div class=\"exercise-col-\">\n" +
        "        <div class=\"flipper\">\n" +
        "            <div class=\"front\">\n" +
        "            <img class=\"exercise\" src='" + image_url + "'>\n" +
        "                <h1 class=\"exercise\">" + name + "</h1>\n" +
        "            </div>\n" +
        "            <div class=\"back\">\n" +
        "                <p class=\"exercise\">" + description + "</p>\n" +
        "                <button onclick=\"openDetail('" + name + "','" + video_url + "')\" class=\"video\">Ver vídeo explicativo</button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";

    divParent.appendChild(newExercise);      //Añadimos el nuevo grupo muscular
}