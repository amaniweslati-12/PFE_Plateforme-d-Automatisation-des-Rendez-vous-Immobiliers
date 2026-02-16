import React from 'react';
import './TelegramButton.css';

const TelegramButton = ({ property, compact = false }) => {
    const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'DubaiLuxuryPropertiesBot';

    const handleRequestVisit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const telegramUrl = `https://t.me/${botUsername}?start=prop_${property.id}`;
        window.open(telegramUrl, '_blank');
    };

    return (
        <button
            className={`btn-telegram ${compact ? 'btn-telegram-compact' : ''}`}
            onClick={handleRequestVisit}
            title="Demander une visite via Telegram"
        >
            <span className="telegram-icon">✈</span>
            {!compact && <span>Demander une visite via Telegram</span>}
        </button>
    );
};

export default TelegramButton;
