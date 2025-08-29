const express = require("express");
const bodyParser = require("body-parser");
const { isNumber, isAlphabet, alternatingCapsReverse } = require("./utils");

const app = express();
app.use(bodyParser.json());

// Replace with your details
const FULL_NAME = "Giriraj Parsewar";
const DOB = "18102003"; // ddmmyyyy
const EMAIL = "girirajpradeepparsewar2022@vitbhopal.ac.in";
const ROLL_NUMBER = "22BCE10681";

app.get("/", (req, res) => {
    res.send({ message: "API running. Use POST /bfhl" });
});

app.post("/bfhl", (req, res) => {
    try {
        const inputData = req.body.data;

        if (!inputData || !Array.isArray(inputData)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        let odd_numbers = [];
        let even_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;

        inputData.forEach((item) => {
            const val = String(item);

            if (isNumber(val)) {
                if (parseInt(val) % 2 === 0) {
                    even_numbers.push(val);
                } else {
                    odd_numbers.push(val);
                }
                sum += parseInt(val);
            } else if (isAlphabet(val)) {
                alphabets.push(val.toUpperCase());
            } else {
                special_characters.push(val);
            }
        });

        const concat_string = alternatingCapsReverse(alphabets.join(""));

        res.json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string,
        });
    } catch (err) {
        res.status(500).json({ is_success: false, error: err.message });
    }
});

// Render/Heroku will use PORT env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
