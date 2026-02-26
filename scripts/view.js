import { controler } from "./controler.js"
import { model } from "./model.js"

const view = {
    init(){
        this.renderNotes(model.notes)
        const newNote = document.querySelector("form")
        const colorList = document.querySelector(".colors")
        const likeDel = document.querySelector(".notes")
        const onlyLike = document.querySelector("#liked")
        const del = document.querySelector(".delete-btn")
        const cancel = document.querySelectorAll(".cancel")

        cancel.forEach((i)=>{i.addEventListener("click", ()=>{
            view.delItem(NaN, true)
        })})
        

        newNote.addEventListener("submit", (ev)=>{
            ev.preventDefault();
            const title = ev.target.title.value;
            const content = ev.target.content.value;
            
            controler.addNote(title, content)
        })

        colorList.addEventListener("click", (ev) => {
            const el = ev.target.classList.value;
            controler.changeColor(ev.target.classList.value)
        })

        likeDel.addEventListener("click", (ev) => {
            const el = ev.target.classList.value;
            if (el === "like" || el === "delete"){
                controler.likeDel(ev.target.classList.value, ev.target.parentElement.id, )
            }
        })

        onlyLike.addEventListener("click", (ev)=>{
            controler.showLiked(ev.target.checked)
        })

        del.addEventListener("click", (ev)=>{
            controler.delItem(ev.target.id)
        })

        
    },

    renderNotes(list, onlyLike = false){
        const notesWrapper = document.querySelector(".notes")
        
        if (!list.length){
            document.querySelector(".text").setAttribute("style", "display: flex")
            document.querySelector(".liked").setAttribute("style", "display: none")
            notesWrapper.innerHTML = ''
            document.querySelector(".number").textContent = list.length
            return 0
        } else {
                document.querySelector(".text").setAttribute("style", "display: none")
                document.querySelector(".delete-wrapper").style.display = "none"
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
                        <img ${element.liked? `src="../accets/icons/heartactive.svg" alt="liked" class="like"` :
                             `src="../accets/icons/heartinactive.svg" alt="unlike" class="like"`}>
                        <img src="../accets/icons/trash.svg" alt="delete" class="delete"> 
                    </div>
                </div>
                <div class="content">
                    <p class="text-cont">${element.content}</p>
                </div>
            </div>`
            } else if (!onlyLike){
                elements += `
            <div class="note">
                <div class="head ${element.color} id="1">
                    <h2 class="title">${element.title}</h2>
                    <div class="butWrapper" id=${element.id}>
                        <img ${element.liked? `src="../accets/icons/heartactive.svg" alt="liked" class="like"` :
                             `src="../accets/icons/heartinactive.svg" alt="unlike" class="like"`}>
                        <img src="../accets/icons/trash.svg" alt="delete" class="delete"> 
                    </div>
                </div>
                <div class="content">
                    <p class="text-cont">${element.content}</p>
                </div>
            </div>`
            }   
        }

        document.querySelector(".number").textContent = list.length
        document.querySelector("form").reset()
        notesWrapper.innerHTML = elements
    },

    renderColor(color){
        document.querySelector(".selected").classList.remove("selected")
        document.querySelector(`.${color}`).parentElement.classList.add("selected");
    },

    showMessage(message){
        const volumes = {
            title: {img: "../accets/icons/warning.svg", 
                message:"Наименование не может быть пустым или более 50 символов",
                color: '#f23d5b'},
            content: {img: "../accets/icons/warning.svg", 
                message:"Описание не может быть более 500 символов",
                color: '#f23d5b'},
            added: {img: "../accets/icons/Done.svg", 
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
    
    delItem(id, cancel=false){
        if (cancel){
            document.querySelector(".delete-wrapper").style.display = "none"
            return
        }
        document.querySelector(".del-text").textContent = `Вы уверены что хотите удалить заметку?`
        document.querySelector(".delete-btn").id = id
        document.querySelector(".delete-wrapper").style.display = "flex"
    }
}


function init() {
    view.init()
}

export {view, init};
