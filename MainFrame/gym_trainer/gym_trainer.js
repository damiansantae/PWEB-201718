

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
    var table = table_parent.getElementsByTagName('tr').item(0);
    newDay.setAttribute('id','routine_'+routineNumber+'_'+nDays);
    newDay.innerHTML = "<p>"+nDays+"</p>";
    table.appendChild(newDay);
}

function insertRoutine() {
  var divParent = document.getElementById('routines_nav');
  var nRoutines = divParent.getElementsByClassName('routine_row').length;
  var newRoutine = document.createElement('div');
  newRoutine.setAttribute('id','routine_'+nRoutines);
  newRoutine.setAttribute('class','routine_row');
  var routineName = nRoutines+1;

  newRoutine.innerHTML = "<div class=\"routine_master hd-12\" >\n" +
      "                    <img src=\"../images/press_banca.JPG\" class=\"hd-2\">\n" +
      "                    <p>Routina "+routineName+"</p>\n" +
      "                </div>\n" +
      "                <div class=\"routine_detail hd-12\">\n" +
      "                    <table>\n" +
      "                        <tr class=\"table_days\">\n" +
      "                            <td> <input id=\"routine_"+nRoutines+"_btn\" type=\"button\" value=\"add\" onclick=\"insertDay(this.id)\"> </td>\n" +
      "                            <td id=\"routine_"+nRoutines+"_1\"> 1</td>\n" +
      "                        </tr>\n" +
      "                    </table>\n" +
      "                </div>"

    //Eliminamos boton de añadir para que no aparezca arriba de la nueva routina añadida
    var btn = document.getElementById("add_routine_btn");
    btn.parentNode.removeChild(btn);

divParent.appendChild(newRoutine);      //Añadimos la routina
    divParent.appendChild(btn);         //Añadimos el boton

}