import React, { useState, useEffect } from 'react';

const ManageAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchAgents = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/agents`);
            const data = await res.json();
            setAgents(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="manage-agents">
            <div className="page-header">
                <h1>Gestion des Agents</h1>
                <button className="btn-add">+ Ajouter un agent</button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(a => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.prenom} {a.nom}</td>
                            <td>{a.email}</td>
                            <td>{a.telephone}</td>
                            <td><span className={`badge ${a.actif ? 'status-disponible' : 'status-vendu'}`}>{a.actif ? 'Actif' : 'Inactif'}</span></td>
                            <td className="actions">
                                <button className="btn-edit">Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAgents;
