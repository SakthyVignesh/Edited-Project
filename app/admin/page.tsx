'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Activity, Plus, Trash2, Key, Database } from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [key, setKey] = useState('');
    const [health, setHealth] = useState<any>(null);
    const [sources, setSources] = useState<any>(null);
    const [newSourceName, setNewSourceName] = useState('');
    const [newSourceUrl, setNewSourceUrl] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [accentColor, setAccentColor] = useState('amber');

    const ACCESS_KEY_STORAGE = 'admin_access_key';

    useEffect(() => {
        const storedKey = localStorage.getItem(ACCESS_KEY_STORAGE);
        if (storedKey) {
            setKey(storedKey);
            checkAuth(storedKey);
        }
    }, []);

    const checkAuth = async (inputKey: string) => {
        try {
            const res = await fetch('/admin-api/status', {
                headers: { 'x-admin-key': inputKey }
            });
            if (res.ok) {
                setIsAuthenticated(true);
                localStorage.setItem(ACCESS_KEY_STORAGE, inputKey);
                fetchData(inputKey);
            } else {
                if (res.status === 401) {
                    if (inputKey) alert('Invalid Access Key. Please check the server config.');
                } else if (res.status === 500 || res.status === 502 || res.status === 504) {
                    alert('Admin Server is NOT running. Please run: npm run admin');
                } else {
                    alert(`Login Failed: Server returned ${res.status}`);
                }
            }
        } catch (e) {
            console.error(e);
            alert('Connection Error. Is the Admin Server running?');
        }
    };

    const fetchData = async (authKey: string) => {
        // Fetch Health
        fetch('/admin-api/status', { headers: { 'x-admin-key': authKey } })
            .then(res => res.json())
            .then(setHealth);

        // Fetch Sources
        fetch('/admin-api/sources', { headers: { 'x-admin-key': authKey } })
            .then(res => res.json())
            .then(setSources);

        // Fetch Visuals
        fetch('/admin-api/visuals', { headers: { 'x-admin-key': authKey } })
            .then(res => res.json())
            .then(data => {
                if (data.accentColor) setAccentColor(data.accentColor);
            });
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        checkAuth(key);
    };

    const addSource = async () => {
        if (!newSourceName || !newSourceUrl) return;
        await fetch('/admin-api/sources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-key': key
            },
            body: JSON.stringify({ name: newSourceName, url: newSourceUrl })
        });
        setNewSourceName('');
        setNewSourceUrl('');
        fetchData(key);
    };

    const deleteSource = async (name: string) => {
        if (!confirm(`Delete ${name}?`)) return;
        await fetch(`/admin-api/sources/${encodeURIComponent(name)}`, {
            method: 'DELETE',
            headers: { 'x-admin-key': key }
        });
        fetchData(key);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-4 bg-amber-500/10 rounded-full mb-4 ring-1 ring-amber-500/30">
                            <Shield className="text-amber-500" size={32} />
                        </div>
                        <h1 className="text-2xl font-light text-white tracking-widest uppercase">Admin System</h1>
                        <p className="text-zinc-500 text-sm mt-2">Secure Access Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="password"
                                value={key}
                                onChange={e => setKey(e.target.value)}
                                placeholder="Enter Access Key"
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                            />
                        </div>
                        <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
                            Unlock Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-amber-500/30">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-12 bg-${accentColor}-500 rounded-full`} />
                        <h1 className="text-3xl font-light tracking-wider">SYSTEM <span className="font-bold">ADMINISTRATION</span></h1>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Overview</button>
                        <button onClick={() => setActiveTab('sources')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'sources' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Data Sources</button>
                        <button onClick={() => setActiveTab('visuals')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'visuals' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Visuals</button>
                        <button onClick={() => { localStorage.removeItem(ACCESS_KEY_STORAGE); setIsAuthenticated(false); }} className="px-4 py-2 text-red-400 text-sm hover:text-red-300">Logout</button>
                    </div>
                </header>

                <AnimatePresence mode='wait'>
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {/* Health Stats */}
                            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card title="System Status" icon={<Activity className="text-green-500" />} value={health?.status || 'Offline'} subtext={`Updated: ${health?.timestamp || '-'}`} />
                                <Card title="Memory Usage" icon={<Server className="text-blue-500" />} value={health ? `${health.memory_usage.percent}%` : '-'} subtext={`Available: ${health?.memory_usage?.available_gb} GB`} />
                                <Card title="Active Sources" icon={<Database className="text-purple-500" />} value={health?.sources_count || '0'} subtext="RSS Feeds being monitored" />
                            </div>

                            {/* Detailed Disk */}
                            <div className="col-span-1 md:col-span-2 bg-zinc-900/30 border border-white/5 p-8 rounded-3xl">
                                <h3 className="text-lg font-medium text-zinc-300 mb-6">Storage Metrics</h3>
                                {health && (
                                    <div className="space-y-4">

                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${accentColor}-600 bg-${accentColor}-200`}>
                                                        Disk Space
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-xs font-semibold inline-block text-${accentColor}-600`}>
                                                        {health.disk_usage.percent}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-900/20">
                                                <div style={{ width: `${health.disk_usage.percent}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${accentColor}-500`}></div>
                                            </div>
                                            <p className="text-xs text-zinc-500">Free: {health.disk_usage.free_gb} GB / Total: {health.disk_usage.total_gb} GB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'sources' && (
                        <motion.div
                            key="sources"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl mb-8">
                                <h3 className="text-lg font-medium text-zinc-300 mb-6 flex items-center gap-2"><Plus size={20} /> Add New Source</h3>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        value={newSourceName}
                                        onChange={e => setNewSourceName(e.target.value)}
                                        placeholder="Source Name (e.g. Wired)"
                                        className={`flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:border-${accentColor}-500/50`}
                                    />
                                    <input
                                        value={newSourceUrl}
                                        onChange={e => setNewSourceUrl(e.target.value)}
                                        placeholder="RSS Feed URL"
                                        className={`flex-[2] bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:border-${accentColor}-500/50`}
                                    />
                                    <button onClick={addSource} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors whitespace-nowrap">
                                        Add Feed
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sources && Object.entries(sources).map(([name, url]) => (
                                    <div key={name as string} className={`bg-zinc-900/50 border border-white/5 p-6 rounded-2xl group hover:border-${accentColor}-500/30 transition-colors relative`}>
                                        <button onClick={() => deleteSource(name as string)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                        <h4 className="font-medium text-white mb-2">{name as string}</h4>
                                        <p className="text-xs text-zinc-500 truncate font-mono">{url as string}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'visuals' && (
                        <motion.div
                            key="visuals"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-medium text-zinc-300 mb-6">Theme Customization</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm text-zinc-500 mb-3 uppercase tracking-wider">Accent Color</label>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { name: 'amber', class: 'bg-amber-500' },
                                            { name: 'rose', class: 'bg-rose-500' },
                                            { name: 'cyan', class: 'bg-cyan-500' },
                                            { name: 'emerald', class: 'bg-emerald-500' },
                                            { name: 'violet', class: 'bg-violet-500' }
                                        ].map(color => (
                                            <button
                                                key={color.name}
                                                onClick={() => {
                                                    setAccentColor(color.name); // Update local state immediately for better UX
                                                    fetch('/admin-api/visuals', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
                                                        body: JSON.stringify({ accentColor: color.name })
                                                    }).then(() => alert(`Theme updated to ${color.name}`));
                                                }}
                                                className={`w-12 h-12 rounded-full ${color.class} ring-2 ring-offset-2 ring-offset-zinc-900 ${accentColor === color.name ? 'ring-white' : 'ring-transparent'} hover:scale-110 transition-transform`}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                                    <p className="text-zinc-500 text-sm mb-4">Preview</p>
                                    <div className={`w-full h-32 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 relative overflow-hidden ring-1 ring-${accentColor}-500`}>
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                                            <span className="text-white font-medium">Glassmorphism</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Card({ title, icon, value, subtext }: any) {
    return (
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">{title}</span>
                {icon}
            </div>
            <div>
                <div className="text-3xl font-light text-white mb-1">{value}</div>
                <div className="text-xs text-zinc-600">{subtext}</div>
            </div>
        </div>
    )
}
