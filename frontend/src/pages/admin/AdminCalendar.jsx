import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalendar.css';

const AdminCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch appointments');
                const data = await res.json();
                setAppointments(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAppointments();
    }, [token]);

    useEffect(() => {
        const filtered = appointments.filter(app => {
            const appDate = new Date(app.date_heure);
            return appDate.toDateString() === date.toDateString();
        });
        setSelectedDateAppointments(filtered);
    }, [date, appointments]);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const hasApp = appointments.some(app =>
                new Date(app.date_heure).toDateString() === date.toDateString()
            );
            return hasApp ? <div className="appointment-dot"></div> : null;
        }
    };

    return (
        <div className="admin-calendar-page">
            <div className="page-header">
                <h1>Vue Calendrier</h1>
            </div>
            <div className="calendar-layout">
                <div className="calendar-card">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                        className="custom-calendar"
                    />
                </div>
                <div className="appointments-side">
                    <h3>📅 {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                    <div className="day-list">
                        {selectedDateAppointments.length > 0 ? (
                            selectedDateAppointments.map(app => (
                                <div key={app.id} className="app-item">
                                    <div className="app-time">{new Date(app.date_heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                                    <div className="app-info">
                                        <div className="app-client">{app.client_name}</div>
                                        <div className="app-property">{app.property_title}</div>
                                        <div className="app-agent">Agent: {app.agent_prenom} {app.agent_nom}</div>
                                    </div>
                                    <div className={`status-tag st-${app.statut.toLowerCase()}`}>{app.statut}</div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-day">
                                Aucun rendez-vous prévu pour cette journée.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;
