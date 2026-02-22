

const model = {
    notes: [
        {id: 1, title: "Flexbox", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: true, color: "yellow"
        },
        {id: 2, title: "JS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: false, color: "green"
        },
        {id: 3, title: "CSS", content: "Loremasdlfjasldjflsjdflkajsdfa;dslkfjas;df\nalsdjfa;j\na;sdnfajsdjfalsdfjjasldaf",
        liked: false, color: "blue"
        },
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
    },

    showLiked(state){
        this.onlyLike = state
        view.renderNotes(this.notes, this.onlyLike)
    }
}

const view = {
    init(){
        this.renderNotes(model.notes)
        const newNote = document.querySelector("form")
        const colorList = document.querySelector(".colors")
        const likeDel = document.querySelector(".notes")
        const onlyLike = document.querySelector("#liked")
        const del = document.querySelector(".delete")

        newNote.addEventListener("submit", (ev)=>{
            ev.preventDefault();
            const title = ev.target.title.value;
            const content = ev.target.content.value;
            
            controler.addNote(title, content)
        })

        colorList.addEventListener("click", (ev) => {
            controler.changeColor(ev.target.classList.value)
        })

        likeDel.addEventListener("click", (ev) => {
            // const title = ev.target.
            controler.likeDel(ev.target.classList.value, ev.target.parentElement.id, )
        })

        onlyLike.addEventListener("click", (ev)=>{
            controler.showLiked(ev.target.checked)
        })

        del.addEventListener("click", (ev)=>{
            console.log("delete");
            
            controler.delItem(ev.target.id)
        })
    },

    renderNotes(list, onlyLike = false){
        console.log(list);
        const notesWrapper = document.querySelector(".notes")
        
        if (!list.length){
            document.querySelector(".text").setAttribute("style", "display: flex")
            document.querySelector(".liked").setAttribute("style", "display: none")
            notesWrapper.innerHTML = ''
            document.querySelector(".number").textContent = list.length
            return 0
        } else {
                document.querySelector(".text").setAttribute("style", "display: none")
                document.querySelector(".delete-wrapper").setAttribute("style", "display: none")
                document.querySelector(".liked").setAttribute("style", "display: flex")
            }

        let elements = ``
        
        for (let i = 0; i < model.notes.length; i++) {
            const element = model.notes[i];
            if (onlyLike && element.liked){
                elements += `
            <div class="note">
                <div class="head ${element.color} id="1">
                    <h2 class="title">${element.title}</h2>
                    <div class="butWrapper" id=${element.id}>
                        <img ${element.liked? `src="accets/heart active.svg" alt="liked" class="like"` :
                             `src="accets/heart inactive.svg" alt="unlike" class="like"`}>
                        <img src="accets/trash.svg" alt="delete" class="delete"> 
                    </div>
                </div>
                <div class="content">
                    <p>${element.content}</p>
                </div>
            </div>`
            } else if (!onlyLike){
                elements += `
            <div class="note">
                <div class="head ${element.color} id="1">
                    <h2 class="title">${element.title}</h2>
                    <div class="butWrapper" id=${element.id}>
                        <img ${element.liked? `src="accets/heart active.svg" alt="liked" class="like"` :
                             `src="accets/heart inactive.svg" alt="unlike" class="like"`}>
                        <img src="accets/trash.svg" alt="delete" class="delete"> 
                    </div>
                </div>
                <div class="content">
                    <p>${element.content}</p>
                </div>
            </div>`
            }   
        }

        document.querySelector(".number").textContent = list.length
        // document.querySelector("form").reset()
        notesWrapper.innerHTML = elements
    },

    renderColor(color){
        document.querySelector(".selected").classList.remove("selected")
        document.querySelector(`.${color}`).parentElement.classList.add("selected");
    },

    showMessage(message){
        const volumes = {
            title: {img: "accets/warning.svg", 
                message:"Наименование не может быть пустым или более 50 символов",
                color: '#f23d5b'},
            content: {img: "accets/warning.svg", 
                message:"Описание не может быть более 500 символов",
                color: '#f23d5b'},
            added: {img: "accets/Done.svg", 
                message:"Заметка добавлена!",
                color: "#47b27d"},
        }
        const div = document.querySelector(".message")
        const img = document.querySelector(".mess-img")
        const text = document.querySelector(".mess-text")

        setTimeout( () => {
            img.setAttribute("src", volumes[message].img)
            text.textContent = volumes[message].message
            div.setAttribute("style", `display: flex; background-color:${volumes[message].color}`)
            setTimeout( () => {
                div.style.display = "none"
            }, 3000);
        }, 0);
        },
    
    delItem(id, ){
        document.querySelector(".del-text").textContent = `Вы уверены что хотите удалить заметку?`
        document.querySelector(".delete").id = id
        document.querySelector(".delete-wrapper").style.display = "flex"
    }
}

const controler = {
    addNote(title, content){
        if(title.length > 50 || title.trim() === ""){
            view.showMessage("title")
        } else if(content.length > 500){
            view.showMessage("content")
        } else {
            model.addNote(title, content)
        }
    },

    changeColor(newColor){
        model.changeColor(newColor)
    },

    likeDel(toDo, id, ){
        if (toDo==="like"){
            model.like(id)
        } else {
            model.delItem(id)
        }
    }, 

    showLiked(state){
        model.showLiked(state)
    },

    delItem(id){
        model.delItem(id)
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init)