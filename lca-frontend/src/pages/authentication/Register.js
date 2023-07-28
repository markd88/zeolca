import React, { Fragment } from 'react';
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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import global_config from "../../global";


import { useTranslation } from "react-i18next";


import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse("0313031303130313")
const iv = CryptoJS.enc.Utf8.parse("0622062206220622")





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.ssbti.org/">
        SSBTi.org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const App = () => {

  const { t } = useTranslation();

  const navigate = useNavigate()



  const encryptData = (word) => {
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.EC8,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString();
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("username_required_message"))
      .min(3, t('min_3'))
      .max(20, t('max_20')),
      // .test("valid username", "letter and number only", (value, context) => {
      //   const hasUpperCase = /[A-Z]/.test(value);
      //   const hasLowerCase = /[a-z]/.test(value);
      //   const hasNumber = /[0-9]/.test(value);
      //   let validConditions = 0;
      //   const numberOfMustBeValidConditions = 3;
      //   const conditions = [hasLowerCase, hasUpperCase, hasNumber];
      //   conditions.forEach((condition) =>
      //     condition ? validConditions++ : null
      //   );

      //}),
    email: Yup.string()
      .required(t('required'))
      .email(t('email_invalid')),
    company: Yup.string()
      .required(t('required'))
      .min(1,  t('min_1'))
      .max(40, t('max_40')),
    password: Yup.string()
      .required(t("password_required_message"))
      .min(6, t('min_6'))
      .max(40, t('max_40')),
    confirmPassword: Yup.string()
      .required(t('required'))
      .oneOf([Yup.ref('password'), null], t('password_mismatch')),

    //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    // console.log(data);
    //data = encryptData(data)
    axios.post(global_config.root_url +  '/api/reguser', data)
    .then((response) => {
      // console.log(response)
      // register success
      if (response.data.status == 0) {
        alert(`register success! you will be navigated to log in, and please check your email to verify your account first`)
        navigate('/login', {
          replace: false
        })
      } else if (response.data.status == 3) {
        alert('this email has been used, please login instead')
      }
      // register fail

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign_up')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label={t('username')}
                  autoFocus
                  {...register('username')}
                  error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('email')}
                  name="email"
                  {...register('email')}
                  error={errors.email ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="company"
                  label={t('company')}
                  name="company"
                  {...register('company')}
                  error={errors.company ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.company?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t('comfirm_password')}
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.confirmPassword?.message}
                </Typography>
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      control={control}
                      name="acceptTerms"
                      defaultValue="false"
                      inputRef={register()}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          color="primary"
                          onChange={e => onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={
                    <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                      {t('term')}
                    </Typography>
                  }
                />
                <br />
                <Typography variant="inherit" color="textSecondary">
                  {errors.acceptTerms
                    ? '(' + errors.acceptTerms.message + ')'
                    : ''}
                </Typography>
            </Grid> */}

            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              {t('sign_up')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  {t('sign_in')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}


export default App;