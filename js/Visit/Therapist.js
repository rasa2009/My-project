import {Visit, Modal} from "./index.js";

class VisitTherapist extends Visit {
    constructor() {
        super();
        this.doctor = "Терапевт";
    }

    createModal() {
        super.createModal();
        localStorage.removeItem("chosenDoctor");
        this.modal.addTitle("Терапевт");
    }
}

export default VisitTherapist;