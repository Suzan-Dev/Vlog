import React from 'react';
import Image from 'next/image';
import useWelcomeSectionStyles from './styles';
import Typography from '@material-ui/core/Typography';

export default function WelcomeSection({ isSignUp = true }) {
  const classes = useWelcomeSectionStyles();

  return (
    <>
      <div className={classes.overlay} />
      <div className={classes.leftContainerContents}>
        <div>
          <Typography variant="h2">
            {isSignUp ? 'Sign up' : 'Log in'}
          </Typography>
          <Typography>
            {isSignUp
              ? 'Vlog is much better when you have an account.'
              : 'Welcome Back'}
          </Typography>
          <Typography>
            {isSignUp
              ? 'Get yourself one.'
              : 'To keep connected with us, please login with your personal information.'}
          </Typography>
        </div>
        <div className={classes.leftContainerLogo}>
          <div>
            <Image src="/whitelogo.svg" alt="Logo" width={30} height={30} />
          </div>
          <Typography variant="h3" noWrap>
            log
          </Typography>
        </div>
      </div>
    </>
  );
}
