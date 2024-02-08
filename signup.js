document.addEventListener("DOMContentLoaded", function () {
  loaduser();
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    adduser();
  });
});
function loaduser() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        displayuser(JSON.parse(xhr.responseText));
        console.log(xhr.responseText);
      } else {
        console.error("Failed to load students.");
      }
    }
  };
  xhr.open("GET", "signup.php", true);
  xhr.send();
}
function displayuser(students) {
  var studentList = document.getElementById("display");
  studentList.innerHTML = "";
  students.forEach(function (student) {
    var studentDiv = document.createElement("div");
    studentDiv.innerHTML = `
          <p>ID: ${student.id}</p>
          <p>first name: ${student.first_name}</p>
          <p>last name: ${student.last_name}</p>
          <p>password: ${student.password}</p>
          <p>email: ${student.email}</p>
          <p>gender: ${student.gender}</p>
          <p>date of birth: ${student.dob}</p>
          <p>id card: ${student.card}</p>          
          <button type="button" onclick="updateuser(${student.id})">Edit</button>
          <button type="button" onclick="deleteuser(${student.id})">Delete</button>
          
      `;
    studentList.appendChild(studentDiv);
  });
}
function adduser() {
  var fname = document.getElementById("fnm").value;
  var lname = document.getElementById("lnm").value;
  var pass = document.getElementById("ps").value;
  var email = document.getElementById("ema").value;
  var gender = document.getElementById("select").value;
  var dob = document.getElementById("db").value;
  var IDnumber = document.getElementById("IDnbr").value;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        loaduser();
      } else {
        console.error("Failed to add student.");
      }
    }
  };

  xhr.open("POST", "signup.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "first_name=" +
      fname +
      "&last_name=" +
      lname +
      "&password=" +
      pass +
      "&email=" +
      email +
      "&gender=" +
      gender +
      "&dob=" +
      dob +
      "&card=" +
      IDnumber
  );
}
function updateuser(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        loaduser();
      } else {
        console.error("Failed to edit");
      }
    }
  };
  var fname = document.getElementById("fnm").value;
  var lname = document.getElementById("lnm").value;
  var pass = document.getElementById("ps").value;
  var email = document.getElementById("ema").value;
  var gender = document.getElementById("select").value;
  var dob = document.getElementById("db").value;
  var card = document.getElementById("IDnbr").value;

  xhr.open("PUT", "signup.php", true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.send(
    "id=" +
      id +
      "&first_name=" +
      encodeURIComponent(fname) +
      "&last_name=" +
      encodeURIComponent(lname) +
      "&password=" +
      encodeURIComponent(pass) +
      "&email=" +
      encodeURIComponent(email) +
      "&gender=" +
      encodeURIComponent(gender) +
      "&dob=" +
      encodeURIComponent(dob) +
      "&card=" +
      encodeURIComponent(card)
  );
}

function deleteuser(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        loaduser();
      } else {
        console.error("Failed to delete student.");
      }
    }
  };
  xhr.open("DELETE", "signup.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("id=" + id);
}
