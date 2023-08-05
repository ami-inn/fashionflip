import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app =new express()
app.use(cors())
app.use(express.json({limit:'50mb'}))


app.get('/',(req,res)=>{
    res.status(200).json({message:'hello from fashion flip'})
})

app.listen(8080,()=>console.log('server is running at 8080'))