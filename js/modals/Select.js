class Select {
    addDropdown(parent, args, dropName, id) {
        let dropdown = document.createElement('div');
        let dropdownOpen = document.createElement('button');
        let dropdownList = document.createElement('ul');

        dropdownOpen.className = 'btn btn-outline-primary dropdown-toggle';
        dropdownOpen.type = 'button';
        dropdownOpen.setAttribute('data-bs-toggle', 'dropdown');
        dropdownOpen.setAttribute('aria-expanded', 'false');
        dropdownOpen.textContent = dropName;
        dropdownList.className = 'dropdown-menu dropdown-menu-dark';
        dropdownList.setAttribute('aria-labelledby', 'dropdownMenuButton2');

        if (id) {
            dropdown.id = id;
        }

        args.forEach((i) => {
            let dropdownItem = document.createElement('li');
            dropdownItem.className = 'dropdown-item';
            dropdownItem.textContent = i;
            dropdownList.append(dropdownItem);

            dropdownItem.addEventListener('click', () => dropdownOpen.textContent = dropdownItem.textContent);
        });

        dropdown.append(dropdownOpen, dropdownList);
        parent.prepend(dropdown);
    }
}

export default Select;