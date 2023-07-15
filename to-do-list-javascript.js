// SHIFT + ALT + F => Düzenleme

let sonuc;

let gorevListesi = [];

if (localStorage.getItem("gorevListesi") !== null) {
  gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let taskInput = document.querySelector("#txtTaskName");

displayTasks("all");

function displayTasks(filter) {
  ul = document.getElementById("task-list");
  ul.innerHTML = "";

  if (gorevListesi.length == 0) {
    ul.innerHTML = "<p class='p-3 m-0'>List is empty.</p>";
  } else {
    for (let gorev of gorevListesi) {
      let completed = gorev.durum == "completed" ? "checked" : "";
      if (filter == gorev.durum || filter == "all") {
        let li = `
          <li class="task list-group-item">
               <div class="form-check">
                    <input type="checkbox" ${completed} onclick="updateStatus(this)" class="form-check-input" id="${gorev.id}">
                    <label for="${gorev.id}" class="form-check-label ${completed}"> ${gorev.gorevAdi}</label>
               </div>

               <div class="dropdown">
               <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa-sharp fa-solid fa-ellipsis"></i>
               </button>
               <ul class="dropdown-menu">
                    <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-sharp fa-regular fa-pen-to-square"></i> Edit</a></li>

                    <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
               
               </ul>
               </div>
          </li>
          
                                        
                                        `;

        ul.insertAdjacentHTML("beforeend", li);
      }
    }
  }
}

let btnEkle = document
  .querySelector("#button-addon2")
  .addEventListener("click", newTask);

document
  .querySelector("#txtTaskName")
  .addEventListener("keypress", function () {
    if (event.key == "Enter") {
      document.getElementById("button-addon2").click();
    }
  });

function newTask(event) {
  if (taskInput.value == "") {
    alert("Enter input");
  } else {
    if (!isEditTask) {
      console.log("ekleme");
      //ekleme
      gorevListesi.push({
        id: gorevListesi.length + 1,
        gorevAdi: taskInput.value,
        durum: "pending",
      });
      // taskInput.value= "";
    } else {
      console.log("güncelleme");
      //güncelleme
      for (let gorev of gorevListesi) {
        if (gorev.id == editId) {
          gorev.gorevAdi = taskInput.value;
        }
        isEditTask = false;
      }
    }
    console.log(gorevListesi);

    taskInput.value = "";

    displayTasks(document.querySelector("span.active").id);

    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
  }

  event.preventDefault();
}

function deleteTask(id) {
  let deletedId;
  for (let index in gorevListesi) {
    if (gorevListesi[index].id == id) {
      deletedId = index;
    }
  }
  gorevListesi.splice(deletedId, 1);
  displayTasks(document.querySelector("span.active").id);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

let editId;
let isEditTask = false;

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");
}

//hepsini silme
const btnClear = document.querySelector("#btnClear");

btnClear.addEventListener("click", function () {
  gorevListesi.splice(0, gorevListesi.length);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
  displayTasks();
});

function updateStatus(selectedTask) {
  // console.log(selectedTask.parentElement.lastElementChild);

  let label = selectedTask.nextElementSibling;
  let durum;

  if (selectedTask.checked) {
    label.classList.add("checked");
    durum = "completed";
  } else {
    label.classList.remove("checked");
    durum = "pending";
  }

  for (let gorev of gorevListesi) {
    if (gorev.id == selectedTask.id) {
      gorev.durum = durum;
    }
  }

  displayTasks(document.querySelector("span.active").id);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

// filtreleme kısmı kalanı displayTask içinde

const filters = document.querySelectorAll(".filters span");
for (let span of filters) {
  span.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    displayTasks(span.id);
  });
}

// let btnClear = document.querySelector("#btnClear").addEventListener("click", function(){
//      console.log("Clear Button")
// });
