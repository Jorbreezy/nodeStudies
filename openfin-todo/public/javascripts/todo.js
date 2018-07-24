 // Make Close Button
 var myNodelist = document.getElementsByTagName("LI");
 var i;
 for (i = 0; i < myNodelist.length; i++) {
   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   myNodelist[i].appendChild(span);
 }
 // Hide Delete List
 var close = document.getElementsByClassName("close");
 var i;
 for (i = 0; i < close.length; i++) {
   close[i].onclick = function () {
     var div = this.parentElement;
     div.style.display = "none";
   }
 }
 // Make Checked
 var list = document.querySelector('ul');
 list.addEventListener('click', function (ev) {
   if (ev.target.tagName === 'LI') {
     ev.target.classList.toggle('checked');
   }
 }, false);
 // New Item

 function newElement(){
   var li = document.createElement("li");
   var inputValue = document.getElementById("myInput").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("myUL").appendChild(li);
   }
   document.getElementById("myInput").value = "";

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   for (i = 0; i < close.length; i++) {
     close[i].onclick = function () {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }

   Vue.http.options.emulateJSON = true; // send as 

new Vue({
    el: '#myDIV',
    data: {
       title: inputValue,
       comment: "Im cool",
       alias: inputValue,
       competed: false
    },
    methods: {
      checkWebsite: function() {
        this.ajaxRequest = true;
        this.$http.post('http://demo8159500.mockable.io/post/check', {
              domain: this.domain
            }, function (data, status, request) {
                this.postResults = data;

                this.ajaxRequest = false;
            });
      }}
});

 }