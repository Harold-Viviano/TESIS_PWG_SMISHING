import { supabase } from './supabaseClient.js'; 
document.addEventListener("DOMContentLoaded", async () => {
    // recuperar datos de la sesión
    const nombre = sessionStorage.getItem("jugadorNombre") || "Jugador";
    const correctas = parseInt(sessionStorage.getItem("correctas")) || 0;
    const total = parseInt(sessionStorage.getItem("totalPreguntas")) || 6;
    const puntaje = correctas * 20;

    const iconoInsignia = document.getElementById("iconoInsignia");
    const tituloInsignia = document.getElementById("tituloInsignia");
    const resumenPuntaje = document.getElementById("resumenPuntaje");
    const mensajeFinal = document.getElementById("mensajeFinal");
    const btnReiniciar = document.getElementById("btnReiniciar");
    

    //resumen numérico
    resumenPuntaje.innerHTML = `Acertaste <strong>${correctas} de ${total}</strong> escenarios.<br>Tu puntaje final es: <strong>${puntaje} puntos</strong>.`;

    // Asignación de insignias sustentado en niveles para evitar ansiedaddel AM
    if (correctas >= 7) {
        iconoInsignia.innerText = "🥇";
        tituloInsignia.innerText = "Insignia de Oro: Ciudadano Experto";
        mensajeFinal.innerHTML = `¡Excelente trabajo, <strong>${nombre}</strong>! Tienes un ojo de halcón para detectar estafas. Has demostrado un dominio total y tu celular está más seguro que nunca. ¡Sigue así y comparte tus conocimientos con la familia!`;
    } else if (correctas >= 4) {
        iconoInsignia.innerText = "🥈";
        tituloInsignia.innerText = "Insignia de Plata: Ciudadano Precavido";
        mensajeFinal.innerHTML = `¡Muy bien, <strong>${nombre}</strong>! Has detectado la mayoría de las estafas y tienes buenos reflejos. Solo recuerda leer los mensajes y revisar los enlaces con un poquito más de calma antes de decidir. ¡Estás por muy buen camino!`;
    } else {
        iconoInsignia.innerText = "🥉";
        tituloInsignia.innerText = "Insignia de Bronce: Ciudadano en Aprendizaje";
        mensajeFinal.innerHTML = `¡Buen esfuerzo, <strong>${nombre}</strong>! Identificar estos mensajes toma algo de práctica, y hoy has dado un gran primer paso. Recuerda la regla de oro: ante la duda, nunca hagas clic y pregúntale a un familiar de confianza. ¡Sigue entrenando para volverte un experto!`;
    }

    // Botón para volver a empezar (mantiene los datos ya guardados en Supabase)
    btnReiniciar.addEventListener("click", () => {
        sessionStorage.clear(); 
        window.location.href = "index.html"; 
    });

try {
        const { data, error } = await supabase
          .from('resultados_smishing')
          .insert([
            {
              nombre_jugador: nombre,
              puntaje: puntaje,
              decisiones_correctas: correctas,
              completado: true,
              pregunta_1: sessionStorage.getItem("pregunta_1") === "true",
              pregunta_2: sessionStorage.getItem("pregunta_2") === "true",
              pregunta_3: sessionStorage.getItem("pregunta_3") === "true",
              pregunta_4: sessionStorage.getItem("pregunta_4") === "true",
              pregunta_5: sessionStorage.getItem("pregunta_5") === "true",
              pregunta_6: sessionStorage.getItem("pregunta_6") === "true",
              pregunta_7: sessionStorage.getItem("pregunta_7") === "true",
              pregunta_8: sessionStorage.getItem("pregunta_8") === "true",
              pregunta_9: sessionStorage.getItem("pregunta_9") === "true",
              pregunta_10: sessionStorage.getItem("pregunta_10") === "true"
            }
          ]);

        if (error) throw error;
        console.log("¡Datos exactos guardados en Supabase");
    } catch (error) {
        console.error("Error guardando en Supabase:", error);
    }
});
