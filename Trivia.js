//search funtionality
//add note card
//delete note card on the card
//save note card -- local storage?


const state = {
    allNoteCards: [],
    noteCardSets: null,
};

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

noteCardSets.prototype.saveToLocalStorage = function () {
    localStorage.setItem("notecard", JSON.stringify(Notecard));
}
renderNoteCard(){
    showCard();
    deleteCard();
};
function showCard() {

};

function deleteCard() {
    if (event.target.innerHTML == "imgsource")
        let
};
