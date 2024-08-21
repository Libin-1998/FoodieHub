var express=require('express')
var mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')

const logRoutes = require('./routes/logRoutes')
const regRoutes = require('./routes/regRoutes')
const fastfoodRoutes = require('./routes/fastfoodRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const cartRoutes = require('./routes/cartRoutes')

var app=express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// connecting to database
mongoose.connect(process.env.MONGO_URL)
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
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.listen(process.env.PORT,()=>{
    console.log('running on',process.env.PORT);
})


