import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess: (user: { email: string }) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({ email });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-[#FE2C55]/20"
          >
            <Sparkles className="text-white w-10 h-10" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#161823] tracking-tighter uppercase italic">
              TYDS
            </h1>
            <p className="text-[#8A8B91] font-medium">
              {isLogin ? 'Bon retour parmi nous !' : 'Rejoins la communauté TYDS'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#8A8B91] group-focus-within:text-[#FE2C55] transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-[#F1F1F2] border-2 border-transparent focus:border-[#FE2C55] focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                placeholder="Adresse email"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#8A8B91] group-focus-within:text-[#FE2C55] transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-[#F1F1F2] border-2 border-transparent focus:border-[#FE2C55] focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FE2C55] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-[#FE2C55]/20 flex items-center justify-center gap-2 hover:bg-[#E62A4D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Se connecter' : 'S\'inscrire'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-[#161823] hover:text-[#FE2C55] transition-colors"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>

        {/* Trust Badge */}
        <div className="pt-8 flex items-center justify-center gap-2 text-[#8A8B91]">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Données cryptées & hébergées en Suisse 🇨🇭</span>
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FE2C55]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#25F4EE]/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};
