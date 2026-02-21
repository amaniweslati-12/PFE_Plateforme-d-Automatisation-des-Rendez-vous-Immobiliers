const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../db/index');

// Helper to generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret_key_123',
        { expiresIn: '2h' }
    );
};

// User Registration (Default role: client)
router.post('/register', async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    try {
        // Check if user already exists
        const userCheck = await query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user as 'client' by default
        const result = await query(
            'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, nom, prenom, email, role',
            [nom, prenom || '', email, hashedPassword, 'client']
        );

        const newUser = result.rows[0];
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            token: token,
            user: newUser
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
    }
});

// User Login (Unified for all roles)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const isMatch = await bcrypt.compare(password, user.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = generateToken(user);

        res.status(200).json({
            token: token,
            expiresIn: 7200,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role,
                photo_url: user.photo_url
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
    }
});

module.exports = router;
