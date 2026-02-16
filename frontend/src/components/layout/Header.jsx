import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <span className="logo-icon">◆</span>
                        <span className="logo-text">
                            <span className="logo-main">DUBAI</span>
                            <span className="logo-sub">LUXURY PROPERTIES</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="nav-links">
                        <li><Link to="/" className="nav-link">{t('nav.home')}</Link></li>
                        <li><Link to="/properties" className="nav-link">{t('nav.properties')}</Link></li>
                        <li><Link to="/about" className="nav-link">{t('nav.about')}</Link></li>
                        <li><Link to="/contact" className="nav-link">{t('nav.contact')}</Link></li>
                    </ul>

                    {/* Auth Buttons & Language Switcher */}
                    <div className="nav-actions">
                        <LanguageSwitcher />
                        <Link to="/login" className="btn-login">{t('nav.login')}</Link>
                        <Link to="/register" className="btn btn-primary">{t('nav.getStarted')}</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
                        <Link to="/properties" className="mobile-link" onClick={() => setIsMenuOpen(false)}>{t('nav.properties')}</Link>
                        <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
                        <div className="mobile-actions">
                            <LanguageSwitcher />
                            <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>{t('nav.login')}</Link>
                            <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>{t('nav.getStarted')}</Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
