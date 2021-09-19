class Textarea {
    addTextarea(parent, classes, placeholder, id, descValue) {
        let wrapper = document.createElement('div');
        let area = document.createElement('textarea');
        let description = document.createElement('span');

        area.className = classes;
        wrapper.className = 'modal-content-wrapper';

        if (placeholder) {
            area.placeholder = placeholder;
        }

        if (id) {
            area.id = id;
        }

        if (descValue) {
            description.textContent = descValue;
            description.className = 'modal-item-desc';
            wrapper.append(description);
        }

        wrapper.append(area);
        parent.append(wrapper);
    }
}

export default Textarea;