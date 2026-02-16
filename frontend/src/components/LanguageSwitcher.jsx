import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'ar', name: 'العربية', flag: '🇦🇪' }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        // Update document direction for Arabic
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="language-switcher">
            <button className="language-btn" aria-label="Change language">
                <span className="flag">{currentLanguage.flag}</span>
                <span className="lang-code">{currentLanguage.code.toUpperCase()}</span>
                <span className="dropdown-arrow">▼</span>
            </button>
            <div className="language-dropdown">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
                    >
                        <span className="flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
