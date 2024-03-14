import { LoadingOverlay } from '@mantine/core';
import { useWindowDimensions } from "@/src/hooks/use-window-dimensions.hook";
import { useAppDispatch, useAppSelector } from "@/src/hooks/general.hook";
import { useRouter } from "next/router";
import { LoginInformation } from "@/src/interfaces/account.interface";
import { clearAuthToken, login } from "@/src/common/redux/reducers/authentication/authentication.reducer";
import { useEffect } from "react";
import { RootState } from "@/src/common/redux/store";
import { Login } from "@/src/components/authentication/login.component";
import { cardAnimation } from "@/src/constants/animation.constants";

const { motion } = require('framer-motion');
const loginClasses = (isMobile: boolean) => ({
  loginContainer: {
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWrapper: {
    position: 'relative',
    width: '500px',
    height: '100%',
    justifySelf: 'flex-end',
  },
  motionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  notification: {
    position: 'absolute',
    width: '100%',
    padding: '15px 10px',
    zIndex: 10,
  },
})
export default function LoginPage() {
  const isMobile = useWindowDimensions().isMobile
  const classes = loginClasses(isMobile)

  const authentication = useAppSelector((state: RootState) => state.authentication)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = (username: string, password: string) => {
    const loginInformation: LoginInformation = {
      username,
      password,
    };

    dispatch(login(loginInformation))
  }

  useEffect(() => {
    clearAuthToken();
  }, []);

  return (
      <div style={classes.loginContainer}>
        <div style={classes.loginWrapper}>
          <motion.div
          variants={cardAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          style={classes.motionWrapper}
          >
            <Login handleLogin={handleLogin}/>
            <LoadingOverlay visible={authentication.loading}/>
          </motion.div>
        </div>
      </div>
  );
};
