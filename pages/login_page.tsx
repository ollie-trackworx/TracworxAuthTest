/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Alignment, Column } from '../components/layout';
import { Button, Text, TextInput } from 'react-native-paper';
import { LoginStrings } from '../strings/auth_strings';
import useThemeColors from '../hooks/theme';
import React, { useState } from 'react';
import { useAuthcontext } from '../context/auth_provider';
import { Routes } from '../config/routes';
type LoginProps = {
  navigation: any;
};

const LoginPage: React.FC<LoginProps> = ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const colors = useThemeColors();
  const [isVisible, setVisibile] = useState(false);
  const { loading, error, login } = useAuthcontext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    page: {
      height: windowHeight,
      backgroundColor: colors.background,
      flex: 1,
    },
    caption: {
      color: colors.text,
      fontSize: 12,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.secondary,
      textAlign: 'center',
    },
    spacing: {
      marginTop: 15,
      marginBottom: 10,
    },
    spacer: {
      margin: 25,
      flex: 0.05,
    },
    spacerLg: {
      margin: 25,
      flex: 0.3,
    },
    textFields: {
      width: '80%',
      borderRadius: 10,
    },
    textFieldBorder: {
      borderRadius: 10,
    },
    flatButton: {
      color: colors.primary,
    },
    buttons: {
      borderRadius: 10,
      fontSize: 12,
      paddingLeft: 50,
      paddingRight:50,
      
    },
    container: {
      flex: 1,
    },
  });
  const handleVisibility = () => {
    setVisibile(!isVisible);
  };
  const handleLogin = async () => {
    if (await login(email, password))
     {navigation.navigate(Routes.initial);}
  };
  return <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Column
        alignment={Alignment.center}
        crossAlignment={Alignment.center}
        style={styles.page}
      >
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.heading}>{LoginStrings.welcome}</Text>
        <View style={{ ...styles.spacer }} />
        <TextInput onChangeText={newText => setEmail(newText)} right={<TextInput.Icon icon="email" />} mode="outlined" textColor={colors.text} label="Username/Email" style={{ ...styles.spacing, ...styles.textFields }} outlineStyle={{...styles.textFieldBorder}} />
        <TextInput onChangeText={newText => setPassword(newText)} mode="outlined" textColor={colors.text} right={<TextInput.Icon onPress={handleVisibility} icon={isVisible ? 'eye' : 'eye-off'} />} label="Password"  outlineStyle={{...styles.textFieldBorder}} secureTextEntry={!isVisible} style={{ ...styles.spacing, ...styles.textFields }} />
        {error ? <Text style={{ ...styles.caption, color: 'red',width:'80%'}}>{error}</Text> : null}
        <Button mode="text" color={styles.flatButton.color} style={{ ...styles.spacing }}> Forgot Password?</Button>
        <Button onPress={handleLogin} loading={loading} mode="text" style={styles.buttons} textColor="white" buttonColor={styles.flatButton.color}>Login</Button>
        <View style={{ ...styles.spacerLg }} />
  </Column>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>;
};
export default LoginPage;
