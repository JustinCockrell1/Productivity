const breakButton = document.querySelector(".break-button");
const task = document.getElementById("task");
const form = document.getElementById("task-form");
const currentTask = document.getElementById("current-task");
const lastTask = document.getElementById("last-task");
const timer = document.querySelector(".timer");
const currentTimestamp = document.getElementById("current-timestamp");
const taskSelector = document.getElementById("task-selector");


breakButton.addEventListener("click",function(e) {
    e.preventDefault(); 
    if(breakButton.textContent=="Break") {
    task.value = "break";
    } else {
        task.value = lastTask.textContent;
    }
    this.form.submit();
});

form.addEventListener("submit",function(e){
    if(task.value=="") e.preventDefault();
});


window.onload=function() {
    if(currentTask.textContent=="break") {
        breakButton.textContent = `Resume ${lastTask.textContent}`;
    }
}

window.setInterval(updateTimer, 1000);

function updateTimer() {
    let seconds = Math.floor(Date.now()/1000-currentTimestamp.textContent);

    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);

    seconds%=60;
    minutes%=60;

    if(minutes<10) minutes = "0"+minutes;
    if(seconds<10) seconds = "0"+seconds;
    if(hours<10) hours = "0"+hours;

    timer.textContent = `${hours}:${minutes}:${seconds}`;

}

taskSelector.addEventListener("change", function(e){
    task.value = taskSelector.value;
});