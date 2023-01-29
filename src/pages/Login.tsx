import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';
import { Loader } from '../components';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';


const Login = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let auth = useAuth();
  const [loads, setLoads] = useState<boolean>(false);
  const { i18n } = useTranslation();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    async function check() {
      const langId = await localStorage.getItem('lang_id');
      CallApi.get(ApiList.checkAuth).then(async (res) => {
        if (langId)
          auth.signin(langId, () => {
            i18n.changeLanguage(parseInt(langId) === 1 ? 'ar' : parseInt(langId) === 2 ? 'en' : 'kr');
            navigate(from, { replace: true });
          });
        else
          auth.signin('2', () => {
            i18n.changeLanguage('en');
            navigate(from, { replace: true });
          });
      }).catch((err) => setIsLoading(true))
    }
    check();
    // eslint-disable-next-line
  }, []);


  if (!isLoading)
    return (
      <Loader />
    )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoads(true);
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    CallApi.post(ApiList.login, {
      email,
      password
    }).then(async (res) => {
      localStorage.setItem('lang_id', `${res.data.data.user.lang_id}`);
      auth.signin(res.data.data.user.lang_id, () => {
        i18n.changeLanguage(res.data.data.user.lang_id === 1 ? 'ar' : res.data.data.user.lang_id === 2 ? 'en' : 'kr');
        navigate(from, { replace: true });
      });
    }).catch((err) => setIsLoading(true))
  };
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loads ? <CircularProgress /> : ''}
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login