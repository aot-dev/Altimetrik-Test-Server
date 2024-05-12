import fs from 'fs';
import admin from 'firebase-admin';
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register',async (req,res)=>{
    
    const body = req.body;
    const store = JSON.parse(
        fs.readFileSync('./data.json')
    );
    const id= store["userData"].length;
    const newCustomer={
        id:id,
        ...body.data
    };
    console.log(newCustomer);
    // console.log(store);
    store["userData"].push(newCustomer);
    savejson(store);
    res.json(newCustomer);
});

app.post('/api/customerPlan',async (req,res)=>{
    
    const body = req.body;
    const id=body.id;
    const planName = body.planName
    const store = JSON.parse(
        fs.readFileSync('./data.json')
    );
    store["userData"][id]["planName"]=planName;
    savejson(store);
    res.json(store["userData"][id]);
});
app.get('/api/customerList',async (req,res)=>{
    
    const store = JSON.parse(
        fs.readFileSync('./data.json')
    );
    res.json(store["userData"]);
});
function savejson(data){

   return fs.writeFileSync('./data.json',JSON.stringify(data));
}

app.listen(8000,()=>{
    console.log('Server is listening om port 8000');
})


