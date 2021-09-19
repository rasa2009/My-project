import {Visit, Modal} from "./index.js";

class VisitDentist extends Visit {
    constructor() {
        super();
        this.doctor = "Стоматолог";
    }

    createModal() {
        super.createModal();
        localStorage.removeItem("chosenDoctor");
        this.modal.addTitle("Стоматолог");
        this.modal.addInput('дд-мм-гггг', 'дата последнего посещения', false, "date");
    }

    gatherInfo() {
        super.gatherInfo();
        this.date = document.getElementById("date").value;
    }
}

export default VisitDentist;