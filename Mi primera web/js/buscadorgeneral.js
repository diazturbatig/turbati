const input = document.getElementById("buscador");
const resultados = document.getElementById("resultados");

input.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  resultados.innerHTML = "";

  if (query.length === 0) return;

  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(query));

  filtrados.forEach(p => {
    const enlace = document.createElement("a");
    enlace.href = p.url;
    enlace.textContent = p.nombre;
    enlace.className = "resultado-item";
    resultados.appendChild(enlace);
  });
});
