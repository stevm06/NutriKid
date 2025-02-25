function register(event) {
    event.preventDefault(); // Evita recargar la página

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Obtener usuarios de localStorage o inicializar un array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    let userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("El usuario ya existe. Prueba con otro nombre.");
        return;
    }

    // Guardar el nuevo usuario en localStorage
    users.push({ username, password }); // ⚠️ La contraseña debería cifrarse en un proyecto real
    localStorage.setItem("users", JSON.stringify(users));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html"; // Redirige al login
}
