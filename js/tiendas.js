'use strict';
const tiendas=[];
function Tiendas(name,direccion,horario,telefono,email,aforo){
    this.name=name,
    this.direccion=direccion,
    this.horario=horario,
    this.telefono=telefono,
    this.email=email,
    this.aforo=aforo
}
const seatle=new Tiendas("Seattle", "2301 3rd Ave #800, Seattle, WA 98121", "Open: 6am - 7pm", "1-324-6780");
const tokyo=new Tiendas("Tokyo", "1 Chome-12 Oshiage, Sumida City, Tokyo 131-8634", "Open: 6am - 7pm", "1-232-2222");
const dubai=new Tiendas("Dubai", "1 Sheikh Mohammed bin Rashid Blvd - Dubai", "Open: 6am - 7pm", "1-333-3333");
const paris=new Tiendas("Paris", "Champ de Mars, 5 Avenue Anatole France, 75007 Paris", "Open: 6am - 7pm", "1-444-4444");
const lima=new Tiendas("Lima", "Calle Grau, Barranco cuadra 8, Miraflores 15074", "Open: 6am - 7pm", "1-555-5555");
tiendas.push(seatle,tokyo,dubai,paris,lima);
function mostrarTiendas(store){
    const sucursales=document.getElementById('sucursales');
    const local=document.createElement('section');
    const nombreTienda=document.createElement('h2');
    nombreTienda.textContent=store.name;
    local.appendChild(nombreTienda);
    const direccionTienda=document.createElement('p');
    direccionTienda.textContent=store.direccion;
    local.appendChild(direccionTienda);
    const horarioTienda=document.createElement('p');
    horarioTienda.textContent=store.horario;
    local.appendChild(horarioTienda);
    const emailTienda=document.createElement('p');
    emailTienda.textContent=store.email;
    local.appendChild(emailTienda);
    sucursales.appendChild(local);
}
function ejecutar(){
    for(let i=0;i <tiendas.length;i++){
        mostrarTiendas(tiendas[i]);
    }
}
ejecutar()
// tiendas=[seatle,tokyo,dubai,paris,lima]


