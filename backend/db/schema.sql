-- Database Schema for Real Estate Automation Platform

-- Drop tables if they exist (for easy re-running during dev)
DROP TABLE IF EXISTS conversations;

DROP TABLE IF EXISTS rendez_vous;

DROP TABLE IF EXISTS clients;

DROP TABLE IF EXISTS biens_immobiliers;

DROP TABLE IF EXISTS agents_commerciaux;

DROP TABLE IF EXISTS utilisateurs;

-- 0. Table for Dashboard Users (Admin)
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1. Table for Real Estate Agents
CREATE TABLE agents_commerciaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    calendar_id VARCHAR(100), -- For Google Calendar integration
    actif BOOLEAN DEFAULT TRUE,
    photo_url TEXT,
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
    agent_id INT REFERENCES agents_commerciaux(id) ON DELETE SET NULL,
    statut VARCHAR(50) DEFAULT 'Disponible', -- e.g., 'Disponible', 'Vendu', 'Loué'
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table for Clients (Prospects)
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    telephone VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    telegram_id VARCHAR(100) UNIQUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table for Appointments (Rendez-vous)
CREATE TABLE rendez_vous (
    id SERIAL PRIMARY KEY,
    bien_id INT REFERENCES biens_immobiliers (id) ON DELETE CASCADE,
    client_id INT REFERENCES clients (id) ON DELETE CASCADE,
    agent_id INT REFERENCES agents_commerciaux (id) ON DELETE CASCADE,
    date_heure TIMESTAMP NOT NULL,
    statut VARCHAR(50) DEFAULT 'Confirmé', -- e.g., 'Confirmé', 'Annulé', 'Terminé'
    notes TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table for Conversations (History)
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients (id) ON DELETE CASCADE,
    bien_id INT REFERENCES biens_immobiliers (id) ON DELETE SET NULL,
    messages_json JSONB NOT NULL, -- Store conversation history as JSON
    date_debut TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_fin TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'En cours',
    platform VARCHAR(50) DEFAULT 'Telegram'
);