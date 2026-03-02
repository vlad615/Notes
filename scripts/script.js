import {initListeners} from "./view.js";
import { model } from "./model.js";

function init(){
    model.loadStorage();
    initListeners();
}


document.addEventListener('DOMContentLoaded', init)