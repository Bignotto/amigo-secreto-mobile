import { ReactNode } from "react";
import {
  BorderlessButton,
  BorderlessButtonProps,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

export interface IconButtonProps extends BorderlessButtonProps {
  children: ReactNode;
}

export const IconButton = styled(BorderlessButton)<IconButtonProps>`
  align-items: center;
  justify-content: center;
`;
