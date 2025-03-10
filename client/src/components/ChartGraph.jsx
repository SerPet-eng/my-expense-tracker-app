import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartGraph({ filteredExpenses }) {
  const [chartType, setChartType] = useState("line");


  return (
    <div className="mt-4 p-4 w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg md:text-2xl text-gray-700">Expense Graph</h2>
        <select
          className="p-2 border rounded bg-gray-100 cursor-pointer"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={350}>
          {chartType === "line" ? (
            <LineChart data={filteredExpenses} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="price" stroke="#4F46E5" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
            </LineChart>
          ) : (
            <BarChart data={filteredExpenses} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Bar dataKey="price" fill="#F43F5E" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
