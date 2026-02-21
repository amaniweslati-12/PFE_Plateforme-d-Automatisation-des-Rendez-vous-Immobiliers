-- Database Schema for Real Estate Automation Platform (Unified Version)

-- Drop tables if they exist (including legacy tables)
DROP TABLE IF EXISTS conversations CASCADE;

DROP TABLE IF EXISTS rendez_vous CASCADE;

DROP TABLE IF EXISTS biens_immobiliers CASCADE;

DROP TABLE IF EXISTS agents_commerciaux CASCADE;

DROP TABLE IF EXISTS clients CASCADE;

DROP TABLE IF EXISTS utilisateurs CASCADE;

-- 1. Unified Table for all Users (Admin, Agent, Client)
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'client', -- 'admin', 'agent', 'client'
    telephone VARCHAR(20),
    photo_url TEXT, -- For agents/admins
    telegram_id VARCHAR(100) UNIQUE, -- For clients
    calendar_id VARCHAR(100), -- For agents (Google Calendar)
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for Properties (Biens Immobiliers)
CREATE TABLE biens_immobiliers (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- e.g., 'Villa', 'Appartement', 'Terrain'
    prix DECIMAL(15, 2) NOT NULL,
    surface DECIMAL(10, 2),
    adresse TEXT,
    position_lat DECIMAL(10, 8),
    position_lng DECIMAL(11, 8),
    photos TEXT[], -- Array of image URLs
    amenities TEXT[], -- e.g., ['Piscine', 'Garage', 'Jardin']
    chambres INT,
    salles_de_bain INT,
    annee_construction INT,
    agent_id INT REFERENCES utilisateurs(id) ON DELETE SET NULL, -- References a user with role 'agent'
    statut VARCHAR(50) DEFAULT 'Disponible', -- e.g., 'Disponible', 'Vendu', 'Loué'
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table for Appointments (Rendez-vous)
CREATE TABLE rendez_vous (
    id SERIAL PRIMARY KEY,
    bien_id INT REFERENCES biens_immobiliers (id) ON DELETE CASCADE,
    client_id INT REFERENCES utilisateurs (id) ON DELETE CASCADE, -- References user with role 'client'
    agent_id INT REFERENCES utilisateurs (id) ON DELETE CASCADE, -- References user with role 'agent'
    date_heure TIMESTAMP NOT NULL,
    statut VARCHAR(50) DEFAULT 'Confirmé', -- e.g., 'Confirmé', 'Annulé', 'Terminé'
    notes TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table for Conversations (History)
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES utilisateurs (id) ON DELETE CASCADE, -- References user with role 'client'
    bien_id INT REFERENCES biens_immobiliers (id) ON DELETE SET NULL,
    messages_json JSONB NOT NULL, -- Store conversation history as JSON
    date_debut TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_fin TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'En cours',
    platform VARCHAR(50) DEFAULT 'Telegram'
);