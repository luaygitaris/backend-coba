import "dotenv/config.js"
import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
// import { v2 as cloudinary } from "cloudinary"
// import multer from "multer"
// import { CloudinaryStorage } from "multer-storage-cloudinary"
import productRoute from "./routes/productRoute.js"
import stripeRoute from "./routes/stripeRoute.js"
import subscriberRoute from "./routes/subscriberRoute.js"
import { authRouter } from "./controllers/authController.js";



config();

const app = express();


app.use(cors());


app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} PORT`));

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error));

app.use(express.json());


app.use('/api/product', productRoute);
app.use('/stripe', stripeRoute)
app.use('/api/subscriber', subscriberRoute)
app.use('/api/user', subscriberRoute);

// Routes
// app.use('/api/product', productRouter);
// app.use('/api/user', userRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);


app.get('/', (req, res) => {
    res.send('API Working');
});