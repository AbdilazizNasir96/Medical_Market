import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group fixed top-20 left-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500/90 to-pink-500/90 hover:from-purple-600 hover:to-pink-600 backdrop-blur-xl text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-white/20"
    >
      <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
};

export default BackButton;
