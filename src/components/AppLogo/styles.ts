import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type AppTextColorProp = {
  color?: "primary" | "secondary" | "positive" | "negative";
};

export const AppLogoContainer = styled.View``;

export const AppLogoTextSM = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: ${RFValue(28)}px;
`;

export const AppLogoTextMD = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: ${RFValue(32)}px;
`;

export const AppLogoTextLG = styled.Text<AppTextColorProp>`
  font-family: ${({ theme }) => theme.fonts.logo};
  color: ${({ theme, color }) => {
    switch (color) {
      case undefined:
        return theme.colors.text;
      case "negative":
        return theme.colors.negative;
      case "positive":
        return theme.colors.positive;
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.secondary;

      default:
        return "#FFFFFF";
    }
  }};
  font-size: ${RFValue(80)}px;
  line-height: 95px;
  padding-top: 30px;
`;
