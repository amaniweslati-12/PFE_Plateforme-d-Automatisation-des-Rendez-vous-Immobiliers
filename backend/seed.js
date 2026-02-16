const { query } = require('./db/index');

const agents = [
    ['Al-Hussain', 'Zaid', 'zaid@example.com', '+971 50 123 4567', 'cal_001', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'],
    ['Mansour', 'Layla', 'layla@example.com', '+971 54 987 6543', 'cal_002', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'],
    ['Haddad', 'Omar', 'omar@example.com', '+971 52 555 1234', 'cal_003', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
    ['Saleh', 'Amira', 'amira@example.com', '+971 56 333 9876', 'cal_004', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'],
    ['Farah', 'Karim', 'karim@example.com', '+971 55 111 2222', 'cal_005', 'https://images.unsplash.com/photo-1519085185913-d4d54467977b?w=400']
];

const properties = [
    ['Penthouse de Luxe à Downtown Dubai', 'Superbe penthouse avec vue sur le Burj Khalifa.', 'Penthouse', 15500000, 450, 'Downtown Dubai', 25.1972, 55.2744, ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'], ['Piscine', 'Gym', 'Concierge'], 4, 5, 2022],
    ['Villa de Plage à Palm Jumeirah', 'Accès direct à la mer et piscine à débordement.', 'Villa', 28000000, 850, 'Palm Jumeirah', 25.1124, 55.1390, ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'], ['Plage', 'Infini Pool'], 6, 7, 2021],
    ['Appartement Moderne Marina', 'Appartement spacieux avec vue sur le port.', 'Appartement', 4500000, 180, 'Dubai Marina', 25.0819, 55.1367, ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'], ['Parking', 'Balcon'], 3, 3, 2020],
    ['Maison Traditionnelle à Bastakiya', 'Charme historique avec tout le confort moderne.', 'Maison', 7200000, 300, 'Al Fahidi', 25.2632, 55.3005, ['https://images.unsplash.com/photo-1480074568708-e7b720bb3f09'], ['Cour intérieure', 'Terrasse'], 4, 3, 2018],
    ['Appartement Studio Minimaliste', 'Parfait pour un jeune professionnel.', 'Appartement', 1200000, 45, 'Jumeirah Village Circle', 25.0566, 55.2081, ['https://images.unsplash.com/photo-1536376074432-8f64055ad867'], ['Gym', 'Sécurité'], 1, 1, 2023],
    // ... Adding more to reach ~30
];

// Duplicate properties with slight variations to reach 30 quickly for demo
for (let i = 0; i < 25; i++) {
    const base = properties[i % 5];
    properties.push([
        `${base[0]} ${i + 6}`,
        base[1],
        base[2],
        base[3] + (Math.random() * 500000),
        base[4] + (Math.random() * 20),
        base[5],
        base[6] + (Math.random() * 0.01),
        base[7] + (Math.random() * 0.01),
        base[8],
        base[9],
        base[10],
        base[11],
        base[12]
    ]);
}

async function seed() {
    try {
        console.log('Starting seed...');

        // Seed Agents
        const agentIds = [];
        for (const agent of agents) {
            const res = await query(
                'INSERT INTO agents_commerciaux (nom, prenom, email, telephone, calendar_id, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                agent
            );
            agentIds.push(res.rows[0].id);
        }
        console.log(`Seeded ${agentIds.length} agents.`);

        // Seed Properties
        for (let i = 0; i < properties.length; i++) {
            const prop = properties[i];
            const agentId = agentIds[i % agentIds.length];
            await query(
                'INSERT INTO biens_immobiliers (titre, description, type, prix, surface, adresse, position_lat, position_lng, photos, amenities, chambres, salles_de_bain, annee_construction, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
                [...prop, agentId]
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
