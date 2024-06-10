

var nameInput=document.getElementById("nameInput");
var emailInput=document.getElementById("emailInput");
var passwordInput=document.getElementById("passwordInput");
var rePasswordInput=document.getElementById("rePasswordInput");
var signUpBtn=document.getElementById("signUpBtn");
var signInBtn=document.getElementById("signInBtn");
var nameMsg=document.getElementById("nameMsg")
var emailMsg= document.getElementById("emailMsg")
var passMsg=document.getElementById("passMsg")
var repass=document.getElementById("repass")
var signupAnchor=document.getElementById("signupAnchor")
var signinAnchor=document.getElementById("signinAnchor")
var logOut=document.getElementById("logOut")
var greeting=document.querySelector(".greeting h1")


var arrData=[]
if(localStorage.getItem("data")!==null){
    arrData =JSON.parse(localStorage.getItem("data"))
}

if(signUpBtn){
    signUpBtn.addEventListener("click", function(){
        addData()
        })
}

if(signInBtn){
    signInBtn.addEventListener("click",function(){
        getLogIn()
    })
    
}

if (signupAnchor) {
    signupAnchor.addEventListener("click", function(){
        window.location.href="index.html"
       
    })
    
}

if(signinAnchor){
    signinAnchor.addEventListener("click", function(){
        window.location.href="login.html"
        
    })
}

if(logOut){
    logOut.addEventListener("click",function(){
        window.location.href="login.html";
        localStorage.removeItem("userName")

    })
}


function addData(){
    var data={
        name: nameInput.value.toLowerCase(),
        email: emailInput.value,
        password: passwordInput.value,
        rePassword: rePasswordInput.value 

    }  
    // getValidation()
   var validateName= regexData()
   if (existEmail() == true) {
    document.getElementById("duplicatedEmail").classList.replace("d-none","d-block")
   }
    if(validateName==true && existEmail() == false){
        arrData.push(data)
        localStorage.setItem("data", JSON.stringify(arrData))
           
        clearData()
        window.location.href="login.html"

    }
    
  
getValidation()
}

function clearData(){
    nameInput.value =null;
    emailInput.value =null;
    passwordInput.value =null;
    rePasswordInput.value =null;
}

function regexData(){
   var status=true
  var  regexName=/^[a-z]{3,}[0-9_]{0,3}$/i;
   var regexEmail=/^[a-z]{3,}[!@#\$%\^\&*\)\(+=._-]{1,5}[a-z]{3,}(@gmail)(\.com|\.org)$/i;
   var  regexPass=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/ ;

   if(regexName.test(nameInput.value)==false){
    nameMsg.classList.remove("d-none")
    nameMsg.classList.add("d-block")
    status=false;
   }
   
   if(regexEmail.test(emailInput.value)==false){
    emailMsg.classList.remove("d-none")
    emailMsg.classList.add("d-block")
    status=false;
   }
   if(regexPass.test(passwordInput.value)==false){
    passMsg.classList.remove("d-none")
    passMsg.classList.add("d-block")
   
   }
   passAndRepass()
  
  return status
}

function passAndRepass(){
 
    if(rePasswordInput.value!==passwordInput.value){

        repass.classList.replace("d-none","d-block")
      
    }
}



function getLogIn(){
    var email= emailInput.value;
    var pass=passwordInput.value;

    for(var i=0; i<arrData.length; i++){
        
        if (email==arrData[i].email && pass==arrData[i].password){
            window.location.href="home.html"
            localStorage.setItem("userName",arrData[i].name)   
        }
   
        if(pass!==arrData[i].password){
            passMsg.classList.replace("d-none","d-block");
          console.log(passMsg)
           
          } 
        if(email!=arrData[i].email ){
            emailMsg.classList.replace("d-none","d-block");
            console.log(emailMsg)
        
          }
    }
  
    
  
} 


if(greeting){
    var userName=localStorage.getItem("userName");
    greeting.innerHTML= `welcome ${userName}`
}


function getValidation(){

if(nameInput.value=="" || emailInput.value== "" ||passwordInput.value== "" ||rePasswordInput.value== ""){
    document.getElementById("validateMsg").classList.replace("d-none","d-block");
    nameMsg.classList.replace("d-block","d-none");
        emailMsg.classList.replace("d-block","d-none");
        passMsg.classList.replace("d-block","d-none")

}

}


function existEmail(){
    let status = false
    var existEmail1= emailInput.value;
    for (var i=0; i<arrData.length;i++){
        if(existEmail1==arrData[i].email){
        
            status = true
        }
    }
    return status
}