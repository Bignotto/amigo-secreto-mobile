import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape_light};
  padding: 16px;
  gap: 8px;
  border-radius: 8px;
`;

export const ProfileInfoContainer = styled.View`
  flex-direction: row;
  padding: 8px;
  gap: 12px;
  align-items: center;
`;

export const ProfileTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: auto;
`;

export const AvatarImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;
