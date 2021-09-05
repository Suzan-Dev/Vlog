import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import useLoginStyles from './styles';
import {
  Checkbox,
  FormControl,
  Hidden,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CustomButton from '../../button/Button';
import { alertFirstSentence } from '../../../global';
import WelcomeSection from '../welcome-section/WelcomeSection';
import { loginUser } from '../../../api/auth';

export default function Login() {
  const classes = useLoginStyles();
  const router = useRouter();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    checked: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckBoxChange = (event) => {
    setValues({ ...values, checked: event.target.checked });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return alert(`${alertFirstSentence}Please fill up all the fields.`);
    }

    const loginData = await loginUser(values.email, values.password);
    if (loginData.status === 'Success') {
      // if (values.checked) {
      localStorage.setItem('userDetails', JSON.stringify(loginData.data));
      // }

      router.push('/');
    } else {
      alert(`${alertFirstSentence}${loginData.message}`);
    }
  };

  return (
    <Grid className={classes.loginContainer}>
      <Hidden smDown>
        <Grid item lg={5} className={classes.leftContainer}>
          <WelcomeSection isSignUp={false} />
        </Grid>
      </Hidden>
      <Grid item md={7} sm={12} className={classes.rightContainer}>
        <Hidden mdUp>
          <div className={classes.smallScreenLogo}>
            <div>
              <Image src="/logo.svg" alt="Logo" width={35} height={35} />
            </div>
            <Typography variant="h4" noWrap>
              log
            </Typography>
          </div>
        </Hidden>
        <form onSubmit={handleLogin}>
          <div className={classes.textField}>
            <TextField
              label="EMAIL"
              value={values.email}
              onChange={handleChange('email')}
            />
          </div>
          <div className={classes.textField}>
            <FormControl>
              <InputLabel htmlFor="password">PASSWORD</InputLabel>
              <Input
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.rememberMe}>
            <Checkbox
              color="primary"
              checked={values.checked}
              onChange={handleCheckBoxChange}
              inputProps={{ 'aria-label': 'remember me' }}
            />
            <Typography color="textSecondary" variant="body2">
              Remember Me
            </Typography>
          </div>
          <div className={classes.actionButtons}>
            <CustomButton
              type="submit"
              style={{
                padding: '8px 50px',
              }}
            >
              Log in
            </CustomButton>
            &nbsp; &nbsp;
            <Typography color="textSecondary" variant="body2">
              or
            </Typography>
            &nbsp;
            <Typography
              color="primary"
              className={classes.cursorPointer}
              onClick={() => router.push('/auth/signup')}
            >
              Sign up
            </Typography>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}
