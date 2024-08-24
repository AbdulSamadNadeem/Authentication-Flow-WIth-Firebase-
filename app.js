import {auth , signInWithEmailAndPassword , onAuthStateChanged , sendPasswordResetEmail  } from '../firebase.js'
let formfield = document.querySelectorAll('.form input')
let btn = document.getElementById('loginbtn')
let form= document.querySelector('.main')
let loader= document.querySelector('.loader')
loader.style.display = 'none'
const [email , password] = formfield
console.log(email,password)

const login = ()=>{
 
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    const user = userCredential.user;
    form.style.display = 'none' 
    loader.style.display = 'block'
    console.log(user)
      })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
      showError(error)
       Toastify({
          text:errorMessage,
         duration: 3000   
         }).showToast();

        });
    
    email.value=''
    password.value=''
}

function showError(error){
  if(error){
   email.style.border = '1px solid red'
   password.style.border = '1px solid red'
   setTimeout(()=>{
    email.style.border = '1px solid #8692A6'
    password.style.border = '1px solid #8692A6'
    },3000)
  }
}

btn.addEventListener('click' , login)

function stateChange(){
  onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href='../dashbaord/dashboard.html'
      } 
    });
}
setTimeout(()=>{
  stateChange()
},1000)

function ResetPassword(){
  sendPasswordResetEmail(auth, email.value)
  .then(() => {
    Toastify({
      text:'Password reset email sent',
      duration: 3000   
      }).showToast();
  })
  .catch((error) => {
    const errorMessage = error.message;
    Toastify({
      text:errorMessage,
      duration: 3000   
      }).showToast();
  
  });

  email.value=''
    password.value=''
}
document.getElementById('fpass').addEventListener('click' , ResetPassword)