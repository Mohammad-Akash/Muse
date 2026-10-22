import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccess(true);
    addToast('Your password has been successfully updated.');
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
          Establish New Password
        </h1>
        <p className="text-xs text-[#6E5D7E] font-sans">
          Please select a strong password for your client account.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-6">
        {success ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center mx-auto border border-[#EAE0F2]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#221430]">
              Password Updated
            </h3>
            <p className="text-xs text-[#6E5D7E] font-sans">
              Your credentials have been securely stored. You may now sign in.
            </p>
            <Link
              to="/login"
              className="inline-block px-7 py-3 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              Sign In to Your Account
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
                New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E5D7E] hover:text-[#221430]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-full transition-all shadow-md hover:shadow-lg mt-2"
            >
              Update Password
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#F3ECF8] text-center">
          <Link
            to="/login"
            className="text-xs text-[#6E5D7E] hover:text-[#5D3891] inline-flex items-center gap-1.5 font-medium font-sans"
          >
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
