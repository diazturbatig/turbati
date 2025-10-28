async function cargarDolarBlue() {
  try {
    const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const data = await res.json();
    const compra = data.blue.value_buy;
    const venta = data.blue.value_sell;
    const fecha = new Date(data.last_update).toLocaleString("es-AR");

    document.getElementById("compra").textContent = `$${compra}`;
    document.getElementById("venta").textContent = `$${venta}`;
    document.getElementById("fecha").textContent = fecha;

    // Calcular precios ARS
    document.querySelectorAll(".precio").forEach(el => {
      const usd = parseFloat(el.textContent.replace("USD", "").trim());
      const ars = (usd * venta).toFixed(0);
      el.nextElementSibling.textContent = `≈ $${ars} ARS`;
    });
  } catch (e) {
    console.error("Error al cargar dólar:", e);
  }
}
cargarDolarBlue();
setInterval(cargarDolarBlue, 600000); // cada 10 min

// Buscador
document.getElementById("buscador").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  document.querySelectorAll("#productos article").forEach(art => {
    const nombre = art.querySelector("h2").textContent.toLowerCase();
    art.style.display = nombre.includes(texto) ? "block" : "none";
  });
});

// Filtro por categoría
document.getElementById("filtro").addEventListener("change", (e) => {
  const categoria = e.target.value;
  document.querySelectorAll("#productos article").forEach(art => {
    art.style.display = (categoria === "todos" || art.dataset.categoria === categoria) ? "block" : "none";
  });
});

// Conversor USD ↔ ARS
document.getElementById("convertir").addEventListener("click", () => {
  const usd = parseFloat(document.getElementById("usdInput").value);
  const venta = parseFloat(document.getElementById("venta").textContent.replace("$", ""));
  if (!isNaN(usd)) {
    const ars = (usd * venta).toFixed(2);
    document.getElementById("resultado").textContent = `${usd} USD ≈ $${ars} ARS`;
  } else {
    document.getElementById("resultado").textContent = "Ingrese un número válido";
  }
});
