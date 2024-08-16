var express=require('express')
var mongoose=require('mongoose')
const cors=require('cors')

const logRoutes = require('./routes/logRoutes')
const regRoutes = require('./routes/regRoutes')
const fastfoodRoutes = require('./routes/fastfoodRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const cartRoutes = require('./routes/cartRoutes')

var app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// connecting to database
mongoose.connect('mongodb+srv://libinninteen98:EhF3Fs510HyhC9cd@cluster0.4e1hgmr.mongodb.net/fooddatabase?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('successfully connected');
})
.catch(()=>{
    console.log('connection error');
})

app.use('/api/registration',regRoutes)
app.use('/api/foodlogin',logRoutes)
app.use('/api/food',fastfoodRoutes)
app.use('/api/newres',restaurantRoutes)
app.use('/api/carts',cartRoutes)


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('something broke!')
})

app.listen(6060,()=>{
    console.log('running on 6060');
})


