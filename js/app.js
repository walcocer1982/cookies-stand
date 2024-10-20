'use strict';
const horasAtencion = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const tiendas = [];
const elementosTabla = document.getElementById("sale-table");
const formElement = document.getElementById("add-location");

const footerTabla = document.createElement('tfoot');

function Locacion(location, minConsumidoresPorHora, maxConsumidorePorHora, promedioGalletasPorPersona) {
    this.location = location;
    this.minConsumidoresPorHora = minConsumidoresPorHora;
    this.maxConsumidorePorHora = maxConsumidorePorHora;
    this.promedioGalletasPorPersona = promedioGalletasPorPersona;
    this.galletasVendidasPorHora = [];
    this.numeroConsumidorePorHora = [];
    this.totalGalletasPorDia = 0;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

Locacion.prototype.calcularConsumidoresPorHora = function () {
    for (let i = 0; i < horasAtencion.length; i++) {
        this.numeroConsumidorePorHora.push(random(this.minConsumidoresPorHora, this.maxConsumidorePorHora));
    }
}
Locacion.prototype.calcularGalletasPorHora = function () {
    this.calcularConsumidoresPorHora();
    for (let i = 0; i < horasAtencion.length; i++) {
        const ventaPorHora = Math.ceil(this.numeroConsumidorePorHora[i] * this.promedioGalletasPorPersona);
        this.galletasVendidasPorHora.push(ventaPorHora);
        this.totalGalletasPorDia += ventaPorHora;
    }
}

const seatle = new Locacion("Seatle", 23, 65, 6.3);
const tokyo = new Locacion("Tokyo", 3, 24, 1.2);
const dubai = new Locacion("Dubai", 11, 38, 3.7);
const paris = new Locacion("Paris", 20, 38, 2.3);
const lima = new Locacion("Lima", 2, 16, 4.6);
tiendas.push(seatle, tokyo, dubai, paris, lima);

function encabezadoTabla() {
    const filaTabla = document.createElement('tr');
    let headertable = document.createElement('th');
    headertable.textContent = 'location';
    filaTabla.appendChild(headertable);

    for (let i = 0; i < horasAtencion.length; i++) {
        headertable = document.createElement('th');
        headertable.textContent = horasAtencion[i];
        filaTabla.appendChild(headertable);
    }
    headertable = document.createElement('th');
    headertable.textContent = 'total';
    filaTabla.appendChild(headertable);

    elementosTabla.appendChild(filaTabla);
}
Locacion.prototype.mostrarVentas = function () {
    this.calcularGalletasPorHora();
    const filaTabla = document.createElement('tr');
    let dataTable = document.createElement('td');
    dataTable.textContent = this.location;
    filaTabla.appendChild(dataTable);
    for (let i = 0; i < horasAtencion.length; i++) {
        dataTable = document.createElement('td');
        dataTable.textContent = this.galletasVendidasPorHora[i];
        filaTabla.appendChild(dataTable);
    }
    let totalDataTable = document.createElement('th')
    totalDataTable.textContent = this.totalGalletasPorDia;
    filaTabla.appendChild(totalDataTable);
    elementosTabla.appendChild(filaTabla);

}
function footerTable() {
    const filaTabla = document.createElement('tr');
    let pieTabla = document.createElement('th');
    pieTabla.textContent = 'total';
    filaTabla.appendChild(pieTabla);
    let totalDeTotales = 0;
    for (let i = 0; i < horasAtencion.length; i++) {
        let totalPorHora = 0;
        for (let j = 0; j < tiendas.length; j++) {
            totalPorHora += Number(tiendas[j].galletasVendidasPorHora[i]);
            totalDeTotales += Number(tiendas[j].galletasVendidasPorHora[i]);
        }
        console.log(totalPorHora);
        pieTabla = document.createElement('th');
        pieTabla.textContent = totalPorHora;
        filaTabla.appendChild(pieTabla);
    }
    pieTabla = document.createElement('th');
    pieTabla.textContent = totalDeTotales;
    filaTabla.appendChild(pieTabla);
    footerTabla.appendChild(filaTabla);
    elementosTabla.appendChild(footerTabla);

}
function handleFrom(e) {
    e.preventDefault();

    const loc = e.target.location.value;
    const min = parseInt(e.target.minConsumidores.value);
    const max = parseInt(e.target.maxConsumidores.value);
    const prom = parseFloat(e.target.promGalletas.value);
    console.log(e);
    console.log(loc);
    console.log(min);
    console.log(max);
    console.log(prom);
    const newTienda = new Locacion(loc, min, max, prom);
    tiendas.push(newTienda);
    console.log(tiendas);

    e.target.location.value = null;
    e.target.minConsumidores.value = null;
    e.target.maxConsumidores.value = null;
    e.target.promGalletas.value = null;

    footerTabla.innerHTML = '';
    newTienda.mostrarVentas();
    footerTable();

}

function ejecutarTabla() {
    encabezadoTabla();
    for (let i = 0; i < tiendas.length; i++) {
        tiendas[i].mostrarVentas();
    }
    footerTable();
}
ejecutarTabla();
formElement.addEventListener('submit', handleFrom);
