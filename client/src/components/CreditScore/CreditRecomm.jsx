import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CreditRecomm = () => {
    


    return (
        <div>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-bold mb-4">Credit Score Recommendation</h2>
                <p className="text-gray-700 mb-4">Based on your recent transactions, here are some recommendations to improve your credit score:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Pay off any outstanding debts.</li>
                    <li>Keep your credit utilization below 30%.</li>
                    <li>Avoid opening new credit accounts unless necessary.</li>
                    <li>Regularly check your credit report for errors.</li>
                </ul>
            </div>
        </div>
    );
};

export default CreditRecomm;
