const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const {openai_api_key} = require("./config")

const {Configuration, OpenAIApi} = require("openai")

const config = new Configuration({
    apiKey : openai_api_key
})

const openai = new OpenAIApi(config);

// SET UP SERVER
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("ere");
})

app.get("/chat", (req, res)=>{
    res.json({id : 1});
})

app.post("/get-chat", async (req, res)=>{
    const {prompt} = req.body;
    try {
        const completion = await openai.createCompletion({
            model : 'text-davinci-003',
            max_tokens: 512,
            temperature : 0,
            prompt : prompt,
        })
        const response = completion.data.choices[0].text;
        console.log(completion.data.choices)
        res.json({"res" : response})    
    } catch (error) {
        res.send("An error occur").status(400)
    }
    
})



const port = 5000;
app.listen(port, ()=>{
    console.log('tell me about it, am listening')
})