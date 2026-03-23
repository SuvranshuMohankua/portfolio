import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await api.getPortfolio();
            setData(result);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch portfolio data:', err);
            setError('Failed to load portfolio data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refresh = () => fetchData();

    return (
        <PortfolioContext.Provider value={{ data, loading, error, refresh, setData }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const ctx = useContext(PortfolioContext);
    if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider');
    return ctx;
}
