
import { CreateEvent, EventAdd } from '../componts/createEvent.js';
import { FormEvent } from '../componts/event.js';
import { router } from '../router/router.js';
import { requireAuth, logout } from './auth.js';


document.addEventListener("DOMContentLoaded",()=>{

    const user = requireAuth();


document.getElementById("welcome").textContent = `${user.role}`;
document.getElementById("name").textContent = `${user.name}`;
document.getElementById("logout").addEventListener("click", logout);
const main = document.querySelector("#containerEvents")

document.getElementById("eventButton").addEventListener("click", async (event)=>{
    
    event.preventDefault();

    const ref = event.currentTarget.getAttribute("href");
    const patch = ref.replace("#","/")
    
    //main.innerHTML = router[patch]();
    
    main.innerHTML="";

    const content = await router[patch]()
    main.appendChild(content)

});


document.getElementById("add").addEventListener("click",(e)=>{
    e.preventDefault()
    main.innerHTML= CreateEvent()
    EventAdd()
});

});







