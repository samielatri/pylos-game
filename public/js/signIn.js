var form = document.querySelector("form");
var submit = document.getElementById("submit");
console.log("Number of things to enter : " + form.elements.length);
console.log(form.elements[0].name); 

form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();
  for(var i=0; i<form.elements.length;i++){
    if(!(form.elements[6].value == form.elements[7].value)){alert('Passwords does not match!!!');
  return;}
    if(form.elements[i].value==""){alert("Please complete the form");return ;}
  }
  submit.type = "button";
    console.log(form.elements);
    var firstName = form.elements.firstName.value;
    var lastName = form.elements.lastName.value;
    var nickname = form.elements.nickname.value;
    var password = form.elements.password1.value;
    var mail = form.elements.mail.value;
    var day = form.elements.day.value;
    var month = form.elements.month.value;
    ajax.post('/createUser',
    {firstName,lastName,nickname,password,mail,day,month},
    function(response){
      document.location.href="/confirmedRegistration";
    },
    function(){
      alert('error');
    }
  )
});
