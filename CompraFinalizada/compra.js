document.addEventListener("DOMContentLoaded", function () {
  var agora = new Date();
  var dataHora = agora.toLocaleString("pt-BR");

  var numeroPedido = Math.floor(100000 + Math.random() * 900000);

  var tituloEl = document.getElementById("titulo-compra");
  if (tituloEl) {
    tituloEl.textContent = "Compra #" + numeroPedido;
  }

  var infoEl = document.getElementById("info-pedido");
  if (infoEl) {
    infoEl.innerHTML = 
      "Número do pedido: <strong>#" + numeroPedido + "</strong><br>" +
      "Data e horário: <strong>" + dataHora + "</strong>";
  }

  var dadosCompra = {
    numero: numeroPedido,
    data_hora: dataHora
  };

  var compras = JSON.parse(localStorage.getItem("compras")) || [];

  if (compras.length >= 5) {
    localStorage.removeItem("compras");
    compras = [];
  }

  compras.push(dadosCompra);
  localStorage.setItem("compras", JSON.stringify(compras));
});

    
