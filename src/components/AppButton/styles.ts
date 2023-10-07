import { ReactNode } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends RectButtonProps {
  color?: string;
  children: ReactNode;
  size?: "lg" | "md" | "sm";
}

export const ButtonWrapper = styled.View`
  overflow: hidden;
  border-radius: 8px;
`;

export const ButtonContainer = styled(RectButton)<ButtonProps>`
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
  height: ${({ theme, size = "md" }) =>
    size === "lg" ? 54 : size === "md" ? 44 : 36}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: #ffffff;
`;
