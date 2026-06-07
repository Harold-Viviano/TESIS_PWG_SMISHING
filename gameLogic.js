document.addEventListener("DOMContentLoaded", () => {
    const nombre = sessionStorage.getItem("jugadorNombre") || "Jugador";
    const saludoJugador = document.getElementById("saludoJugador");
    const progresoTexto = document.getElementById("progresoTexto");
    const marcadorPuntos = document.getElementById("marcadorPuntos");
    const escenarioTexto = document.getElementById("escenarioTexto");
    const smsTexto = document.getElementById("smsTexto");
    const btnSeguro = document.getElementById("btnSeguro");
    const btnEstafa = document.getElementById("btnEstafa");
    const feedbackDiv = document.getElementById("feedback");
    const btnSiguiente = document.getElementById("btnSiguiente");

    // Los 10 escenarios mezclados
    const escenarios = [
        {
            contexto: "Escenario: Recibes este mensaje de tu banco.",
            sms: "Banco Alerta: Estimado cliente, su cuenta ha sido bloqueada por seguridad. Verifique sus datos en las próximas 24 horas aquí: http://banc0-alerta.com",
            esEstafa: true,
            feedbackBien: "¡Identificaste la amenaza! Los bancos nunca envían enlaces por SMS amenazando con bloquear tu cuenta.",
            feedbackMal: "¡Cuidado! Marcaste como seguro un mensaje peligroso. Los estafadores usan la urgencia para que hagas clic sin pensar."
        },
        {
            contexto: "Escenario: Recordatorio de tu centro de salud.",
            sms: "EsSalud/Clínica: Le recordamos su cita médica de cardiología para el día de mañana a las 10:00 AM. Por favor llegar 15 minutos antes.",
            esEstafa: false,
            feedbackBien: "¡Excelente! Evaluaste correctamente que es un mensaje seguro. Las instituciones de salud envían recordatorios informativos sin pedir clics en enlaces extraños.",
            feedbackMal: "¡Falsa Alarma! Te asustaste y marcaste como estafa un mensaje real. Si el mensaje solo informa y no te pide hacer clic en enlaces sospechosos, suele ser seguro."
        },
        {
            contexto: "Escenario: Te llega un mensaje sobre un premio inesperado.",
            sms: "¡Felicidades! Tu número ha sido premiado con S/ 5,000 en el sorteo de aniversario. Reclama tu dinero entrando a este enlace: http://premio-peru.net",
            esEstafa: true,
            feedbackBien: "¡Desconfiaste a tiempo! Si una oferta parece demasiado buena para ser verdad o te dan premios de la nada, es una estafa.",
            feedbackMal: "¡Cuidado! Clasificaste como seguro un intento de robo. Los estafadores ofrecen dinero gratis para robar tu información."
        },
        {
            contexto: "Escenario: Un supuesto familiar te escribe desde un número desconocido.",
            sms: "Hola, perdí mi celular y estoy usando un número prestado. Tuve un accidente y necesito pagar la grúa urgente, deposítame a este enlace...",
            esEstafa: true,
            feedbackBien: "¡Perfecto! Esta es la estafa del 'familiar en apuros'. Siempre debes llamar al número original de tu familiar para verificar.",
            feedbackMal: "¡Cuidado! Marcaste como seguro un engaño. Los delincuentes inventan emergencias para que envíes dinero por desesperación."
        },
        {
            contexto: "Escenario: Aviso de tu operadora de telefonía.",
            sms: "Movistar/Claro: Tu ciclo de facturación ha cerrado. Tu saldo actual es de S/ 15.00 y vence el 30 del presente mes. Gracias por tu preferencia.",
            esEstafa: false,
            feedbackBien: "¡Muy bien! Identificaste un mensaje seguro y puramente informativo de tu operadora celular.",
            feedbackMal: "¡Falsa Alarma! Clasificaste un mensaje seguro como estafa. Recuerda leer con calma: aquí no hay enlaces engañosos ni amenazas."
        },
        {
            contexto: "Escenario: Supuesto problema con la entrega de un paquete.",
            sms: "Servicio Postal UPS: Su paquete no pudo ser entregado por falta de pago de impuestos. Pague S/ 5.00 ahora para liberar su envío aquí: http://correo-pagos.com",
            esEstafa: true,
            feedbackBien: "¡Excelente observación! Las empresas de mensajería nunca te pedirán pagos de impuestos mediante enlaces informales.",
            feedbackMal: "¡Cuidado! Consideraste seguro un mensaje falso. Usan la curiosidad sobre paquetes para que ingreses tu tarjeta en sus enlaces."
        },
        {
            contexto: "Escenario: Recibes un mensaje de una institución del Estado.",
            sms: "Minsterio de Salvd: Tienes un bono pendiente para cobrar hoy. Registrate aki para recibirlo: http://minsa-bonos-peru.com",
            esEstafa: true,
            feedbackBien: "¡Ojo de halcón! Notaste los errores ortográficos y sabes que las webs oficiales del gobierno terminan en '.gob.pe'.",
            feedbackMal: "¡Cuidado! Las instituciones formales no envían mensajes con mala ortografía (como 'Minsterio'). Además, era un enlace falso."
        },
        {
            contexto: "Escenario: Alerta de seguridad en tu celular.",
            sms: "Soporte Técnico: Se ha detectado actividad inusual en su cuenta. Inicie sesión inmediatamente para proteger su información personal: http://seguridad-movil.net",
            esEstafa: true,
            feedbackBien: "¡Muy bien! Los servicios reales no envían enlaces por SMS pidiendo que inicies sesión. Te has protegido.",
            feedbackMal: "¡Cuidado! Creíste que era seguro porque fingía protegerte, pero en realidad buscaba robar tus contraseñas con un enlace falso."
        },
        {
            contexto: "Escenario: Recibes un mensaje de un supuesto familiar en apuros.",
            sms: "Hola papá, mi celular se malogró y este es mi nuevo número. Estoy en una emergencia en la clínica y necesito que me deposites 500 soles urgente a esta cuenta.",
            esEstafa: true,
            feedbackBien: "¡Excelente decisión! Reconociste esta trampa común. Sabes que ante cualquier emergencia, lo mejor es mantener la calma y llamar directamente al número conocido de tu familiar para verificar.",
            feedbackMal: "¡Cuidado! Los estafadores se hacen pasar por familiares y usan el sentido de urgencia para exigir dinero rápido. Nunca deposites dinero sin antes llamar a tu familiar a su número original."
        },
        {
            contexto: "Escenario: Recibes una notificación de un supuesto gran premio.",
            sms: "¡Felicidades! Tu número ha sido el ganador de una camioneta 0KM y 50,000 soles. Haz clic aquí para reclamar tu premio y pagar los gastos administrativos: http://premio-seguro.com",
            esEstafa: true,
            feedbackBien: "¡Excelente instinto! Te diste cuenta de que las instituciones reales no regalan autos por SMS, y mucho menos piden que pagues dinero por adelantado para entregarte un premio.",
            feedbackMal: "¡Cuidado! Esta táctica explota la promesa de dinero fácil haciéndote creer que ganaste un sorteo en el que nunca participaste. Las empresas formales nunca te cobrarán gastos administrativos por SMS."
        }

    ];

    let preguntaActual = 0;
    let puntajeTotal = 0;
    let correctasTotal = 0;

    function cargarEscenario(indice) {
        btnSeguro.style.display = "block";
        btnEstafa.style.display = "block";
        feedbackDiv.classList.add("oculto");
        btnSiguiente.classList.add("oculto");

        saludoJugador.innerText = `Analiza esto, ${nombre} 🔍`;
        progresoTexto.innerText = `Escenario ${indice + 1} de ${escenarios.length} 🧭`;
        marcadorPuntos.innerText = `🏅 Puntos: ${puntajeTotal}`;
        escenarioTexto.innerText = escenarios[indice].contexto;
        smsTexto.innerHTML = `<strong>Mensaje:</strong> <br><br> ${escenarios[indice].sms}`;
    }

    // Evaluar  la elección del usuario
    function evaluarRespuesta(eleccionEstafa) {
        btnSeguro.style.display = "none";
        btnEstafa.style.display = "none";

        const escenario = escenarios[preguntaActual];
        const esCorrecta = (eleccionEstafa === escenario.esEstafa);
        const numeroPregunta = preguntaActual + 1; //array en 0


        if (esCorrecta) {
            sessionStorage.setItem(`pregunta_${numeroPregunta}`, "true"); 
            feedbackDiv.innerHTML = `
                <div class="feedback-contenedor">
                    <span class="feedback-icono">🌟</span>
                    <div class="feedback-titulo">¡Excelente decisión!</div>
                    <div class="feedback-texto"><strong>Recuerda:</strong> ${escenario.feedbackBien}</div>
                </div>
            `;
            puntajeTotal += 20; 
            correctasTotal += 1;
        } else {
            sessionStorage.setItem(`pregunta_${numeroPregunta}`, "false"); 

            feedbackDiv.innerHTML = `
                <div class="feedback-contenedor">
                    <span class="feedback-icono">❌</span>
                    <div class="feedback-titulo">¡Incorrecto!</div>
                    <div class="feedback-texto"><strong>Cuidado:</strong> ${escenario.feedbackMal}</div>
                </div>
            `;
        }
        
        marcadorPuntos.innerText = `Puntos: ${puntajeTotal}`;
        feedbackDiv.classList.remove("oculto");
        
        if (preguntaActual < escenarios.length - 1) {
            btnSiguiente.innerText = "Siguiente Escenario";
        } else {
            btnSiguiente.innerText = "Finalizar y ver resultados";
        }
        btnSiguiente.classList.remove("oculto");
    }

    // Eventos: le pasamos false si elige seguro, true si elige estafa
    btnSeguro.addEventListener("click", () => evaluarRespuesta(false));
    btnEstafa.addEventListener("click", () => evaluarRespuesta(true));

    btnSiguiente.addEventListener("click", async () => {
        if (preguntaActual < escenarios.length - 1) {
            preguntaActual++; 
            cargarEscenario(preguntaActual);
        } else {
            btnSiguiente.innerText = "Guardando de forma segura...";
            btnSiguiente.disabled = true;
            await guardarResultados(nombre, puntajeTotal, correctasTotal);
        }
    });

    function guardarResultados(nombreJugador, puntaje, correctas) {
    sessionStorage.setItem("correctas", correctas);
    sessionStorage.setItem("totalPreguntas", escenarios.length);
    window.location.href = "resultados.html"; 
    }

    cargarEscenario(preguntaActual);
});