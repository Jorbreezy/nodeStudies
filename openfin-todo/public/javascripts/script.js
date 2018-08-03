
const app = new Vue({
    el: '#app',
    data: {
        todos: [],
        errorMessage: '',
        newTodo: {
            title: '',
            comment: '',
        },
        showModal: false
        
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo && this.newTodo.trim()
            if (!value) {
              return
            }
            this.todos.push({
              id: todoStorage.uid++,
              title: value,
              completed: false
            })
            this.newTodo = '';
          },
      
          removeTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
          },
      
          editTodo: function (todo) {
            this.beforeEditCache = todo.title
            this.editedTodo = todo
          },      
        load: function () {
            setTimeout(() => {
                axios.get('http://localhost:8080/api/todo/list')
                    .then(res => {
                        this.todos = res.data.collection
                    })
                    .catch(console.error)
            }, 800)
        },
        create: function() {
            axios({
                url: 'localhost:8080/api/todo/create',
                method: 'POST',
                data: {
                    title: this.newTodo.title,
                    comment: this.newTodo.comment,
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.todos.push(res.data);

                })
                .catch(console.error)
        }
    }
})

app.load();
Vue.component('modal', {
    template: '#modal-template'
})


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