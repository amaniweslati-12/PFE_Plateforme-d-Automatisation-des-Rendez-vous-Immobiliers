import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        properties: 0,
        agents: 0,
        appointments: 0
    });

    useEffect(() => {
        // Fetch real stats from API
        const fetchStats = async () => {
            try {
                const [propsRes, agentsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/properties`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/agents`)
                ]);
                const props = await propsRes.json();
                const agents = await agentsRes.json();

                setStats({
                    properties: props.length,
                    agents: agents.length,
                    appointments: 0 // Will be updated later
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Tableau de bord</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🏠</div>
                    <div className="stat-info">
                        <h3>{stats.properties}</h3>
                        <p>Biens immobiliers</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>{stats.agents}</h3>
                        <p>Agents commerciaux</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-info">
                        <h3>{stats.appointments}</h3>
                        <p>Rendez-vous à venir</p>
                    </div>
                </div>
            </div>

            <div className="recent-activity">
                <h2>Activités récentes</h2>
                <div className="placeholder-card">
                    <p>Le journal d'activité sera affiché ici.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
