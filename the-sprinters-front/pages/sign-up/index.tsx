import { useEffect } from "react";
import { useRouter } from "next/router";
import {LoadingOverlay} from "@mantine/core";
import {SignUp} from "@/src/components/authentication/sign-up.component";
import {SignUpInformation} from "@/src/interfaces/account.interface";
import {register} from "@/src/common/redux/reducers/authentication/authentication.reducer";
import {useAppDispatch, useAppSelector} from "@/src/hooks/general.hook";
import {router} from "next/client";

export default function Authentication() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated)
  const loading = useAppSelector((state) => state.authentication.loading)
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, []);
  const handleSignUp = (username: string, password: string, userType: string) => {
    const signUpInformation: SignUpInformation = {
      username,
      password,
      userType
    };

    dispatch(register(signUpInformation))
  }

  return (
    <>
      <SignUp handleSignUp={handleSignUp}/>
      <LoadingOverlay visible={loading}/>
    </>
  );
};
