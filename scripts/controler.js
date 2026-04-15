import {view} from "./view.js"
import {model} from "./model.js"

const controler = {
    addNote(name, desc, color, likedList){
        const form = document.querySelector("form")

        name = name.trim()
        desc = desc.trim()

        if (!name.length || name.length>30){
            view.showMessage("error", "Назвение не может быть пустым или больше 30 символов")
            return 0
        } else if (desc.length>500){
            view.showMessage("error", "Описание не может быть больше 500 символов")
            return 0
        }
        
        form.reset()
        model.addNote(name, desc, color, likedList)
    }, 

    showLiked(show){
        model.showLiked(show)
    }, 

    like(idNote){
        model.like(idNote)
    },

    delItem(idNote, likedList){
        model.del(idNote, likedList)
    }
}

export {controler};

