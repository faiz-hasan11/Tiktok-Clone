import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Data from './data.js'
import Videos from './dbModel.js'

const connection_url ="mongodb://Faiz:IJuVeAWl2mlCvXvJ@mern-shard-00-00.ryk7v.mongodb.net:27017,mern-shard-00-01.ryk7v.mongodb.net:27017,mern-shard-00-02.ryk7v.mongodb.net:27017/MERN?ssl=true&replicaSet=atlas-jnty0e-shard-0&authSource=admin&retryWrites=true&w=majority"

const app = express()
const port = 9000

app.use(express.json())
app.use(cors())

mongoose.connect(connection_url , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})


app.get('/' , (req,res) =>
{
    res.status(200).send("HEllo World")
})

app.get("/v1/posts" , (req,res) =>
{
    res.status(200).send(Data)
})

app.post("/v2/posts" , (req,res) =>
{
    const dbVideos = req.body
    Videos.create(dbVideos , (err,data) =>
    {
        if(err)
        {
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err); // if there is an error chage  the status to 500 and return the error
    } else {
      res.status(200).send(data); // sendback the data that we created
    }
  });
});

app.listen(port , () => console.log(`Listening on ${port}`))