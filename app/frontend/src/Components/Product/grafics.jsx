import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Produto A', visits: 1500 },
  { name: 'Produto B', visits: 1200 },
  { name: 'Produto C', visits: 900 },
  { name: 'Produto D', visits: 1300 },
  { name: 'Produto E', visits: 600 },
];

export const MostAccessedProductsChart = () => {
 
  return (
    <>
    <h1>Seus Produtos mais acessados</h1>
    <ResponsiveContainer width="50%" height={400}>
      <BarChart  data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visits" fill="#8884d8" name="Acessos" />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};

export default MostAccessedProductsChart;
