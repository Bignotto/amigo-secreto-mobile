import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import styled from "styled-components/native";

const LogoSizes: { [size: string]: number } = {
  sm: 28,
  md: 32,
  lg: 80,
};

const LineHeights: { [size: string]: number } = {
  sm: 45,
  md: 52,
  lg: 80,
};

export interface AppLogoStyleProps extends TextProps {
  children?: ReactNode;
  size?: "lg" | "md" | "sm";
  color?: string;
}

export const AppLogoContainer = styled.View``;

export const AppLogoText = styled(Text)<AppLogoStyleProps>`
  font-family: ${({ theme }) => theme.fonts.logo};
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
  font-size: ${({ theme, size = "md" }) => LogoSizes[size]}px;
  line-height: ${({ theme, size = "md" }) => LineHeights[size]}px;
  padding-top: ${({ theme, size = "md" }) => (size === "lg" ? 25 : 0)}px;
`;
