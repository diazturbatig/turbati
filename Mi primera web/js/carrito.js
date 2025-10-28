// --- Manejo del carrito ---

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guarda el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agrega un producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  actualizarCarrito();
}

// Elimina un producto por índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Actualiza la visualización del carrito en la página
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})">X</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  totalElemento.textContent = total;
}

// Mostrar carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);
