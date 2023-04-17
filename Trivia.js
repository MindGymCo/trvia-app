const state = {
    allNoteCards: [],

};

let lastUsedId = 0;
//gives an id to each card to keep track of which cards are deleted 

const Notecard = function (term, definition) { //
    this.term = term;
    this.definition = definition;
    this.id = lastUsedId++; //id assigned to notecard by incrementing lastused 
};


function showCardInTable(term, definition, id) {  
    //display notecards on page, creates new div element w/ term and def. inside a p tag 
    let notecarddiv = document.getElementById('flashcardContainer')
    let notecard = document.createElement('div');
    let termAndDefinition = document.createElement('p');
    let deleteicon = document.createElement('i');//trash icon created to delete card
    deleteicon.className = "fa fa-trash-can"; 
    notecard.classList.add('flashcard');
    termAndDefinition.innerHTML = term + '\n' + definition;
    notecard.id = id; //id assigned to the div element 
    notecard.append(termAndDefinition)
    notecard.append(deleteicon);
    notecarddiv.append(notecard);
};

let form = document.getElementById('flashCardMaker'); //displays notecard
form.addEventListener('submit', function (e) { 
    e.preventDefault();
    let textareaoneandtwo = form.querySelectorAll('textarea');
    let term = textareaoneandtwo[0].value
    let definition = textareaoneandtwo[1].value
    let newNotecard = new Notecard(term, definition);
    state.allNoteCards.push(newNotecard);

    localStorage.setItem("notecards", JSON.stringify(state.allNoteCards)); //saves object as a string to local storage

    showCardInTable(term, definition, newNotecard.id);

})


const table = document.getElementById('flashcardContainer');
//event listener added to flashcard container to delete notecards once trash icon is clicked
table.addEventListener('click', deleteCard);

function deleteCard(event) { //called when trash icon clicked, 
    if (event.target.className == "fa fa-trash-can") {
        const noteCardElement = event.target.parentElement;
        console.log(noteCardElement.id)
        deleteCardFromArray(noteCardElement.id);
        noteCardElement.remove(); //removes the HTMl element from the page
    }

};

function deleteCardFromArray(id) {
    let filteredArray = state.allNoteCards.filter(function (currentNoteCard) {
        if (currentNoteCard.id == id) { //if current notecard matches specified id then it returns false and removes it
            return false
        }
        else { return true }
    })
    state.allNoteCards = filteredArray;
    localStorage.setItem("notecards", JSON.stringify(state.allNoteCards)); //saves filtered array to local storage
}

const searchDoc = document.querySelector('#searchbutton')
searchDoc.addEventListener('click', function (e) {
    e.preventDefault();

    const userInput = document.querySelector('#searchbar').value.toLowerCase(); //this will be where the user inputs their search
    let searchOptions = document.querySelectorAll('.flashcard')
    for (let i = 0; i < searchOptions.length; i++) {
        //console.log(searchOptions[i].innerText.includes(userInput),userInput) 

        if (searchOptions[i].innerText.includes(userInput)) {
            console.log(searchOptions[i].innerText)
            searchOptions[i].style.borderColor = 'yellow';
            console.log(searchOptions[i].style)
        }
    }
});

function printNoteCards(table) {
    var printContents = table.innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContent;
};

function showAllNotecards() { //updates the page with notecards that are created and deleted 
    const table = document.getElementById('flashcardContainer');
    state.allNoteCards = JSON.parse(localStorage.getItem("notecards")) || []; //gets notecards from local storage
    table.innerHTML = ''; //clears the table 
    console.log(state.allNoteCards)
    for (let i = 0; i < state.allNoteCards.length; i++) { //adding notecards back to table
        let term = state.allNoteCards[i].term
        let definition = state.allNoteCards[i].definition
        let id = state.allNoteCards[i].id;
        showCardInTable(term, definition, id);
        console.log(state.allNoteCards[i])
    }
}

showAllNotecards();







