
export function CreateEvent(){


    const body = `<body class="bg-light">
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h3 class="mb-3">Create Event</h3>
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">Name</label>
          <input type="text" class="form-control" id="nameEvent" placeholder="Event name">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">description</label>
          <textarea class="form-control" id="description" rows="3"></textarea>
        <div class="mb-3">
          <label for="capacity" class="form-label">Capacity</label>
          <input type="number" class="form-control" id="capacity" placeholder="Capacity">
        </div>
        </div class="mb-3">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" min="${new Date().toISOString().split('T')[0]}">
        </div>
        <button type="button" class="btn btn-success" id="create" >Create</button>
      </form>
    </div>
  </div>
</body>`

    return body
}

export  function EventAdd() {
  

  const apiUrl = "http://localhost:3000/";

  const nameInput = document.getElementById("nameEvent");
  const descriptionInput = document.getElementById("description");
  const capacityInput = document.getElementById("capacity");
  const date = document.getElementById("date");



  document.getElementById("create").addEventListener("click", (e)=>{

    e.preventDefault()

      if (
            nameInput.value.trim() === "" ||
            descriptionInput.value.trim() === "" ||
            capacityInput.value.trim() === "" ||
            date.value.trim() === ""
        
        ) {
            alert("Por favor, completa todos los campos.");
            return; 
        }


    const newEvent = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            date : date.value.trim(),
            capacity: capacityInput.value.trim(),
            
        };

        // Enviamos el nuevo usuario al servidor con un POST
        const response = fetch(apiUrl + "events", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, // Especificamos que el cuerpo es JSON
            body: JSON.stringify(newEvent) // Convertimos el objeto a texto JSON
        });
        if (!response.ok) throw new Error("Network error");

        alert("Evento guardado exitosamente")
        
  });



};