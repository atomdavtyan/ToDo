const inputElement = document.querySelector(".inputfield");
const addButton = document.querySelector(".addbutton");
const items = document.querySelector(".items");
const compl = document.querySelector("#completeData")


const data = [];



inputElement.addEventListener("keydown", onKeyDown)
addButton.addEventListener("click", addNewItem)


function addNewItem() {
    if (inputElement.value.length === 0) {
        alert("The input field is empty please write any value")
        return;
    }

    data.push({ label: inputElement.value, state: false, createtime: myTime() })
    inputElement.value = "";
    drowList();
}

function onRemoveClick(index) {
    data.splice(index, 1)
    drowList();
}


function drowList() {
    items.innerHTML = "";
    data.forEach((elm, index) => {
        const element = document.createElement("div")
        element.classList.add("item");
        element.innerHTML = `
       <div>
             <input 
              class="completed" ${elm.state ? 'checked' : ''} type="checkbox" onchange="stateChange(${index})" >
            ${elm.label}  -  ${elm.createtime}
        </div>
        <div>
            <button class="edit" onclick="onEditCklick(${index})">Edit</button>
            <button class="remove" onclick="onRemoveClick(${index})">Remove</button>
        </div>
        </div>
       `;
        const footer = document.createElement("div");
        footer.innerHTML = `
                    <div> ${data.length} </div>
                    `

        items.appendChild(element);
    })
    checkCompleted();
}

function myTime() {
    const options = {
        //   year: 'numeric',
        //   month: 'short',
        //   day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const currentDateTime = new Date().toLocaleString('en-US', options);
    return currentDateTime;
}

function onKeyDown(event) {
    if (event.code === "Enter") {
        addNewItem();
    }

}

function onEditCklick(index) {
    const newText = prompt("Pleas edit your Task")
    if (data[index].label.length === 0) {

        return
    }
    data[index].label = newText;
    drowList();
}

function stateChange(index) {
    data[index].state = !data[index].state;
    drowList()
}

function checkCompleted() {
    const completeditems = data.filter((todo) => todo.state).length
    compl.innerHTML = `Completed ${completeditems} / ${data.length}`;
}