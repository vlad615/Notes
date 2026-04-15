import {view} from "./view.js"

const colors = {
    yellow: "#F3DB7D",
    red: "#F37D7D",
    green: "#C2F37D",
    blue: "#7DE1F3",
    purple: "#E77DF3",
    white: "#fff"
}

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
        // {id: 2, title: "JS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        // liked: false, color: "green"
        // },
    ],

    addNote(name, desc, color, likedList){
        
        this.notes = [
            {id: crypto.randomUUID(), 
            title: name, 
            description: desc,
            color: colors[color], 
            liked: false}, 
            ...this.notes]
        
        if (!likedList){            
            view.renderNotes(this.notes)
        }

        view.renderCount(this.notes.length)
        view.showMessage("done", "Заметка добавлена!")
        this.saveStorage()
    },

    showLiked(show){
        let notesList = this.notes

        if (show){
            notesList = this.notes.filter(note=>note.liked)
        }

        if (this.notes && !notesList.length){
            document.getElementById("liked").checked = false
            view.showMessage("warrning", "У вас нет избраных заметок!")
        } else{
            view.renderNotes(notesList)
        }
        
    },

    like(idNote){
        this.notes = this.notes.map(note=>{ return note.id===idNote
                                                    ?{...note, liked:!note.liked}
                                                    :note})
        
        const note = this.notes.find(note=>note.id===idNote)
        if (note.liked){
            view.showMessage("done", "Заметка добавлена в избраное!")
            view.renderNotes(this.notes)

        } else {
            view.showMessage("done", "Заметка удалена из избраного!")
            const filternotes = this.notes.filter(note=>note.liked)
            console.log(filternotes);
            
            if (filternotes.length) {
                view.renderNotes(filternotes)                
            } else {
                view.renderNotes(this.notes)                
                document.getElementById("liked").checked = false
            }
        }
        this.saveStorage(this.notes)
    },

    del(idNote, likedList){
        this.notes = this.notes.filter(note=>note.id!==idNote)

        if (likedList){
            document.getElementById("liked").checked = false
        }

        view.showMessage("done", "Заметка удалена!")
        view.delItem({cancel: true})
        view.renderCount(this.notes.length)
        view.renderNotes(this.notes)
        this.saveStorage(this.notes)
    },

    loadStorage(){
        const storageNotes = JSON.parse(localStorage.getItem('notes'))
        this.notes = storageNotes? storageNotes : []
    }, 

    saveStorage(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }
}

export {model};
