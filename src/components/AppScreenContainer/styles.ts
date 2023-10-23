import { ReactNode } from "react";
import { ViewProps } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export interface AppScreenContainerStylesProps extends ViewProps {
  children: ReactNode;
}

export const HeaderContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: ${() => getStatusBarHeight() + 8}px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`;

export const ScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;
