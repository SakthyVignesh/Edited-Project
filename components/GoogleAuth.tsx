'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GoogleAuthProps {
    onLogin: (user: { name: string; email: string; photoUrl: string }) => void;
}

export default function GoogleAuth({ onLogin }: GoogleAuthProps) {
    const handleMockLogin = () => {
        onLogin({
            name: 'John Doe',
            email: 'john@example.com',
            photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
        });
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-10 rounded-3xl max-w-md w-full text-center"
            >
                <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center font-black text-3xl mx-auto mb-8 shadow-lg shadow-sky-500/20">
                    F
                </div>

                <h1 className="text-3xl font-bold mb-4 text-white">Welcome to FlipNews</h1>
                <p className="text-slate-400 mb-10 leading-relaxed">
                    Stay updated with the world in 60 seconds. Personalized news at your fingertips.
                </p>

                <button
                    onClick={handleMockLogin}
                    className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                >
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
                    Continue with Google
                </button>

                <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-medium">
                    Secure • Personalized • Fast
                </p>
            </motion.div>
        </div>
    );
}
