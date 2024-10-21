// Variables simuladas para el estado del cajero
let balance = 1000;
let transactions = [];
let loggedIn = false;

// Función para manejar el inicio de sesión con PIN
function login() {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") {  // Simulación de PIN correcto
        loggedIn = true;
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('action-screen').classList.add('active');
        document.getElementById('account-info').innerText = "Entrenador Pokémon - Cuenta #001";
    } else {
        alert("PIN incorrecto. Inténtelo de nuevo.");
    }
}

// Funciones de transacciones
function makeTransaction(type) {
    let amount = prompt(`Ingrese el monto para ${type === 'deposit' ? 'depositar' : 'retirar'}:`);
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        alert("Monto inválido.");
        return;
    }
    if (type === 'withdraw' && amount > balance) {
        alert("Fondos insuficientes.");
        return;
    }

    if (type === 'deposit') balance += amount;
    if (type === 'withdraw') balance -= amount;

    transactions.push({ type, amount, date: new Date().toLocaleString() });
    alert(`Transacción realizada. Tu saldo actual es: $${balance.toFixed(2)}`);
}

// Función para consultar saldo
function checkBalance() {
    alert(`Tu saldo actual es: $${balance.toFixed(2)}`);
}

// Función para pagar servicios
function payServices() {
    let service = prompt("Seleccione el servicio a pagar (Ej. Electricidad, Internet):");
    let amount = parseFloat(prompt("Ingrese el monto a pagar:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Monto inválido.");
        return;
    }
    if (amount > balance) {
        alert("Fondos insuficientes.");
        return;
    }
    balance -= amount;
    transactions.push({ type: `Pago de ${service}`, amount, date: new Date().toLocaleString() });
    alert(`Pago de ${service} realizado. Tu saldo actual es: $${balance.toFixed(2)}`);
}

// Función para cerrar sesión
function logout() {
    loggedIn = false;
    document.getElementById('action-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
}

// Función para mostrar el historial de transacciones
function viewHistory() {
    const historyList = document.getElementById('transaction-history');
    historyList.innerHTML = '';  // Limpiar la lista
    transactions.forEach((transaction) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.date} - ${transaction.type} - $${transaction.amount.toFixed(2)}`;
        historyList.appendChild(listItem);
    });
    document.getElementById('action-screen').classList.remove('active');
    document.getElementById('history-screen').classList.add('active');
}

// Función para regresar a la pantalla de acciones
function goBack() {
    document.getElementById('history-screen').classList.remove('active');
    document.getElementById('graph-screen').classList.remove('active');
    document.getElementById('action-screen').classList.add('active');
}

// Función para visualizar la gráfica de transacciones
function viewGraph() {
    document.getElementById('action-screen').classList.remove('active');
    document.getElementById('graph-screen').classList.add('active');
    const ctx = document.getElementById('transactionChart').getContext('2d');

    const transactionTypes = transactions.map(t => t.type);
    const transactionAmounts = transactions.map(t => t.amount);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: transactionTypes,
            datasets: [{
                label: 'Monto de Transacciones ($)',
                data: transactionAmounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
