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
app.use("/api/todos",todoRoutes)
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});