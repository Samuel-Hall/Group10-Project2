// Get current month
var newDate = new Date();
var currentMonth = newDate.getMonth();
console.log("Current month is ", currentMonth);

API.getChartData().then(function(chartData) {
  console.log("Put this in the charts:", chartData);
});

$(document).ready(function() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "March", "April", "May"],
      datasets: [
        {
          label: "Rent/Housing",
          data: [480, 41, 138, 18, 52],
          borderColor: [
            "rgba(255, 26, 26, 1)",
            "rgba(26, 102, 255, 1)",
            "rgba(51, 204, 51, 1)",
            "rgba(255, 255, 153, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(128, 0, 128, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "Electric",
          data: [68, 480, 92, 150, 50],
          borderColor: [
            "rgba(255, 26, 26, 1)",
            "rgba(26, 102, 255, 1)",
            "rgba(51, 204, 51, 1)",
            "rgba(255, 255, 153, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(128, 0, 128, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "Gas",
          data: [142, 88, 480, 28, 75],
          borderColor: [
            "rgba(255, 26, 26 ,1)",
            "rgba(26, 102, 255, 1)",
            "rgba(51, 204, 51, 1)",
            "rgba(255, 255, 153, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(128, 0, 128, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "Groceries",
          data: [44, 129, 75, 480, 94],
          borderColor: [
            "rgba(255, 26, 26, 1)",
            "rgba(26, 102, 255, 1)",
            "rgba(51, 204, 51, 1)",
            "rgba(255, 255, 153, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "Vehicle Expenses",
          data: [90, 52, 87, 100, 480],
          borderColor: [
            "rgba(255, 26, 26, 1)",
            "rgba(26, 102, 255, 1)",
            "rgba(51, 204, 51, 1)",
            "rgba(255, 255, 153, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(128, 0, 128, 1)"
          ],
          borderWidth: 1
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
