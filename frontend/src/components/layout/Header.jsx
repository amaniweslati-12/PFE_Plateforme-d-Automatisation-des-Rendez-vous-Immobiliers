import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const isAdmin = user && (user.role === 'admin' || user.email === 'hadir.ayari@esen.tn');

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
                        {isAdmin && (
                            <li><Link to="/admin/dashboard" className="nav-link" style={{ color: 'var(--color-primary)' }}>Dashboard</Link></li>
                        )}
                    </ul>

                    {/* Auth Buttons & Language Switcher */}
                    <div className="nav-actions">
                        <LanguageSwitcher />
                        {user ? (
                            <div className="user-nav">
                                <span className="user-name">Hello, {user.nom.split(' ')[0]}</span>
                                <button onClick={handleLogout} className="btn-logout">Logout</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-login">{t('nav.login')}</Link>
                                <Link to="/register" className="btn btn-primary">{t('nav.getStarted')}</Link>
                            </>
                        )}
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
                        {isAdmin && (
                            <Link to="/admin" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Dashboard Admin</Link>
                        )}
                        <div className="mobile-actions">
                            <LanguageSwitcher />
                            {user ? (
                                <button onClick={handleLogout} className="btn-logout">Logout</button>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>{t('nav.login')}</Link>
                                    <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>{t('nav.getStarted')}</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
