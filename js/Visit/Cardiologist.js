import {Visit, Modal} from "./index.js";

class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.doctor = "Кардиолог";
    }

    createModal() {
        super.createModal();
        localStorage.removeItem("chosenDoctor");
        this.modal.addTitle("Кардиолог");
        this.modal.addInput('кг/м2', 'индекс массы тела', false, "mass");
        this.modal.addInput('мм рт. ст.', 'артериальное давление', false, "pressure");
        this.modal.addInput('полных лет', 'возраст', false, "age");
        this.modal.addTextarea('modal-area form-control', "перенесенные заболевания сердечно-сосудистой системы", "illness");
    }

    gatherInfo() {
        super.gatherInfo();
        this.mass = document.getElementById("mass").value;
        this.pressure = document.getElementById("pressure").value;
        this.illness = document.getElementById("illness").value;
    }
}

export default VisitCardiologist;