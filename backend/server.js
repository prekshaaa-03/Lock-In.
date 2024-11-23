const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

// Routes
app.use("/api/auth", authRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
