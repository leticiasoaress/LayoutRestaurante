$('.date').datepicker({
    format: 'dd/mm/yyyy',
    setDate: new Date(),
    autoclose: true,
    language: 'pt',
});
$('.date').attr('placeholder', '00/00/0000');
$('.cpf').mask('000.000.000-00');
$('.cpf').attr('placeholder', '000.000.000-00');
$('.money').mask('000000000000000,00', { reverse: true });

function VerificarCPF() {
    var cpf = $("#CPF").val();
    $.ajax({
        url: 'ValidarCPF',
        type: 'GET',
        data: { cpf: cpf },
        success: function (data) {
            if (data) {
                location.href = "http://localhost:54986/Pedido";
            }
            else {
                location.href = "http://localhost:54986/Cliente/Create";
            }
        }
    });
}

function AbrirVerificaCPF() {
    location.href = "Cliente/VerificarCPF";
}

$(document).on('change', '#ID_PRODUTO', function () {
    $("#QTD").val("1");
    var IdProduto = $("#ID_PRODUTO option:selected").val();

    $.ajax({
        url: '/ItemPedido/ValorItem/?IdProduto=' + IdProduto,
        type: 'GET',
        success: function (data) {
            $("#VL_ITEM").val(parseFloat(data).toFixed(2).replace(".", ","));
            $("#VlTotalItem").val(parseFloat(data).toFixed(2).replace(".", ","));
        }
    });
});

$(document).on('change', '#QTD', function () {
    var IdProduto = $("#ID_PRODUTO option:selected").val();
    var qtd = $("#QTD").val();

    $.ajax({
        url: '/ItemPedido/CalculoTotal/?IdProduto=' + IdProduto + '&qtd=' + qtd,
        type: 'GET',
        success: function (data) {
            $("#VlTotalItem").val(parseFloat(data).toFixed(2).replace(".", ","));
        }
    });
});

function FinalizarPedido(IdPedido) {
    $.ajax({
        url: 'Pedido/FinalizarPedido',
        type: 'GET',
        data: { IdPedido: IdPedido },
        success: function (data) {
            if (data) {
                location.href = "http://localhost:54986/Pedido/PedidoFinalizado";
            }
            else {
                noty({
                    text: "Não é possivel finalizar um pedido sem itens!",
                    type: 'danger',
                    timeout: 3000,
                    layout: 'center'
                });
            }
        }
    });
}