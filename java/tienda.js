let datoIngresado
let stockRemeras = ["Napoli 1985", "Barsa 1982", "Sevilla 1992", "Selección Argentina 86", "Boca 1994", "Selección Argentina 1994", "Boca 1981", "Boca 1987" ] 

function imprimirStock (remeras) {
    for (let i=0; i<remeras.length;i++) 

         console.log ("Producto numero" +i+ " " + remeras[i]);

        }

 function agregarStock(stockActual) {
            let nuevoProducto = prompt("Ingresa el nuevo producto:");
            stockActual.push(nuevoProducto);
          }

 function eliminarStock (stockActual) {
    let eliminarProducto = prompt("Ingresa el producto a eliminar:");
    let posicion;
    let prodcuto=false;

    for (let i=0; i<stockActual.length;i++) {
        
        if (stockActual[i]==eliminarProducto){
            posicion=i;

            prodcuto=true;

            stockActual.splice (posicion,1);

        } 

    } 
    
    
    if (prodcuto==false) {
    
        console.log ("No se encontro el producto indicado en el stock")
    
       }
   
  

}



function buscarStock (stockActual) {
    let buscarProducto = prompt("Ingresa el producto a buscar:");
    let prodcuto=false
    
    for (let i=0; i<stockActual.length;i++) {
        
        if (stockActual[i]==buscarProducto){
            
            prodcuto=true;
           console.log ("Contamos con stock del producto buscado en la posición " + i) 
           

        } 

    } 
   
    if (prodcuto==false) {
    
    console.log ("No se encontro el producto indicado en el stock")

   }
  

}

    
while (true) {
imprimirStock(stockRemeras);

console.log ("Este es nuestro stock de remeras, deseas AGREGAR, ELMINAR, BUSCAR o FINALIZAR una en partitular")

datoIngresado=prompt("Ingresa la operación que deseas realizar");

if (datoIngresado=="AGREGAR") {

    agregarStock (stockRemeras);


    console.log ("Se agrego el producto selecionado al stock")

    imprimirStock (stockRemeras);



} else if (datoIngresado=="ELIMINAR") {

    eliminarStock (stockRemeras);

    imprimirStock (stockRemeras);




} else if (datoIngresado=="BUSCAR") {

    buscarStock (stockRemeras);


} else if (datoIngresado=="FINALIZAR") {
    console.log ("Hasta la proxima");
    
    break;
   

} else {
    console.log ("La instrucción ingresada no es valida, intalo nuevamente")
}

} 



