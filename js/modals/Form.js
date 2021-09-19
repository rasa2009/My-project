import Select from "./Select.js";
import Textarea from './Textarea.js';
import Input from "./Input.js";

class Form {
    constructor(classes) {
        this.form = document.createElement('form');
        this.form.className = classes;
    }

    addOnPage(parent) {
        parent.append(this.form);
    }
}

export {Form, Select, Textarea, Input};