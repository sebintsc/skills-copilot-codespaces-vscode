function skillMembers() {
    var skill = document.getElementById("skill").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("members").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "skillMembers.php?skill="+skill, true);
    xhttp.send();
}