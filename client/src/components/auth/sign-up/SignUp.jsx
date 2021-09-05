import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSignUpStyles from './styles';
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
import { signUpUser } from '../../../api/auth';

export default function SignUp() {
  const classes = useSignUpStyles();
  const router = useRouter();

  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (values.checked) {
      if (
        !values.username ||
        !values.email ||
        !values.password ||
        !values.confirmPassword
      ) {
        return alert(`${alertFirstSentence}Please fill up all the fields.`);
      }

      if (values.password !== values.confirmPassword) {
        return alert(`${alertFirstSentence}Passwords didn't matched.`);
      }

      const signUpData = await signUpUser(
        values.username,
        values.email,
        values.password
      );
      if (signUpData.status === 'Success') {
        localStorage.setItem('userDetails', JSON.stringify(signUpData.data));
        router.push('/');
      } else {
        alert(`${alertFirstSentence}${signUpData.message}`);
      }
    }
  };

  return (
    <Grid className={classes.signUpContainer}>
      <Hidden smDown>
        <Grid item lg={5} className={classes.leftContainer}>
          <WelcomeSection />
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
        <form onSubmit={handleSignUp}>
          <div className={classes.textField}>
            <TextField
              label="USERNAME"
              value={values.username}
              onChange={handleChange('username')}
            />
          </div>
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
          <div className={classes.textField}>
            <FormControl>
              <InputLabel htmlFor="confirm-password">
                CONFIRM PASSWORD
              </InputLabel>
              <Input
                id="confirm-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
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
          <div className={classes.signUpAgreement}>
            <Checkbox
              color="primary"
              checked={values.checked}
              onChange={handleCheckBoxChange}
              inputProps={{ 'aria-label': 'agree to terms and conditions' }}
            />
            <Typography color="textSecondary" variant="body2">
              By signing up I agree with <b> terms and conditions </b>
            </Typography>
          </div>
          <div className={classes.actionButtons}>
            <CustomButton
              type="submit"
              style={{
                padding: '8px 50px',
                pointerEvents: `${values.checked ? 'all' : 'none'}`,
              }}
            >
              Sign up
            </CustomButton>
            &nbsp; &nbsp;
            <Typography color="textSecondary" variant="body2">
              or
            </Typography>
            &nbsp;
            <Typography
              color="primary"
              className={classes.cursorPointer}
              onClick={() => router.push('/auth/login')}
            >
              Log in
            </Typography>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}
