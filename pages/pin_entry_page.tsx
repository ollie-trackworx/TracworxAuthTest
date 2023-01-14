/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Alignment, Column, Row } from '../components/layout';
import { Button, Text, TextInput } from 'react-native-paper';
import { LoginStrings } from '../strings/auth_strings';
import useThemeColors from '../hooks/theme';
import React, { useState } from 'react';
import { useAuthcontext } from '../context/auth_provider';
import { Routes } from '../config/routes';
type PinLoginProps = {
  navigation: any;
};

const PinLoginPage: React.FC<PinLoginProps> = ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const colors = useThemeColors();
  const [isVisible, setVisibile] = useState(false);
  const { loading, error, PinLogin } = useAuthcontext();
  const [email, setEmail] = useState('');
    const [data, setData] = useState({ user: { firstname: "John", lastname: "Doe" }, lastLogged:Date.now()});
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('xxxxxx');
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
    
    dot: {
        height: 10,
        width: 10,
        borderRadius: 100,
        color:'#000000'
    },
    activeDot: {
        opacity: 0.7
      },
    deactivateDot: {
        opacity: 0.4
    }
  });
  const handleVisibility = () => {
    setVisibile(!isVisible);
  };
  const handlePinLogin = async () => {
    if (await PinLogin(email, password))
     {navigation.navigate(Routes.initial);}
  };
    function _buildKeyPad(): React.ReactNode {
        let numpad: React.ReactNode[] = [];
        let row: React.ReactNode[] = [];
        for (let i = 0; i < 9; i++){
            if (i % 3 === 0) {
                numpad.push(<Row>{
                  {...row}
                }</Row>);
                row = [
                    <Button>{ `${i+1}` }</Button>
                ]
            } else {
                row.push(<Button>{ `${i+1}` }</Button>)
            }
        }
        return <View>
            <Column>
                <Row>
                    {
                        code.split("").map((entry: string, index) => {
                            return <View key={ "dot"+index } style={{ ...styles.dot, ...(entry != "x" ? styles.activeDot : styles.activeDot)}} />
                        })
                    }
                </Row>
                <View style={{ ...styles.spacer }} />
                <Column>
                    {...numpad}
                </Column>
            </Column>
        </View>
    }

  return <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Column
        alignment={Alignment.center}
        crossAlignment={Alignment.center}
        style={styles.page}
      >
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.heading}>{`${data.user.firstname} ${data.user.lastname}`}</Text>
        <Text style={styles.heading}>{`Last Logged: ${new Date(data.lastLogged)}`}</Text>
        <View style={{ ...styles.spacer }} />
              {_buildKeyPad()}
        <Button mode="text" color={styles.flatButton.color} style={{ ...styles.spacing }}> Forgot Password?</Button>
        <View style={{ ...styles.spacerLg }} />
  </Column>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>;
};
export default PinLoginPage;
