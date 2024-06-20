import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import leadRoute from "./routes/leadRoute.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import setupRoute from "./routes/setupRoute.js";
import emailRoute from "./routes/emailRoute.js";
import whatsappRoute from "./routes/whatsappRoute.js";
import verifyEmailRoute from './routes/verifyEmail.js';
import emailTemplateRoutes from './routes/emailTemplateRoutes.js';
import messageTemplateRoute from './routes/messageTemplateRoute.js';
import whatsappTemplateRoute from './routes/whatsappTemplateRoute.js';
import importRoute from './routes/importRoute.js';
import smsRoute from './routes/smsRoute.js';
import downloadSampleRoute from './routes/downloadSampleRoute.js'
import formRoutes from './routes/formRoutes.js';
import userRoute from './routes/userRoute.js';
import cors from "cors";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/leads", leadRoute);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/status", setupRoute);
app.use("/send-email", emailRoute);
app.use("/api/send-whatsapp", whatsappRoute);
app.use('/verify-email', verifyEmailRoute);
app.use('/api/email-templates', emailTemplateRoutes);
app.use('/api/message-templates', messageTemplateRoute);
app.use('/api/whatsapp-templates', whatsappTemplateRoute);
app.use('/api/leads', importRoute);
app.use('/api/leads/download-sample', downloadSampleRoute);
app.use('/api/send-sms', smsRoute);
app.use('/api/form', formRoutes);
app.use('/api/user', userRoute);