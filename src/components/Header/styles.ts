import styled from "styled-components/native";

export const LogoContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
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
