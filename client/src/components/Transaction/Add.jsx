import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../actions/projectActions';
// import { addTransaction } from '../actions/transactionActions';

const Add = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const { loading, error, success } = transactionCreate;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction({ amount, type, description }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      {loading && <p>Processing...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Transaction Added!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default Add;
