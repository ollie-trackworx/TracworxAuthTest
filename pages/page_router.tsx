/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Image, StyleSheet } from "react-native";
import { Alignment, Column } from "../components/layout";
import React, { useEffect } from "react";
import useThemeColors from "../hooks/theme";
import { useSelector } from 'react-redux'
import { User } from "../model/user";
import { AuthStatus } from "../enums/auth_state";
import { Routes } from "../config/routes";
import { useAuthcontext } from "../context/auth_provider";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

type PageRouterProps = {
  navigation: any;
};

const PageRouter: React.FC<PageRouterProps> = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;
  const colors = useThemeColors();
  const auth = useSelector((state: {auth:User}) => state.auth);
  const { initializing } = useAuthcontext();
  const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    },
    page: {
      width: "100%",
      height:windowHeight,
      backgroundColor: colors.background,
    },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#05005E",
    textAlign: "center",
  }
  });
  useEffect(() => {
    if (auth.authStatus !== AuthStatus.LoggedIn) {
      navigation.navigate(Routes.login);
    } else if(auth.authStatus === AuthStatus.LoggedIn) {
      navigation.navigate(Routes.home);
    }
  }, [auth.authStatus]);
  
  return (
    <Column
      alignment={Alignment.center}
      crossAlignment={Alignment.center}
      style={styles.page}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      {initializing ?  <ActivityIndicator animating={true} color={MD2Colors.red800} />:null}
    </Column>
  );
};

export default PageRouter;
