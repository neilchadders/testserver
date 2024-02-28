const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
const database = {
    users: [
        {
        id:'123',
        name: 'John',
        email: 'john@123.com',
        password:'cookies',
        joined: new Date()
        },
        {
            id:'124',
            name: 'John2',
            email: 'john@124.com',
            password:'cookies124',
            joined: new Date()
            }
    ]
}




app.get('/', (req,res)=>{
    res.send(database.users.data)
})

app.post('/signin', (req, res) =>{
if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
        res.json('success');
    } else {
        res.status (400).json('error logging in')
    }
 res.json('signing')
})

app.post('/register', (req, res) =>{
    const {email, name, password} = req.body;
    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
    
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})