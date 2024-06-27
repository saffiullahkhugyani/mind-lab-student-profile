import { Box } from "@chakra-ui/react";
import "./StudentPieChart.css";
import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StudentPieChart = () => {
  const data = {
    labels: ["Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [46, 38, 15],
        backgroundColor: ["blue", "green", "gray"],
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  };

  return (
    <Box
      margin={2}
      className="dataCard categoryCard"
      display={"flex"}
      justifyContent={"space-evenly"}
    >
      <Pie
        data={data}
        options={{
          layout: {
            padding: {
              left: 5,
              right: 5,
              bottom: 5,
              top: 5,
            },
          },
          responsive: true,
          plugins: {
            title: {
              text: "Pie Chart (A)",
              display: true,
              font: { size: 20 },
            },
          },
        }}
      />
      <Doughnut
        data={data}
        options={{
          responsive: true,
          layout: {
            padding: {
              left: 5,
              right: 5,
              bottom: 5,
              top: 5,
            },
          },
          plugins: {
            title: {
              text: "Pie Chart (B)",
              display: true,
              font: { size: 20 },
            },
            legend: {
              labels: {
                font: { size: 12 },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default StudentPieChart;
