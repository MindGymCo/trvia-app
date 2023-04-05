const state = {
    allNoteCards: [],

};

let lastUsedId = 0; //give an id to the note cards to keep track of which are deleted in case two identical cards are created and deleted

const Notecard = function (term, definition) {
    this.term = term;
    this.definition = definition;
    this.id = lastUsedId++;
};


function showCardInTable(term, definition, id) { //add in note parameter
    let notecarddiv = document.getElementById('flashcardContainer')
    let notecard = document.createElement('div');
    let termAndDefinition = document.createElement('p');
    let deleteicon = document.createElement('i');
    deleteicon.className = "fa fa-trash-can";
    notecard.classList.add('flashcard');
    termAndDefinition.innerHTML = term + '\n' + definition;
    notecard.id = id;
    notecard.append(termAndDefinition)
    notecard.append(deleteicon);
    notecarddiv.append(notecard);
};

let form = document.getElementById('flashCardMaker');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let textareaoneandtwo = form.querySelectorAll('textarea');
    let term = textareaoneandtwo[0].value
    let definition = textareaoneandtwo[1].value
    let newNotecard = new Notecard(term, definition);
    state.allNoteCards.push(newNotecard);

    localStorage.setItem("notecards", JSON.stringify(state.allNoteCards));

    showCardInTable(term, definition, newNotecard.id);

})


const table = document.getElementById('flashcardContainer');
table.addEventListener('click', deleteCard);

function deleteCard(event) {
    if (event.target.className == "fa fa-trash-can") {
        const noteCardElement = event.target.parentElement;
        console.log(noteCardElement.id)
        deleteCardFromArray(noteCardElement.id);
        noteCardElement.remove(); //removes the HTMl element from the page
    }

};

function deleteCardFromArray(id) {
    let filteredArray = state.allNoteCards.filter(function (currentNoteCard) {
        if (currentNoteCard.id == id) {
            return false
        }
        else { return true }
    })
    state.allNoteCards = filteredArray;
    localStorage.setItem("notecards", JSON.stringify(state.allNoteCards));
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

function showAllNotecards() {
    const table = document.getElementById('flashcardContainer');
    state.allNoteCards = JSON.parse(localStorage.getItem("notecards")) || [];
    table.innerHTML = '';
    console.log(state.allNoteCards)
    for (let i = 0; i < state.allNoteCards.length; i++) {
        let term = state.allNoteCards[i].term
        let definition = state.allNoteCards[i].definition
        let id = state.allNoteCards[i].id;
        showCardInTable(term, definition, id);
        //localStorage.setItem('table',JSON.stringify(table))
        console.log(state.allNoteCards[i])
    }
}

showAllNotecards();



 //-- save filtered array to local storage, save new note card to local storage



