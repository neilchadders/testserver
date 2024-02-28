const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

// Middleware
app.use(cors()) // allows front/backend interaction
app.use(express.json()); //Used to parse JSON bodies

//app.use(express.urlencoded({ extended: true })); //Used to parse JSON bodies


//create todo
app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0])
    } catch (err){
        console.error(err.message)
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err){
        console.error(err.message);
    }
})

//get a particular ID
app.get("/todod/:id", async(req, res)=>{ //colon plus req.params allows you to pick out something
    try{
        const {id} =req.params;
        const todo = await pool.query
        ("SELECT * FROM todo WHERE todo_id = $1 ")
    }catch (err){
        console.error(err.message);
    }
})


//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(3000, ()=> { // this starts the server
    console.log('app is running on port 3000')
})

/*const database = {
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
    res.send(database.users)
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
*/
