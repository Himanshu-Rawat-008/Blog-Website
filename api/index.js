import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

// for .env files
dotenv.config();

// MongoDb Database
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
        // await mongoose.disconnect();
    }
}
run().catch(console.dir);

// runnning application
const app = express();
const port = 3000;
// to handle json request by express
app.use(express.json());

// starting application
app.listen(port, () => {
    console.log(`Server is running ${port}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);