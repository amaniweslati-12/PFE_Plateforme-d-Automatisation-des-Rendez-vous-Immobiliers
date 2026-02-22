import React, { useState } from 'react';
import './TelegramButton.css';

const TelegramButton = ({ property, compact = false }) => {
    const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'DubaiLuxuryPropertiesBot';
    const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    const [loading, setLoading] = useState(false);

    const handleRequestVisit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        // Payload envoyé au webhook n8n
        const payload = {
            property_id: property.id,
            property_title: property.title || property.titre,
            property_type: property.type,
            property_price: property.price || property.prix,
            property_location: property.location || property.adresse,
            source: 'website_button',
            timestamp: new Date().toISOString(),
        };

        // POST vers n8n (sans bloquer l'ouverture de Telegram)
        if (n8nWebhookUrl) {
            try {
                await fetch(n8nWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                console.log('✅ Webhook n8n notifié:', payload);
            } catch (err) {
                console.warn('⚠️ Webhook n8n inaccessible (Telegram va quand même s\'ouvrir):', err.message);
            }
        }

        // Ouvrir Telegram dans tous les cas
        const telegramUrl = `https://t.me/${botUsername}?start=prop_${property.id}`;
        window.open(telegramUrl, '_blank');
        setLoading(false);
    };

    return (
        <button
            className={`btn-telegram ${compact ? 'btn-telegram-compact' : ''} ${loading ? 'btn-telegram-loading' : ''}`}
            onClick={handleRequestVisit}
            disabled={loading}
            title="Demander une visite via Telegram"
        >
            <span className="telegram-icon">{loading ? '⏳' : '✈'}</span>
            {!compact && <span>{loading ? 'Connexion...' : 'Demander une visite via Telegram'}</span>}
        </button>
    );
};

export default TelegramButton;

