const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { PORT, NODE_ENV } = require('./config/env');
const languageMiddleware = require('./middleware/language');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(languageMiddleware);

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/councils', require('./routes/councils'));
app.use('/api/communities', require('./routes/communities'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send(req.t('welcome'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${NODE_ENV} mode`);
});
