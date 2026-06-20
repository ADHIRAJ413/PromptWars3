import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
);

function Insights({ state, navigateToView }) {
  const fp = state.footprint;
  const hasData = state.history.length > 0;

  if (!hasData) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto text-center">
        <div className="app-glass-card-dark p-12">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="app-section-title mb-2">No data yet</h2>
          <p className="app-section-sub mb-6">Complete the activity tracker to unlock charts and analytics.</p>
          <button type="button" onClick={() => navigateToView('tracker')} className="app-btn-primary">
            Go to Tracker
          </button>
        </div>
      </div>
    );
  }

  const donutData = {
    labels: ['Transport', 'Energy', 'Food', 'Waste'],
    datasets: [{
      data: [fp.transport, fp.energy, fp.food, fp.waste],
      backgroundColor: ['#10b981', '#34d399', '#059669', '#064e3b'],
      borderWidth: 0,
      hoverOffset: 12,
    }],
  };

  const lineData = {
    labels: [...state.history].reverse().map((_, i) => `Entry ${i + 1}`),
    datasets: [{
      label: 'Monthly Footprint (kg)',
      data: [...state.history].reverse().map((h) => h.total),
      borderColor: '#10b981',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
    }],
  };

  const radarData = {
    labels: ['Transport', 'Energy', 'Food', 'Waste'],
    datasets: [{
      label: 'Your Impact',
      data: [fp.transport, fp.energy, fp.food, fp.waste],
      backgroundColor: 'rgba(52, 211, 153, 0.2)',
      borderColor: '#34d399',
      pointBackgroundColor: '#34d399',
    }],
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      x: { ticks: { color: '#888' }, grid: { display: false } },
      r: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        angleLines: { color: 'rgba(255,255,255,0.05)' },
        pointLabels: { color: '#fff' },
        ticks: { display: false },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="app-section-title">Emission Insights</h2>
        <p className="app-section-sub">Visual breakdown of your carbon footprint trends</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="app-glass-card p-6 h-[400px] flex flex-col">
          <h3 className="font-bold mb-4">Category breakdown</h3>
          <div className="flex-1 relative">
            <Doughnut data={donutData} options={{ ...chartOptions, plugins: { legend: { position: 'bottom', labels: { color: '#fff', padding: 16 } } } }} />
          </div>
        </div>
        <div className="app-glass-card p-6 h-[400px] flex flex-col">
          <h3 className="font-bold mb-4">History trend</h3>
          <div className="flex-1 relative">
            <Line data={lineData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

      <div className="app-glass-card p-6 h-[400px] flex flex-col">
        <h3 className="font-bold mb-4 text-center">Category comparison</h3>
        <div className="flex-1 relative max-w-xl mx-auto w-full">
          <Radar data={radarData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}

export default Insights;
