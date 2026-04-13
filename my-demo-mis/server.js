require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger.js');
const cors = require('cors');
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/students', require('./routes/studentRoutes'));
app.use('/api/v1/classes', require('./routes/classRoutes'));
const adminRoutes = require('./routes/adminRoutes'); 
app.use('/api/v1/admin', adminRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


const PORT = process.env.PORT || 4700;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));