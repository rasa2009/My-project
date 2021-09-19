import VisitCardiologist from "./Visit/Cardiologist.js";
import VisitDentist from "./Visit/Dentist.js";
import VisitTherapist from "./Visit/Therapist.js";
import { Visit } from "./Visit/index.js";
import Authorization from "./ajax/Authorization.js";
import API from "./ajax/API.js";

let authorization = new Authorization();
let general = new Visit();

document.addEventListener("load", authorization.checkLogin());
general.transformCards().then((cards) => {
  general.render(cards);
  document.getElementById("find").oninput = (e) => {
    general.render(general.search(cards, e.target.value));
  };
});

const searchForm = document.querySelector("#submitSearch");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const status = document.querySelector(".chooseStatus");
  const urgency = document.querySelector(".chooseUrgency");
  API.getCards().then((data) => {
    const filteredData = data.filter((card) => {
      if (
        (card.status.toLowerCase() == status.value.toLowerCase() &&
          card.urgency.toLowerCase() == urgency.value.toLowerCase()) ||
        (status.value == "Все" &&
          card.urgency.toLowerCase() == urgency.value.toLowerCase()) ||
        (urgency.value == "Все" &&
          card.status.toLowerCase() == status.value.toLowerCase()) ||
        (status.value == "Все" && urgency.value == "Все")
      ) {
        return card;
      }
    });
    console.log(filteredData);
    general.render(filteredData);
  });
});

let repeater;

function cardsCheck() {
  if (document.querySelector(".card")) {
    document.querySelector(".no_added").style.display = "none";
  } else {
    document.querySelector(".no_added").style.display = "block";
  }
  repeater = setTimeout(cardsCheck, 100);
}

if (document.getElementById("logIn")) {
  let logInBtn = document.getElementById("logIn");
  logInBtn.addEventListener("click", () => {
    authorization.openModal();
  });
}

if (document.getElementById("addCard")) {
  if (document.querySelector(".card-body")) {
    document.querySelector(".no_added").remove();
  }

  let createCard = document.getElementById("addCard");
  createCard.addEventListener("click", () => {
    general.chooseDoctor();

    const chooseDoc = document.getElementById("chooseDoc");

    let Dentist = new VisitDentist();
    let Cardiologist = new VisitCardiologist();
    let Therapist = new VisitTherapist();

    const choseVisit = () => {
      if (localStorage.getItem("chosenDoctor") === "Кардиолог") {
        localStorage.removeItem("chosenDoctor");
        Cardiologist.createModal();
      } else if (localStorage.getItem("chosenDoctor") === "Стоматолог") {
        localStorage.removeItem("chosenDoctor");
        Dentist.createModal();
      } else if (localStorage.getItem("chosenDoctor") === "Терапевт") {
        localStorage.removeItem("chosenDoctor");
        Therapist.createModal();
      }
    };

    function validation(visitInfo) {
      let allInputs = [
        ...document.querySelectorAll(".dropdown-toggle"),
        ...document.querySelectorAll(".form-control"),
      ];
      allInputs.forEach((input) => {
        if (
          input.value === "" ||
          input.textContent === "срочность" ||
          input.textContent === "статус визита"
        ) {
          input.classList.toggle("input-error");
        }
      });
      for (const [key, value] of Object.entries(visitInfo)) {
        if (
          value === "" ||
          value === "срочность" ||
          value === "статус визита"
        ) {
          throw new Error("Не все поля заполнены");
        }
      }
    }

    chooseDoc.addEventListener("click", () => {
      choseVisit();

      let submit = document.getElementById("createCard");
      let modalTitle = document.querySelector(".modal-title");

      submit.addEventListener("click", async () => {
        let errorInputs = document.querySelectorAll(".input-error");
        errorInputs.forEach((input) => {
          input.classList.remove("input-error");
        });

        try {
          if (modalTitle.textContent === "Кардиолог") {
            Cardiologist.gatherInfo();
            validation(Cardiologist);
            Cardiologist.sendCard();
            Cardiologist.closeModal();
          } else if (modalTitle.textContent === "Стоматолог") {
            Dentist.gatherInfo();
            validation(Dentist);
            Dentist.sendCard();
            Dentist.closeModal();
          } else {
            Therapist.gatherInfo();
            validation(Therapist);
            Therapist.sendCard();
            Therapist.closeModal();
          }

          let allCards = await API.getCards();
          general.createOnPage(allCards);
        } catch (err) {
          alert(err.message);
        }
      });
    });
  });
}

cardsCheck();