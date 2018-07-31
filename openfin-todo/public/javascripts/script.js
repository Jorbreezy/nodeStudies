// Vue.component('modal', {
//   template: '#modal-template'
// })
// new Vue({
//   el: '#app',
//   data: {
//     showModal: false
//   }
// })

$('#searchBtn').click(() => {
    var search = $('#search').val();

    $.ajax({
        url: "http://localhost:8080/api/todo/search?=" + search,
        method: "Get",
        success: function (results) {
          alert(results);
        },
        error: function (err) {
            alert(err)
        }
    });
});