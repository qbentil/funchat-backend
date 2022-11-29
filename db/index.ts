import mongoose from "mongoose";

const DBCONNECT = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '',
        {
            autoIndex: true,
        });
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
})

export default DBCONNECT;