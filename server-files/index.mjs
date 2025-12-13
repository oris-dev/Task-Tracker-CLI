import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; // grabsd the port value from nodejs or else defaults it into 3000

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});

app.use(express.json());
