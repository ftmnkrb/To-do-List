let sonuc;

          let gorevListesi = [
               {"id" : 1, "gorevAdi" : "Görev 1"},
               {"id" : 2, "gorevAdi" : "Görev 2"},
               {"id" : 3, "gorevAdi" : "Görev 3"},
          ];

          ul = document.getElementById("task-list");  

          for (let gorev of gorevListesi){
               let li = `
                              <li class="task list-group-item">
                                   <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="${gorev.id}">
                                        <label for="${gorev.id}" class="form-check-label"> ${gorev.gorevAdi}</label>
                                   </div>
                              </li>
                              `;
                              ul.insertAdjacentHTML("beforeend", li);

          }


          // let count = ul.children.length;
          // console.log(count);

          