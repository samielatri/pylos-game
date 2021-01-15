var logOut = document.getElementById("logout");

logout.addEventListener("click", async function (e) {
    await ajax.get('/logout', {},
    function(response){
      alert('You are disconnected');
      document.location.href="/index";
    },
  function(err){
    alert('You cannot disconnect');
    console.log(err);
  });
  });
