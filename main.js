// carga html
document.addEventListener("DOMContentLoaded", () => {
    
    const btnComenzar = document.getElementById("btnComenzar");
    const inputNombre = document.getElementById("nombreUsuario");

    // Lógica al comenzar
    btnComenzar.addEventListener("click", () => {
        sessionStorage.clear(); 
        const nombre = inputNombre.value.trim(); 
        
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre para continuar.");
            return;
        }

        // Guardamos el nombre en el navegador
        sessionStorage.setItem("jugadorNombre", nombre);
        
        // Redirigir página del simulador
        window.location.href = "simulador.html"; 
    });
});