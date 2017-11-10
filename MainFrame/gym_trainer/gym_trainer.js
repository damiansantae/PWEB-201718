

function searchExercise() {
    var input, filter, list, exercises, p, i;
    input = document.getElementById("searchBarInput");
    filter = input.value.toUpperCase();
    list = document.getElementById("exercises_list");
    exercises = list.getElementsByTagName("li");
    for (i = 0; i < exercises.length; i++) {
        p = exercises[i].getElementsByTagName("p")[0];
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
    var table = table_parent.getElementsByTagName('tr');

    newDay.setAttribute('id','routine_'+routineNumber+'_'+nDays);
    newDay.innerHTML = "<p>"+nDays+"</p>";
    table.appendChild(newDay);
}

function insertRoutine() {
    var divParent = document.getElementById("routines_nav");
    var newRoutine = document.createElement('div');
    var routineId = "routine_"+document.getElementsByClassName("routine_row").length;
    newRoutine.setAttribute('id',routineId);
    newRoutine.setAttribute('class', "routine_row");
    newRoutine.innerHTML = "hola";

    divParent.appendChild(newRoutine);
}