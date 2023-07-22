import { Dimensions, Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
  },
  size: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  pie: {
    cornerRadius: 5,
    innerRadius: 75,
    labelRadius: 1.65,
    radius: Dimensions.get("window").width * 0.32
  }
}