

function showExercises(muscularGroup) {
    sessionStorage.setItem("muscular_group", muscularGroup);
    console.log(sessionStorage.getItem("muscular_group"));
    parent.document.getElementById("muscular_groups").style.display = "none";
    parent.document.getElementById("exercises").style.display = "block";
    parent.document.getElementById("exercises").contentWindow.displayExercises();
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

// execute quickstart.php page from server
        xmlHttp.open("GET", "php/get_muscular_groups.php", true);
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
                console.log('muscular group with name '+jsonResponse[i].name.toString()+ ' and id: '+jsonResponse[i].id + 'y url: ' + jsonResponse[i].image_url);
                insertMuscularGroup(jsonResponse[i].id,jsonResponse[i].name, jsonResponse[i].image_url);
            }

        } else { // HTTP status different than 200 signals error
            alert("Problem accesing the server: " + xmlHttp.statusText);
        }
    }
}

function insertMuscularGroup(id, name, image_url) {
    var divParent = document.getElementById('rows');
    var newMuscularGroup = document.createElement('div');
    newMuscularGroup.setAttribute('id','muscular_group_'+id);

    newMuscularGroup.innerHTML =  "<div class='col-'>\n" +
        "                       <div class='flipper'>\n" +
        "                           <div class='front'>\n" +
        "                               <img class='muscular_group' src='" + image_url + "'>\n" +
        "                           </div>\n" +
        "                           <div class='back' onclick=\"showExercises('"+ name +"')\">\n" +
        "                               <h1 class='muscular_group'>"+ name +"</h1>\n" +
        "                           </div>\n" +
        "                       </div>\n" +
        "   </div>";


    console.log("                           <div class='back' onclick='showExercises("+ name +")'>\n");
    divParent.appendChild(newMuscularGroup);      //Añadimos el nuevo grupo muscular
}

