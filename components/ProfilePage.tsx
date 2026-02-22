'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { NewsItem } from '@/lib/mockNews';

interface ProfilePageProps {
    onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
    const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/saved-news')
            .then(res => res.json())
            .then(data => {
                setSavedNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch saved news", err);
                setLoading(false);
            });
    }, []);

    const removeNews = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await fetch('/api/saved-news', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            setSavedNews(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to remove news", error);
        }
    };

    return (
        <div className="relative w-full h-full min-h-screen bg-slate-950 text-white overflow-y-auto custom-scrollbar p-6 md:p-12 z-50">
            <div className="max-w-4xl mx-auto pt-16">
                <header className="flex items-center gap-4 mb-12">
                    <button
                        onClick={onBack}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">
                            Your Collections
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {savedNews.length} saved article{savedNews.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-slate-700 border-t-sky-500 rounded-full animate-spin"></div>
                    </div>
                ) : savedNews.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        <p>No saved news yet. Start exploring!</p>
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        className="space-y-3"
                    >
                        {savedNews.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    show: { opacity: 1, x: 0 }
                                }}
                                className="glass group flex items-center gap-4 p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-200"
                            >
                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 relative">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000';
                                        }}
                                    />
                                </div>

                                <div className="flex-grow min-w-0">
                                    <h3 className="text-sm font-medium text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                                        <span className="uppercase tracking-wider font-semibold text-slate-400">{item.source}</span>
                                        <span>•</span>
                                        <span>{item.publishedAt}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                        title="Read Article"
                                    >
                                        <ExternalLink size={14} />
                                    </a>

                                    <button
                                        onClick={(e) => removeNews(item.id, e)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                        title="Remove from saved"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
