// Mi código JavaScript:
var salesApp = new Vue({
    el: "#sales",
    data:
    {
        cars: [],
        years: [],
        marcas: [],
        models: [],
        yearSelected: "",
        selectBrand: "",
        selectedModel: "",
        exchangeRateUYU: "",
        monedaSeleccionada: "USD",



    },



});

// Carga de Tipo de Cambio:
$.ajax({
    url: "https://ha.edu.uy/api/rates",
    success: function (tiposDeCambio) {

        salesApp.exchangeRateUYU = tiposDeCambio.uyu;
    }
});

// Carga años:

for (i = 2018; i >= 1900; i--) {
    salesApp.years.push(i);

};

// Carga de Marcas:

$.ajax({
    url: "https://ha.edu.uy/api/brands",
    success: function (marca) {

        salesApp.marcas = marca;

    }
});


// Carga inicial de autos

$.ajax({
    url: "https://ha.edu.uy/api/cars",
    success: function (auto) {

        salesApp.cars = auto;

    }
});

// Cambio de moneda

$("#btn-currency").on("click", function () {

    if (salesApp.monedaSeleccionada == "USD") {
        salesApp.monedaSeleccionada = "UYU";


    }
    else {
        salesApp.monedaSeleccionada = "USD";

    }
});

// Carga de modelo en funcion de marca

$("#brands").on("change", function () {

    var marcaSelected = salesApp.selectBrand;

    $.ajax({
        url: "https://ha.edu.uy/api/models?brand=" + marcaSelected,
        dataType: "json",
        success: function (model) {

            salesApp.models = model
        }
    })


});


// Filtrado de autos

$("#btnFiltrar").on("click", function () {
    var anioSel = salesApp.yearSelected;
    var brandSel = salesApp.selectBrand;
    var modelSel = salesApp.selectedModel;


    $.ajax({
        url: "https://ha.edu.uy/api/cars?year=" + anioSel + "&brand=" + brandSel + "&model=" + modelSel,
        dataType: "json",
        success: function (autoFilrado) {

            salesApp.cars = autoFilrado;
        }
    })


})














