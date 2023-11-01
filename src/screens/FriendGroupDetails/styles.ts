import styled from "styled-components/native";

export const GroupDetailsWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
`;

export const GroupInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: 75px;
  align-items: center;
`;

export const InfoWrapper = styled.View``;

export const FriendsListWrapper = styled.View`
  flex: 1;
`;

export const FriendCard = styled.View`
  background-color: ${({ theme }) => theme.colors.shape_light};
  border-radius: 8px;
  flex-direction: row;

  align-items: center;

  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const AvatarWrapper = styled.View``;

export const NameWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 12px;
`;

export const ControlWrapper = styled.View``;

export const BottomWrapper = styled.View`
  padding-bottom: 16px;
  padding-top: 20px;
`;
