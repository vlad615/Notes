import { controler } from "./controler.js"
import { model } from "./model.js"

let color = "white"

const view = {
    init() {
        this.renderNotes(model.notes)
        this.renderCount(model.notes.length)

        const nameNote = document.getElementById("name");
        const descriptioNote = document.getElementById("description")
        const addBtn = document.querySelector(".add-note")
        const likedList = document.getElementById("liked")
        const likeDel = document.querySelector(".notes-wrapper")
        const colors = document.querySelectorAll(".radio")
        const del = document.querySelector(".delete-btn")
        const cancel = document.querySelectorAll(".cancel")

        nameNote.addEventListener("click", ()=>view.delItem({cancel: true}))
        descriptioNote.addEventListener("click", ()=>view.delItem({cancel: true}))

        del.addEventListener("click", (ev) => {
            controler.delItem(ev.target.id, likedList.checked)
        })

        cancel.forEach((i) => {
            i.addEventListener("click", () => {
                view.delItem({cancel: true})
            })
        })

        colors.forEach(i => {
            i.addEventListener("click", () => {
                if (color === i.value) {
                    i.checked = false
                    color = "white"
                } else {
                    color = i.value
                    i.checked = true
                }
                view.delItem({cancel: true})
            })
        })

        addBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            controler.addNote(nameNote.value, descriptioNote.value, color, likedList.checked)
            view.delItem({cancel: true})
        })

        likedList.addEventListener("change", (ev) => {
            controler.showLiked(ev.target.checked)
            view.delItem({cancel: true})
        })

        likeDel.addEventListener("click", (ev) => {
            const action = ev.target.className;
            const idNote = ev.target.closest("article").id

            if (action === "like"){
                controler.like(idNote)
                view.delItem({cancel: true})
            } else if (action === "delete-note") {
                const name = ev.target.parentElement.previousElementSibling.textContent
                view.delItem({id:idNote, name:name} )
            }
        })


    },

    renderCount(count) {
        document.querySelector(".count").innerHTML = count
    },

    renderNotes(notesData) {
        const container = document.querySelector(".notes-wrapper")

        if (!notesData.length) {
            document.querySelector(".liked-wrapper").setAttribute("style", "opacity: 0")
            container.innerHTML = `<p class="no-notes">У вас нет еще ни одной заметки.
Заполните поля выше и создайте свою первую заметку!</p>`
            return 0
        } else {
            document.querySelector(".liked-wrapper").setAttribute("style", "opacity: 1")
        }

        let notes = ''
        for (let i = 0; i < notesData.length; i++) {
            const element = notesData[i];

            notes += `
            <article id="${element.id}">
                <div class="note-header" style="background: ${element.color}">
                    <h4>${element.title}</h4>
                    <div class="like-del-wrap">
                        <button class="like" 
                        style=\"background-image: ${element.liked ?
                    "url('/accets/icons/heartactive.svg')" :
                    "url('/accets/icons/heartinactive.svg')"}\"></button>
                        <button class="delete-note"></button>
                    </div>
                </div>
                <p class="description">${element.description ?
                    element.description
                    : "Описание отсутствует"}</p>
            </article>
            `
        }
        container.innerHTML = notes
    },

    showMessage(type, text) {
        const styles = {
            error: {
                img: "/accets/icons/warning.svg",
                color: "#f23d5b;"
            },
            warrning: {
                img: "/accets/icons/warning.svg",
                color: "#f4ce34;"
            },
            done: {
                img: "/accets/icons/Done.svg",
                color: "#47b27d;"
            }
        }

        let container = document.createElement("div")
        container.classList.add("message")
        container.style.cssText = `background:${styles[type].color}`

        container.innerHTML = `
            <img src=${styles[type].img}>
            <p class="message-text">${text}</p>
        `

        const wrapper = document.querySelector(".message-wrapper")

        setTimeout(() => {
            wrapper.append(container)
            setTimeout(() => {
                container.remove()
            }, 3000)
        }, 0)

    },

    delItem({cancel= false, id=NaN, name=NaN}) {
        if (cancel) {
            document.querySelector(".delete-wrapper").style.display = "none"
            return
        }
        document.querySelector(".del-text").innerHTML = `Вы уверены что хотите удалить заметку
<span class="q"><q>${name}</q>?</span>`
        document.querySelector(".delete-btn").id = id
        document.querySelector(".delete-wrapper").style.display = "flex"
    }
}


function initListeners() {
    view.init()
}

export { view, initListeners };
