let listbodyEl = document.getElementById("list");
let inputEl = document.getElementById("inputel");
let erromsgEL = document.getElementById("erromsg");

function onGetItem() {
    let ele = localStorage.getItem("Mylist");
    if (ele === null) {
        return [];
    } else {
        return JSON.parse(ele);
    }
}

let listarry = onGetItem();

function onCheckedChange(checkid, labelid, titleid) {
    let check = document.getElementById(checkid);
    let title = document.getElementById(titleid);

    if (check.checked == true) {
        title.style.textDecoration = "line-through";
    } else {
        title.style.textDecoration = "none";
    }
    let newId = labelid.slice(7);
    let index = listarry.findIndex((each) => each.id == newId);

    for (let i = 0; i < listarry.length; i++) {
        if (index === i) {
            if (listarry[i].isChecked === false) {
                listarry[i].isChecked = true;
            }
             else {
                listarry[i].isChecked = false;
            }
        }
    }
}

function OndeleteItem(labelId) {

    let deltodo = document.getElementById(labelId)
    listbodyEl.removeChild(deltodo);

    let newId = labelId.slice(7);
    let index = listarry.findIndex((each) => each.id == newId);
    listarry.splice(index, 1);
}

function ListMakar(todo) {

    let checkId = "todo" + todo.id;
    let labelId = "myLabel" + todo.id;
    let titleid = "myTitle" + todo.id;

    let liEL = document.createElement("li");
    liEL.classList.add("li-body");
    liEL.id = labelId;
    listbodyEl.appendChild(liEL);

    let chechboxEl = document.createElement("input");
    chechboxEl.type = "checkbox";
    chechboxEl.id = checkId;
    chechboxEl.classList.add("checkbox");
    if (todo.isChecked === true) {
        chechboxEl.checked = true;
    }

    chechboxEl.onclick = function () {
        onCheckedChange(checkId, labelId, titleid);
    };
    liEL.appendChild(chechboxEl);

    let heading = document.createElement("label");
    heading.classList.add("heading");
    heading.htmlFor = checkId;
    liEL.appendChild(heading);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleid;
    if (todo.isChecked == true) {
        titleEl.style.textDecoration = "line-through";
    }
    heading.appendChild(titleEl);

    let delEl = document.createElement("button");
    delEl.classList.add("del");
    delEl.onclick = function () {
        OndeleteItem(labelId);
    }
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");
    delEl.appendChild(icon);
    liEL.appendChild(delEl);


}

for (each of listarry) {
    ListMakar(each);
}

function AddTask() {
    let date = new Date();
    let uniqueId = Math.ceil(Math.random() * date.getTime());

    let listarry2 = { title: inputEl.value, id: uniqueId, isChecked:false };

    if (inputEl.value === "") {
        erromsgEL.textContent = "Plase Enter your task!";
    } else {
        ListMakar(listarry2);
        listarry.push(listarry2);
        erromsgEL.textContent = "";
        inputEl.value = "";
    }
}

function onSaveItems() {
    localStorage.setItem("Mylist", JSON.stringify(listarry));
}