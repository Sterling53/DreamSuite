import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DisclaimerProps {
  variant?: 'landing' | 'auth';
}

export function Disclaimer({ variant = 'landing' }: DisclaimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-xs ${
        variant === 'landing' 
          ? 'text-blue-200/80 max-w-xl mx-auto text-center mt-6'
          : 'text-blue-200/80 mt-4'
      }`}
    >
      <div className="flex items-start gap-1.5">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <p>
            <strong>Dream Interpretation:</strong> Interpretations are for entertainment and self-reflection only, not professional advice.
          </p>
          <p>
            <strong>Privacy:</strong> Dream entries are private and securely stored, accessible only to you.
          </p>
          <p>
            <strong>Medical Notice:</strong> For recurring nightmares or sleep issues, consult a healthcare professional.
          </p>
          <p className="text-[10px] opacity-75 mt-2">
            By using DreamSuite, you agree to these terms and our privacy policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
}