import { View } from 'react-native';

type HomePageProps = {
  children: React.ReactNode;
};
const HomePage: React.FC<HomePageProps> = ({ children }) => {
  return <View>{children}</View>;
};

export default HomePage;
