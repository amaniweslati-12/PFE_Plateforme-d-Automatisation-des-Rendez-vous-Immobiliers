-- =========================================
-- Schéma amélioré de la base de données
-- =========================================

-- Supprimer les tables existantes pour ré-création (ordre sûr)
DROP TABLE IF EXISTS disponibilites_agents CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS rendez_vous CASCADE;
DROP TABLE IF EXISTS biens_immobiliers CASCADE;
DROP TABLE IF EXISTS utilisateurs CASCADE;


-- =========================================
-- 1️⃣ TABLE UTILISATEURS
-- =========================================

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    
    role VARCHAR(50) NOT NULL DEFAULT 'client'
        CHECK (role IN ('admin', 'agent', 'client')),
    
    telephone VARCHAR(20),
    photo_url TEXT,
    
    telegram_id VARCHAR(100) UNIQUE,
    
    -- Pour agents
    calendar_id VARCHAR(150), 
    google_refresh_token TEXT,
    
    actif BOOLEAN DEFAULT TRUE,
    
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_utilisateurs_role ON utilisateurs(role);
CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);


-- =========================================
-- 2️⃣ TABLE BIENS IMMOBILIERS
-- =========================================

CREATE TABLE biens_immobiliers (
    id SERIAL PRIMARY KEY,
    
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    
    type VARCHAR(50) NOT NULL,
    prix DECIMAL(15, 2) NOT NULL CHECK (prix > 0),
    
    surface DECIMAL(10, 2),
    
    adresse TEXT,
    position_lat DECIMAL(10, 8),
    position_lng DECIMAL(11, 8),
    
    photos TEXT[],
    amenities TEXT[],
    
    chambres INT CHECK (chambres >= 0),
    salles_de_bain INT CHECK (salles_de_bain >= 0),
    annee_construction INT,
    
    agent_id INT REFERENCES utilisateurs(id) ON DELETE SET NULL,
    
    statut VARCHAR(50) DEFAULT 'Disponible'
        CHECK (statut IN ('Disponible', 'Vendu', 'Loué', 'Suspendu')),
    
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_biens_agent ON biens_immobiliers(agent_id);
CREATE INDEX idx_biens_statut ON biens_immobiliers(statut);
CREATE INDEX idx_biens_prix ON biens_immobiliers(prix);


-- =========================================
-- 3️⃣ TABLE RENDEZ-VOUS
-- =========================================

CREATE TABLE rendez_vous (
    id SERIAL PRIMARY KEY,
    
    bien_id INT NOT NULL REFERENCES biens_immobiliers(id) ON DELETE CASCADE,
    client_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    agent_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL,
    
    statut VARCHAR(50) DEFAULT 'En attente'
        CHECK (statut IN ('En attente', 'Confirmé', 'Annulé', 'Terminé')),
    
    source VARCHAR(50) DEFAULT 'Telegram',
    
    google_event_id VARCHAR(255),
    
    notes TEXT,
    
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (date_fin > date_debut)
);

CREATE INDEX idx_rdv_agent ON rendez_vous(agent_id);
CREATE INDEX idx_rdv_client ON rendez_vous(client_id);
CREATE INDEX idx_rdv_date ON rendez_vous(date_debut);
CREATE INDEX idx_rdv_statut ON rendez_vous(statut);


-- =========================================
-- 4️⃣ TABLE CONVERSATIONS
-- =========================================

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    
    client_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    bien_id INT REFERENCES biens_immobiliers(id) ON DELETE SET NULL,
    
    platform VARCHAR(50) DEFAULT 'Telegram',
    
    step VARCHAR(50) DEFAULT 'collect_name',
    
    messages_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    statut VARCHAR(50) DEFAULT 'En cours'
        CHECK (statut IN ('En cours', 'Terminé', 'Abandonné')),
    
    date_debut TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_fin TIMESTAMP
);

CREATE INDEX idx_conv_client ON conversations(client_id);
CREATE INDEX idx_conv_statut ON conversations(statut);


-- =========================================
-- 5️⃣ TABLE DISPONIBILITÉS AGENTS (OPTIONNEL MAIS PRO)
-- =========================================

CREATE TABLE disponibilites_agents (
    id SERIAL PRIMARY KEY,
    
    agent_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    
    jour_semaine INT CHECK (jour_semaine BETWEEN 0 AND 6), -- 0 = dimanche
    
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    
    actif BOOLEAN DEFAULT TRUE,
    
    CHECK (heure_fin > heure_debut)
);

CREATE INDEX idx_dispo_agent ON disponibilites_agents(agent_id);


-- =========================================
-- 6️⃣ TRIGGER POUR UPDATE AUTOMATIQUE date_modification
-- =========================================

CREATE OR REPLACE FUNCTION update_date_modification()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_utilisateurs
BEFORE UPDATE ON utilisateurs
FOR EACH ROW EXECUTE FUNCTION update_date_modification();

CREATE TRIGGER trigger_update_biens
BEFORE UPDATE ON biens_immobiliers
FOR EACH ROW EXECUTE FUNCTION update_date_modification();

CREATE TRIGGER trigger_update_rdv
BEFORE UPDATE ON rendez_vous
FOR EACH ROW EXECUTE FUNCTION update_date_modification();
