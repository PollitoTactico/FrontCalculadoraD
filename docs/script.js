const form = document.getElementById('calculadora-form');
const resultado = document.getElementById('resultado');
const modoOscuroBtn = document.getElementById('modo-oscuro');
const cambiarIdiomaBtn = document.getElementById('cambiar-idioma');

// Modo oscuro
modoOscuroBtn.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
});

// Cambiar idioma
cambiarIdiomaBtn.addEventListener('click', () => {
    const idioma = cambiarIdiomaBtn.textContent === "Cambiar Idioma" ? "en" : "es";

    if (idioma === "en") {
        cambiarIdiomaBtn.textContent = "Change Language";
        document.querySelector("h1").textContent = "Calculator";
        document.querySelector("label[for='num1']").textContent = "Number 1:";
        document.querySelector("label[for='num2']").textContent = "Number 2:";
        document.querySelector("label[for='operacion']").textContent = "Operation:";
        form.querySelector("button").textContent = "Calculate";
    } else {
        cambiarIdiomaBtn.textContent = "Cambiar Idioma";
        document.querySelector("h1").textContent = "Calculadora";
        document.querySelector("label[for='num1']").textContent = "Número 1:";
        document.querySelector("label[for='num2']").textContent = "Número 2:";
        document.querySelector("label[for='operacion']").textContent = "Operación:";
        form.querySelector("button").textContent = "Calcular";
    }
});

// Calcular
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacion = document.getElementById('operacion').value;

    try {
        const response = await fetch('https://backendcalculadorad-production.up.railway.app/api/calcular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1, num2, operacion })
        });

        const data = await response.json();

        if (response.ok) {
            resultado.textContent = `Resultado: ${data.resultado}`;
        } else {
            resultado.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultado.textContent = 'Error de conexión con el servidor.';
    }
});
