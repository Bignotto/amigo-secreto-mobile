import { ReactNode } from "react";
import {
  BorderlessButton,
  BorderlessButtonProps,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

interface ButtonProps extends BorderlessButtonProps {
  children: ReactNode;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarContainer = styled.View``;

export const AvatarImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const MidContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const IconButton = styled(BorderlessButton)<ButtonProps>`
  align-items: center;
  justify-content: center;
`;