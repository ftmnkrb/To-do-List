let sonuc;

          let gorevListesi = [
               {"id" : 1, "gorevAdi" : "Görev 1"},
               {"id" : 2, "gorevAdi" : "Görev 2"},
               {"id" : 3, "gorevAdi" : "Görev 3"},
          ];

          displayTasks();
          function displayTasks(){
               ul = document.getElementById("task-list");  
               ul.innerHTML = "";

          for (let gorev of gorevListesi){
               let li = `
                              <li class="task list-group-item">
                                   <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="${gorev.id}">
                                        <label for="${gorev.id}" class="form-check-label"> ${gorev.gorevAdi}</label>
                                   </div>

                                   <div class="dropdown">
                                   <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   <i class="fa-sharp fa-solid fa-ellipsis"></i>
                                   </button>
                                   <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-regular fa-pen-to-square"></i> Edit</a></li>

                                        <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                   
                                   </ul>
                                   </div>
                              </li>

                              
                              `;
                              ul.insertAdjacentHTML("beforeend", li);

          }
          }

       
     let btnEkle = document.querySelector("#button-addon2").addEventListener("click", newTask);

     document.querySelector("#txtTaskName").addEventListener("keypress", function(){
          if(event.key == "Enter"){
               document.getElementById("button-addon2").click();
          }
     })

     function newTask(event){
          let taskInput = document.querySelector("#txtTaskName");

          if(taskInput.value == ""){
               alert("Enter input");
          }
          else{
               gorevListesi.push({"id" : gorevListesi.length + 1, "gorevAdi" : taskInput.value});
               taskInput.value= "";

               displayTasks()
          }

          event.preventDefault();
          
         

     }

     function deleteTask(id){

          let deletedId;
          for(let index in gorevListesi){
               if(gorevListesi[index].id == id){
                    deletedId =index;
               }
          }
          gorevListesi.splice(deletedId, 1);
          displayTasks();
     }
    

    

     // let btnClear = document.querySelector("#btnClear").addEventListener("click", function(){
     //      console.log("Clear Button")
     // });



          