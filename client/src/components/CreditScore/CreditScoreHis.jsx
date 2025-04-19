// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCreditScoreHistory } from '../../actions/projectActions';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

// const CreditScoreHistory = () => {
//   const dispatch = useDispatch();
//   const creditScoreHistory = useSelector(state => state.creditScoreHistory.creditScoreHistory);

//   const [mlRecommendation, setMlRecommendation] = useState('');
//   const transactionCreate = useSelector((state) => state.transactionCreate);
//   const {
//     loading,
//     success,
//     transaction,
//     credit_score,
//     recommendation,
//     credit_utilization,
//     dti,
//     error,
//   } = transactionCreate;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   console.log(creditScoreHistory)
//   const [filteredData, setFilteredData] = useState([]);
//   const [filter, setFilter] = useState('30'); // Default to 30 days

//   useEffect(() => {
//     dispatch(fetchCreditScoreHistory());
//   }, [dispatch]);

//   useEffect(() => {
//     if (creditScoreHistory.length > 0) {
//       const now = new Date();
//       let data = creditScoreHistory;

//       if (filter !== 'all') {
//         const days = parseInt(filter);
//         const threshold = new Date(now.setDate(now.getDate() - days));
//         data = creditScoreHistory.filter(item => new Date(item.date) >= threshold);
//       }

//       const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

//       setFilteredData(sorted);
//     }
//   }, [creditScoreHistory, filter]);

//   // Calculate score change
//   const getScoreChange = () => {
//     if (filteredData.length < 2) return { value: 0, positive: true };

//     const oldest = filteredData[0].score;
//     const newest = filteredData[filteredData.length - 1].score;
//     const change = newest - oldest;

//     return {
//       value: Math.abs(change),
//       positive: change >= 0
//     };
//   };

//   const scoreChange = getScoreChange();
//   const currentScore = filteredData.length > 0 ? filteredData[filteredData.length - 1].score : "N/A";

//   // Custom tooltip for the chart
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 rounded shadow-md border border-gray-200">
//           <p className="font-semibold text-gray-900">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
//           <p className="text-blue-600 font-medium">Score: {payload[0].value}</p>
//         </div>
//       );
//     }
//     return null;
//   };




//   useEffect(() => {
//     const fetchMLRecommendation = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/transactions/recommendation/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             credit_score: credit_score,
//             credit_utilization: credit_utilization,
//             dti: dti,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.access}`,
//           }
//         });

//         const data = await response.json();
//         setMlRecommendation(data.recommendation || 'No insights available yet.');
//       } catch (err) {
//         console.error('ML Recommendation Error:', err);
//         setMlRecommendation('Error fetching recommendation');
//       }
//     };

//     if (success && credit_score && credit_utilization && dti) {
//       fetchMLRecommendation();
//     }
//   }, [success, credit_score, credit_utilization, dti]);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Credit Score History</h2>

//         <div className="flex items-center">
//           <div className="bg-gray-100 rounded-lg p-1 shadow-sm">
//             <button
//               onClick={() => setFilter('30')}
//               className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '30' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             >
//               30 Days
//             </button>
//             <button
//               onClick={() => setFilter('180')}
//               className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '180' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             >
//               6 Months
//             </button>
//             <button
//               onClick={() => setFilter('all')}
//               className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             >
//               All Time
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <p className="text-gray-500 text-sm mb-1">Current Score</p>
//           <div className="flex items-end">
//             <span className="text-3xl font-bold text-gray-900">{currentScore}</span>
//           </div>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <p className="text-gray-500 text-sm mb-1">Score Change</p>
//           <div className="flex items-center">
//             <span className="text-3xl font-bold mr-2" style={{ color: scoreChange.positive ? '#10B981' : '#EF4444' }}>
//               {scoreChange.value}
//             </span>
//             {scoreChange.positive ?
//               <ArrowUp size={20} className="text-green-500" /> :
//               <ArrowDown size={20} className="text-red-500" />
//             }
//           </div>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <p className="text-gray-500 text-sm mb-1">Data Points</p>
//           <div className="flex items-center">
//             <span className="text-3xl font-bold text-gray-900">{filteredData.length}</span>
//             <TrendingUp size={20} className="ml-2 text-blue-500" />
//           </div>
//         </div>
//       </div>

//       {filteredData.length > 0 ? (
//         <div className="mb-8">
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(d) => new Date(d).toLocaleDateString()}
//                 stroke="#9CA3AF"
//               />
//               <YAxis
//                 domain={['dataMin - 20', 'dataMax + 20']}
//                 stroke="#9CA3AF"
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Line
//                 type="monotone"
//                 dataKey="score"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//                 dot={{ strokeWidth: 2, r: 4, stroke: "#3B82F6", fill: "#fff" }}
//                 activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2, fill: "#3B82F6" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
//           <p className="text-gray-500">No score history data available.</p>
//         </div>
//       )}

//       {filteredData.length > 0 && (
//         <div className="overflow-hidden rounded-lg border border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredData.map(item => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(item.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {item.score}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <h2>Credit Score Recommendation</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {success && (
//         <div>
//           <h3>✅ Credit Score: {credit_score}</h3>
//           <p>💡 Basic Recommendation: {recommendation}</p>
//           <p>🤖 ML Recommendation: {mlRecommendation}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreditScoreHistory;














import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreditScoreHistory } from '../../actions/projectActions';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  Label
} from 'recharts';
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Calendar,
  Activity,
  Award,
  AlertCircle,
  ChevronRight,
  Download,
  Lightbulb,
  RefreshCw
} from 'lucide-react';

const CreditScoreHistory = () => {
  const dispatch = useDispatch();
  const reportRef = useRef();

  const creditScoreHistory = useSelector(state => state.creditScoreHistory.creditScoreHistory);
  console.log(creditScoreHistory.length)

  const [mlRecommendation, setMlRecommendation] = useState('');
  const [predictedScore, setPredictedScore] = useState(null);

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const {
    loading,
    success,
    transaction,
    credit_score,
    recommendation,
    credit_utilization,
    dti,
    error,
  } = transactionCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('30'); // Default to 30 days
  const [creditLevel, setCreditLevel] = useState('');

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
      console.log(sorted)

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

  // Function to determine credit score level
  useEffect(() => {
    if (filteredData.length > 0) {
      const latestScore = filteredData[filteredData.length - 1].score;

      if (latestScore >= 800) {
        setCreditLevel('Excellent');
      } else if (latestScore >= 740) {
        setCreditLevel('Very Good');
      } else if (latestScore >= 670) {
        setCreditLevel('Good');
      } else if (latestScore >= 580) {
        setCreditLevel('Fair');
      } else {
        setCreditLevel('Poor');
      }
    }
  }, [filteredData]);

  const scoreChange = getScoreChange();

  const currentScore = filteredData.length > 0 ? filteredData[filteredData.length - 1].score : "N/A";
  console.log(currentScore)

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

  useEffect(() => {
    const fetchMLRecommendation = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/transactions/recommendation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
          body: JSON.stringify({
            credit_score: credit_score,
            credit_utilization: credit_utilization,
            dti: dti,
          })
        });

        const data = await response.json();
        setMlRecommendation(data.recommendation || 'No insights available yet.');
      } catch (err) {
        console.error('ML Recommendation Error:', err);
        setMlRecommendation('Error fetching recommendation');
      }
    };

    if (success && credit_score && credit_utilization && dti) {
      fetchMLRecommendation();
    }
  }, [success, credit_score, credit_utilization, dti, transaction, userInfo]);

  // Get score color based on level
  const getScoreColor = () => {
    switch (creditLevel) {
      case 'Excellent': return 'text-emerald-600';
      case 'Very Good': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-amber-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-800';
    }
  };

  // Define reference lines for credit score ranges
  const scoreRanges = [
    { value: 580, label: 'Fair', color: '#F59E0B' },
    { value: 670, label: 'Good', color: '#3B82F6' },
    { value: 740, label: 'Very Good', color: '#10B981' },
    { value: 800, label: 'Excellent', color: '#059669' }
  ];

  const handleDownloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('credit_score_report.pdf');
    });
  };

  const handleFutureProjection = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/transactions/predict-score/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.access}`,
        },
        body: JSON.stringify({
          credit_utilization: credit_utilization,
          dti: dti
        })
      });

      // console.log(response)

      const data = await response.json();
      if (data.predicted_score) {
        setPredictedScore(data.predicted_score);
        alert(`Predicted Score: ${data.predicted_score}`);
      } else {
        alert("Prediction failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error predicting future score.");
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen pb-12" ref={reportRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Credit Score Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Track and improve your financial health</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <RefreshCw size={16} className="mr-2" />
                Refresh Data
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleDownloadPDF}>
                <Download size={16} className="mr-2" />
                Export Report
              </button>
              <button
              onClick={handleFutureProjection}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              <Lightbulb size={16} className="mr-2" />
              Predict Future Score
            </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Credit Score */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Current Credit Score</h2>
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="relative">
                    <div className={`text-6xl font-bold ${getScoreColor()}`}>
                      {currentScore}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      {scoreChange.positive ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <ArrowUp size={12} className="mr-1" /> {scoreChange.value}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <ArrowDown size={12} className="mr-1" /> {scoreChange.value}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-500">{creditLevel}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
                    <div
                      className={`h-2.5 rounded-full ${currentScore >= 800 ? 'bg-emerald-600' :
                        currentScore >= 740 ? 'bg-green-600' :
                          currentScore >= 670 ? 'bg-blue-600' :
                            currentScore >= 580 ? 'bg-amber-500' : 'bg-red-600'
                        }`}
                      style={{ width: `${Math.min(100, (currentScore / 850) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between w-full mt-2 text-xs text-gray-500">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    {filteredData.length > 0
                      ? new Date(filteredData[filteredData.length - 1].date).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Credit Score Metrics */}
            <div className="mt-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Score Metrics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full p-2 bg-blue-100 mr-3">
                          <Activity size={16} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Score Change</span>
                      </div>
                      <div className="flex items-center">
                        {scoreChange.positive ? (
                          <span className="text-green-600 font-medium flex items-center">
                            +{scoreChange.value} <ArrowUp size={16} className="ml-1" />
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium flex items-center">
                            -{scoreChange.value} <ArrowDown size={16} className="ml-1" />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full p-2 bg-purple-100 mr-3">
                          <Calendar size={16} className="text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Tracking Period</span>
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium">
                          {filter === 'all' ? 'All Time' : `${filter} Days`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full p-2 bg-amber-100 mr-3">
                          <TrendingUp size={16} className="text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Data Points</span>
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium">{filteredData.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Score Recommendations */}
            {success && (
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Credit Recommendations</h2>
                  {loading ? (
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error loading recommendations</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{error}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Award size={20} className="text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Your Credit Score: {credit_score}</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <p>{recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Lightbulb size={20} className="text-indigo-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-indigo-800">AI Recommendation</h3>
                            <div className="mt-2 text-sm text-indigo-700">
                              <p>{mlRecommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {predictedScore && (
              <div className="mt-4 p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md shadow-sm">
                <p className="text-purple-700 font-semibold">
                  📈 Projected Credit Score (6 Months): {predictedScore}
                </p>
              </div>
            )}


            

          </div>

          {/* Right Column - Charts and History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Score Trend</h2>

                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-lg p-1 shadow-sm">
                      <button
                        onClick={() => setFilter('30')}
                        className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '30' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        30 Days
                      </button>
                      <button
                        onClick={() => setFilter('90')}
                        className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${filter === '90' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        90 Days
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
                        All
                      </button>
                    </div>
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          stroke="#9CA3AF"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis
                          domain={['dataMin - 50', 'dataMax + 50']}
                          stroke="#9CA3AF"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          width={35}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Reference lines for credit score ranges */}
                        {scoreRanges.map((range) => (
                          <ReferenceLine
                            key={range.value}
                            y={range.value}
                            stroke={range.color}
                            strokeDasharray="3 3"
                            strokeWidth={1}
                          >
                            <Label
                              value={range.label}
                              position="right"
                              fill={range.color}
                              fontSize={10}
                            />
                          </ReferenceLine>
                        ))}

                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#4F46E5"
                          strokeWidth={3}
                          dot={{ strokeWidth: 2, r: 4, stroke: "#4F46E5", fill: "#fff" }}
                          activeDot={{ r: 6, stroke: "#4338CA", strokeWidth: 2, fill: "#4F46E5" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-72 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">No score history data available.</p>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <RefreshCw size={16} className="mr-2" />
                        Refresh Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Credit Score History Table */}
            <div className="mt-6 bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Credit Score History</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View All <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              {filteredData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.slice(-7).reverse().map((item, index, array) => {
                        // Calculate change from previous record
                        const prevScore = index < array.length - 1 ? array[index + 1].score : item.score;
                        const scoreChange = item.score - prevScore;

                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(item.date).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.score}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {index < array.length - 1 && (
                                <span className={`font-medium flex items-center ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {scoreChange > 0 && '+'}
                                  {scoreChange}
                                  {scoreChange > 0 ?
                                    <ArrowUp size={14} className="ml-1" /> :
                                    scoreChange < 0 ? <ArrowDown size={14} className="ml-1" /> : null
                                  }
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center p-6">
                  <p className="text-gray-500">No history data available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreHistory;