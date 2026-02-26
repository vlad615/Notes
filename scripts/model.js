import {view} from "./view.js"
const model = {
    notes: [
        // {id: 1, title: "Flexbox", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        // liked: true, color: "yellow"
        // },
        // {id: 2, title: "JS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        // liked: false, color: "green"
        // },
        // {id: 3, title: "CSS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        // liked: false, color: "blue"
        // },
    ],

    sel_color: "yellow",
    onlyLike: false,

    addNote(title, content){
        this.notes = [{id: new Date().getTime(),
                    title: title,
                    content: content,
                    liked: false, color: this.sel_color} ,...this.notes]
        
        view.renderNotes(this.notes, this.onlyLike)
        view.showMessage("added")
    },

    changeColor(newColor){
        this.sel_color = newColor;
        view.renderColor(newColor);
    },

    like(itemId){
        this.notes = this.notes.map(i => i.id==itemId?{...i, liked: !i.liked}:i)
        view.renderNotes(this.notes, this.onlyLike)
    },

    delItem(id){
        this.notes = this.notes.filter(i => i.id != id)
        view.renderNotes(this.notes, this.onlyLike)
        view.delItem(NaN, true)
    },

    showLiked(state){
        this.onlyLike = state
        view.renderNotes(this.notes, this.onlyLike)
    }
}

export {model};
