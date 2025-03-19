import { authenticated } from '@/store/atoms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const LandingPage = () => {
  const navigate = useNavigate();
  const athed = useRecoilValue(authenticated);

  useEffect(() => {
    if (athed) {
      navigate('/home');
    }
  }, [athed, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">📘 ForceRight</h1>
        <p className="text-lg max-w-2xl animate-fade-in">
          Document every step of your competitive programming journey. Analyze your performance, track your progress, and become a better problem solver.
        </p>
        <div className="mt-8 animate-fade-in">
          <button
            onClick={() => navigate('/auth')}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="ml-4 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Why Use CP Practice & Analytics?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">📄 Document Your Process</h3>
            <p>
              Record your initial thoughts, logic, implementation, and gaps for every problem you solve.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">📊 Analyze Your Performance</h3>
            <p>
              Get detailed analytics on your problem-solving skills, including time spent, accuracy, and improvement areas.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">🚀 Track Your Progress</h3>
            <p>
              Visualize your growth over time with charts and stats that highlight your strengths and weaknesses.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Step 1: Document</h3>
            <p>Write down your thoughts, logic, and implementation for each problem.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Step 2: Analyze</h3>
            <p>Review your performance and identify gaps in your problem-solving process.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Step 3: Improve</h3>
            <p>Use insights to refine your skills and track your progress over time.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Level Up Your CP Skills?</h2>
        <p className="mb-8">Start documenting and analyzing your journey today!</p>
        <button
          onClick={() => navigate('/auth')}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>© 2025 CP Practice & Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;