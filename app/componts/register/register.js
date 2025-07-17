document.addEventListener("DOMContentLoaded", () => {

// URL base de la API 
const apiUrl = "http://localhost:3000/";

// Obtener referencias a los inputs del formulario
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");


// Botón para registrar al usuario
const signUp = document.querySelector("#signUp");

// Función que consulta todos los usuarios existentes en la API
async function search() {
    const res = await fetch(apiUrl + "users"); // Hacemos un GET a /user
    const response = await res.json();        // Convertimos la respuesta a JSON
    return response;                          // Devolvemos la lista de usuarios
}

// Función que maneja el registro de un nuevo usuario
async function addUser() {
    try {
        // Validar que ningún campo esté vacío
        if (
            nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            userNameInput.value.trim() === "" ||
            passwordInput.value.trim() === "" ||
            confirmInput.value.trim() === ""
        ) {
            alert("Por favor, completa todos los campos.");
            return; // Salimos de la función si falta algún dato
        }

        // Validar que la contraseña tenga al menos 6 caracteres
        if (password.value.trim().length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return; // No se envía el formulario si no cumple
        }

        if(passwordInput.value.trim() !== confirmInput.value.trim()){
            alert("Confirme la contraseña")
            return;
        }

        // Consultar los usuarios actuales para verificar si el correo ya está registrado
        const users = await search();

        // Usamos .some() para verificar si algún usuario ya tiene ese correo
        const emailExists = users.some(user => user.email === emailInput.value.trim());
        const userNameExists = users.some(user => user.userName === userNameInput.value.trim())
        if (emailExists) {
            alert("Correo ya registrado");
            return; // Si ya existe, no se continúa con el registro
        } 

        if (userNameExists){
            alert("Username ya registrado");
            return; // Si ya existe, no se continúa con el registro
        }

        // Si todo está bien, creamos el objeto del nuevo usuario
        const newUser = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            username: userNameInput.value.trim(),
            password: passwordInput.value.trim(),
            role: "visit"
        };

        // Enviamos el nuevo usuario al servidor con un POST
        const response = await fetch(apiUrl + "users", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, // Especificamos que el cuerpo es JSON
            body: JSON.stringify(newUser) // Convertimos el objeto a texto JSON
        });

        // Validamos si la respuesta del servidor fue exitosa
        if (!response.ok) throw new Error("Network error");

        window.location.href = "../login/login.html";

        // Si todo fue bien, mostramos un mensaje y limpiamos los campos
        alert("Registro guardado correctamente");

    } catch (error) {
        // Si ocurre un error en cualquier paso del try, se captura aquí
        console.error("Error al registrar:", error);
    }
}

// Evento que se dispara al hacer clic en el botón de registrar
signUp.addEventListener("click", (e) => {
    e.preventDefault(); // Prevenimos el envío automático del formulario
    addUser();          // Llamamos a la función que gestiona el registro
});

});