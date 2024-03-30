const path = require('path');
const express = require('express');
const cors= require('cors');
const PORT= 5500;
require('./db')
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));


app.get('/', (req,res)=>{
    res.send('<h1>Hello</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});