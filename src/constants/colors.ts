import { v4 } from 'uuid';

export interface Color {
    id: string;
    color: string;
    backgroundColor: string;
    textColor: string;
    name: string;
}

export const colors: Color[] = [
    {
        id: v4(),
        color: '#94a3b8',
        backgroundColor: '#f1f5f9',
        textColor: '#475569',
        name: 'Slate',
    },
    {
        id: v4(),
        color: '#9ca3af',
        backgroundColor: '#f1f5f9',
        textColor: '#4b5563',
        name: 'Gray',
    },
    {
        id: v4(),
        color: '#a8a29e',
        backgroundColor: '#f5f5f4',
        textColor: '#a8a29e',
        name: 'Stone',
    },
    {
        id: v4(),
        color: '#a8a29e',
        backgroundColor: '#f5f5f4',
        textColor: '#a8a29e',
        name: 'Stone',
    },
    {
        id: v4(),
        color: '#f87171',
        backgroundColor: '#fee2e2',
        textColor: '#dc2626',
        name: 'Red',
    },
    {
        id: v4(),
        color: '#fb923c',
        backgroundColor: '#ffedd5',
        textColor: '#ea580c',
        name: 'Orange',
    },
    {
        id: v4(),
        color: '#fbbf24',
        backgroundColor: '#fef3c7',
        textColor: '#d97706',
        name: 'Amber',
    },
    {
        id: v4(),
        color: '#facc15',
        backgroundColor: '#fef9c3',
        textColor: '#ca8a04',
        name: 'Yellow',
    },
    {
        id: v4(),
        color: '#a3e635',
        backgroundColor: '#ecfccb',
        textColor: '#65a30d',
        name: 'Lime',
    },
    {
        id: v4(),
        color: '#4ade80',
        backgroundColor: '#dcfce7',
        textColor: '#16a34a',
        name: 'Green',
    },
    {
        id: v4(),
        color: '#34d399',
        backgroundColor: '#d1fae5',
        textColor: '#059669',
        name: 'Emerald',
    },
    {
        id: v4(),
        color: '#2dd4bf',
        backgroundColor: '#ccfbf1',
        textColor: '#0d9488',
        name: 'Teal',
    },
    {
        id: v4(),
        color: '#22d3ee',
        backgroundColor: '#cffafe',
        textColor: '#0891b2',
        name: 'Cyan',
    },
    {
        id: v4(),
        color: '#38bdf8',
        backgroundColor: '#e0f2fe',
        textColor: '#0284c7',
        name: 'Sky',
    },
    {
        id: v4(),
        color: '#60a5fa',
        backgroundColor: '#dbeafe',
        textColor: '#2563eb',
        name: 'Blue',
    },
    {
        id: v4(),
        color: '#818cf8',
        backgroundColor: '#e0e7ff',
        textColor: '#4f46e5',
        name: 'Indigo',
    },
    {
        id: v4(),
        color: '#a78bfa',
        backgroundColor: '#ede9fe',
        textColor: '#7c3aed',
        name: 'Violet',
    },
    {
        id: v4(),
        color: '#c084fc',
        backgroundColor: '#f3e8ff',
        textColor: '#9333ea',
        name: 'Purple',
    },
    {
        id: v4(),
        color: '#e879f9',
        backgroundColor: '#fae8ff',
        textColor: '#c026d3',
        name: 'Fuchsia',
    },
    {
        id: v4(),
        color: '#f472b6',
        backgroundColor: '#fce7f3',
        textColor: '#db2777',
        name: 'Pink',
    },
    {
        id: v4(),
        color: '#fb7185',
        backgroundColor: '#ffe4e6',
        textColor: '#e11d48',
        name: 'Rose',
    },
];
