// Initializing the getToDoItems function
if (JSON.parse(localStorage.getItem('toDos')) !== null) {
    window.onload = getToDoItems();
}

// CSS CLass for completed toDoItems
let completedClass = document.getElementsByClassName('completedCSS');
// console.log(completedClass);

// // Add EventListener to the checkBox
// checkBox = document.getElementById('completed');
// checkBox.addEventListener('input', markCompleted);

// Add an Event listener to the form to listen for a submit event
// Getting the form from the HTML
let myForm = document.getElementById("toDoApp");
// console.log(myForm);

// Add an event listener to the form
myForm.addEventListener('submit', saveToDoItem);


// Creating the SaveToDoItem function
function saveToDoItem(event) {

    // Stops form from submitting to the page
    event.preventDefault();

    // Get the toDoItem from the form
    let toDoItem = document.getElementById("toDoItem").value;
    let isCompleted = false;

    let toDo = {
        item: toDoItem,
        isCompleted: isCompleted
    }

    // Checks if localStorage is empty and also adds to it
    if (localStorage.getItem('toDos') === null) {
        // Create an array of ToDo items and add each toDo to it and then also save it to localStorage
        let toDos = [];
        // Append each toDo item to it
        toDos.push(toDo);
        // Save to localStorage by converrting the array to a JSON
        localStorage.setItem('toDos', JSON.stringify(toDos));
    } else {
        // Fetch data from LocalStorage, convert it to an array
        let toDos = JSON.parse(localStorage.getItem('toDos'));
        // Append toDo to the array of toDos
        toDos.push(toDo);
        // Convert back to JSON and Save to localStorage
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }

    // Re-fetch ToDo Items
    getToDoItems();

    // Clear form after submission
    myForm.reset();

}


// Deleting the toDoItem

function deleteToDoItem(toDoText) {
    // Fetch toDos from LocalStorage, loop through it and delete if each toDo Item corelate
    let toDos = JSON.parse(localStorage.getItem('toDos'));

    toDos.map((toDo, index) => {
        let item = toDo.item;

        if (item === toDoText) {
            toDos.splice(index, 1);
        }
    });

    // Append the new Arrays of toDo Items to LocalStorage
    localStorage.setItem('toDos', JSON.stringify(toDos));

    // Re-fetch ToDo Items
    getToDoItems();

}



// Function to mark each toDo Item completed
function checkCompleted(toDoText) {

    // console.log(toDoText);

    // completed = false;
    // notCompleted = false;

    // Fetch data from LocalStorage, check for it's truthy value and assign a new truthy value to it onClick
    let toDos = JSON.parse(localStorage.getItem('toDos'));

    toDos.forEach((toDo) => {
        let item = toDo.item;
        let isCompleted = toDo.isCompleted;

        if (item === toDoText) {
            // console.log(toDo);
            if (isCompleted === false) {
                toDo.isCompleted = true;
            //    console.log(item)

                // Append the new Arrays of toDo Items to LocalStorage
                localStorage.setItem('toDos', JSON.stringify(toDos));

            }
            if (isCompleted === true) {
                toDo.isCompleted = false;

                // Append the new Arrays of toDo Items to LocalStorage
                localStorage.setItem('toDos', JSON.stringify(toDos));

            }
        }

        // Adds CSS Style textDecoration to each toDoItem if isCompleted or not
        // if (isCompleted === true) {
        //     done.textDecoration = 'line-through';
        // } else {
        //     done.textDecoration = 'none';
        // }
    });

    // console.log(newToDos);
    // localStorage.setItem()

    // Re-fetch ToDo Items
    // getToDoItems();
}


// // Function to Mark Completed toDoItems
// function markCompleted() {
//     // Fetch data from LocalStorage, convert it to an array
//     let toDos = JSON.parse(localStorage.getItem('toDos'));

//     // Adds CSS textDecoration to the completed tODoItem
//     toDos.forEach(toDo => {
//         isCompleted = toDo.isCompleted;

//         if (isCompleted === true) {
//             toDoItemStyle = 'line-through';
//             return toDoItemStyle;
//         } else {
//             toDoItemStyle = 'none';
//             return toDoItemStyle;
//         }
//     });

//     // Re-fetch ToDo Items
//     // getToDoItems();
// }


// Displaying the saved toDo Items to the page
// Fetch the toDoItems
function getToDoItems() {
    // alert("I am working!!")

    // Fetch data from LocalStorage, convert it to an array
    let toDos = JSON.parse(localStorage.getItem('toDos'));

    // Get output ID from the HTML page
    let toDoContents = document.getElementById("toDoContents");

    // Create the output structure
    // div tag
    // let toDoDiv = document.createElement('div');
    // toDoDiv.classList = 'well';

    // // span tag
    // let toDoSpan = document.createElement('span');

    // // input checkBox tag
    // let checkBox = document.createElement('input');
    // checkBox.type = 'checkbox'
    // checkBox.classList = 'pull-right';

    // Loop through the toDos
    // Sets the present toDoContents on the GUI to empty and appends new items to it....
    toDoContents.innerHTML = '';

    // Reverse the toDo Array
    toDos.reverse();

    toDos.forEach(toDo => {
        let item = toDo.item;
        let isCompleted = toDo.isCompleted;

         // Adds CSS Style textDecoration to each toDoItem if isCompleted or not
         if (isCompleted === true) {
            toDoItemStyle = 'line-through';
        } else {
            toDoItemStyle = 'none';
        }

        // Checks and Unchecks the input element if isCompleted or not
        if (isCompleted === true) {
            markMe = "checked";
        } else {
            markMe = "unchecked";
        }

        // // Calling function to mark the completed toDoItems
        // markCompleted();

        // Output the HTML structure to the page, still planning on upgrading this very soon...
        toDoContents.innerHTML += `<div class="well">
                                    <span id="todoItemText" class="">${item}</span>
                                    <div class="pull-right">
                                    <input onchange="checkCompleted(\'${item}\')" type="checkbox" ${markMe}>
                                    <button onclick="deleteToDoItem(\'${item}\')" class="btn btn-danger">Delete</button>
                                    </div>
                                 </div>`

        // // Assigning the html elements to their respectiv positions..
        // toDoSpan.textContent = toDo.item;
        // toDoDiv.appendChild(toDoSpan);
        // toDoDiv.appendChild(checkBox);
        // // console.log(toDoDiv);

        // toDoContents.appendChild(toDoDiv);        
    });
}

// Set the CopyRight dynamically...
let year = document.getElementById('year');
year.innerHTML = new Date().getFullYear();