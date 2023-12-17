const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.get('/api/quotes/random',(req,res,next)=>{
    const result=getRandomElement(quotes);
    console.log(result)
    const response = {quote:result};
    res.status(200).send(response);
})

app.get('/api/quotes',(req,res,next)=>{
    console.log(quotes);
    res.send({quotes:quotes});
})

app.get('/api/quotes',(req,res,next)=>{
    const person = req.query.person;
    let arr=[];
    quotes.forEach((ele)=>{if(ele.person===person){
        arr.push(ele);
    }})
    if(arr.length===0)
    {
        res.status(404).send();
    }else{
        res.status(200).send({quotes:arr});
    }
})

app.post('/api/quotes',(req,res,next)=>{
    const person = req.query.person;
    const quote = req.query.quote;
    if(person&&quote){
        quotes.push({quote:quote,person:person});
        res.status(200).send({quote:{quote:quote,person:person}});
    }else{
        res.status(400).send();
    }
});

app.listen(PORT,()=>{
    console.log('Server is running...');
})
app.use(express.static('public'));

