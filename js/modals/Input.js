class Input {
    addInput(parent, placeholder, descValue, password = false, id) {
        let wrapper = document.createElement('div');
        let description = document.createElement('span');
        let input = document.createElement('input');

        input.placeholder = placeholder;
        input.className = 'form-control form-input';

        if (password === true) {
            input.type = 'password';
        }

        if (placeholder) {
            input.placeholder = placeholder;
        }

        if (id) {
            input.id = id;
        }

        wrapper.className = 'modal-content-wrapper';
        description.className = 'modal-item-desc';
        description.textContent = descValue;

        wrapper.prepend(description, input);
        parent.append(wrapper);
    }
}

export default Input;