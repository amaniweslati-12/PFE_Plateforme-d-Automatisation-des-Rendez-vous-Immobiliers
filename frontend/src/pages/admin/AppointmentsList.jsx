import React, { useState, useEffect } from 'react';

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setAppointments(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [token]);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="appointments-list">
            <div className="page-header">
                <h1>Rendez-vous</h1>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Date & Heure</th>
                        <th>Client</th>
                        <th>Bien</th>
                        <th>Agent</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.id}>
                            <td>{new Date(app.date_heure).toLocaleString()}</td>
                            <td>{app.client_name}</td>
                            <td>{app.property_title}</td>
                            <td>{app.agent_prenom} {app.agent_nom}</td>
                            <td><span className={`badge status-${app.statut.toLowerCase()}`}>{app.statut}</span></td>
                        </tr>
                    ))}
                    {appointments.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                Aucun rendez-vous trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsList;
