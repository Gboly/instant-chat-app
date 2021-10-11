var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var nick = document.querySelector(".nickBox");

// listening for bot messages
socket.on("botMessage", function (message) {
    console.log(message);
    //dom manipulation for bot messages
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add("botMessage");
    div.innerHTML = message;
    document.querySelector(".messageContainer").appendChild(div);
    div.scrollIntoView();
})

//emitting new messages if submitted
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value) {
        var message = input.value;
        //emitting message and nick to the server
        socket.emit("sentMessage", message);
        socket.emit("nick", nick.value);
        input.value = '';
        //dom manipulation for sent messages
        const div = document.createElement("div");
        div.classList.add("message");
        div.classList.add("sentMessage");
        div.innerHTML = message + "<br><span class = 'metaData'>" + nick.value + "</span>";
        document.querySelector(".messageContainer").appendChild(div);
        div.scrollIntoView();
        //time manipulation
        var d = new Date();
        if (d.getHours() > 12) {
            if (d.getMinutes() < 10) {
                div.innerHTML = div.innerHTML + "<div class='time'>" + (d.getHours() - 12) + ":0" + d.getMinutes() + " PM" + "</div>";
            }
            else {
                div.innerHTML = div.innerHTML + "<div class='time'>" + (d.getHours() - 12) + ":" + d.getMinutes() + " PM" + "</div>";
            }
        }
        else {
            if (d.getMinutes() < 10) {
                div.innerHTML = div.innerHTML + "<div class='time'>" + d.getHours() + ":0" + d.getMinutes() + " AM" + "</div>";
            }
            else {
                div.innerHTML = div.innerHTML + "<div class='time'>" + d.getHours() + ":" + d.getMinutes() + " AM" + "</div>";
            }
        }
    }
    document.querySelector(".nickBox").setAttribute("disabled", "disabled");
});

//listening for incoming messages
socket.on("receivedMessage", function (message) {
    // console.log(message);
    //dom manipulation for received messages
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add("receivedMessage");
    div.innerHTML = message;
    document.querySelector(".messageContainer").appendChild(div);
    div.scrollIntoView();
})

// listening for incoming nicks
socket.on("nick", function (message) {
    console.log(message);
    var length = document.querySelectorAll(".receivedMessage").length;
    var lastChild = document.querySelectorAll(".receivedMessage")[length - 1];
    lastChild.innerHTML = lastChild.innerHTML + "<br><span class = 'metaData'>" + message + "</span>";
    //time manipulation
    var d = new Date();
    if (d.getHours() > 12) {
        if (d.getMinutes() < 10) {
            lastChild.innerHTML = lastChild.innerHTML + "<div class='time'>" + (d.getHours() - 12) + ":0" + d.getMinutes() + " PM" + "</div>";
        }
        else {
            lastChild.innerHTML = lastChild.innerHTML + "<div class='time'>" + (d.getHours() - 12) + ":" + d.getMinutes() + " PM" + "</div>";
        }
    }
    else {
        if (d.getMinutes() < 10) {
            lastChild.innerHTML = lastChild.innerHTML + "<div class='time'>" + d.getHours() + ":0" + d.getMinutes() + " AM" + "</div>";
        }
        else {
            lastChild.innerHTML = lastChild.innerHTML + "<div class='time'>" + d.getHours() + ":" + d.getMinutes() + " AM" + "</div>";
        }
    }
})


socket.on("users", function (data) {
    var item = document.getElementsByClassName("activeUsers");
    var oldUsersValue = item[0].childNodes[0];
    let latestUsersValue = data.users;
    oldUsersValue.nodeValue = latestUsersValue;
});

// get emoji-picker from HTML
let picker = document.querySelector("emoji-picker");
let emojiSelector = document.querySelector(".emojiButton");

$('.linkButton').click(function(e) {   
  e.preventDefault();
  // show list of emoji's on button click
  if (picker.style.display === "none") {
    picker.style.display = "block";
  } else {
    picker.style.display = "none";
  } 
});
picker.addEventListener("emoji-click", (event) => {
    event.preventDefault();
  let textBox = document.getElementById("input");
  //Retrieve Emoji's from returned JSON
  let myObj = JSON.stringify(event.detail.unicode);
  // Remove double quotes at the beginning and end of emoji
  myObj = myObj.replace(/^"(.*)"$/, "$1");
  //add emoji to textbox
  textBox.value = textBox.value + myObj;
  textBox.focus();
  console.log(event.detail);

 
}); 
 