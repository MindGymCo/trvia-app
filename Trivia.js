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
    let deleteicon = document.createElement('i');
    deleteicon.className = "fa fa-trash-can";
    notecard.classList.add('flashcard');
    notecard.innerText = term + "\n" + definition; // \n creates a new line
    notecard.id = id;
    notecard.append(deleteicon);
    notecarddiv.append(notecard);
};

let form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let textareaoneandtwo = form.querySelectorAll('textarea');
    let term = textareaoneandtwo[0].value
    let definition = textareaoneandtwo[1].value
    let newNotecard = new Notecard(term, definition);
    state.allNoteCards.push(newNotecard);
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
}



/*saveToLocalStorage = function () {
    localStorage.setItem("noteCardSets", JSON.stringify(state.notecardsets.notecards));
};
saveToLocalStorage(); -- save filtered array to local storage, save new note card to local storage */





/*noteCardSets.prototype.addNoteCard = function (term, definition) {
    //this instance method creates a new notecard and adds it to this.notecards
    let newNotecard = new Notecard(term, definition)
    this.notecards.push(newNotecard);
    state.allNoteCards.push(newNotecard); //adds the new notecard to the allnotecards array
};*/




/*function generateNote(term, definition) {
    let note = new Notecard(term, definition)
    state.allNoteCards.push(note); //push newly created notecard to page 
    return note;
}*/
/*const noteCardSets = function (notecards) {
    //this.notecards is an array of notecard instances
    this.notecards = notecards;

};*/