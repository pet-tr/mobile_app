import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface LineDividerProps {
  borderColor?: string;
  color?: string;
  textStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  lineStyle?: StyleProp<ViewStyle>;
}

const defaultColors = {
  borderColor: "#e8e8e8",
  color: "rgba(0,0,0,.85)",
}

const LineDivider: React.FC<LineDividerProps> = (props) => {
  const {
    borderColor: bCol,
    color: col, children,
    textStyle,
    containerStyle,
    lineStyle,
  } = props;

  const borderColor = bCol || defaultColors.borderColor;
  const color = col || defaultColors.color;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.line, lineStyle, { borderColor }]} />
      <Text style={[styles.text, textStyle, { color }]}>{children}</Text>
      <View style={[styles.line, lineStyle, { borderColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '500',
  },
  container: {
    height: 24,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 6,
    width: '85%',
  },
  line: {
    height: 24,
    borderBottomWidth: 1,
    transform: [{ translateY: -12 }],
    flex: 1,
  },
})

export default LineDivider;
