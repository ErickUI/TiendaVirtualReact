import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ResumenDashboard } from '../services/dashboard.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  resumen: ResumenDashboard;
}

function VentasChart({ resumen }: Props) {
  const labels = resumen.ventasPorMes.map(v => v.mes);
  const dataValues = resumen.ventasPorMes.map(v => v.total);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas por mes (S/)',
        data: dataValues,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  } as const;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Ventas por mes</h5>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default VentasChart;
