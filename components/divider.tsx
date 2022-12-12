import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Row, Alignment } from "./layout";


type DividerProps = {
  label?: React.ReactNode;
  size?: number;
  thickness?: number;
  spacing?: number;
};
const Divider: React.FC<DividerProps> = ({
  label,
  size,
  thickness,
  spacing,
}) => {
  const styles = StyleSheet.create({
    left: {
      width: size ?? Dimensions.get("screen").width * 0.3,
      height: thickness ?? 1,
      backgroundColor: "grey",
    },
    right: {
      width: size ?? Dimensions.get("screen").width * 0.3,
      height: thickness ?? 1,
      backgroundColor: "grey",
    },
    space: {
      width: spacing ?? 10,
    },
  });
  return (
    <Row crossAlignment={Alignment.center}>
      <View style={styles.left} />
      <View style={styles.space} />
      {label}
      <View style={styles.space} />
      <View style={styles.right} />
    </Row>
  );
};

export default Divider;
