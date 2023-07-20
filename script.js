function calcCGPA() {
    //checking if the user has entered all the required fields
    var fesgpa = document.getElementById("sgpa_input_fe").value;
    var sesgpa = document.getElementById("sgpa_input_se").value;
    var tesgpa = document.getElementById("sgpa_input_te").value;
    var besgpa = document.getElementById("sgpa_input_be").value;
    if (fesgpa == "" || sesgpa == "" || tesgpa == "" || besgpa == "") {
        document.getElementById("error_msg").innerHTML = "Please enter values in all the fields";
        return;
    }

    var fesgpa = Number(fesgpa);
    var grade;
    var per;
    var cls;
    var cgpa;

    //validating range of sgpa
    if (fesgpa < 0 || fesgpa > 10) {
        document.getElementById("error_msg").innerHTML = "Enter valid SGPA (i.e. between 0 & 10)";
        return;
    }
    else {
        document.getElementById("error_msg").innerHTML = "";
    }
    if (sesgpa < 0 || sesgpa > 10) {
        document.getElementById("error_msg").innerHTML = "Enter valid SGPA (i.e. between 0 & 10)";
        return;
    }
    else {
        document.getElementById("error_msg").innerHTML = "";
    }
    if (tesgpa < 0 || tesgpa > 10) {
        document.getElementById("error_msg").innerHTML = "Enter valid SGPA (i.e. between 0 & 10)";
        return;
    }
    else {
        document.getElementById("error_msg").innerHTML = "";
    }
    if (besgpa < 0 || besgpa > 10) {
        document.getElementById("error_msg").innerHTML = "Enter valid SGPA (i.e. between 0 & 10)";
        return;
    }
    else {
        document.getElementById("error_msg").innerHTML = "";
    }

    //Calculating CGPA
    cgpa = ((fesgpa * 44)+(sesgpa * 44)+(tesgpa * 42)+(besgpa * 40))/170;
    cgpa = cgpa.toFixed(2);

    // Calculating grade & percentage
  if(cgpa < 4){
    grade = "F";
    per = "NA";
  }
  else if(cgpa < 4.75){
    grade = "D";
    per = 6.6*cgpa + 13.6;
  }
  else if(cgpa < 5.25){
    grade = "C";
    per = 10*cgpa - 2.5;
  }
  else if(cgpa < 5.75){
    grade = "B";
    per = 10*cgpa - 2.5
  }
  else if(cgpa < 6.75){
    grade = "B+";
    per = 5*cgpa + 26.5;
  }
  else if(cgpa < 8.25){
    grade = "A";
    per = 10*cgpa - 7.5;
  }
  else if(cgpa < 9.5){
    grade = "A+";
    per = 12*cgpa - 25;
  }
  else{
    grade = "O";
    per = 20*cgpa - 100;
  }
  
  // Calculating class
  if(cgpa < 4)
    cls = "Fail";
  else if(cgpa < 5.5)
    cls = "Pass";
  else if(cgpa < 6.25)
    cls = "Second Class"
  else if(cgpa < 6.75)
    cls = "Higher Second Class";
  else if(cgpa < 7.75)
    cls = "First Class";
  else
    cls = "First Class with Distinction";

  // Filling the output table
  document.getElementById("op_cgpa").innerHTML = cgpa;
  document.getElementById("op_grade").innerHTML = grade;
  document.getElementById("op_per").innerHTML = per;
  document.getElementById("op_class").innerHTML = cls;
}

// Click convert button when enter is pressed in input field
document.getElementById("sgpa_input_be").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("calc_btn").click();
    }
  });

// function to export table data to excel file
function exportTableToExcel(tableID){
  
    if(document.getElementById("op_cgpa").innerHTML == '-'){
      document.getElementById("error_msg").innerHTML = "Enter valid CGPA (i.e. between 0 & 10)";
      return;
    }
    
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
    // Specify file name
    var filename = 'cgpa.xls';
  
    // Create download link element
    downloadLink = document.createElement("a");
  
    document.body.appendChild(downloadLink);
  
    if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
    }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
  
      //triggering the function
      downloadLink.click();
    }
  }