import express, {Application} from "express";
import bodyParser from "body-parser";
import {userRouter} from "../routes/userRoutes";
import {authRouter} from "../routes/authRoutes";

const app: Application = express();
const port = 8000;

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, click here: http://localhost:${port}`);
});