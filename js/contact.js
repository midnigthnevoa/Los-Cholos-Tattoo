/* =========================================================
   LOS CHOLOS TATTOO — Formulário de orçamento via WhatsApp
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("quote-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nome = document.getElementById("q-name").value.trim();
    var whats = document.getElementById("q-whats").value.trim();
    var estilo = document.getElementById("q-style").value;
    var tamanho = document.getElementById("q-size").value;
    var local = document.getElementById("q-placement").value.trim();
    var data = document.getElementById("q-date").value.trim();
    var ideia = document.getElementById("q-idea").value.trim();

    if (!nome) { document.getElementById("q-name").focus(); return; }
    if (!estilo) { document.getElementById("q-style").focus(); return; }

    var msg =
      "*SOLICITAÇÃO DE ORÇAMENTO - LOS CHOLOS*\n\n" +
      "*Nome:* " + nome + "\n" +
      "*WhatsApp:* " + (whats || "-") + "\n" +
      "*Estilo:* " + estilo + "\n" +
      "*Tamanho:* " + (tamanho || "A definir") + "\n" +
      "*Local:* " + (local || "A definir") + "\n" +
      "*Data desejada:* " + (data || "A combinar") + "\n" +
      "*Ideia:* " + (ideia || "-");

    var url = SITE.whatsappBase + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");

    form.reset();
  });
});
