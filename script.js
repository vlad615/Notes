

const model = {
    notes: [
        {id: 1, title: "Flexbox", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: true
        },
        {id: 2, title: "JS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: false
        },
        {id: 3, title: "CSS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: false
        },
    ],

    addNote(title, content){
        this.notes = [{id: new Date().getTime(),
                    title: title,
                    content: content,
                    liked: false} ,...this.notes]
    }

}

const view = {
    init(){
        this.renderNotes(model.notes)
        const newNote = document.querySelector("form")

        newNote.addEventListener("submit", (ev)=>{
            ev.preventDefault();
            const title = ev.target.title.value;
            const content = ev.target.content.value;
            controler.addNote(title, content)
        })
    },

    renderNotes(list){
        const notesWrapper = document.querySelector(".notes")
    }
}

const controler = {
    addNote(title, content){
        if(title.length > 50 || title.trim() === ""){
            view.titleError()
        } else if(content.length > 50 || content.trim() === ""){
            view.contentError()
        } else {
            model.addNote(title, content)
        }
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init)