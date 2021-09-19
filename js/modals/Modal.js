import {Form, Select, Textarea, Input} from "./Form.js";

class Modal {
    constructor() {
        this.elements = {
            wrap: document.createElement('div'),
            modal: document.createElement('div'),
            header: document.createElement('div'),
            body: document.createElement('div'),
            footer: document.createElement('div'),
            closeBtn: document.createElement('button'),
            submitBtn: document.createElement('button'),
            form: new Form('modal-form')
        }


        this.elements.wrap.className = 'modal';
        this.elements.modal.className = 'modal-create';
        this.elements.header.className = 'modal-header';
        this.elements.body.className = 'modal-body';
        this.elements.footer.className = 'modal-footer';
        this.elements.closeBtn.className = 'btn-close';
        this.elements.submitBtn.className = 'btn btn-outline-success sbmt-btn';
    }

    show(submitText, submitId) {
        const {submitBtn, header, body, footer, modal, wrap, closeBtn, form} = this.elements;
        submitBtn.textContent = submitText;
        header.prepend(closeBtn);
        footer.prepend(submitBtn);
        form.addOnPage(body);
        modal.append(header, body, footer);
        wrap.append(modal);
        document.body.append(wrap);

        if (submitId) {
            submitBtn.id = submitId;
        }

        this.handleClose();
    }

    remove() {
        const {wrap} = this.elements;
        wrap.remove();
    }

    handleClose() {
        const {closeBtn, wrap} = this.elements;
        closeBtn.addEventListener('click', () => {
            wrap.remove();
        })
        wrap.addEventListener('click', (e) => {
            if (event.target.className === 'modal') {
                wrap.remove();
            }
        })
    }

    addField(parent, type, value, classes, id) {
        let insert = document.createElement(type);

        if (id) {
            insert.id = id;
        }

        insert.textContent = value;
        insert.className = classes;
        parent.prepend(insert);
    }

    addTitle(value) {
        const {header} = this.elements;
        this.addField(header, 'h3', value, 'modal-title');
    }

    addInput(placeholder, descValue, password, id) {
        let form = document.querySelector('.modal-form');

        let l = new Input();
        l.addInput(form, placeholder, descValue, password, id);
    }

    addDropdown(args, dropName, id) {
        let select = new Select();
        let parent = document.querySelector('.modal-form');
        select.addDropdown(parent, args, dropName, id);
    }

    addTextarea(classes, placeholder, id, descValue) {
        let form = document.querySelector('.modal-form');
        let t = new Textarea();
        t.addTextarea(form, classes, placeholder, id, descValue);
    }
}

export default Modal;