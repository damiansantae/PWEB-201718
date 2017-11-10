

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
function insertDay() {
    var table_days = document.getElementById("table_days");
    var newDay = document.createElement('td');
    var elementid = document.getElementsByTagName("td").length;
    newDay.setAttribute('id',elementid);
    newDay.innerHTML = "<p>"+elementid+"</p>";
    table_days.appendChild(newDay);
}

