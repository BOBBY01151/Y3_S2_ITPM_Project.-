const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { PORT, NODE_ENV } = require('./config/env');
const languageMiddleware = require('./middleware/language');

const app = express();


// Connect Database
connectDB();




// Init Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000'
        ];

        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(languageMiddleware);

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/councils', require('./routes/councils'));
app.use('/api/communities', require('./routes/communities'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/storage', require('./routes/storage'));

app.get('/', (req, res) => {
    res.send(req.t('welcome'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[GLOBAL ERROR HANDLER]', err);
    res.status(500).json({
        message: err.message || 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
