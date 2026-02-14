'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const VisualContext = createContext({
    accentColor: 'amber',
    theme: 'dark'
});

export const useVisuals = () => useContext(VisualContext);

export function VisualProvider({ children }: { children: React.ReactNode }) {
    const [accentColor, setAccentColor] = useState('amber');
    const [theme, setTheme] = useState('dark');

    const colorPalettes: Record<string, Record<string, string>> = {
        amber: {
            '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d', '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706', '700': '#b45309'
        },
        rose: {
            '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af', '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c'
        },
        cyan: {
            '100': '#cffafe', '200': '#a5f3fc', '300': '#67e8f9', '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2', '700': '#0e7490'
        },
        emerald: {
            '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857'
        },
        violet: {
            '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd', '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9'
        }
    };

    useEffect(() => {
        fetch('/api/visuals', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                console.log("VisualContext received settings:", data);
                if (data.accentColor) setAccentColor(data.accentColor);
                if (data.theme) setTheme(data.theme);
            })
            .catch(err => console.error("Failed to load visuals", err));
    }, []);

    useEffect(() => {
        const palette = colorPalettes[accentColor] || colorPalettes.amber;
        const root = document.documentElement;

        Object.entries(palette).forEach(([shade, value]) => {
            root.style.setProperty(`--accent-${shade}`, value);
        });
    }, [accentColor]);

    return (
        <VisualContext.Provider value={{ accentColor, theme }}>
            {children}
        </VisualContext.Provider>
    );
}
