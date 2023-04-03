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

const Notecard = function(term,definition){
this.term = term;
this.defintion = definition;
};

noteCardSets.prototype.addNoteCard = function(term, definition){
   //this instance method creates a new notecard and adds it to this.notecards
    let newNotecard = new Notecard(term, definition)
    this.notecards.push(newNotecard);
};

/*noteCardSets.prototype.saveToLocalStorage = function () {
    localStorage.setItem("noteCardSets", JSON.stringify(state.notecardsets.notecards));
};*/

/*noteCardSets.prototype.deleteCard = function(notecards){
    let filteredCards = this.notecards.filter(function(currentNoteCard){
        return notecards.term !== currentNoteCard.Notecard.term
    })
    this.notecard = filteredCards;
};*/


function generateNote(term,definition){
    let note = new Notecard (term,definition)
    state.allNoteCards.push(note); //push newly created notecard to page 
return note;
}

function showCardInTable(term,definition) { //add in note parameter
let notecarddiv = document.getElementById('flashcardContainer')
let notecard = document.createElement('div');
notecard.classList.add('flashcard');
notecard.innerText = term + "\n" + definition; // \n creates a new line

notecarddiv.append(notecard)
};

let form = document.querySelector('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    let textareaoneandtwo = form.querySelectorAll('textarea');
    let term = textareaoneandtwo[0].value
    let definition = textareaoneandtwo[1].value
    showCardInTable(term,definition);

})
//for the div that holds the notecards

/*const table = document.getElementById('');
table.addEventListener('click',deleteCard);*/

/*function loadCardTable(){
    const notecardTable = JSON.parse(localStorage.getItem('notecardsets')) || [];
    state.notecardsets = new noteCardSets (Notecard)
}*/


/*renderNoteCard(){
    loadCardTable();
    showCard();
    deleteCard();
}*/

/*function deleteCard(event) {
    if (event.target.getElementById == "deletebutton")
        let
};*/
