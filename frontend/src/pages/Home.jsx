import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TelegramButton from '../components/TelegramButton';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();

    // Sample featured properties (Sync prices with numerical values for TelegramButton)
    const featuredProperties = [
        {
            id: 1,
            title: 'Luxury Penthouse in Downtown Dubai',
            location: t('locations.downtown'),
            price: 15500000,
            bedrooms: 4,
            bathrooms: 5,
            area: 4500,
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            type: t('propertyTypes.penthouse'),
            status: 'For Sale'
        },
        {
            id: 2,
            title: 'Beachfront Villa in Palm Jumeirah',
            location: t('locations.palm'),
            price: 28000000,
            bedrooms: 6,
            bathrooms: 7,
            area: 8500,
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            type: t('propertyTypes.villa'),
            status: 'For Sale'
        },
        {
            id: 3,
            title: 'Modern Apartment in Dubai Marina',
            location: t('locations.marina'),
            price: 3200000,
            bedrooms: 2,
            bathrooms: 3,
            area: 1800,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            type: t('propertyTypes.apartment'),
            status: 'For Sale'
        }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <span className="hero-badge">{t('hero.badge')}</span>
                    <h1 className="hero-title">
                        {t('hero.title')}
                        <span className="text-gradient"> {t('hero.titleGradient')}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {t('hero.subtitle')}
                    </p>
                    <div className="hero-actions">
                        <Link to="/properties" className="btn btn-primary btn-large">
                            {t('hero.exploreBtn')}
                            <span>→</span>
                        </Link>
                        <Link to="/contact" className="btn btn-secondary btn-large">
                            {t('hero.scheduleBtn')}
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">{t('stats.properties')}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">1,200+</div>
                            <div className="stat-label">{t('stats.clients')}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">15+</div>
                            <div className="stat-label">{t('stats.experience')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">{t('featured.badge')}</span>
                        <h2>{t('featured.title')}</h2>
                        <p>{t('featured.subtitle')}</p>
                    </div>

                    <div className="properties-grid">
                        {featuredProperties.map(property => (
                            <div key={property.id} className="property-card">
                                <div className="property-image">
                                    <img src={property.image} alt={property.title} />
                                    <div className="property-badge">{property.type}</div>
                                    <button className="property-favorite" aria-label={t('property.favorite')}>
                                        ♡
                                    </button>
                                </div>
                                <div className="property-content">
                                    <div className="property-location">📍 {property.location}</div>
                                    <h3 className="property-title">{property.title}</h3>
                                    <div className="property-features">
                                        <span>🛏️ {property.bedrooms} {t('property.beds')}</span>
                                        <span>🚿 {property.bathrooms} {t('property.baths')}</span>
                                        <span>📐 {property.area} {t('property.sqft')}</span>
                                    </div>
                                    <div className="property-footer">
                                        <div className="property-price">
                                            <span className="price-label">{t('property.price')}</span>
                                            <span className="price-value">{formatPrice(property.price)}</span>
                                        </div>
                                        <div className="card-actions">
                                            <Link to={`/properties/${property.id}`} className="btn-view">
                                                {t('property.viewDetails')} →
                                            </Link>
                                            <TelegramButton property={property} compact={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/properties" className="btn btn-primary">
                            {t('featured.viewAll')}
                        </Link>
                    </div>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="why-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">{t('whyUs.badge')}</span>
                        <h2>{t('whyUs.title')}</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h3>{t('whyUs.premium.title')}</h3>
                            <p>{t('whyUs.premium.desc')}</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>{t('whyUs.secure.title')}</h3>
                            <p>{t('whyUs.secure.desc')}</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3>{t('whyUs.expert.title')}</h3>
                            <p>{t('whyUs.expert.desc')}</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>{t('whyUs.fast.title')}</h3>
                            <p>{t('whyUs.fast.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>{t('cta.title')}</h2>
                        <p>{t('cta.subtitle')}</p>
                        <Link to="/register" className="btn btn-primary btn-large">
                            {t('cta.button')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

