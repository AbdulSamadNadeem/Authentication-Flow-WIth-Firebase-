import {auth ,db, signOut , getDocs ,collection,onAuthStateChanged ,doc, deleteDoc , getDoc  } from '../firebase.js'
let signoutbtn = document.querySelector('.btn')
let infoTable = document.querySelector('.infoTable')
let editInpu = document.querySelectorAll('.inputs input')
const [name , email , DOB] = editInpu
let loader = document.querySelector('.loader')
let loader2 = document.querySelector('.loader2')
name.style.display='none'
email.style.display='none'
DOB.style.display='none'
loader.style.display = 'block'
loader2.style.display = 'none'
function redirectToDashboardIfNotAuthenticated(){
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href='../dashbaord/dashboard.html'
    } 
  })
}
window.addEventListener('popstate', (event) => {
  redirectToDashboardIfNotAuthenticated();
});
const Retrivedata = async()=>{
  const querySnapshot = await getDocs(collection(db, "UserCredentials"));
  if(querySnapshot.empty){
    loader2.style.display = 'block'
  }
  loader.style.display='none'
querySnapshot.forEach((doc) => {
  const data = doc.data()
  infoTable.innerHTML +=`<table>
  <tr>
    <th class="userth">UserName</th>
    <th class="useremail">Email</th>
    <th class="userdob">DOB</th>
    <th class="editbtn" onclick="editDoc('${doc.id}',this)"><button>Edit</button></th>
  </tr>
  <tr>
    <td class="userth">${data.UserName}</td>
    <td class="useremail">${data.Email}</td>
    <td class="userdob">${data.Dob}</td>
    <th class="delbtn" onclick="deleteData('${doc.id}')"><button>Delete</button></th>
  </tr>
</table>`
  console.log(`${doc.id}`);
  console.log(doc);
  console.log("DocumentData :" + JSON.stringify(doc.data()));
});

}
Retrivedata()

const Signout = ()=>{
    signOut(auth).then(() => {
        window.location.href='../index.html'
      }).catch((error) => {
        console.log(error)
      });
}

signoutbtn.addEventListener('click' , Signout)

window.editDoc=async(id,btn)=>{
  name.style.display='block'
  email.style.display='block'
  DOB.style.display='block'
  infoTable.innerHTML=''
  loader.style.display = 'block'
  try{
    await getDoc(doc(db, "UserCredentials", id));
    Retrivedata()
  }
  catch(error){
    console.log(error)
  }
}



window.deleteData=async(id)=>{
  infoTable.innerHTML=''
  loader.style.display = 'block'
  try{
    await deleteDoc(doc(db, "UserCredentials", id));
    Retrivedata()
  }
  catch(error){
    console.log(error)
  }
}
