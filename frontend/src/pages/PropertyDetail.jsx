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

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`);
                const data = await response.json();

                // Transform data to match component expectations
                const transformed = {
                    ...data,
                    title: data.titre,
                    price: data.prix,
                    status: data.statut,
                    amenities: data.commodites || [],
                    location: data.adresse,
                    area: data.surface,
                    bedrooms: data.chambres,
                    bathrooms: data.salles_de_bain,
                    yearBuilt: data.annee_construction,
                    images: data.photos && data.photos.length > 0 ? data.photos : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
                    position: [parseFloat(data.position_lat) || 25.1972, parseFloat(data.position_lng) || 55.2744],
                    agent: {
                        name: `${data.agent_prenom} ${data.agent_nom}`,
                        phone: data.agent_phone || '+971 50 123 4567',
                        image: data.agent_photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'
                    }
                };

                setProperty(transformed);
                setLoading(false);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching property:', error);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Chargement des détails de la propriété...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="container error-page">
                <h2>Propriété non trouvée</h2>
                <Link to="/properties" className="btn btn-primary">Retour au catalogue</Link>
            </div>
        );
    }

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
                                <span className={`badge ${property.status.toLowerCase().replace(' ', '-')}`}>{property.status}</span>
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
                            <h3>Caractéristiques Clés</h3>
                            <div className="features-grid">
                                <div className="feature-item">
                                    <span className="icon">🛏️</span>
                                    <div className="feature-info">
                                        <span className="label">Chambres</span>
                                        <span className="value">{property.bedrooms}</span>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🚿</span>
                                    <div className="feature-info">
                                        <span className="label">Salles de bain</span>
                                        <span className="value">{property.bathrooms}</span>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">📐</span>
                                    <div className="feature-info">
                                        <span className="label">Surface</span>
                                        <span className="value">{property.area} sqft</span>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🏗️</span>
                                    <div className="feature-info">
                                        <span className="label">Année</span>
                                        <span className="value">{property.yearBuilt}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="property-section">
                            <h3>Commodités</h3>
                            <div className="amenities-list">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="amenity-tag">
                                        <span className="check">✓</span> {amenity}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="property-section">
                            <h3>Localisation</h3>
                            <PropertyMap
                                position={property.position}
                                title={property.title}
                                location={property.location}
                            />
                        </section>
                    </div>

                    <aside className="sidebar">
                        <div className="agent-card">
                            <div className="agent-info">
                                <img src={property.agent.image} alt={property.agent.name} className="agent-image" />
                                <div>
                                    <h4>{property.agent.name}</h4>
                                    <p>Agent Immobilier de Luxe</p>
                                </div>
                            </div>
                            <div className="agent-contact">
                                <p className="phone">📞 {property.agent.phone}</p>
                            </div>
                            <div className="sidebar-actions">
                                <TelegramButton property={property} />
                                <button className="btn btn-outline">Contacter par Email</button>
                            </div>
                        </div>

                        <div className="property-summary">
                            <h4>Résumé de l'offre</h4>
                            <ul>
                                <li><span>ID Propriété</span> <span>DXB-{property.id}42</span></li>
                                <li><span>Type</span> <span>{property.type}</span></li>
                                <li><span>Statut</span> <span>Disponibilité Immédiate</span></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
