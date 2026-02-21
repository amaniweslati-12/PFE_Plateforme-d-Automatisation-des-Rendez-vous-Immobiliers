import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="fade-in">{t('nav.about')}</h1>
                    <p className="subtitle fade-in-delay">Redéfinir l'excellence immobilière à Dubaï</p>
                </div>
            </section>

            <section className="about-content container">
                <div className="about-grid">
                    <div className="about-image glass">
                        <img src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800&q=80" alt="Dubai Skyline" />
                    </div>
                    <div className="about-text">
                        <h2>Notre Mission</h2>
                        <p>
                            Dubai Luxury Properties est bien plus qu'une agence immobilière. Nous sommes vos partenaires dévoués dans la recherche du mode de vie exceptionnel que vous méritez.
                        </p>
                        <p>
                            Fondée sur les principes d'intégrité, de transparence et d'expertise inégalée, notre équipe s'efforce de connecter les clients les plus exigeants avec les propriétés les plus exclusives de l'émirat.
                        </p>
                        <div className="stats-mini">
                            <div className="stat-item">
                                <span className="number">15+</span>
                                <span className="label">Années d'Expérience</span>
                            </div>
                            <div className="stat-item">
                                <span className="number">500+</span>
                                <span className="label">Propriétés de Luxe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our-values glass">
                <div className="container">
                    <h2>Nos Valeurs Core</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="icon">💎</div>
                            <h3>Excellence</h3>
                            <p>Nous visons le plus haut standard dans chaque interaction et chaque transaction.</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🤝</div>
                            <h3>Confiance</h3>
                            <p>La relation avec nos clients est basée sur une transparence totale et un respect mutuel.</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🚀</div>
                            <h3>Innovation</h3>
                            <p>Utiliser les dernières technologies pour simplifier votre recherche immobilière.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
