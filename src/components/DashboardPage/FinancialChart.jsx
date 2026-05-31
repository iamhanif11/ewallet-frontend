import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { fetchTransactionReport } from "../../redux/slices/walletSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function FinancialChart() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth()
  
  const { reportData, status} = useSelector((state) => state.wallet);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchTransactionReport());
    }
  }, [currentUser, dispatch]);

  const chartLabel = reportData?.map((item) => item.day) || [];
  const expenseData = reportData?.map((item) => item.expense) || [];
  const incomeData = reportData?.map((item) => item) || [];
  
  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "Red",
        borderRadius: 4,
      },
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "Blue",
        borderRadius: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    
    <div className="flex flex-col font-montserrat border border-gray-200 p-4 rounded-xs w-full max-w-xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 mb-4">
        <h3 className="font-semibold text-lg">Financial Chart</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 p-2 border border-gray-200 rounded-md text-sm bg-gray-50 hover:bg-gray-100">
            7 Days <img src="/down.svg" alt="down" className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 p-2 border border-gray-200 rounded-md text-sm bg-gray-50 hover:bg-gray-100">
            All <img src="/down.svg" alt="down" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80">
        {status === "loading" ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 animate-pulse rounded-md">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}

export default FinancialChart;