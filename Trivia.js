//search funtionality
//add note card
//delete note card on the card
//save note card -- local storage?


const state = {
    allNoteCards: [],
    notecardsets: null,
}; 
//test
//notecard set constructor
const noteCardSets = function (notecards) {
    //this.notecards is an array of notecard instances
    this.notecards = notecards;
    
};

let lastUsedId = 0; //give an id to the note cards to keep track of which are deleted in case two identical cards are created and deleted

const Notecard = function(term,definition){
this.term = term;
this.defintion = definition;
this.id = lastUsedId++;
};

noteCardSets.prototype.addNoteCard = function(term, definition){
   //this instance method creates a new notecard and adds it to this.notecards
    let newNotecard = new Notecard(term, definition)
    this.notecards.push(newNotecard);
    state.allNoteCards.push(newNotecard); //adds the new notecard to the allnotecards array
};

noteCardSets.prototype.saveToLocalStorage = function () {
    localStorage.setItem("noteCardSets", JSON.stringify(state.notecardsets.notecards));
};
noteCardSets.prototype.saveToLocalStorage();



function generateNote(term,definition){
    let note = new Notecard (term,definition)
    state.allNoteCards.push(note); //push newly created notecard to page 
return note;
}

function showCardInTable(term,definition) { //add in note parameter
let notecarddiv = document.getElementById('flashcardContainer')
let notecard = document.createElement('div');
let deleteicon = document.createElement('i');
deleteicon.className = "fa fa-trash-can";
notecard.classList.add('flashcard');
notecard.innerText = term + "\n" + definition; // \n creates a new line
notecard.append(deleteicon);
notecarddiv.append(notecard);
};

let form = document.querySelector('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    let textareaoneandtwo = form.querySelectorAll('textarea');
    let term = textareaoneandtwo[0].value
    let definition = textareaoneandtwo[1].value
    showCardInTable(term,definition);

})


const table = document.getElementById('flashcardContainer');
table.addEventListener('click',deleteCard);

function deleteCard(event) {
    if (event.target.className == "fa fa-trash-can"){
        const noteCardElement =  event.target.parentElement;
        const id = noteCardElement.dataset.id; //get the id of the deleted notecard
        const index = state.notecardsets.notecards.findIndex(noteCard=> noteCard.id == id); //finds the index of the note card in the notecards array
        state.notecardsets.notecards.splice(index,1); //removes the deleted notecard from the notecards array
        state.allNoteCards.splice(index,1); //removes the deleted notecard from the allNotecards array
        noteCardElement.remove(); //removes the HTMl element from the page
    }
};








