// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { listTransactions } from '../../actions/projectActions'
// // import { listTransactions } from '../actions/transactionActions'

// const List = () => {
//   const dispatch = useDispatch()

//   const { loading, error, transactions } = useSelector((state) => state.transactionList)
//   console.log(loading)
//   console.log(error)
//   console.log(transactions)

//   useEffect(() => {
//     dispatch(listTransactions())
//   }, [dispatch])

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <ul className="space-y-2">
//           {transactions?.map((tx) => (
//             <li
//               key={tx.id}
//               className="bg-white shadow-md p-3 rounded border flex justify-between"
//             >
//               <span>{tx.description}</span>
//               <span className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
//                 ₹{tx.amount}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default List


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTransactions } from '../../actions/projectActions';

const List = () => {
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector((state) => state.transactionList);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    dispatch(listTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions?.length) {
      const balance = transactions.reduce((sum, tx) => {
        const amount = parseFloat(tx.amount);
        return tx.type === 'credit' ? sum + amount : sum - amount;
      }, 0);
      setTotalBalance(balance);
    }
  }, [transactions]);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
          <div className="text-gray-500">Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with balance */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Your Transactions</h2>
          <div className="text-right">
            <p className="text-white text-sm opacity-75">Current Balance</p>
            <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-100' : 'text-red-100'}`}>
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Transactions list */}
      <div className="divide-y divide-gray-100">
        {transactions?.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p>No transactions found.</p>
            <p className="text-sm mt-2">Your financial activity will appear here.</p>
          </div>
        ) : (
          transactions?.map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {tx.type === 'credit' ? (
                      <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-10.293a1 1 0 00-1.414 1.414L10.586 10l-2.293 2.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-semibold ${
                    tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{tx.type}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Summary footer */}
      {transactions?.length > 0 && (
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total transactions: {transactions.length}</span>
            <span>Last updated: {formatDate(new Date().toISOString())}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;