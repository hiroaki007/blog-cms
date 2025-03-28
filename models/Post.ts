import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        content: { type: String, required: true},
        author: { type: String, required: true},
        category: { type: String, required: true},
        imageUrl: { type: String, required: false},
    },
    { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);