import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: 'Empty', score: 0, color: 'bg-neutral-200' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { label: 'Weak', score: 25, color: 'bg-rose-500' };
    if (score === 2) return { label: 'Moderate', score: 50, color: 'bg-[#5D3891]' };
    if (score === 3) return { label: 'Good', score: 75, color: 'bg-amber-600' };
    return { label: 'Strong & Secure', score: 100, color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must accept the terms & conditions.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register(formData.name, formData.email, formData.password);
      setLoading(false);
      if (res.success) {
        navigate('/account');
      } else {
        setError(res.message);
      }
    }, 400);
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
          Create Your Privilège Profile
        </h1>
        <p className="text-xs text-[#6E5D7E] font-sans">
          Join the circle for bespoke skin consultations, private sales, and order tracking.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Fatima Al-Zahra"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="fatima@example.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E5D7E] hover:text-[#221430]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-[#6E5D7E] font-medium font-sans">
                  <span>Strength</span>
                  <span>{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-[#EAE0F2]/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Repeat password"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-[#6E5D7E] font-sans">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-0.5 rounded border-[#E5D9EE] text-[#5D3891] focus:ring-[#5D3891]"
              />
              <span>
                I agree to the <Link to="/terms" className="underline hover:text-[#5D3891]">Terms of Service</Link> and <Link to="/privacy-policy" className="underline hover:text-[#5D3891]">Privacy Policy</Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5D3891] hover:bg-[#4A2578] disabled:opacity-50 text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-4"
          >
            {loading ? <span>Creating Account...</span> : <span>Create Account</span>}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F3ECF8] text-center text-xs text-[#6E5D7E] font-sans">
          <span>Already hold an account? </span>
          <Link to="/login" className="font-semibold text-[#5D3891] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
