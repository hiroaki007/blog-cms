import mongoose from "mongoose";

export const connectDB = async () => {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB is already connected");
            return;
        
        }

        try {
            await mongoose.connect(process.env.MONGO_URI as string, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as any);
            console.log("MongoDB Connected...");
        } catch (error) {
            console.log("MongoDB Connection Error:", error);
            process.exit(1);
        }

};


export default connectDB;