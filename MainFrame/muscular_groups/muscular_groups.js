

function showExercises(muscularGroup) {
    sessionStorage.setItem("muscular_group", muscularGroup);
    parent.document.getElementById("muscular_groups").style.display = "none";
    parent.document.getElementById("exercises").style.display = "block";
    parent.document.getElementById("exercises").contentWindow.displayExercises();
}

