'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const TOPICS = [
    'World', 'Technology', 'Business', 'Space', 'Health', 'Science',
    'Politics', 'Sports', 'Entertainment', 'Automobile', 'Finance'
];

interface TopicPickerProps {
    onComplete: (topics: string[]) => void;
    initialSelected?: string[];
    onCancel?: () => void;
}

export default function TopicPicker({ onComplete, initialSelected = [], onCancel }: TopicPickerProps) {
    const [selected, setSelected] = useState<string[]>(initialSelected);

    const toggleTopic = (topic: string) => {
        setSelected(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 p-6 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass max-w-2xl w-full p-8 rounded-3xl flex flex-col max-h-[90vh]"
            >
                <h2 className="text-3xl font-bold text-white mb-2">Tailor Your Feed</h2>
                <p className="text-slate-400 mb-8">Select topics that interest you most.</p>

                <div className="flex flex-wrap gap-3 overflow-y-auto pr-2 no-scrollbar mb-8">
                    {TOPICS.map(topic => {
                        const isSelected = selected.includes(topic);
                        return (
                            <button
                                key={topic}
                                onClick={() => toggleTopic(topic)}
                                className={`px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${isSelected
                                    ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                    }`}
                            >
                                {topic}
                                {isSelected && <Check size={14} />}
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-4 mt-auto">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => onComplete(selected)}
                        disabled={selected.length === 0}
                        className="flex-2 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:bg-slate-100 transition-colors disabled:opacity-50"
                    >
                        {onCancel ? 'Update Preferences' : 'Start Flipping'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
