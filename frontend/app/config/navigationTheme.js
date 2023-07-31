import { DefaultTheme } from "@react-navigation/native";
import defaultStyles from './styles';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: defaultStyles.colors.primary,
    background: defaultStyles.colors.white
  }
}
