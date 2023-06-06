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
    const div = 
}