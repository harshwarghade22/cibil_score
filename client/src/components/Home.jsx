import React, { useState } from 'react';
import { BarChart, LineChart, ShieldCheck, Award, TrendingUp, PieChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Understand & Optimize Your Credit Score
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              See how your financial decisions impact your credit score before you make them. Get personalized strategies to improve your score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/simulation" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Start Simulation
              </Link>
              {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                
              </button> */}
              <Link to='/recommendation' className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg border border-blue-200 transition-colors">
                Get Recommendations
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                Score Simulator
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Current Score:</span>
                  <span className="text-2xl font-bold text-blue-700">720</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition-colors">
                  <span>Open a new credit card</span>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">-15 pts</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition-colors">
                  <span>Pay off $5,000 in debt</span>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">+35 pts</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition-colors">
                  <span>Close oldest credit account</span>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">-45 pts</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                Run Full Simulation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Simulate Actions</h3>
              <p className="text-gray-700">
                Test different financial decisions before making them and see how they affect your score.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Predict Future Scores</h3>
              <p className="text-gray-700">
                Our ML models project how your score will evolve over time based on your actions.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Get Recommendations</h3>
              <p className="text-gray-700">
                Receive personalized strategies to improve your score based on your unique situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Why Use Our Simulator</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Make Smarter Financial Decisions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <ShieldCheck className="text-blue-600" size={18} />
                  </div>
                  <span className="text-gray-700">See the impact of applying for new credit</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <ShieldCheck className="text-blue-600" size={18} />
                  </div>
                  <span className="text-gray-700">Understand how closing accounts affects your history</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <ShieldCheck className="text-blue-600" size={18} />
                  </div>
                  <span className="text-gray-700">Learn the optimal credit utilization ratio</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                    <ShieldCheck className="text-blue-600" size={18} />
                  </div>
                  <span className="text-gray-700">Visualize the impact of late payments</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Score Improvement Timeline</h4>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <LineChart size={200} className="text-blue-300" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Score Breakdown</h4>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <PieChart size={200} className="text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your credit score?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Join thousands of users who have improved their credit scores using our simulator.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-blue-900 font-semibold mb-4">Get started for free</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition-colors">
                Create Account
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              No credit card required. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">Credit Score Simulator</h3>
            <p className="text-sm">Your path to better credit health</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;