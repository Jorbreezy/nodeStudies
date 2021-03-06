$(document).ready(function () {
    load();
    checked();
});

function load() {
    $.ajax({
        url: "http://localhost:8080/api/todo/list",
        method: "Get",
        success: function (results) {
            //console.log(results);

            results.forEach((data) => {
                if (data != null) {
                    var item = document.createElement('li');
                    item.innerText = data.title;

                    $('#myUL').append(item);

                    closeBtn(data.id);
                    hideCloseBtn();
                }
            });
            
        },
        error: function (err) {
            console.log(err);
        }
    });
}


// Make Close Button
function closeBtn(id) {
    let myNodelist = document.getElementsByTagName("LI");
    let i;

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);

    span.onclick = function () {

        console.log('REACHED');

        $.ajax({
            url: 'http://localhost:8080/api/todo/delete/' + id,
            method: 'DELETE',
            success: function (msg) {
                console.log('Deleted ' + id)
            }
        })

        $('ul').empty();
        load();

        const div = this.parentElement;
        div.style.display = "none";
    };

    for (i = 0; i < myNodelist.length; i++) {
        myNodelist[i].appendChild(span);
    }
}

// Hide Delete List
function hideCloseBtn() {
    const close = document.getElementsByClassName("close");

    for (i = 0; i < close.length; i++) {

    }
}

// Make Checked
function checked() {
    const list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

}



$.ajax({
    url: "http://localhost:8080/api/create",
    method: "POST",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
        title: inputValue,
        comment: "Im cool",
        completed: false,
        alias: inputValue
    }),
    success: function (results) {
        console.log(results);
        $('ul').empty();
        load();
        checked();
    },
    error: function (err) {
        console.log(err);
    }
});

