import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connected = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DATABASE CONNECTED ${connected.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
};

export default dbConnect;


// vDI1ak3ExtRoyhf5