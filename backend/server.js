const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db")

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
connectDB();

const todoRoutes=require("./routes/todoRoutes")
const authRoutes=require("./routes/authRoutes");
app.use("/api/todos",todoRoutes)
app.use("/api/auth",authRoutes)
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});