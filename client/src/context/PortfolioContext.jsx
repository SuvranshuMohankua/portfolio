import React, { createContext, useContext, useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
    const [data, setData] = useState(portfolioData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        // No fetch needed for static data
        setLoading(false);
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
