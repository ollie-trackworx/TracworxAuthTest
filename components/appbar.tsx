import { AppBar, Text } from "@react-native-material/core";

type MyAppbarProps = {
  navigation?: any;
  back?: { title: string } | undefined;
};
const MyAppBar: React.FC<MyAppbarProps> = ({ navigation, back }) => {
  console.log(navigation);
  return <AppBar title={<Text>{back ? back.title : "Home"}</Text>} />;
};
export default MyAppBar;
