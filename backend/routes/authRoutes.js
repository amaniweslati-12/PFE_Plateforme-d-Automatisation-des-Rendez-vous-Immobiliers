const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../db/index');

// Admin Login
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

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key_123',
            { expiresIn: '2h' }
        );

        res.status(200).json({
            token: token,
            expiresIn: 7200,
            user: { id: user.id, nom: user.nom, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
    }
});

// Register
router.post('/register', async (req, res) => {
    const { nom, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role',
            [nom, email, hashedPassword, 'client']
        );

        const user = result.rows[0];
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '2h' }
        );

        res.status(201).json({
            token: token,
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
    }
});

module.exports = router;
