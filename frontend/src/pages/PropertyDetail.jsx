import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyGallery from '../components/PropertyGallery';
import PropertyMap from '../components/PropertyMap';
import TelegramButton from '../components/TelegramButton';
import './PropertyDetail.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`);
                if (!response.ok) throw new Error('Propriété introuvable');
                const data = await response.json();

                const parseArray = (val) => {
                    if (Array.isArray(val)) return val;
                    if (typeof val === 'string') return val.split(',').map(s => s.trim());
                    return [];
                };

                const photos = parseArray(data.photos);
                const amenities = parseArray(data.amenities);
                const agentName = (data.agent_prenom || data.agent_nom)
                    ? `${data.agent_prenom || ''} ${data.agent_nom || ''}`.trim()
                    : "Équipe Dubai Luxury";

                const transformed = {
                    ...data,
                    title: data.titre || 'Propriété de Luxe',
                    description: data.description || 'Description à venir.',
                    price: parseFloat(data.prix) || 0,
                    status: data.statut || 'Disponible',
                    type: data.type || 'Villa',
                    amenities: amenities,
                    location: data.adresse || 'Dubaï, UAE',
                    area: data.surface || 0,
                    bedrooms: data.chambres || 0,
                    bathrooms: data.salles_de_bain || 0,
                    yearBuilt: data.annee_construction || 2024,
                    images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
                    position: [parseFloat(data.position_lat) || 25.1972, parseFloat(data.position_lng) || 55.2744],
                    agent: {
                        name: agentName,
                        phone: data.agent_phone || '+971 50 123 4567',
                        image: data.agent_photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'
                    }
                };

                setProperty(transformed);
                setLoading(false);
                window.scrollTo(0, 0);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency', currency: 'AED', minimumFractionDigits: 0
        }).format(price);
    };

    if (loading) return <div className="loading-container"><div className="loader"></div><p>Chargement des détails...</p></div>;
    if (error || !property) return <div className="container error-page" style={{ padding: '100px 0', textAlign: 'center' }}><h2>{error || 'Non trouvé'}</h2><Link to="/properties" className="btn btn-primary">Retour au catalogue</Link></div>;

    return (
        <div className="property-detail-page">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Accueil</Link> / <Link to="/properties">Propriétés</Link> / <span>{property.title}</span>
                </nav>

                <div className="property-header">
                    <div className="header-main">
                        <div className="title-area">
                            <div className="status-badges">
                                <span className={`badge ${property.status?.toLowerCase()?.replace(' ', '-') || 'available'}`}>{property.status}</span>
                                <span className="badge type">{property.type}</span>
                            </div>
                            <h1>{property.title}</h1>
                            <p className="location">📍 {property.location}</p>
                        </div>
                        <div className="price-area">
                            <span className="price-label">Prix</span>
                            <h2 className="price-value">{formatPrice(property.price)}</h2>
                        </div>
                    </div>
                </div>

                <div className="property-content-layout">
                    <div className="main-content">
                        <PropertyGallery images={property.images} />

                        <section className="property-section">
                            <h3>Description</h3>
                            <p className="description-text">{property.description}</p>
                        </section>

                        <section className="property-section">
                            <h3>Détails Supplémentaires</h3>
                            <div className="facts-grid">
                                <div className="fact-item"><span className="fact-label">ID Propriété</span><span className="fact-value">DXB-{property.id}42</span></div>
                                <div className="fact-item"><span className="fact-label">Prix</span><span className="fact-value">{formatPrice(property.price)}</span></div>
                                <div className="fact-item"><span className="fact-label">Surface</span><span className="fact-value">{property.area} sqft</span></div>
                                <div className="fact-item"><span className="fact-label">Chambres</span><span className="fact-value">{property.bedrooms}</span></div>
                                <div className="fact-item"><span className="fact-label">Salles de bain</span><span className="fact-value">{property.bathrooms}</span></div>
                                <div className="fact-item"><span className="fact-label">Année Built</span><span className="fact-value">{property.yearBuilt}</span></div>
                                <div className="fact-item"><span className="fact-label">Type</span><span className="fact-value">{property.type}</span></div>
                                <div className="fact-item"><span className="fact-label">Statut</span><span className="fact-value">{property.status}</span></div>
                            </div>
                        </section>

                        <section className="property-section">
                            <h3>Localisation</h3>
                            <PropertyMap position={property.position} title={property.title} location={property.location} />
                        </section>

                        <section className="property-section contact-section">
                            <h3>Planifier une Visite</h3>
                            <p>Intéressé ? Laissez-nous vos coordonnées.</p>
                            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group"><label>Nom</label><input type="text" placeholder="Votre nom" required /></div>
                                    <div className="form-group"><label>Email</label><input type="email" placeholder="votre@email.com" required /></div>
                                </div>
                                <div className="form-group"><label>Message</label><textarea placeholder="Je souhaite visiter ce bien..." rows="4"></textarea></div>
                                <button type="submit" className="btn btn-primary w-100">Envoyer la demande</button>
                            </form>
                        </section>
                    </div>

                    <aside className="sidebar">
                        <div className="agent-card">
                            <div className="agent-info">
                                <img src={property.agent?.image} alt={property.agent?.name} className="agent-image" />
                                <div><h4>{property.agent?.name}</h4><p>Agent de Luxe</p></div>
                            </div>
                            <div className="agent-contact"><p className="phone">📞 {property.agent?.phone}</p></div>
                            <div className="sidebar-actions">
                                <TelegramButton property={property} />
                                <button className="btn btn-outline w-100" style={{ marginTop: '10px' }}>Contacter par Email</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="mobile-sticky-bar">
                <div className="sticky-content">
                    <div className="sticky-price">
                        <span className="label">Prix</span>
                        <span className="value">{formatPrice(property.price)}</span>
                    </div>
                    <TelegramButton property={property} compact={true} />
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
