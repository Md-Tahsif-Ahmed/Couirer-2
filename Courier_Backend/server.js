// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const priceRouts = require('./routes/pricingRoutes');
const parcelpriceRoutes = require('./routes/parcelpriceRoutes');
const consignmentRoutes = require('./routes/consignmentRoutes');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');
dotenv.config();
//  

// ডাটাবেস কানেকশন
connectDB();

const app = express();

// মিডলওয়্যার
 
// const corsOptions = {
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173', 'https://topspeedbd.com'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error(`Blocked by CORS: ${origin}`);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };
// Temporary CORS Configuration (Development Only)
const corsOptions = {
  origin: '*', // Allow all origins temporarily for development
  credentials: true, // Allow cookies or authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
};

app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options('*', cors(corsOptions));

//app.options('*', cors(corsOptions)); // Handle preflight requests globally


// app.use(express.json());
app.use(express.json({ limit: '20mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit as needed
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
 // Set limit as per your requirements
// রাউটস
// Serve static files from the 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);
app.use('/api', parcelRoutes);
app.use('', priceRouts);
app.use('', parcelpriceRoutes);
app.use('/api', consignmentRoutes);
app.use('/api', userRoutes);
app.use('/api', claimRoutes);

// হেলথ চেক রাউট
app.get('/', (req, res) => {
    res.send('TopSpeed Courier Services Backend is running');
});

// এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
 
// সার্ভার লিসেনিং
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
