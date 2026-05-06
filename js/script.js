console.log("I am the console!");

function quizAlert() {
    alert("You're about to fill the official Efrei form");
    quizConfirm();
}

function quizConfirm() {

    // Check if all fields are filled
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var birthdate = document.getElementById("birthdate").value;
    var email = document.getElementById("email").value;
    var status = document.getElementById("status").value;

    if (name === "" || surname === "" || birthdate === "" || email === "" || status === "") {
        alert("Please fill in all fields!");
        return;  // Stop execution if fields are empty
    }

    var res = confirm("Do you want to proceed?");
    if (res == true) {
        alert("The form is open!");
        var timer = 1;
        // Create an element p to display the message
        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " seconds";
        // style of message
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";
        // add the message to the page after the start id button
        var start = document.getElementById("information");
        start.appendChild(confirmation);
        // using the setInterval function, which runs every second
        var interval = setInterval(function () {
            // decrement countdown
            timer--;
            // It is also displayed in the console
            console.log(timer);
            // display the countdown in the p element created
            confirmation.textContent = timer + " seconds";
            // if the countdown is over
            // show the message "Here we go! Good luck!"
            // show form
            // show submission button
            if (timer == 0) {
                clearInterval(interval);
                confirmation.textContent = "Here we go! Good luck!";

                document.getElementById("information").disabled = true;
                
                document.getElementById("quizbutton").style.display = "none";

                document.getElementsByClassName("quiz")[0].style.display = "block";
                document.getElementsByTagName("button")[0].style.display = "block";
            }
        }, 1000);
    } else {
        alert("You will be redirected to the home page!");
        window.location.href = "home.html";
    }
}

var attemptCount = 0;

function submitQuiz() {

    if (attemptCount == 1) {
        alert("Form already Submitted!");
        return;
    }
    attemptCount += 1;
    var finalresult = document.getElementById("result");
    var newRow = finalresult.insertRow();
    newRow.insertCell(0).textContent = "Thank you for your feedback!";
}