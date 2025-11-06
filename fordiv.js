function newFunction() {
    let elements = document.getElementsByClassName("red");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "orange";
    }
    let elements2 = document.getElementsByClassName("blue");
    for (let i = 0; i < elements.length; i++) {
        elements2[i].style.backgroundColor = "red";
    }
    let elements3 = document.getElementsByClassName("green");
    for (let i = 0; i < elements.length; i++) {
        elements3[i].style.backgroundColor = "violet";

    }
    let elements4 = document.getElementsByClassName("yellow");
    for (let i = 0; i < elements.length; i++) {
        elements4[i].style.backgroundColor = "blue";
    }
}

function changeFontSize() {
    const box = document.querySelector('.box1');
    box.style.fontSize = '24px';
}

function changeStyle() {
    const box = document.querySelector('.box3');
    box.style.fontStyle = 'italic';
}

function changeImage() {
    const box = document.querySelector('.box5');
    box.style.backgroundImage = 'url(tiger.jpg)';
    box.style.backgroundSize = 'cover';
}

function addText() {
    const box = document.querySelector('.box7');
    box.textContent = 'New Text!';
}