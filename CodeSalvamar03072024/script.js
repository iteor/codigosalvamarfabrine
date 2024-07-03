let informacoesConfirmadas = false;

document.getElementById('confirmarBtn').addEventListener('click', function() {
    if (this.textContent === 'CONFIRMAR INFORMAÇÕES') {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const hora = document.getElementById('hora').value;
        
        // Validação da matrícula
        if (!/^\d{6}$/.test(username)) {
            logToConsole('Matrícula inválida. Por favor, insira exatamente 6 dígitos numéricos.');
            return;
        }

        // Validação da senha
        if (!/^\d{6}$/.test(password)) {
            logToConsole('Senha inválida. Por favor, insira exatamente 6 dígitos numéricos.');
            return;
        }
        
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            logToConsole('Hora inválida. Por favor, insira um horário válido no formato HH:MM:SS.');
            return;
        }

        const checkboxes = document.querySelectorAll('input[name="location"]:checked');
        const selectedLocation = Array.from(checkboxes).map(checkbox => checkbox.value);

        if (selectedLocation.length === 0) {
            logToConsole('Por favor, selecione uma localização.');
            return;
        }

        logToConsole('Informações confirmadas:');
        logToConsole(`Matrícula: ${username}`);
        logToConsole(`Senha: ${password}`);
        logToConsole(`Hora: ${hora}`);
        logToConsole(`Localização Selecionada: ${selectedLocation[0]}`);

        document.getElementById('entrarBtn').disabled = false;
        this.textContent = 'CANCELAR';
        informacoesConfirmadas = true;
    } else {
        // Limpar todos os campos e o console
        document.getElementById('loginForm').reset();
        document.getElementById('console').innerHTML = '';
        console.clear();
        this.textContent = 'CONFIRMAR INFORMAÇÕES';
        document.getElementById('entrarBtn').disabled = true;
        informacoesConfirmadas = false;
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!informacoesConfirmadas) {
        logToConsole('Informações não confirmadas. Por favor, confirme as informações antes de entrar.');
        return;
    }
    logToConsole('Processando login...');
});

document.getElementById('username').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 6);
});

document.getElementById('password').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 6);
});

document.getElementById('hora').addEventListener('input', function() {
    let input = this.value.replace(/\D/g, '');
    if (input.length > 6) input = input.slice(0, 6);
    
    if (input.length >= 4) {
        input = input.slice(0, 2) + ':' + input.slice(2, 4) + ':' + input.slice(4);
    } else if (input.length > 2) {
        input = input.slice(0, 2) + ':' + input.slice(2);
    }

    this.value = input;
});

const checkboxes = document.querySelectorAll('input[name="location"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(box => {
            if (box !== checkbox) box.checked = false;
        });
    });
});

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

function logToConsole(message) {
    const console = document.getElementById('console');
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    console.appendChild(logEntry);
    console.scrollTop = console.scrollHeight;
}
