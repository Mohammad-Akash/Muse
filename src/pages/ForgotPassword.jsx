import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Password reset link dispatched.');
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
          Reset Your Password
        </h1>
        <p className="text-xs text-[#6E5D7E] font-sans">
          Enter your registered email and we'll send a secure restoration link.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-6">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center mx-auto border border-[#EAE0F2]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#221430]">
              Check Your Inbox
            </h3>
            <p className="text-xs text-[#6E5D7E] leading-relaxed font-sans">
              We have dispatched recovery instructions to <strong>{email}</strong>. For demonstration purposes, you can proceed directly to reset your credentials.
            </p>
            <Link
              to="/reset-password"
              className="inline-block px-6 py-3 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              Simulate Password Reset →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">
                Account Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayesha@example.com"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF7FC] border border-[#E5D9EE] rounded-xl focus:outline-none focus:border-[#5D3891] font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-full transition-all shadow-md hover:shadow-lg mt-2"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#F3ECF8] text-center">
          <Link
            to="/login"
            className="text-xs text-[#6E5D7E] hover:text-[#5D3891] inline-flex items-center gap-1.5 font-medium font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
