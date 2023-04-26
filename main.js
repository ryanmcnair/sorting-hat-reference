const students = [
  {
    id: 1,
    name: "Harry Potter",
    house: "ravenclaw",
  },
  {
    id: 2,
    name: "Frodo",
    house: "slytherin",
  },
];

const expelledStudents = [];


const renderToDom = (divId, htmlToRender) => {
  const selectedContainer = document.querySelector(divId);
  selectedContainer.innerHTML = htmlToRender;
};

const renderNav = () => {
    const bsNavBar = `
    <nav class="navbar bg-body-tertiary" style="background-color: #e3f2fd;">
        <div class="container-fluid">
            <span class="navbar-text">
            Sorting Hat
            </span>
            <div id="modal"></div>
        </div>
    </nav>`
    renderToDom("#navbar", bsNavBar)
}

const filter = (arr, houseString) => {
    const studentArray = [];

    for(const student of arr) {
        if(student.house === houseString){
            studentArray.push(student);
        }
    }
    return studentArray;
}

const renderFilterButtons = () => {
    const filterButtons = `
        <button class="btn btn-primary" id="hufflepuffFilter">Hufflepuff</button>
        <button class="btn btn-success" id="slytherinFilter">Slytherin</button>
        <button class="btn btn-info" id="ravenclawFilter">Ravenclaw</button>
        <button class="btn btn-secondary" id="gryffindorFilter">Gryffindor</button>
        <button class="btn btn-warning" id="all-btn">All students</button>
    `
    renderToDom("#filterButtons", filterButtons);
}

const filterActions = () => {
    const showHuffButton = document.querySelector('#hufflepuffFilter')
    const showSlytherinButton = document.querySelector('#slytherinFilter')
    const showRavenButton = document.querySelector('#ravenclawFilter')
    const showGryffButton = document.querySelector('#gryffindorFilter')
    const showAllButton = document.querySelector('#all-btn')

    showHuffButton.addEventListener('click', () => {
        const huffFilter = filter(students, "hufflepuff");
        studentsOnDom(huffFilter);
    });
    showSlytherinButton.addEventListener('click', () => {
        const slytherinFilter = filter(students, "slytherin");
        studentsOnDom(slytherinFilter);
    });
    showRavenButton.addEventListener('click', () => {
        const ravenclawFilter = filter(students, "ravenclaw");
        studentsOnDom(ravenclawFilter);
    });
    showGryffButton.addEventListener('click', () => {
        const gryffindorFilter = filter(students, "gryffindor");
        studentsOnDom(gryffindorFilter);
    });
    showAllButton.addEventListener('click', () => studentsOnDom(students));
}

const studentsOnDom = (arr) => {
  let domString = "";
  for (student of arr) {
    domString += `
        <div class="card" style="width: 18rem;">
            <div class="card-img-top-${student.house === "hufflepuff" ? "hufflepuff" : (student.house === "slytherin" ? "slytherin" : (student.house === "ravenclaw" ? "ravenclaw" : "gryffindor"))}"></div>
            <div class="card-body">
                <h5 class="card-title">${student.house}</h5>
                <p class="card-text">${student.name}</p>
                <button id="expel--${student.id}"class="btn btn-danger">Expel</button>
            </div>
            </div>`;
  }
  renderToDom('#students', domString);
};

const expelledOnDom = (arr) => {
  let domString = "";
  for (student of arr) {
    domString += `
        <div class="card" style="width: 18rem;">
            <div class="card-img-top-expelled"></div>
            <div class="card-body">
                <h5 class="card-title">EXPELLED!</h5>
                <p class="card-text">${student.name}</p>
                <button id="remove--${student.id}"class="btn btn-danger">Remove</button>
            </div>
            </div>`;
  }
  renderToDom('#evilStudents', domString);
};

const expelButton = document.querySelector("#cards");

expelButton.addEventListener('click', (e) => {
    if(e.target.id.includes("expel")){
        const [, id] = e.target.id.split("--");
        const index = students.findIndex(student => student.id === Number(id));
        expelledStudents.push(...students.splice(index, 1));
        studentsOnDom(students);
        expelledOnDom(expelledStudents)
    }
    if(e.target.id.includes("remove")){
        const [, id] = e.target.id.split("--");
        const index = expelledStudents.findIndex(student => student.id === Number(id));
        expelledStudents.splice(index, 1);
        expelledOnDom(expelledStudents)
    }
});

const renderModal = () => {
   const modal = `
        <button id="modalButton" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTitle">
        Add new student
        </button>


        <div class="modal fade" id="modalTitle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Add your sassy new student</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="studentForm" class="modal-body">
            </div>
            </div>
        </div>
        </div>`
    renderToDom("#modal", modal);
}

const renderForm = () => {
    const newStudentForm = `
    <form class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Student Name</label>
        <input type="text" class="form-control" id="studentName">
        <button type="submit" id="addStudentSubmit" class="btn btn-warning" data-bs-dismiss="modal">Save changes</button>
    </form>`
    renderToDom("#studentForm", newStudentForm)
}
const addFormListener = () => {
    const form = document.querySelector("form");
    
    const addStudent = (e) => {
        e.preventDefault();

        const randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

        let houseName = "";

        switch (randomNum) {
            case 1:
              houseName = "hufflepuff";
              break;
            case 2:
              houseName = "slytherin";
              break;
            case 3:
              houseName = "ravenclaw";
              break;
            case 4:
              houseName = "gryffindor";
              break;
          }
        console.log(houseName);
        const newStudentObj = {
            id: students.length + 1,
            name: document.querySelector('#studentName').value,
            house: houseName,
        }
        students.push(newStudentObj);
        init();
        form.reset();
    }
    
    form.addEventListener('submit', addStudent);
}

const init = () => {
    renderNav();
    renderFilterButtons();
    renderModal();
    renderForm();
    addFormListener();
    filterActions();
    studentsOnDom(students);
    expelledOnDom(expelledStudents);
};

init();