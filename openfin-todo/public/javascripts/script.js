
const app = new Vue({
    el: '#app',
    data: {
        todos: [],
        loaded: false,
        errorMessage: '',
        showModal: false,
        newTodo: {
            title: '',
            comment: '',
            create: false,
        },
        openfin: {
            isopenfin: Window.fin !== undefined,
            version: 'not openfin',
        },
    },
    methods: {
        removeTodo: function(id, todo) {
            axios.delete('http://localhost:8080/api/todo/delete/' + id)
                .then(() => {
                    this.todos.splice(this.todos.indexOf(todo), 1)
                })
                .catch(console.error);
        },
        reloadApplication: () => {
            return fin.desktop.Window.getCurrentWindow().reload(console.log, console.error)
        },
        editTodo: function (todo) {
            this.beforeEditCache = todo.title
            this.editedTodo = todo
        },      
        load: function () {
            setTimeout(() => {
                axios.get('http://localhost:8080/api/todo/list')
                    .then(({ data }) => {
                        this.loaded = true

                        setTimeout(() => {
                            this.todos = data.collection
                        }, 1000)
                    })
                    .catch(console.error)
            }, 3000)
        },
        create: function() {
            axios({
                url: 'http://localhost:8080/api/todo/create',
                method: 'POST',
                data: {
                    title: this.newTodo.title,
                    comment: this.newTodo.comment,
                }
            })
            .then(({ data }) => {
                this.newTodo.title = ''
                this.newTodo.comment = ''
                
                this.todos.push(data);
                
                if (fin) {
                    function openChildWindow() {
                        // create a new child window and create a interapplication bus message to the new child window
                    }

                    new fin.desktop.Notification({
                        url: "components/notification.html",
                        message: data,
                        onClick: () => {
                            openChildWindow(data)
                        }
                    })
                }
            })
            .catch(console.error)
        }
    }
})

app.load();


//     doneEdit: function  {
//       if (!this.editedTodo) {
//         return
//       }
//       this.editedTodo = null
//       todo.title = todo.title.trim()
//       if (!todo.title) {
//         this.removeTodo(todo)
//       }

//  Make Close Button
//  function closeBtn(id) {
//      let myNodelist = document.getElementsByTagName("#delete");
//      let i;

//      let span = document.createElement("SPAN");
//      let txt = document.createTextNode("\u00D7");
//      span.className = "close";
//      span.appendChild(txt);

//      span.onclick = function(){

//          console.log('REACHED');

//          $.ajax({
//              url:'http://localhost:8080/api/todo/delete/' + id,
//              method:'DELETE',
//              success: function(msg){
//                  console.log('Deleted ' + id)
//              }
//          })

//          $('ul').empty();
//          load();

//          const div = this.parentElement;
//          div.style.display = "none";
//      };

//      for (i = 0; i < myNodelist.length; i++) {
//          myNodelist[i].appendChild(span);
//      }
//  }

//  // Hide Delete List
//  function hideCloseBtn(){
//      const close = document.getElementsByClassName("close");

//      for (i = 0; i < close.length; i++) {

//      }
//  }

// $(document).ready(function(){
//     function checked() {
//         const list = document.querySelector('ul');
//         list.addEventListener('click', function (ev) {
//             if (ev.target.tagName === 'LI') {
//                 ev.target.classList.toggle('checked');
//             }
//         }, false);
//     }
// });
// Make Checked


//  // New Item
//  function newElement() {
//      const li = document.createElement("li");
//      const inputValue = document.getElementById("myInput").value;
//      const t = document.createTextNode(inputValue);
//      li.appendChild(t);

//      if (inputValue === '') {
//          alert("You must write something!");
//      } else {
//          document.getElementById("myUL").appendChild(li);
//      }
//      document.getElementById("myInput").value = "";

//      const span = document.createElement("SPAN");
//      const txt = document.createTextNode("\u00D7");
//      span.className = "close";
//      span.appendChild(txt);
//      li.appendChild(span);

//      for (i = 0; i < close.length; i++) {
//          close[i].onclick = function () {
//              const div = this.parentElement;
//              div.style.display = "none";
//          }
//      }

//      $.ajax({
//          url:"http://localhost:8080/api/create",
//          method:"POST",
//          dataType: 'json',
//          contentType: 'application/json',
//          data: JSON.stringify({
//              title: inputValue,
//              comment: "Im cool",
//              completed: false,
//              alias: inputValue
//          }),
//          success: function(results){
//              console.log(results);
//              $('ul').empty();
//              load();
//              checked();
//          },
//          error: function(err){
//              console.log(err);
//          }
//      });
//  }


// $('#searchBtn').click(() => {
//     var search = $('#search').val();

//     $.ajax({
//         url: "http://localhost:8080/api/todo/search?=" + search,
//         method: "Get",
//         success: function (results) {
//           alert(results);
//         },
//         error: function (err) {
//             alert(err)
//         }
//     });
// });