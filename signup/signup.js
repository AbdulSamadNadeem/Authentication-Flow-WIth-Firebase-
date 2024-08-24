import {db, auth , createUserWithEmailAndPassword , onAuthStateChanged , collection, addDoc} from '../firebase.js'
let formfield = document.querySelectorAll('.form input')
let btn = document.getElementById('btn')
const [username,email, password , dob] = formfield
let loader= document.querySelector('.loader')
let loader2= document.querySelector('.loader2')
let form= document.querySelector('.main')
loader.style.display = 'none'
loader2.style.display = 'none'
const signUp= ()=>{
  event.preventDefault()
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    form.style.display = 'none'
    loader.style.display = 'block'
    loader2.style.display = 'block'
    console.log(user)
    Database()

  })
  .catch((error) => {
    const errorMessage = error.message;
    showError(error)
    Toastify({
        text:errorMessage,
       duration: 3000   
       }).showToast();
      })

  
}
function Database(){
  addDoc(collection(db, "UserCredentials"), {
  UserName:username.value,
  Email:email.value,
  Dob:dob.value
        
})
.then((docRef)=>{
  console.log(docRef)
  stateChange()

})
.catch((e)=>{
  Toastify({
  text:e,
  duration: 3000   
  }).showToast();

}); 
setTimeout(()=>{
  username.value=''
email.value=''
password.value=''
dob.value=''
},3000)


};

btn.addEventListener('click' , signUp)
function showError(error){
    if(error){
      if(username.value ===''){
        username.style.border = '1px solid red'
        setTimeout(()=>{
         username.style.border = '1px solid #8692A6'
         },3000)
      }
      if(email.value ===''){
        email.style.border = '1px solid red'
        setTimeout(()=>{
         email.style.border = '1px solid #8692A6'
         },3000)
      }
      if(password.value ===''){
        password.style.border = '1px solid red'
        setTimeout(()=>{
         password.style.border = '1px solid #8692A6'
         },3000)
      }
      if(dob.value ===''){
        dob.style.border = '1px solid red'
        setTimeout(()=>{
         dob.style.border = '1px solid #8692A6'
         },3000)
      }
      
    }
  }

function stateChange(){
  onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href='../dashbaord/dashboard.html'
      } 
    });
}

