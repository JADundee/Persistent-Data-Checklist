import ToDoList from "./todolist";
import toDoItem from "./toDoItem";


const toDoList = new ToDoList


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Add event listeners

    // Procedural 
    // Load list obj
    refreshPage();
}

const refreshPage = () => {
    clearListDisplay();
    renderList();
    // clearItemEntry();
    //setFocusOnEntry();
}

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}

const renderList = () => {
    const list = toDoList.getlist();
    list.forEachg((item) => {
        buildListItem(item);
    })
}

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    clickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild("div");
}

const clickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItemFromList(checkbox.id);
        // TODO: remove from persistent data
        setTimeout(() => {
            refreshPage();
        }, 1000)
    })
}