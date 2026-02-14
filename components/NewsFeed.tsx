'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockNews } from '@/lib/mockNews';
import NewsCard from './NewsCard';
import GoogleAuth from './GoogleAuth';
import TopicPicker from './TopicPicker';
import { AppRoute, UserState } from '@/lib/types';
import { Zap, ZapOff, User } from 'lucide-react';

export default function NewsFeed() {
    const [route, setRoute] = useState<AppRoute>(AppRoute.AUTH);
    const [user, setUser] = useState<UserState | null>(null);
    const [showPreferences, setShowPreferences] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoFlipEnabled, setIsAutoFlipEnabled] = useState(true);
    const lastScrollTime = useRef(0);

    // Persist and restore state
    useEffect(() => {
        const savedUser = localStorage.getItem('flipnews_user');
        const savedRoute = localStorage.getItem('flipnews_route');
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedRoute) setRoute(savedRoute as AppRoute);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('flipnews_user', JSON.stringify(user));
        }
        localStorage.setItem('flipnews_route', route);
    }, [user, route]);

    const goToNext = useCallback(() => {
        if (isSyncing) return;
        setCurrentIndex(prev => (prev < mockNews.length - 1 ? prev + 1 : 0));
    }, [isSyncing]);

    const goToPrev = useCallback(() => {
        if (isSyncing || currentIndex === 0) return;
        setCurrentIndex(prev => prev - 1);
    }, [currentIndex, isSyncing]);

    const handleLogin = (googleUser: { name: string; email: string; photoUrl: string }) => {
        const newUser = { ...googleUser, isAuthenticated: true, interests: [] };
        setUser(newUser);
        setRoute(AppRoute.INTERESTS);
    };

    const handleTopicsUpdate = async (topics: string[]) => {
        if (user) {
            setUser({ ...user, interests: topics });
            setRoute(AppRoute.FEED);
            setShowPreferences(false);
            setIsSyncing(true);

            try {
                const response = await fetch('/api/sync-news', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topics }),
                });
                const data = await response.json();
                if (data.success) {
                    // Full reload to pick up new mockNews data
                    // Persistent state in localStorage will restore login
                    window.location.reload();
                } else {
                    console.error('Sync failed:', data.error);
                }
            } catch (error) {
                console.error('Failed to sync news:', error);
            } finally {
                setIsSyncing(false);
            }
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (route !== AppRoute.FEED || isSyncing) return;
        const now = Date.now();
        if (now - lastScrollTime.current < 800) return;

        if (Math.abs(e.deltaY) > 30) {
            lastScrollTime.current = now;
            e.deltaY > 0 ? goToNext() : goToPrev();
        }
    };

    useEffect(() => {
        if (route !== AppRoute.FEED || isSyncing) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') goToNext();
            if (e.key === 'ArrowUp') goToPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev, route, isSyncing]);

    if (route === AppRoute.AUTH) return <GoogleAuth onLogin={handleLogin} />;
    if (route === AppRoute.INTERESTS) return <TopicPicker onComplete={handleTopicsUpdate} />;

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950" onWheel={handleWheel}>
            {/* Global Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mockNews[currentIndex]?.imageUrl}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{
                            backgroundImage: `url(${mockNews[currentIndex]?.imageUrl})`,
                            filter: 'blur(40px) brightness(0.4)'
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Navbar Integration */}
            <div className="fixed top-0 left-0 right-0 z-[60] p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                    <div className="w-8 h-8 bg-accent-500 rounded flex items-center justify-center font-black text-white">F</div>
                    <span className="font-bold text-white tracking-tight">FlipNews</span>
                </div>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <button
                        onClick={() => setIsAutoFlipEnabled(!isAutoFlipEnabled)}
                        className={`glass flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${isAutoFlipEnabled ? 'text-accent-400' : 'text-slate-500'}`}
                    >
                        {isAutoFlipEnabled ? <Zap size={12} fill="currentColor" /> : <ZapOff size={12} />}
                        {isAutoFlipEnabled ? 'AUTO' : 'MANUAL'}
                    </button>

                    <button
                        onClick={() => setShowPreferences(true)}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center overflow-hidden border-2 border-slate-700 hover:border-accent-500 transition-colors"
                    >
                        {user?.photoUrl ? <img src={user.photoUrl} alt="User" /> : <User size={20} className="text-slate-400" />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.5 }}
                    className="absolute inset-0"
                >
                    <NewsCard news={mockNews[currentIndex]} isActive={true} onAutoFlip={goToNext} isAutoFlipEnabled={isAutoFlipEnabled} />
                </motion.div>
            </AnimatePresence>

            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
                {mockNews.length <= 15 ? (
                    mockNews.map((_, idx) => (
                        <div key={idx} className={`w-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'h-6 bg-accent-400' : 'h-1 bg-slate-800'}`} />
                    ))
                ) : (
                    <div className="h-48 w-1 bg-slate-800 rounded-full relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-accent-400 rounded-full"
                            animate={{
                                height: `${100 / mockNews.length}%`,
                                y: `${(currentIndex / mockNews.length) * 100}%`
                            }}
                            style={{ height: `${100 / mockNews.length}%` }}
                        />
                    </div>
                )}
            </div>

            {isSyncing && (
                <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-sky-500/10 border-t-accent-500 rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2">Personalizing Your Feed</h3>
                    <p className="text-slate-400">Fetching the latest news for your topics...</p>
                </div>
            )}

            {showPreferences && <TopicPicker initialSelected={user?.interests} onComplete={handleTopicsUpdate} onCancel={() => setShowPreferences(false)} />}
        </div>
    );
}
