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
        </div>
    </nav>`
    renderToDom("#navbar", bsNavBar)
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
            <div class="card-img-top-${student.house === "hufflepuff" ? "hufflepuff" : (student.house === "slytherin" ? "slytherin" : (student.house === "ravenclaw" ? "ravenclaw" : "gryffindor"))}"></div>
            <div class="card-body">
                <h5 class="card-title">${student.house}</h5>
                <p class="card-text">${student.name}</p>
                <button id="remove--${student.id}"class="btn btn-danger">Remove</button>
            </div>
            </div>`;
  }
  renderToDom('#evilStudents', domString);
};

const expelButton = document.querySelector("#cards");

expelButton.addEventListener('click', (e) => {
    // alert(e.target.id)
    if(e.target.id.includes("expel")){
        const [, id] = e.target.id.split("--");
        const index = students.findIndex(student => student.id === Number(id));
        // alert(index);
        expelledStudents.push(...students.splice(index, 1));
        studentsOnDom(students);
        expelledOnDom(expelledStudents)
    }
    if(e.target.id.includes("remove")){
        const [, id] = e.target.id.split("--");
        const index = expelledStudents.findIndex(student => student.id === Number(id));
        // alert(index);
        expelledStudents.splice(index, 1);
        expelledOnDom(expelledStudents)
    }
});

const init = () => {
    renderNav();
    studentsOnDom(students);
    expelledOnDom(expelledStudents);
};

init();