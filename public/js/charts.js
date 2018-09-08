var labelArray = [];
var rentTotals = [];
var elecTotals = [];
var gasTotals = [];
var groceriesTotals = [];
var carTotals = [];

API.getChartData().then(function(chartData) {
  console.log("Put this in the charts:", chartData);
  // Loop through the array to get YEAR+MONTH for labels
  // Loop through the array to get all totals for each category
  for (var l = 0; l < chartData.length; l++) {
    var month = chartData[l].MONTH + chartData[l].YEAR;
    if (!labelArray.includes(month)) {
      labelArray.push(month);
    }

    switch (chartData[l].category) {
    case "Rent/Housing":
      rentTotals.push(parseInt(chartData[l].Total));
      break;
    case "Electric":
      elecTotals.push(parseInt(chartData[l].Total));
      break;
    case "Gas":
      gasTotals.push(parseInt(chartData[l].Total));
      break;
    case "Groceries":
      groceriesTotals.push(parseInt(chartData[l].Total));
      break;
    case "Vehicle Expense":
      carTotals.push(parseInt(chartData[l].Total));
      break;
    }
  }

  $(document).ready(function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labelArray,
        datasets: [
          {
            label: "Rent/Housing",
            data: rentTotals,
            borderColor: [
              "#BF212E"
              // "rgba(26, 102, 255, 1)",
              // "rgba(51, 204, 51, 1)",
              // "rgba(255, 255, 153, 1)",
              // "rgba(255, 165, 0, 1)",
              // "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: "Electric",
            data: elecTotals,
            borderColor: [
              "#04C4D9"
              // "rgba(102, 102, 153, 1)",
              // "rgba(0, 51, 102, 1)",
              // "rgba(102, 0, 102, 1)",
              // "rgba(255, 255, 0, 1)",
              // "rgba(153, 102, 0, 1)"
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: "Gas",
            data: gasTotals,
            borderColor: [
              "#9EBF24"
              // "rgba(26, 102, 255, 1)",
              // "rgba(51, 204, 51, 1)",
              // "rgba(255, 255, 153, 1)",
              // "rgba(255, 165, 0, 1)",
              // "rgba(128, 0, 128, 1)"
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: "Groceries",
            data: groceriesTotals,
            borderColor: [
              // "rgba(255, 26, 26, 1)",
              // "rgba(26, 102, 255, 1)",
              // "rgba(51, 204, 51, 1)",
              // "rgba(255, 255, 153, 1)",
              // "rgba(255, 165, 0, 1)",
              "#F28B30"
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: "Vehicle Expense",
            data: carTotals,
            borderColor: [
              // "rgba(255, 26, 26, 1)",
              // "rgba(26, 102, 255, 1)",
              // "rgba(51, 204, 51, 1)",
              // "rgba(255, 255, 153, 1)",
              // "rgba(255, 165, 0, 1)",
              "#9237F2"
            ],
            borderWidth: 3,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
});
