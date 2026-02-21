const { query } = require('./db/index');
const bcrypt = require('bcryptjs');

const agents = [
    ['Al-Hussain', 'Zaid', 'zaid@example.com', '+971 50 123 4567', 'cal_001', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'],
    ['Mansour', 'Layla', 'layla@example.com', '+971 54 987 6543', 'cal_002', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'],
    ['Haddad', 'Omar', 'omar@example.com', '+971 52 555 1234', 'cal_003', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
    ['Saleh', 'Amira', 'amira@example.com', '+971 56 333 9876', 'cal_004', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'],
    ['Farah', 'Karim', 'karim@example.com', '+971 55 111 2222', 'cal_005', 'https://images.unsplash.com/photo-1519085185913-d4d54467977b?w=400']
];

const clients = [
    ['Dupont', 'Jean', 'jean.dupont@example.com', 'user_12345', '+33 6 12 34 56 78'],
    ['Smith', 'Alice', 'alice.smith@example.com', 'user_67890', '+1 202 555 0123'],
    ['Ben Ali', 'Sami', 'sami.benali@example.com', 'user_11223', '+216 22 333 444']
];

const properties = [
    ['Penthouse de Luxe à Downtown Dubai', 'Superbe penthouse avec vue panoramique sur le Burj Khalifa et les fontaines. Entièrement meublé avec des finitions haut de gamme, une cuisine ultra-moderne et un accès exclusif au spa de la résidence.', 'Penthouse', 15500000, 450, 'Downtown Dubai', 25.1972, 55.2744, ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'], ['Piscine', 'Gym', 'Concierge', 'Parking'], 4, 5, 2022],
    ['Villa de Plage à Palm Jumeirah', 'Accès direct à la plage privée, piscine à débordement et jardin paysager. Cette villa offre un luxe absolu avec des chambres spacieuses et une domotique de pointe.', 'Villa', 28000000, 850, 'Palm Jumeirah', 25.1124, 55.1390, ['https://images.unsplash.com/photo-1613490493576-7fde63acd811', 'https://images.unsplash.com/photo-1613977257363-707ba9348227'], ['Plage', 'Infini Pool', 'Cinéma privé', 'Jardin'], 6, 7, 2021],
    ['Appartement Moderne Marina', 'Appartement élégant offrant une vue imprenable sur la marina de Dubaï. Proche des restaurants, des boutiques et de la promenade.', 'Appartement', 4500000, 180, 'Dubai Marina', 25.0819, 55.1367, ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd'], ['Parking', 'Balcon', 'Sécurité 24/7'], 3, 3, 2020],
    ['Maison Traditionnelle à Bastakiya', 'Découvrez le charme authentique de Dubaï dans cette maison restaurée. Alliant architecture traditionnelle et confort moderne.', 'Maison', 7200000, 300, 'Al Fahidi', 25.2632, 55.3005, ['https://images.unsplash.com/photo-1480074568708-e7b720bb3f09', 'https://images.unsplash.com/photo-1449844908441-8829872d2607'], ['Cour intérieure', 'Terrasse', 'Climatisation'], 4, 3, 2018],
    ['Appartement Studio Minimaliste', 'Studio moderne et lumineux dans un quartier en plein essor. Idéal pour un investissement locatif ou un premier achat.', 'Appartement', 1200000, 45, 'Jumeirah Village Circle', 25.0566, 55.2081, ['https://images.unsplash.com/photo-1536376074432-8f64055ad867', 'https://images.unsplash.com/photo-1545324418-f1d3ac15735e'], ['Gym', 'Sécurité', 'Espace Coworking'], 1, 1, 2023]
];

// Duplicate properties with slight variations
for (let i = 0; i < 25; i++) {
    const base = properties[i % 5];
    properties.push([
        `${base[0]} #${i + 6}`, base[1], base[2],
        Math.floor(base[3] + (Math.random() * 500000)),
        Math.floor(base[4] + (Math.random() * 20)),
        base[5], base[6] + (Math.random() * 0.01), base[7] + (Math.random() * 0.01),
        base[8], base[9], base[10], base[11], base[12]
    ]);
}

async function seed() {
    try {
        console.log('Starting seed (Unified Users)...');

        // Clear existing data (handled by DROP in schema.sql but good to be explicit for safety)
        // Note: schema.sql already drops and recreates tables.

        const defaultPassword = await bcrypt.hash('password123', 10);

        // 1. Seed Admin
        await query(
            'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4, $5)',
            ['Système', 'Admin', 'admin@luxury.com', defaultPassword, 'admin']
        );
        console.log('Admin seeded.');

        // 2. Seed Agents
        const agentIds = [];
        for (const agent of agents) {
            const res = await query(
                'INSERT INTO utilisateurs (nom, prenom, email, telephone, calendar_id, photo_url, mot_de_passe, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
                [agent[0], agent[1], agent[2], agent[3], agent[4], agent[5], defaultPassword, 'agent']
            );
            agentIds.push(res.rows[0].id);
        }
        console.log(`Seeded ${agentIds.length} agents into utilisateurs table.`);

        // 3. Seed Clients
        for (const client of clients) {
            await query(
                'INSERT INTO utilisateurs (nom, prenom, email, telegram_id, telephone, mot_de_passe, role) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [client[0], client[1], client[2], client[3], client[4], defaultPassword, 'client']
            );
        }
        console.log(`Seeded ${clients.length} clients into utilisateurs table.`);

        // 4. Seed Properties
        for (let i = 0; i < properties.length; i++) {
            const prop = properties[i];
            const agentId = agentIds[i % agentIds.length];
            await query(
                'INSERT INTO biens_immobiliers (titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id, statut) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                [...prop, agentId, i % 3 === 0 ? 'For Rent' : 'For Sale']
            );
        }
        console.log(`Seeded ${properties.length} properties.`);

        console.log('Seed completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

seed();
