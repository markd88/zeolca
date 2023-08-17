import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import global_config from "../../global";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from "react-i18next";

import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse("0313031303130313")
const iv = CryptoJS.enc.Utf8.parse("0622062206220622")




const theme = createTheme();

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()


  
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.ssbti.org/">
        SSBTi.org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br/>
      {t('forget_password')}
    </Typography>
  );
}

  
  const encryptData = (word) => {
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.EC8,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString();
  }


  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('username_required_message'))
      .min(3, t('min_3'))
      .max(20, t('max_20')),
    password: Yup.string()
      .required(t('password_required_message'))
      .min(6, t('min_6'))
      .max(40, t('max_40')),
    });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  // const handleVerify = () => {
  //   navigate('/email-verification',{
  //     replace: false,
  //   })
  // }

  // const handleRecovery = () => {
  //   navigate('/password-recovery',{
  //     replace: false,
  //   })
  // }

  const onSubmit = data => {
    // console.log(data)
    //data.password = encryptData(data.password)
    axios.post(global_config.root_url + '/api/login', data)
    .then((response) => {
      // console.log(response)
      // login success
      if (response.data.status === 0) {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token))
        } 
        // notify('login sucess, you will be navigated to product carbon footprint')
        navigate('/', {
          replace: false
        })
      }
      // login fail
      else if (response.data.status === 1) {
        alert('已提交注册信息！ Application Submitted！ 請等待ssbti管理员审核通知！')
      }

      else {
        alert("error: please contact ssbti for support")
      }

    })
    .catch((error) => {
      if (error.response) {
        // console.log(error.response)
       
      } else if (error.request) {
        // console.log('network error')
       
      } else {
 
        // console.log(error)
      }
    })
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("sign_in")}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={t("username")}
                name="username"
                autoFocus
                {...register('username')}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
                </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('password')}
                type="password"
                id="password"
                {...register('password')}
                error={errors.password ? true : false}
              />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("sign_in")}
              </Button>

              {/* <Button
                onClick={handleVerify}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('verify_account')}
              </Button> */}

              {/* <Button
                onClick={handleRecovery}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot password?
              </Button> */}

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {t('sign_up')}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


export default App;