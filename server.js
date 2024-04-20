require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
// .env
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/';
const ipAddress = process.env.IP_ADDRESS || 'localhost';
const port = process.env.PORT || 3000;
const corsAllowedIp = process.env.CORS_ALLOWED_IP || 'localhost';
let allowedIp = [];
corsAllowedIp.split(',').forEach(ip => { allowedIp.push(ip.trim()) });
console.log(corsAllowedIp, " --> ENV");
// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
// middleware
const { checkJwtCookie } = require('./middleware/authMiddleware');
app.use(cors({
    credentials: true,
    origin: allowedIp
}));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use('/static', express.static(path.join(__dirname,'public')));
app.use('/users', userRoutes);
app.use('/matches', matchesRoutes);
app.use('/groups', require('./routes/groupRoutes'));
app.use('*', checkJwtCookie, (req, res) => { res.status(404).json({ message: "Not Found" }) });

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB: ' + dbURI);
        app.listen(port, ipAddress, () => { console.log(`Server running on http://${ipAddress}:${port}`); });
    })
    .catch((error) => console.log(error));
