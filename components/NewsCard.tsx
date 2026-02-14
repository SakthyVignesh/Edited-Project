'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Share2, ExternalLink, StickyNote, X, Save } from 'lucide-react';
import { NewsItem } from '@/lib/mockNews';
import { useVisuals } from './VisualContext';

interface NewsCardProps {
    news: NewsItem;
    isActive: boolean;
    onAutoFlip: () => void;
    isAutoFlipEnabled: boolean;
}

const NewsCard = memo(({ news, isActive, onAutoFlip, isAutoFlipEnabled }: NewsCardProps) => {
    const { accentColor } = useVisuals();
    const [progress, setProgress] = useState(0);
    const [showNote, setShowNote] = useState(false);
    const [note, setNote] = useState('');
    const [loadingNote, setLoadingNote] = useState(false);

    useEffect(() => {
        if (!isActive || !isAutoFlipEnabled || showNote) { // Pause progress if note is open
            setProgress(0);
            return;
        }

        const duration = 60000;
        const intervalTime = 1000;
        const increment = (intervalTime / duration) * 100;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    return 101;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [isActive, isAutoFlipEnabled, showNote]);

    useEffect(() => {
        if (progress > 100) {
            onAutoFlip();
        }
    }, [progress, onAutoFlip]);

    // Fetch note when modal opens
    useEffect(() => {
        if (showNote) {
            setLoadingNote(true);
            fetch(`/api/notes?id=${encodeURIComponent(news.id)}`)
                .then(res => res.json())
                .then(data => {
                    setNote(data.note || '');
                    setLoadingNote(false);
                })
                .catch(err => {
                    console.error("Failed to load note", err);
                    setLoadingNote(false);
                });
        }
    }, [showNote, news.id]);

    const saveNote = async () => {
        setLoadingNote(true);
        try {
            await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newsId: news.id, note })
            });
            setShowNote(false);
        } catch (error) {
            console.error("Failed to save note", error);
            alert("Failed to save note");
        } finally {
            setLoadingNote(false);
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden z-10">
            {/* Note Modal Overlay */}
            {showNote && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300" onClick={() => setShowNote(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-slate-900/90 border border-slate-700/50 w-full max-w-lg rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-light text-white flex items-center gap-3 tracking-wide">
                                <StickyNote className="text-accent-400" size={24} />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-200 to-accent-500 font-medium">Personal Notes</span>
                            </h3>
                            <button onClick={() => setShowNote(false)} className="text-slate-400 hover:text-white transition-colors duration-200">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6 space-y-3">
                            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold truncate">{news.source}</p>
                            <h4 className="text-sm font-medium text-slate-300 mb-2 truncate border-b border-slate-700 pb-2">{news.title}</h4>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Capture your insights..."
                                placeholder="Capture your insights..."
                                className="w-full h-48 bg-black/40 text-slate-200 p-4 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-accent-500/50 border border-slate-800 placeholder:text-slate-600 font-light leading-relaxed scrollbar-thin scrollbar-thumb-slate-700"
                                autoFocus
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowNote(false)}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveNote}
                                disabled={loadingNote}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-black font-semibold shadow-lg shadow-accent-500/20 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Save size={18} />
                                {loadingNote ? 'Saving...' : 'Save Insights'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-premium relative z-10 w-full max-w-2xl rounded-3xl p-8 md:p-12 flex flex-col min-h-[600px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-accent-300 uppercase shadow-sm backdrop-blur-sm">
                        {news.source}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 bg-black/20 px-3 py-1 rounded-full">
                        <Clock size={12} />
                        <span className="text-[10px] uppercase tracking-widest font-medium">{news.publishedAt}</span>
                    </div>
                </div>

                <div className="w-full aspect-[16/9] rounded-2xl mb-8 overflow-hidden shadow-2xl border border-white/5 group relative">
                    <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white leading-tight tracking-tight drop-shadow-md">
                    {news.title}
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex-grow overflow-y-auto pr-4 custom-scrollbar mb-8"
                >
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-pretty">
                        {news.description}
                    </p>
                </motion.div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex gap-4">
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10">
                            Read Full Story <ExternalLink size={14} />
                        </a>
                        <button
                            onClick={() => setShowNote(true)}
                            className={`p-2.5 rounded-full border border-white/10 text-slate-300 hover:text-${accentColor}-300 hover:border-${accentColor}-300/30 hover:bg-${accentColor}-400/10 transition-all duration-300 flex items-center gap-2 group`}
                            title="Take a note"
                        >
                            <StickyNote size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                    <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:rotate-12" title="Share">
                        <Share2 size={24} />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5 overflow-hidden rounded-b-3xl">
                    {isActive && isAutoFlipEnabled && (
                        <div className="h-full bg-gradient-to-r from-accent-300 to-accent-600 shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
                    )}
                </div>
            </motion.div>
        </div>
    );
});

NewsCard.displayName = 'NewsCard';
export default NewsCard;
