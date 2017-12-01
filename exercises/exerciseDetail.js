function openDetail(exerciseName) {
    document.getElementById("detail-overlay").style.display = "block";

    switch (exerciseName) {
        case "Press de banca":
            document.getElementById("video").src = "https://www.youtube.com/embed/bUUTESuUlwM";
            document.getElementById("exerciseTitle").innerHTML = "Press banca";
            break;
        case "Pectoral contracto":
            document.getElementById("video").src = "https://www.youtube.com/embed/K1RyiaLtlvY";
            document.getElementById("exerciseTitle").innerHTML = "Pectoral contracto";
            break;
        case "Press banca inclinado":
            document.getElementById("video").src = "https://www.youtube.com/embed/2bKcaD7lHLs";
            document.getElementById("exerciseTitle").innerHTML = "Press banca inclinado";
            break;
        case "Push ups":
            document.getElementById("video").src = "https://www.youtube.com/embed/IODxDxX7oi4";
            document.getElementById("exerciseTitle").innerHTML = "Push ups";
            break;
        case "Peso muerto":
            document.getElementById("video").src = "https://www.youtube.com/embed/gB9_9ggQ5jA";
            document.getElementById("exerciseTitle").innerHTML = "Peso muerto";
            break;
        case "Remo barra":
            document.getElementById("video").src = "https://www.youtube.com/embed/P_kNA_HElgA";
            document.getElementById("exerciseTitle").innerHTML = "Remo barra";
            break;
        case "Aperturas espalda":
            document.getElementById("video").src = "https://www.youtube.com/embed/w2bnly8LGlE";
            document.getElementById("exerciseTitle").innerHTML = "Aperturas espalda";
            break;
    }
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
    var muscularGroup = sessionStorage.getItem("muscular_group");
    switch (muscularGroup){
        case 'Pecho':
            document.getElementById("row_chest_exercises").style.display = "block";
            break;
        case 'Dorsales':
            document.getElementById("row_dorsals_exercises").style.display = "block";
            break;
    }
}