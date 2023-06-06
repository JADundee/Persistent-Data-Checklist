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
    // render list
    // clearItemEntry();
    //setFocusOnEntry();
}