        // Lógica interactiva para cambiar el mapa de forma dinámica
        function actualizarMapa(gymKey) {
            const iframeMapa = document.getElementById('mapa-gimnasios');
            const btnSmartFit = document.getElementById('btn-smartfit');
            const btnEnergy = document.getElementById('btn-energy');
            
            // Remover las clases activas previas
            btnSmartFit.classList.remove('tarjeta-gimnasio-activa');
            btnEnergy.classList.remove('tarjeta-gimnasio-activa');
            
            // Direcciones específicas para cada gimnasio en Cancún
            let nuevaRutaMapa = "";
            
            if (gymKey === 'smartfit') {
                // Ubicación exacta de Smart Fit Urban Center Cancún (Av. Acanceh)
                nuevaRutaMapa = "https://maps.google.com/maps?q=Smart%20Fit%20Urban%20Center%20Cancun&t=&z=16&ie=UTF8&iwloc=&output=embed";
                btnSmartFit.classList.add('tarjeta-gimnasio-activa');
            } else if (gymKey === 'energy') {
                // Ubicación exacta de Energy Fitness Cancún (Centro de Cancún)
                nuevaRutaMapa = "https://maps.google.com/maps?q=Energy%20Fitness%20Cancun&t=&z=16&ie=UTF8&iwloc=&output=embed";
                btnEnergy.classList.add('tarjeta-gimnasio-activa');
            }
            
            // Aplicar la nueva dirección al iframe con un efecto de carga suave
            iframeMapa.style.opacity = 0.3;
            setTimeout(() => {
                iframeMapa.src = nuevaRutaMapa;
                iframeMapa.onload = () => {
                    iframeMapa.style.transition = "opacity 0.4s ease";
                    iframeMapa.style.opacity = 1;
                };
            }, 100);
        }

        function calcularIMC() {
            const inputPeso = document.getElementById('inputPeso').value;
            const inputAltura = document.getElementById('inputAltura').value;
            const divResultado = document.getElementById('resultado-imc');

            // Validar que se ingresen datos
            if (!inputPeso || !inputAltura) {
                divResultado.innerHTML = `
                    <i class="fa-solid fa-triangle-exclamation display-3 text-secondary mb-3 d-block opacity-75"></i>
                    <p class="text-white fw-bold text-uppercase letras-separadas mb-1">Faltan datos</p>
                    <p class="texto-gris-suave small mt-0">Por favor ingresa peso y altura.</p>`;
                return;
            }

            const peso = parseFloat(inputPeso);
            const alturaCm = parseFloat(inputAltura);
            const alturaMts = alturaCm / 100;

            // Calcular IMC
            const imc = (peso / (alturaMts * alturaMts)).toFixed(1);

            let categoria = "";
            let textColor = "text-white"; 

            // Determinar categoría
            if (imc < 18.5) {
                categoria = "Bajo peso";
            } else if (imc >= 18.5 && imc < 24.9) {
                categoria = "Peso saludable";
            } else if (imc >= 25 && imc < 29.9) {
                categoria = "Sobrepeso";
                textColor = "text-neutral-400";
            } else {
                categoria = "Obesidad";
                textColor = "text-secondary";
            }

            // Mostrar el resultado con animación (opacidad)
            divResultado.style.opacity = 0;
            setTimeout(() => {
                divResultado.innerHTML = `
                    <p class="texto-gris-suave text-uppercase letras-separadas small mb-2">Tu Índice de Masa Corporal</p>
                    <p class="display-1 fw-bolder text-white mb-4 letras-juntas">${imc}</p>
                    <div class="d-inline-block border border-secondary px-4 py-2 rounded-pill">
                        <p class="small fw-bold ${textColor} text-uppercase letras-separadas mb-0">${categoria}</p>
                    </div>
                `;
                divResultado.style.transition = "opacity 0.5s ease";
                divResultado.style.opacity = 1;
            }, 150);
        }