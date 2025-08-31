import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ProgressChart = ({ completed, pending }) => {
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <PieChart width={200} height={200}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ProgressChart;