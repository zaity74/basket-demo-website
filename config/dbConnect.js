import mongoose from 'mongoose';

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery',false)
        const connected = mongoose.connect(process.env.MONGO_URL)
        console.log(`DATABASE CONNECTED ${(await connected).connection.host}`)
    }catch(error){
        console.log(error.message);
    }
}

export default dbConnect;

// vDI1ak3ExtRoyhf5