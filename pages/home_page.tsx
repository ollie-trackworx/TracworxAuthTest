import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Column } from '../components/layout';
import { Routes } from '../config/routes';
import { useAuthcontext } from '../context/auth_provider';
import useThemeColors from '../hooks/theme';



type HomePageProps = {
  navigation: any;
};
const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const colors = useThemeColors();
  const { loading, error, signOut } = useAuthcontext();
  const handlesignOut = async()=>{
    if(await signOut())
      navigation.navigate(Routes.initial)

  }
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

  return <View>
    <Column>
      <Text>Hello Tracworx</Text>
      <Button onPress={handlesignOut}>Log Out</Button>
    </Column>
  </View>;
};

export default HomePage;
