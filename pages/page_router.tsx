/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet } from "react-native";
import { Alignment, Column } from "../components/layout";
import React, { useEffect } from "react";
import useThemeColors from "../hooks/theme";
import { useSelector } from 'react-redux'
import { User } from "../model/user";
import { AuthStatus } from "../enums/auth_state";
import { Routes } from "../config/routes";

type PageRouterProps = {
  navigation: any;
};

const PageRouter: React.FC<PageRouterProps> = ({navigation}) => {

  const colors = useThemeColors();
  const auth = useSelector((state: {auth:User}) => state.auth);
  const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    },
    page: {
      width: "100%",
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
    } else {
      //navigation.navigate(Routes.home);
    }
  }, []);
  return (
    <Column
      alignment={Alignment.center}
      crossAlignment={Alignment.center}
      style={styles.page}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
    </Column>
  );
};

export default PageRouter;
