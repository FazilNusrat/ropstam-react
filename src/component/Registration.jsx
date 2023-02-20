import React, { useState } from "react";

import { Avatar, Button, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from '@mui/icons-material/Lock';

export const Registration = () => {


    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    const register = () => {
        dispatch({
            type: 'REGISTER',
            payload : {
                id: (new Date).getTime(),
                name, username, password
            }
        })
    }

    return (
        <>
       

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
               <Link href="/" variant="body2">
                 {"Already have an account? Log In"}
               </Link>
             </Grid>
           </Grid>
         </form>
       </div>
     </Grid>
   </Grid>

        <form className="register">
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <input type="button" value="Register" onClick={register} />
        </form>
        </>
    )
}