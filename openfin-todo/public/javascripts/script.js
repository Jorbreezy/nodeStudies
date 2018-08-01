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
        load: function () {
            setTimeout(() => {
                axios.get('http://localhost:8080/api/todo/list')
                    .then(res => {
                        this.todos = res.data.collection
                    })
                    .catch(console.error)
            }, 0)
        },
        create: function () {
            axios({
                url: '/api/todo/create',
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

$(function () {
    $('a[href*=#]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
    });
});

// Make Checked
function checked() {
    const list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}