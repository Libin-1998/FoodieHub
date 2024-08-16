import * as React from 'react';
import './Cart.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getfoodData } from '../../redux/reducers/Foodslice';
import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { colors } from '@mui/material';




export default function RecipeReviewCard() {



// const userid=sessionStorage.getItem('userlogid')
//     const data=useSelector((state)=>state.foods.fooddata)

//     const dispatch=useDispatch()

// useEffect(()=>{
//     dispatch(getfoodData())

// },[])

const [cart,Setcart]=useState([])
const [totalPrice, setTotalPrice] = useState(0);
const [open, setOpen] = React.useState();

const token=sessionStorage.getItem('token')
const userid=sessionStorage.getItem('userlogid')

useEffect(()=>{
    axios.get(`https://foodiehub-ujkn.onrender.com/api/carts/viewcart/${userid}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then((response)=>{
        console.log(response);
        Setcart(response.data.data)
    })
    .catch((error)=>{
        console.log(error);
    })

},[])

const decrementButton=(id,quantity)=>{
    console.log(quantity);
    if(quantity<=1){
        window.location.reload()
    }
    axios.get(`https://foodiehub-ujkn.onrender.com/api/carts/decrement/${id}`)
    .then((response)=>{
        console.log(response);
        Setcart((prevData) =>
            prevData.map((data) =>
              data._id === id ? { ...data, quantity: data.quantity - 1 } : data
            )
          );
    })
    .catch((error)=>{
        console.log(error);
    })
}

const incrementButton=(id)=>{
    axios.get(`https://foodiehub-ujkn.onrender.com/api/carts/increment/${id}`)
    .then((response)=>{
        console.log(response);
        Setcart((prevData)=>
        prevData.map((data)=>
            data._id===id ?{...data,quantity:data.quantity +1 }:data
        )
        )
      
    })
    .catch((error)=>{
        console.log(error);
    })
}


useEffect(()=>{
  const calculateTotalPrice=()=>{
    const total =cart.reduce((acc,item)=>acc+item.productId.price * item.quantity,0)
    setTotalPrice(total)
  }
  calculateTotalPrice()
},[cart])


const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};

const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {['WhatsApp', 'FaceBook', 'Send email', 'Instagram'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>
);



  return (
    <>
    <div className='fdcartpage'>
        {cart.map((datas)=>(<>
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="194"
        image={`/images/${datas.productId.image}`}
        src=''
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" display={'flex'} justifyContent={'space-between'}>
            <div>
      <p>{datas.productId.name}</p>   
      <p>{datas.productId.price}</p>
      <p>{datas.productId.quality}</p>
      <button className='buybutton'>Buy Now</button>
      </div>
      <div className='plusminus'>
        <p style={{paddingLeft:'2px'}} onClick={()=>decrementButton(datas._id,datas.quantity)}>-</p>
        <p>{datas.quantity}</p>
        <p onClick={()=>incrementButton(datas._id)}>+</p>
      </div>
      <p>${datas.productId.price*datas.quantity}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" className='favorites'>
          <FavoriteIcon />
        </IconButton>
        
         <Button onClick={toggleDrawer(true)}>
          <ShareIcon style={{color:'grey'}}/>
         </Button>
          
        <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

        {/* </IconButton> */}
      </CardActions>
    </Card>



      </>
))}
<div className='checkoutpage'>
<div class="card fdcheckout">
    <label class="fdtitle">Checkout</label>
    <div class="fddetails">
      <span>Your cart subtotal:</span>
      <span>${totalPrice}</span>
      <span>Shipping fees:</span>
      <span>$0.0</span>
    </div>
    <div class="fdcheckout--footer">
      <label class="fdprice"><sup>${totalPrice}</sup></label>
      <button class="fdcheckout-btn">Checkout</button>
    </div>
  </div>
  </div>
    </div>
    </>
  );
}




// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// export default function BottomDrawer() {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 'auto' }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {['WhatsApp', 'FaceBook', 'Send email', 'Instagram'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
//       <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }








