import React from "react";
import { Card, Container, Text } from "@mantine/core";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Radar chart data and options
const radarData = {
  labels: ["BLEU1", "BLEU2", "BLEU3", "BLEU4", "METEOR", "ROUGE_L", "CIDEr", "SPICE"],
  datasets: [
    {
      label: "Transformer Model",
      data: [0.593, 0.403, 0.266, 0.178, 0.189, 0.438, 0.556, 0.117],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    },
    {
      label: "Transformer Model Pre",
      data: [0.693, 0.521, 0.390, 0.295, 0.261, 0.530, 0.998, 0.190],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    {
      label: "VGG16 + LSTM",
      data: [0.464, 0.275, 0.158, 0.088, 0.161, 0.333, 0.473, 0.127],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor: 'rgb(75, 192, 192)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(75, 192, 192)'
    }
  ]
  ,
};

const radarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const, // TypeScript requires explicit typing here
    },
    tooltip: {
      enabled: true,
    },
  },
};

const Evaluation: React.FC = () => {
  return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Radar data={radarData} options={radarOptions} />
      </Card>
  );
};

export default Evaluation;