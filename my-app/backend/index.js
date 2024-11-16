// // const functions = require("firebase-functions");
// // const express = require('express');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // require('dotenv').config();
// // const mongoose = require('mongoose');
// // const User = require("./models/ER-Module"); // Ensure the correct path to the User model
// // const app = express();
// // const PORT = 5000; // Port for the backend server

// // app.use(cors()); // Enable CORS
// // app.use(bodyParser.json()); // Parse JSON data
// // // const cors = require('cors');
// // // app.use(cors({ origin: 'https://dreamy-biscotti-10c1b8.netlify.app/' }));
// // // Connect to MongoDB
// // mongoose.connect(`${process.env.MONGO_URI}`)
// // .then(() => console.log("MongoDB connected"))
// // .catch(err => console.error("MongoDB connection error:", err));

// // // API endpoint to submit data
// // app.post('/api/submit', async(req, res) => {



// //     try {
// //         // Define a new user object
// //         const userData = {
// //             name: req.body.name,
// //             location: req.body.location,
// //             description: req.body.description,
// //             established: req.body.established,
// //             firstName: req.body.firstName,
// //             lastName: req.body.lastName,
// //             email: req.body.email,
// //             contact: req.body.contact,
// //             gender: req.body.gender,
// //             address: req.body.address,
// //             state: req.body.state,
// //             city: req.body.city,
// //             postalCode: req.body.postalCode,
// //             Education: req.body.Education,
// //             educationStatus: req.body.educationStatus,
// //             listenedDate: req.body.listenedDate
// //         };
// //         console.log("Request Body:", req.body);
// //         // Save the user data to the database
// //         await User.insertMany([userData]);

// //         // Send a success response
// //         res.status(201).json({ message: 'User data saved successfully!' });
// //     } catch (error) {
// //         // Handle errors during saving
// //         console.error("Error saving user data:", error);
// //         res.status(500).json({ message: 'Failed to save user data' });
// //     }
// // });

// // // Start the server
// // app.listen(process.env.PORT, () => {
// //     console.log(`Server is running on http://localhost:${process.env.PORT}`);
// // });
// // //  exports.api = functions.https.onRequest(app);
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const User = require("./models/ER-Module"); // Ensure the correct path to the User model
// const app = express();
// const port =  process.env.PORT || 5000; // Port for the backend server


// // app.use(cors()); // Enable CORS
// app.use(cors({
//     origin: 'https://new-repo-bice.vercel.app/',
//     // origin : 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));


// app.use(bodyParser.json()); // Parse JSON data
// console.log(process.env.MONGO_URI);


// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)

//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// // API endpoint to submit data
// app.post('/api/submit', async(req, res) => {

//     try {
//         // Define a new user object
//         const userData = {
//             name: req.body.name,
//             location: req.body.location,
//             description: req.body.description,
//             established: req.body.established,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             contact: req.body.contact,
//             gender: req.body.gender,
//             address: req.body.address,
//             state: req.body.state,
//             city: req.body.city,
//             postalCode: req.body.postalCode,
//             Education: req.body.Education,
//             educationStatus: req.body.educationStatus,
//             listenedDate: req.body.listenedDate
//         };
//         console.log("Request Body:", req.body);
//         // Save the user data to the database
//         await User.insertMany([userData]);

//         // Send a success response
//         res.status(201).json({ message: 'User data saved successfully!' });
//     } catch (error) {
//         // Handle errors during saving
//         console.error("Error saving user data:", error);
//         res.status(500).json({ message: 'Failed to save user data' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http:,${process.env.HOST} ${port}`);
// });



require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require("./models/ER-Module");
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://new-repo-bice.vercel.app', 'http://localhost:3000'];


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    app.get('/',(req,res)=>{
        res.json("backend started")
    })

app.post('/api/submit', async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            established: req.body.established,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            gender: req.body.gender,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            postalCode: req.body.postalCode,
            Education: req.body.Education,
            educationStatus: req.body.educationStatus,
            listenedDate: req.body.listenedDate,
        };

        console.log("Request Body:", req.body);
        await User.insertMany([userData]);
        res.status(201).json({ message: 'User data saved successfully!' });
    } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).json({ message: 'Failed to save user data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${process.env.HOST} ${port}`);
});
