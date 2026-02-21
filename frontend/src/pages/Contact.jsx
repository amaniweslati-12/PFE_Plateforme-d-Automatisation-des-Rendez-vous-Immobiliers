import { useTranslation } from 'react-i18next';
import './Contact.css';

const Contact = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Notre équipe vous contactera sous peu.');
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Contactez-nous</h1>
                    <p>Nous sommes là pour répondre à toutes vos questions</p>
                </div>
            </section>

            <div className="container">
                <div className="contact-layout">
                    <div className="contact-info">
                        <div className="contact-card glass">
                            <h3>Nos Bureaux</h3>
                            <div className="info-item">
                                <span className="icon">📍</span>
                                <p>Burj Khalifa District, Downtown Dubai, UAE</p>
                            </div>
                            <div className="info-item">
                                <span className="icon">📞</span>
                                <p>+971 4 123 4567</p>
                            </div>
                            <div className="info-item">
                                <span className="icon">✉️</span>
                                <p>contact@luxuryproperties.ae</p>
                            </div>
                        </div>

                        <div className="contact-card glass">
                            <h3>Heures d'ouverture</h3>
                            <p>Lundi - Vendredi: 9:00 - 18:00</p>
                            <p>Samedi: 10:00 - 14:00</p>
                            <p>Dimanche: Fermé</p>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={handleSubmit}>
                        <h3>Envoyez-nous un message</h3>
                        <div className="form-group">
                            <label>Nom Complet</label>
                            <input type="text" placeholder="Votre nom" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="votre@email.com" required />
                        </div>
                        <div className="form-group">
                            <label>Sujet</label>
                            <select>
                                <option>Demande d'informations</option>
                                <option>Planifier une visite</option>
                                <option>Vendre ma propriété</option>
                                <option>Autre</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-large w-100">Envoyer le Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
