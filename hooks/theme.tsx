import { ReactNode } from "react";
import { SafeAreaView,
    ScrollView,
    StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
  
interface Colors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  
}
const ThemeColors: Map<String, Colors> = new Map(
  Object.entries({
    light: {
      background: "white",
      text: "black",
      primary: "#635BFF",
      secondary: "#05005E",
    },
    dark: {
      background: "black",
      text: "white",
      primary: "#635BFF",
      secondary: "#9792FF",
    },
  })
);
type ThemeWrapperProps = {
    children: React.ReactNode;
}
export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
    const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: ThemeColors.get(isDarkMode ? "dark" : "light")!.background,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = ThemeColors.get(colorScheme ?? "light")!;

  return colors;
};

export default useThemeColors;
