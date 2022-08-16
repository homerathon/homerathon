function generatePage() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var years = JSON.parse(this.responseText);
    var list = document.getElementsByClassName("archlist")[0];

    for( year in years.extant ) {
      var link = document.createElement("a");
      link.href=`./?year=${years.extant[year]}`;
      var yrhttp = new XMLHttpRequest();
      yrhttp.loccall = link;
      yrhttp.onload = function() {
        var year = JSON.parse(this.responseText);
        this.loccall.innerText=year.title;
      }
      yrhttp.open("GET", `assets/${years.extant[year]}.json`);
      yrhttp.send();
      list.appendChild(link);
    }
    for( year in years.outdated ) {
      var link = document.createElement("a");
      link.href=years.outdated[year].file;
      link.innerText=years.outdated.name;
      list.appendChild(link);
    }
  }
  xhttp.open("GET", `assets/years-exist-lazy.json`);
  xhttp.send();
}
