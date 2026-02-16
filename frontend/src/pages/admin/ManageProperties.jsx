import React, { useState, useEffect } from 'react';
import './ManageProperties.css';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProp, setEditingProp] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        type: 'Villa',
        prix: '',
        surface: '',
        adresse: '',
        chambres: '',
        salles_de_bain: '',
        chambres: 0,
        salles_de_bain: 0
    });

    const token = localStorage.getItem('token');

    const fetchProperties = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties`);
            const data = await res.json();
            setProperties(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchProperties();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingProp ? `${import.meta.env.VITE_API_BASE_URL}/properties/${editingProp.id}` : `${import.meta.env.VITE_API_BASE_URL}/properties`;
        const method = editingProp ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingProp(null);
                fetchProperties();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openEdit = (prop) => {
        setEditingProp(prop);
        setFormData({
            titre: prop.titre,
            type: prop.type,
            prix: prop.prix,
            surface: prop.surface,
            adresse: prop.adresse,
            chambres: prop.chambres,
            salles_de_bain: prop.salles_de_bain
        });
        setShowModal(true);
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="manage-properties">
            <div className="page-header">
                <h1>Gestion des Biens</h1>
                <button className="btn-add" onClick={() => { setEditingProp(null); setFormData({ titre: '', type: 'Villa', prix: '', surface: '', adresse: '', chambres: 0, salles_de_bain: 0 }); setShowModal(true); }}>
                    + Ajouter un bien
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Type</th>
                        <th>Prix (AED)</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.titre}</td>
                            <td>{p.type}</td>
                            <td>{parseFloat(p.prix).toLocaleString()}</td>
                            <td><span className={`badge status-${(p.statut || 'Disponible').toLowerCase()}`}>{p.statut || 'Disponible'}</span></td>
                            <td className="actions">
                                <button className="btn-edit" onClick={() => openEdit(p)}>Modifier</button>
                                <button className="btn-delete" onClick={() => handleDelete(p.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingProp ? 'Modifier' : 'Ajouter'} un bien</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" value={formData.titre} onChange={e => setFormData({ ...formData, titre: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="Villa">Villa</option>
                                        <option value="Appartement">Appartement</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Townhouse">Townhouse</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Prix</label>
                                    <input type="number" value={formData.prix} onChange={e => setFormData({ ...formData, prix: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Surface (sqft)</label>
                                    <input type="number" value={formData.surface} onChange={e => setFormData({ ...formData, surface: e.target.value })} />
                                </div>
                                <div className="form-group full-width">
                                    <label>Adresse</label>
                                    <input type="text" value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
                                <button type="submit" className="btn-submit">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProperties;
