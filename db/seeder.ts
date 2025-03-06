// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Post from "../models/Post";

// // 環境変数をロード
// dotenv.config();

// // MongoDBへ接続
// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is not defined in .env.local");
//     }
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected...");
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };

// // サンプル記事データ
// const samplePosts = [
//   {
//     title: "Next.jsでブログを作る方法",
//     content: "Next.jsとTailwind CSSを使ってブログを作成する方法を紹介します。",
//     author: "John Doe",
//   },
//   {
//     title: "React Queryの使い方",
//     content: "React Queryを使って効率的にデータを管理する方法について解説します。",
//     author: "Jane Smith",
//   },
//   {
//     title: "MongoDBとNext.jsの連携",
//     content: "MongoDBとNext.jsのAPIを組み合わせて、データを管理する方法を紹介します。",
//     author: "Michael Johnson",
//   },
// ];

// // データを挿入する関数
// const seedDatabase = async () => {
//   try {
//     await connectDB();
//     await Post.deleteMany(); // 既存のデータを削除（必要に応じて）
//     await Post.insertMany(samplePosts);
//     console.log("Sample data inserted successfully!");
//     process.exit(); // スクリプト終了
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1);
//   }
// };

// // 実行
// seedDatabase();
