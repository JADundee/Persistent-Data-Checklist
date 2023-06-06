import ToDoList from "./todolist.js";
import ToDoItem from "./toDoItem.js";


const toDoList = new ToDoList


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Add event listeners
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submission();
    })

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event) => {
        const list  = toDoList.getlist();
        if (list.length) {
            const confirmed = confirm("Are you sure you want to clear the list?"); 
            if (confirmed) {
                toDoList.clearlist();
                updatePersistentData(toDoList.getlist());
                refreshPage();
            }       
        }
    })
    // Procedural 
    loadListObj();
    refreshPage();
}

const loadListObj = () => {
    const storedList = localStorage.getItem("myToDoList");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem);
    })
}

const refreshPage = () => {
    clearListDisplay();
    renderList();
    clearItemEntry();
    setFocusOnEntry();
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
    list.forEach((item) => {
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
    container.appendChild(div);
}

const clickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItem(checkbox.id);
        updatePersistentData(toDoList.getlist());
        setTimeout(() => {
            refreshPage();
        }, 1000)
    })
}

const updatePersistentData = (listArray) => {
    localStorage.setItem("myToDoList", JSON.stringify(listArray))
}

const clearItemEntry = () => {
    document.getElementById("newItem").value = "";
}

const setFocusOnEntry = () => {
    document.getElementById("newItem").focus();
}

const submission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const ToDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItemToList(ToDoItem);
    updatePersistentData(toDoList.getlist());
    refreshPage();
}

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
}

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getlist();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
}

const createNewItem = (itemID, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemID);
    toDo.setItem(itemText);
    return toDo;
}