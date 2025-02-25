// Simular usuarios en LocalStorage (se ejecuta solo la primera vez)
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
        { user: "admin", password: "123456" }  // Usuario de prueba
    ]));
}

function login(event) {
    event.preventDefault(); // Evita que la página se recargue

    const username = document.querySelector('input[name="user"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    // Obtener los usuarios almacenados en localStorage
    let users = JSON.parse(localStorage.getItem("users")) || []; // Evita que users sea null

    // Verificar si el usuario existe
    const userFound = users.find(u => u.username === username && u.password === password);

    if (userFound) {
        localStorage.setItem("loggedUser", username);
        window.location.href = "index.html"; // Redirigir a la página principal
    } else {
        let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
    }
}


// Proteger páginas
function protectPage() {
    if (!localStorage.getItem("loggedUser")) {
        window.location.href = "login.html";
    }
}

// Cerrar Cesion
function logout() {
    console.log("Cerrando sesión..."); // Para depuración
    localStorage.removeItem("loggedUser"); // Eliminar usuario almacenado
    window.location.href = "login.html"; // Redirigir al login
}