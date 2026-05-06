import express from "express";
import authRoute from "./routers/user.route.js";
import movieRoute from "./routers/movie.route.js";
import ticketRoute from "./routers/ticket.route.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/movies", movieRoute);
app.use("/tickets", ticketRoute);

app.listen(3000, () => {
  console.log("Start Server");
});