import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const AppLogoContainer = styled.View``;

export const AppLogoTextSM = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: ${RFValue(28)}px;
`;

export const AppLogoTextMD = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: ${RFValue(32)}px;
`;

export const AppLogoTextLG = styled.Text`
  font-family: ${({ theme }) => theme.fonts.logo};
  font-size: ${RFValue(44)}px;
`;
