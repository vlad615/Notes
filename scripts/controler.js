import {view} from "./view.js"
import {model} from "./model.js"

const controler = {
    addNote(title, content){
        if(title.length > 50 || title.trim() === ""){
            view.showMessage("title")
        } else if(content.length > 250){
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
            view.delItem(id)
        }
    }, 

    showLiked(state){
        model.showLiked(state)
    },

    delItem(id){
        model.delItem(id)
    }
}

export {controler};

