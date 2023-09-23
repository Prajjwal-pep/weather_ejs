import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "4c6615bff11833a750a1bbbbc30d56c9";

app.get("/", async (req, res)=>{
    const response = await axios.get(API_URL+"delhi&appid="+apiKey);
    const result = response.data;
   res.render("index.ejs", {
    data: result
   });
});

app.post("/", async (req, res)=>{
    console.log(req.body);
    const city = req.body.input;
   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
   const result = response.data;
   console.log(result.weather[0].main);
   res.render("index.ejs", {
    data: result,
   });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}.`);
})