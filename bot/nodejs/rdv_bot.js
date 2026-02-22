require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const nodemailer = require("nodemailer");

// ==============================
// CONFIGURATION
// ==============================

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";
const RDV_ENDPOINT = `${BACKEND_API_URL}/rdv`;

if (!TOKEN) {
    console.error("❌ TELEGRAM_BOT_TOKEN manquant dans le fichier .env");
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// ==============================
// STOCKAGE TEMPORAIRE DES SESSIONS
// ==============================

const sessions = {};

function getSession(chatId) {
    if (!sessions[chatId]) {
        sessions[chatId] = { step: null, data: {} };
    }
    return sessions[chatId];
}

function resetSession(chatId) {
    sessions[chatId] = { step: null, data: {} };
}

// ==============================
// /start COMMAND
// ==============================

bot.onText(/\/start(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    const propertyId = match[1].trim(); // ex: /start prop_42

    const session = getSession(chatId);
    session.data.propertyId = propertyId || null;

    const keyboard = {
        inline_keyboard: [
            [{ text: "📅 Demander un rendez-vous", callback_data: "request_rdv" }],
            [{ text: "🌐 Voir les propriétés", url: "https://votre-site.com/properties" }],
        ],
    };

    await bot.sendMessage(
        chatId,
        `👋 Bonjour *${user.first_name}* !\n\nJe suis l'assistant immobilier de *Dubai Luxury Properties*.\n${propertyId ? `\n🏠 Vous consultez le bien : *${propertyId}*\n` : ""
        }\nComment puis-je vous aider ?`,
        { parse_mode: "Markdown", reply_markup: keyboard }
    );
});

// ==============================
// BUTTON HANDLER
// ==============================

bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const session = getSession(chatId);

    await bot.answerCallbackQuery(query.id);

    if (query.data === "request_rdv") {
        session.step = "ask_name";
        await bot.sendMessage(chatId, "✏️ Quel est votre *nom complet* ?", {
            parse_mode: "Markdown",
        });
    }
});

// ==============================
// MESSAGE HANDLER (FLOW RDV)
// ==============================

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Ignorer les commandes
    if (!text || text.startsWith("/")) return;

    const session = getSession(chatId);

    switch (session.step) {
        // Étape 1 : Nom
        case "ask_name":
            session.data.name = text;
            session.step = "ask_email";
            await bot.sendMessage(chatId, "📧 Quelle est votre *adresse email* ?", {
                parse_mode: "Markdown",
            });
            break;

        // Étape 2 : Email
        case "ask_email":
            if (!text.includes("@")) {
                await bot.sendMessage(chatId, "⚠️ Veuillez entrer une adresse email valide.");
                break;
            }
            session.data.email = text;
            session.step = "ask_phone";
            await bot.sendMessage(chatId, "📱 Quel est votre *numéro de téléphone* ?", {
                parse_mode: "Markdown",
            });
            break;

        // Étape 3 : Téléphone
        case "ask_phone":
            session.data.phone = text;
            session.step = "ask_date";
            await bot.sendMessage(
                chatId,
                "📅 Quelle *date* souhaitez-vous pour la visite ? _(ex: 25/03/2026)_",
                { parse_mode: "Markdown" }
            );
            break;

        // Étape 4 : Date
        case "ask_date":
            session.data.date = text;
            session.step = "ask_time";
            await bot.sendMessage(chatId, "⏰ À quelle *heure* ? _(ex: 14:30)_", {
                parse_mode: "Markdown",
            });
            break;

        // Étape 5 : Heure → Enregistrement
        case "ask_time":
            session.data.time = text;
            session.step = null;

            const rdv = { ...session.data, telegram_id: chatId };

            await bot.sendMessage(
                chatId,
                `✅ *Rendez-vous enregistré !*\n\n` +
                `👤 Nom : ${rdv.name}\n` +
                `📧 Email : ${rdv.email}\n` +
                `📱 Téléphone : ${rdv.phone}\n` +
                `📅 Date : ${rdv.date} à ${rdv.time}\n` +
                `🏠 Bien : ${rdv.propertyId || "Non spécifié"}\n\n` +
                `Notre agent vous contactera pour confirmer la visite. Merci !`,
                { parse_mode: "Markdown" }
            );

            // Envoi vers le backend /api/rdv
            try {
                await axios.post(RDV_ENDPOINT, rdv);
                console.log("✅ RDV envoyé au backend:", rdv);
            } catch (err) {
                console.error("⚠️ Erreur envoi backend:", err.message);
            }

            resetSession(chatId);
            break;

        default:
            await bot.sendMessage(
                chatId,
                "Tapez /start pour commencer une nouvelle demande de rendez-vous. 😊"
            );
    }
});

// ==============================
// DÉMARRAGE
// ==============================

console.log("🤖 RDV Bot Telegram démarré en mode polling...");
