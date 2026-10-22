import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/account');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    setEmail('ayesha.malik@example.com');
    setPassword('Mujer2026!');
    login('ayesha.malik@example.com', 'Mujer2026!');
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-serif text-3xl tracking-[0.28em] text-[#221430] font-normal block">
          Glowora
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D3891] block">
          Haute Cosmétique
        </span>
        <h1 className="font-serif text-2xl font-normal text-[#221430] pt-2">
          Client Privilège Sign In
        </h1>
        <p className="text-xs text-[#6E5D7E] font-sans">
          Access your bespoke beauty profile, orders, and saved addresses.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-6">
        
        {/* Demo Fast Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-[#FAF7FC] hover:bg-[#F3ECF8] border border-[#EAE0F2] text-[#5D3891] text-xs font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-[#5D3891]" />
          <span>Fill Demo VIP Account (Ayesha Malik)</span>
        </button>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayesha@example.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#221430] font-sans">Password *</label>
              <Link to="/forgot-password" className="text-[11px] text-[#5D3891] hover:underline font-sans">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E5D7E] hover:text-[#221430]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5D3891] hover:bg-[#4A2578] disabled:opacity-50 text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-4"
          >
            {loading ? <span>Authenticating...</span> : <span>Sign In to Privilège</span>}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F3ECF8] text-center text-xs text-[#6E5D7E] font-sans">
          <span>New to Maison Glowora? </span>
          <Link to="/register" className="font-semibold text-[#5D3891] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
