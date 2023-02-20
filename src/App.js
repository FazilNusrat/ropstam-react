import { useDispatch, useSelector } from 'react-redux';
import './App.css';
// import { Login } from './component/Login';
import { Registration } from './component/Registration';
import { Alert, Avatar, Button, FormControlLabel, Grid, Link, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import Home from './Home.jsx'

function App() {
  const products = useSelector(state => state.products)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  

  const [toggleLogin, setToggleLogin] = useState(true);
  

  const dispatch = useDispatch()


  // LOGIN
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
//  SIGNUP
const [name, setName] = useState('')
    // const [email, setemail] = useState('')
    // const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  const register = () => {
    const payload = users.find(user => user.email === email && user.password === password)

    if(payload){
      dispatch({
          type: 'REGISTER',
          payload : {
            id: (new Date).getTime(),
            name, email, password
        }
      })
      alert("Signed up")
  }else{
      alert('wrong credential !!')
  }


    dispatch({
        type: 'REGISTER',
        payload : {
            id: (new Date).getTime(),
            name, email, password
        } 
    })

    
}

  const login = () => {

    const payload = users.find(user => user.email === email && user.password === password)

    if(payload){
        dispatch({
            type: 'LOGIN',
            payload
        })
        alert("success")
    }else{
        alert('wrong credential !!')
    }
}
  
const [open, setOpen] = React.useState(false);
 

  const handleClick = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      {/* {
        products.map(product=><div key={product.id}>{product.name}-{product.price}</div>)
      }

      {
        users.map(user=><div key={user.id}>{user.name}-{user.email}</div>)
      } */}

      {/* <Registration /> */}

      {
        user
        ?
        <>
        <Home />
        {/* <input type="button" value="logout" onClick={()=>{
          dispatch({
            type: 'LOGOUT'
          })
        }} /> */}
        </> 
        : 

        
        <>
        {toggleLogin?
        (
        <Grid container sx={{ placeContent:'center', height: '100vh', backgroundImage:"url('https://tailwindui.com/img/beams-home@95.jpg')" }} component="main">
        
     {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
     <Grid
       item
       xs={12}
       sm={4} 
       sx={{ textAlign:'-webkit-center', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', p:4, borderRadius:'7px', backdropFilter:'saturate(180%) blur(14px)', background:'rgba(255, 255, 255, 0.5)' }}
       elevation={1}
       square
     >
       <div >
         <Avatar >
           <LockIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
           Sign in
         </Typography>
         <form noValidate>
         <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address"
             name="email"
             value={email} onChange={e => setemail(e.target.value)} 
             autoFocus
           />
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             value={password} onChange={e => setPassword(e.target.value)}
             id="password"
             autoComplete="current-password"
           />
           {/* <FormControlLabel
             control={<CheckBox value="remember" color="primary" />}
             label="Remember me"
           /> */}
           <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             value="Login" onClick={login}
           >
             Sign In
           </Button>
           <Grid container>
             <Grid item>
               <Link sx={{ cursor:'pointer', mt: 2 }} onClick={()=>setToggleLogin(false)} variant="body2">
                 {"Don't have an account? Sign Up"}
               </Link>
             </Grid>
           </Grid>
         </form>
       </div>
     </Grid>
        </Grid>
        )
           : 

           (
        <Grid container sx={{ placeContent:'center', height: '100vh', backgroundImage:"url('https://tailwindui.com/img/beams-home@95.jpg')" }} component="main">
     
     {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
     <Grid
       item
       xs={12}
       sm={4} 
       sx={{ textAlign:'-webkit-center', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', p:4, borderRadius:'7px', backdropFilter:'saturate(180%) blur(14px)', background:'rgba(255, 255, 255, 0.5)' }}
       elevation={1}
       square
     >
       <div >
         <Avatar >
           <LockIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
           Register
         </Typography>
         <form className="register">
         <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="name"
             label="name"
             name="name"
             value={name} onChange={e => setName(e.target.value)}
             autoFocus
           />
         <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="email"
             label="email"
             name="email"
             value={email} onChange={e => setemail(e.target.value)}
             autoFocus
           />
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             value={password} onChange={e => setPassword(e.target.value)}
             id="password"
             autoComplete="current-password"
           />

        <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="confirmPpassword"
             label="Confirm Password"
             type="password"
             value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
             id="confirmPassword"
             autoComplete="current-password"
           />
           {/* <FormControlLabel
             control={<CheckBox value="remember" color="primary" />}
             label="Remember me"
           /> */}
           <Button
             type="button"
             fullWidth
             variant="contained"
             color="primary"
             value="Register" onClick={register}
           >
             Register
           </Button>
           <Grid container>
             <Grid item>
               <Link sx={{ cursor:'pointer' }} onClick={()=>setToggleLogin(true)} variant="body2">
                 {"Already have an account? Log In"}
               </Link>
             </Grid>
           </Grid>
         </form>
       </div>
     </Grid>
        </Grid>
           )
        }

        </>
      }

      <Button onClick={handleClick()}>Down</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Successfully!"
      />
    </div>
  );
}

export default App;
