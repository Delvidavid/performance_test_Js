
export  async function  FormEvent() {
  
    const apiUrl = "http://localhost:3000/";

    const res = await fetch(apiUrl + "events");
    const response = await res.json();
    
    const container = document.createElement("div")

    response.forEach( even => {
      
      const  card = document.createElement("div");

    card.innerHTML = `  <div class="d-flex">
    <div class="container-fluid p-4">
      <table class="table table-bordered mt-3">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${even.id}</td>
            <td>${even.name}</td>
            <td>${even.description}</td>
            <td>${even.date}</td>
            <td>${even.capacity}</td>

            <td>
              <button class="btn btn-sm btn-primary" >Edit</button>
              <button class="btn btn-sm btn-danger" data-id="${even.id}" >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`
  
  container.appendChild(card)

  });

  container.querySelectorAll("[data-id]").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      // Confirmación opcional
      const confirmDelete = confirm("¿Estás seguro de eliminar este evento?");
      if (!confirmDelete) return;

      try {
        const deleteRes = await fetch(`${apiUrl}events/${id}`, {
          method: "DELETE",
        });

        if (deleteRes.ok) {
          // Eliminar del DOM
          const row = button.closest(".event-card");
          row.remove();
          console.log(`Evento con ID ${id} eliminado.`);
        } else {
          console.error("No se pudo eliminar el evento en el servidor.");
        }
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
      }
    });
  });

    return container
}

