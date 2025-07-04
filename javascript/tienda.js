let usuarios= [{
    user:"Pepe",
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
//  al ser un stock de una tienda la ídea es que solo pueda acceder con credeciales pre-establecidas
]
let stockRemeras = [
    {
    modelo: "Barsa 1982",
    cantidad:"3",
    talles:"L,XL,XXL",
    precio:"45.000" },
    {
    modelo: "Napoli 1985",
    cantidad:"10",
    talles:"S,L,XL,XXL",
    precio:"55.000" 
    },

    {
    modelo: "Sevilla 1992",
    cantidad:"6",
    talles:"S,L,XL",
    precio:"45.000" 
    },

    {
    modelo: "Selección Argentina 86",
    cantidad:"20",
    talles:"S,L,M,XL,XXL",
    precio:"55.000" 
    },

     {
    modelo: "Boca 1994",
    cantidad:"25",
    talles:"S,L,M,XL,XXL",
    precio:"55.000" 
    },

      {
    modelo: "Selección Argentina 1994",
    cantidad:"40",
    talles:"S,L,M,XL,XXL",
    precio:"55.000" 
    },

       {
    modelo: "Boca 1981",
    cantidad:"20",
    talles:"S,L,M,XL",
    precio:"60.000" 
    },


      {
    modelo: "Boca 1987",
    cantidad:"25",
    talles:"S,L,M,XL",
    precio:"60.000" 
    },

]

cargarStockLocal();


function imprimirStock(remeras) {
    const lista = document.getElementById("stock");
    lista.innerHTML = "";

    remeras.forEach(remera => {
        lista.innerHTML += `
            <div>
                <h3>${remera.modelo}</h3>
                <p>Cantidad: ${remera.cantidad}</p>
                <p>Talles: ${remera.talles}</p>
                <p>Precio: ${remera.precio}</p>
            </div>
        `;
    });
}

function imprimirStock(remeras) {
    const lista = document.getElementById("stock");
    lista.innerHTML = "";

    remeras.forEach(remera => {
        lista.innerHTML += `
            <div class="cardRemera">
                <h3>${remera.modelo}</h3>
                <p>Cantidad: ${remera.cantidad}</p>
                <p>Talles: ${remera.talles}</p>
                <p>Precio: ${remera.precio}</p>
            </div>
        `;
    });
}

      
function guardarStockLocal() {
    localStorage.setItem("stockRemeras", JSON.stringify(stockRemeras));
}


function cargarStockLocal() {
    const stockGuardado = localStorage.getItem("stockRemeras");
    
    try {
        const parsedStock = JSON.parse(stockGuardado);

        if (Array.isArray(parsedStock) && parsedStock.every(item => item.modelo)) {
            stockRemeras = parsedStock;
        }
    } catch (error) {
        mostrarAlerta('error', 'Error en el almacenamiento local');
    }
}


function mostrarAlerta(tipo = 'info', titulo = '', mensaje = '', tiempo = 0) {
    Swal.fire({
        icon: tipo,
        title: titulo,
        text: mensaje,
        timer: tiempo > 0 ? tiempo : undefined,
        showConfirmButton: tiempo === 0,
        confirmButtonColor: '#007bff',
    });
}

let inicioSesionOK=false;

    function generarBotonera() {
    document.getElementById("botonera").innerHTML = `
       
            <h2> Que operación deseas realizar </h2>
            

            <button id="btnAgregar"> Agregar </button> 
            <button id="btnEliminar"> Eliminar </button> 
            <button id="btnBuscar"> Buscar </button> 

            <p id="resultadoBusqueda"></p>

            <button id="btnGuardar">Guardar cambios</button>
        
    `;
}
document.getElementById("boton1").addEventListener("click", function () {
    const usuarioIngresado = document.getElementById("usuario").value.trim();
    const contraseñaIngresada = document.getElementById("contraseña").value.trim();

    const loguin = usuarios.find(usuario => usuario.user === usuarioIngresado);
    console.log("Usuario encontrado:", loguin);

    if (loguin && loguin.contraseña === contraseñaIngresada) {
        mostrarAlerta('success', `Bienvenido ${loguin.user}`, 'Este es nuestro stock de remeras');
        imprimirStock(stockRemeras);
        inicioSesionOK = true;
    } else {
        mostrarAlerta('error', 'Acceso denegado', 'Usuario o contraseña incorrectos.');
    }
});

    

generarBotonera()
  document.getElementById("btnAgregar").addEventListener("click", function() {
    const formularioDiv = document.getElementById("formularioAgregar");
    
    formularioDiv.innerHTML = `
        <h3>Agregar nueva remera</h3>
        <form id="formAgregarRemera" class="formulario">
            <label>Modelo: <input type="text" id="modelo" required></label><br>
            <label>Cantidad: <input type="number" id="cantidad" min="1" required></label><br>
            <label>Talles: <input type="text" id="talles" required></label><br>
            <label>Precio: <input type="number" id="precio" min="0" required></label><br>
            <button id="sumbit">Agregar remera</button>
            <button id="cancelar">Cancelar</button>
        </form>
    `

    document.getElementById("formAgregarRemera").addEventListener("submit", function(e) {


        const modelo = document.getElementById("modelo").value.trim();
        const cantidad = document.getElementById("cantidad").value.trim();
        const talles = document.getElementById("talles").value.trim();
        const precio = document.getElementById("precio").value.trim();


          stockRemeras.push({
            modelo,
            cantidad,
            talles,
            precio
        });

        mostrarAlerta('success', 'ITEM agregado al stock',);

        formularioDiv.innerHTML = "";

        imprimirStock(stockRemeras);

        

        });

        document.getElementById("cancelar").addEventListener("click", function() {
        formularioDiv.innerHTML = "";
    });
});



    document.getElementById("btnEliminar").addEventListener("click", function () {
    const formularioDiv = document.getElementById("formularioAgregar");

    formularioDiv.innerHTML = `
        <h3>Ingrese el ITEM a eliminar del Stock</h3>
        <form id="formEliminarRemera" class="formulario">
            <label>Modelo: <input type="text" id="modeloEliminar" required></label><br>
            <button type="submit">Eliminar Remera</button>
            <button type="button" id="cancelar">Cancelar</button>
        </form>
        <p id="resultadoEliminar"></p>
    `;

    const formEliminar = document.getElementById("formEliminarRemera");

    formEliminar.addEventListener("submit", function (e) {
        e.preventDefault();

        const modeloAEliminar = document.getElementById("modeloEliminar").value.trim().toLowerCase();
        let encontrado = false;

        for (let i = 0; i < stockRemeras.length; i++) {
            if (stockRemeras[i].modelo.toLowerCase() === modeloAEliminar) {
                stockRemeras.splice(i, 1);
                encontrado = true;
                break;
            }
        }

        const resultadoEliminar = document.getElementById("resultadoEliminar");

        if (encontrado) {
            mostrarAlerta('success', 'Remera Eliminada Correctamente', );
            imprimirStock(stockRemeras);
            
        } else {
            mostrarAlerta('error', 'La remera indicada no se encuentra en el Stock');
        }

        formEliminar.reset();
    });

    document.getElementById("cancelar").addEventListener("click", function () {
        formularioDiv.innerHTML = "";
    });
});



document.getElementById("btnBuscar").addEventListener("click", function () {
    const formularioDiv = document.getElementById("formularioAgregar");

    formularioDiv.innerHTML = `
        <h3>Ingrese el ITEM a buscar del Stock</h3>
        <form id="formBuscarRemera" class="formulario">
            <label>Modelo: <input type="text" id="modeloBuscar" required></label><br>
            <button type="submit">Buscar Remera</button>
            <button type="button" id="cancelar">Cancelar</button>
        </form>
        <p id="resultadoBuscar"></p>
    `;

    const formBuscar = document.getElementById("formBuscarRemera");

    formBuscar.addEventListener("submit", function (e) {
        e.preventDefault();

        const modeloBuscado = document.getElementById("modeloBuscar").value.trim().toLowerCase();
        const resultadoBuscar = document.getElementById("resultadoBuscar");

        let productoEncontrado = false;

        for (let i = 0; i < stockRemeras.length; i++) {
            if (stockRemeras[i].modelo.toLowerCase() === modeloBuscado) {
                const resultadoBuscar = document.getElementById("resultadoBuscar");
                productoEncontrado = true;
               
            
               
                resultadoBuscar.innerHTML = `
                    ✅ <strong>${stockRemeras[i].modelo}</strong> está disponible en el stock:<br>
                    Cantidad: ${stockRemeras[i].cantidad}<br>
                    Talles: ${stockRemeras[i].talles}<br>
                    Precio: $${stockRemeras[i].precio}
                `;
                resultadoBuscar.style.color = "green"; 
                break;
            }
        }

        if (!productoEncontrado) {
           mostrarAlerta('error', 'La remera indicada no se encuentra en el Stock');
        }

        formBuscar.reset();
    });

    document.getElementById("cancelar").addEventListener("click", function () {
        formularioDiv.innerHTML = "";
    });
});






document.getElementById("btnGuardar").addEventListener("click", function () {
    guardarStockLocal();
    mostrarAlerta('success', 'Cambios guardados en el navegador');
}); 