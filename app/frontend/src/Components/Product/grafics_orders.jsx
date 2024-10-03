import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Vendas Concluídas', value: 60 }, // Verde
  { name: 'Cancelamentos', value: 15 },     // Vermelho
  { name: 'Total de Pedidos', value: 25 },  // Cinza
];

const COLORS = ['#4caf50', '#f44336', '#808080']; // Verde, Vermelho e Cinza

export const PieGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
