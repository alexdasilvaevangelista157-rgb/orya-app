function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "" || password === ""){
    alert("Fill in all fields");
    return;
  }

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app-screen").style.display = "block";

}

function register(){
  alert("Registration system coming soon.");
}
