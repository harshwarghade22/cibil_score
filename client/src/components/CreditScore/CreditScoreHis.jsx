import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreditScoreHistory } from '../../actions/projectActions';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

const CreditScoreHistory = () => {
  const dispatch = useDispatch();
  const creditScoreHistory = useSelector(state => state.creditScoreHistory.creditScoreHistory);
  console.log(creditScoreHistory)
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('30'); // Default to 30 days

  useEffect(() => {
    dispatch(fetchCreditScoreHistory());
  }, [dispatch]);

  useEffect(() => {
    if (creditScoreHistory.length > 0) {
      const now = new Date();
      let data = creditScoreHistory;

      if (filter !== 'all') {
        const days = parseInt(filter);
        const threshold = new Date(now.setDate(now.getDate() - days));
        data = creditScoreHistory.filter(item => new Date(item.date) >= threshold);
      }

      const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sorted);
    }
  }, [creditScoreHistory, filter]);

  // Calculate score change
  const getScoreChange = () => {
    if (filteredData.length < 2) return { value: 0, positive: true };
    
    const oldest = filteredData[0].score;
    const newest = filteredData[filteredData.length - 1].score;
    const change = newest - oldest;
    
    return { 
      value: Math.abs(change), 
      positive: change >= 0 
    };
  };

  const scoreChange = getScoreChange();
  const currentScore = filteredData.length > 0 ? filteredData[filteredData.length - 1].score : "N/A";

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow-md border border-gray-200">
          <p className="font-semibold text-gray-900">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
          <p className="text-blue-600 font-medium">Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Credit Score History</h2>
        
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-lg p-1 shadow-sm">
            <button 
              onClick={() => setFilter('30')} 
              className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '30' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              30 Days
            </button>
            <button 
              onClick={() => setFilter('180')} 
              className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '180' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              6 Months
            </button>
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Current Score</p>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-gray-900">{currentScore}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Score Change</p>
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2" style={{ color: scoreChange.positive ? '#10B981' : '#EF4444' }}>
              {scoreChange.value}
            </span>
            {scoreChange.positive ? 
              <ArrowUp size={20} className="text-green-500" /> : 
              <ArrowDown size={20} className="text-red-500" />
            }
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Data Points</p>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-900">{filteredData.length}</span>
            <TrendingUp size={20} className="ml-2 text-blue-500" />
          </div>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(d) => new Date(d).toLocaleDateString()} 
                stroke="#9CA3AF"
              />
              <YAxis 
                domain={['dataMin - 20', 'dataMax + 20']} 
                stroke="#9CA3AF"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4, stroke: "#3B82F6", fill: "#fff" }}
                activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2, fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No score history data available.</p>
        </div>
      )}

      {filteredData.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreditScoreHistory;