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
    load: function() {
        setTimeout(() => {
            axios.get('http://localhost:8080/api/todo/list')
                .then(res => {
                    this.todos = res.data.collection
                })
                .catch(console.error)
        }, 3000)
    },
    create: function() {
        axios({
            url: '/api/todo/create',
            method: 'POST',
            data: {
                title: this.newTodo.title,
                comment: this.newTodo.comment,
            }
        })
        .then(console.log)
        .catch(console.error)
    }
  }
})
app.load();

Vue.component('modal', {
  template: '#modal-template'
})
$(function() {
    $('a[href*=#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
  });
 
//  // Make Close Button
//  function closeBtn(id) {
//      let myNodelist = document.getElementsByTagName("LI");
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
 
 
 
 // Make Checked
 function checked() {
     const list = document.querySelector('ul');
     list.addEventListener('click', function (ev) {
         if (ev.target.tagName === 'LI') {
             ev.target.classList.toggle('checked');
         }
     }, false);
 }
 
 
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