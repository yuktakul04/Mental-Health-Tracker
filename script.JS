// Retrieve saved data from local storage or create a new empty array
let savedData = JSON.parse(localStorage.getItem("moodData")) || [];

// Add event listener to submit button
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {
  // Retrieve user inputs
  const moodInput = document.getElementById("mood").value;
  const notesInput = document.getElementById("notes").value;

  // Add data to savedData array
  savedData.push({
    mood: moodInput,
    notes: notesInput,
    date: new Date(),
  });

  // Save updated data to local storage
  localStorage.setItem("moodData", JSON.stringify(savedData));

  // Update chart with new data
  updateChart();
});

// Update chart with saved data
function updateChart() {
  // Calculate mood counts
  const moods = ["Happy", "Sad", "Angry", "Anxious", "Neutral"];
  const moodCounts = [0, 0, 0, 0, 0];

  savedData.forEach((data) => {
    const moodIndex = moods.indexOf(data.mood);
    if (moodIndex !== -1) {
      moodCounts[moodIndex]++;
    }
  });

  // Update chart
  const chartData = {
    labels: moods,
    datasets: [
      {
        label: "Mood Count",
        data: moodCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const moodChart = document.getElementById("mood-chart");

  // Check if chart already exists, destroy it and create a new one
  if (window.moodChart) {
    window.moodChart.destroy();
  }

  window.moodChart = new Chart(moodChart, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
}

// Call updateChart on page load
updateChart()