import { rgba } from "polished";
import styled from "styled-components/native";

export const LogoWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TopContainer = styled.View`
  margin-top: 16px;
`;

export const FormContainer = styled.View``;

export const TwoColumnsWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const DatePickerWrapper = styled.View`
  margin-left: 8px;
`;

export const FormError = styled.View`
  background-color: ${({ theme }) => rgba(theme.colors.negative, 0.2)};
  padding: 12px;
  border-radius: 8px;
`;
