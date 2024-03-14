import { useEffect } from "react";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "@/src/hooks/general.hook";
import useStorage from "@/src/hooks/use-storage.hook";
import { logout, verifyAuthState } from "@/src/common/redux/reducers/authentication/authentication.reducer";
import { StorageType } from "@/src/enums/StorageType";
import { ACCOUNT, AUTH_TOKEN_KEY } from "@/src/constants/general.constants";

/*
  Use this Higher Order Component for every page component, as it will check whether our
  user is logged in or not
 */
export const withAuth = (WrappedComponent: any) => {

  const { getItem } = useStorage()

  //These are the routs the user can access even if not logged in
  const configuredNonAuthRoutes = [
    '/sign-up',
    '/forgot-password',
    '/login',
    '/learn',
    '/community',
    '/about-us',
    '/add-charitycase',
    '/find-story',
    '/donate-now'
  ]

  return (props: any) => {
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(
      (state) => state.authentication.isAuthenticated
    );

    const jwtToken = useAppSelector((state) => state.authentication.jwtToken);

    useEffect(() => {
      const authToken = getItem(AUTH_TOKEN_KEY, StorageType.LOCAL);
      const account = getItem(ACCOUNT, StorageType.LOCAL);
      dispatch(verifyAuthState())
      if (!authToken || !account) {
        if (configuredNonAuthRoutes.indexOf(Router.pathname) === -1) {
          dispatch(logout());
        }
      }
    }, []);

    useEffect(() => {
      if (isAuthenticated === false && configuredNonAuthRoutes.indexOf(Router.pathname) === -1) {
        Router.push('/login')
      } else if (isAuthenticated && configuredNonAuthRoutes.indexOf(Router.pathname) !== -1) {
        Router.push('/')
      }
    }, [isAuthenticated]);
    return <WrappedComponent {...props}/>
  }
}