import { Avatar, Button, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from '@mui/icons-material/Lock';


export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)


    const products = useSelector(state => state.products)
    const user = useSelector(state => state.user)




    const login = () => {

        const payload = users.find(user => user.username === username && user.password === password)

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

return (
    <>
    {/* {
        products.map(product=><div key={product.id}>{product.name}-{product.price}</div>)
      } */}

      {
        users.map(user=><div key={user.id}>{user.name}-{user.username}</div>)
      }
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
             id="username"
             label="Username"
             name="username"
             value={username} onChange={e => setUsername(e.target.value)} 
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
               <Link href="/register" variant="body2">
                 {"Don't have an account? Sign Up"}
               </Link>
               <Button to="/register">Reg</Button>
             </Grid>
           </Grid>
         </form>
       </div>
     </Grid>
   </Grid>
    {/* <form className="login">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="button" value="Login" onClick={login} />
    </form> */}
    </>
)

}