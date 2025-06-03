let usuarios= [{
    user:"Pepito",
    contraseña:"1234"
},
{
    user:"Pablo",
    contraseña:"1234" 
},

{

    user:"Pedro",
    contraseña:"1234"
}

]

function imprimirStock (remeras) {

     const lista = document.getElementById("stock");
            lista.innerHTML = "";

        for (let i = 0; i < remeras.length; i++) {
        const item = document.createElement("li"); 
        item.textContent = "Producto número " + i + ": " + remeras[i]; 
        lista.appendChild(item); 
    }
}
function guardarStockLocal() {
    localStorage.setItem("stockRemeras", JSON.stringify(stockRemeras));
}
function cargarStockLocal() {
    const stockGuardado = localStorage.getItem("stockRemeras");
    if (stockGuardado) {
        stockRemeras = JSON.parse(stockGuardado);
    }
}

let stockRemeras = ["Napoli 1985", "Barsa 1982", "Sevilla 1992", "Selección Argentina 86", "Boca 1994", "Selección Argentina 1994", "Boca 1981", "Boca 1987" ] 
cargarStockLocal();

let inicioSesionOK=false;


      document.getElementById("boton1").addEventListener("click", function () {
        const usuarioIngresado = document.getElementById("usuario").value;
        const contraseñaIngresada = document.getElementById("contraseña").value;
        const resultadoSesion = document.getElementById("resultadoInicio");

        const loguin = usuarios.find(usuario => usuario.user === usuarioIngresado);

        if (loguin && loguin.contraseña === contraseñaIngresada) {
            resultadoSesion.innerHTML = "✅ Bienvenido " + loguin.user + "Este es nuestro stock de remeras";
            resultadoSesion.style.color = "green";

            imprimirStock(stockRemeras);
            inicioSesionOK=true;

        } else {
            resultadoSesion.innerHTML = "❌ Usuario o contraseña incorrectos.";
            resultadoSesion.style.color = "red";
        }
    });

    


    document.getElementById("btnAgregar").addEventListener("click", function(){
        const remeraIngresada = document.getElementById("itemIngresado").value;

        stockRemeras.push(remeraIngresada);
       
        document.getElementById("itemIngresado").value = "";

        imprimirStock(stockRemeras);
        
    })


    document.getElementById("btnEliminar").addEventListener("click", function(){
    const itemEliminar = document.getElementById("itemIngresado").value;
    const resultadoEliminar = document.getElementById("resultadoBusqueda")
    let posicion;
    let prodcuto=false;

    for (let i=0; i<stockRemeras.length;i++) {
        
        if (stockRemeras[i]==itemEliminar){
            posicion=i;

            prodcuto=true;

            stockRemeras.splice (posicion,1);
            imprimirStock(stockRemeras);
        } 

    if (prodcuto==false) {
    
    resultadoEliminar.innerHTML = "❌ La remera indicada no existe en el stock.";
    resultadoEliminar.style.color = "red";

   }

   document.getElementById("itemIngresado").value = "";
    } 
})

document.getElementById("btnBuscar").addEventListener("click", function(){
    const itemBuscar = document.getElementById("itemIngresado").value;
    const resultadoBuscar = document.getElementById("resultadoBusqueda")
    let posicion;
    let prodcuto=false;

   
    for (let i = 0; i < stockRemeras.length; i++) {
        if (stockRemeras[i] === itemBuscar) {
            productoEncontrado = true;
            resultadoBuscar.innerHTML = "✅ La remera \"" + itemBuscar + "\" está disponible en el stock (posición " + i + ").";
            resultadoBuscar.style.color = "green";
            break; 
        }
    }

    if (!productoEncontrado) {
        resultadoBuscar.innerHTML = "❌ La remera \"" + itemBuscar + "\" no existe en el stock.";
        resultadoBuscar.style.color = "red";
    }

    document.getElementById("itemIngresado").value = "";
});


document.getElementById("btnGuardar").addEventListener("click", function () {
    guardarStockLocal();
    alert("✅ Cambios guardados en el navegador.");
});