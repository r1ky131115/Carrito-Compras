// VARIABLES 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListeners();
function registrarEventListeners(e) {
    
    // Cuando agregas un curso presionando en 'Agregar curso'
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteando el html

        limpiarHTML(); // Eliminamos todo el HTML
        
    });

}

// FUNCIONES

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrtio
function eliminarCurso(e) {
    
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina curso del arreglo(articulosCarrito) por el data-id

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        
        carritoHTML(); // Volvemos a iterar sobre el carrito para actualizar el HTML
    }
}


// Lee el contenido del HTML al que se le de click y extrae la info del curso
function leerDatosCurso(curso) {

    // Objeto con la info del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };


    // Revisar si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    

    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML(articulosCarrito);
}


// Mostrar carrito en HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src ="${imagen}" width="100"/> 
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </td>
        `;
        //Agregando el HTML en el tbody
        contenedorCarrito.appendChild(row);
    });

}


// Eliminar los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    contenedorCarrito.innerHTML = '';
    
    // Forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}