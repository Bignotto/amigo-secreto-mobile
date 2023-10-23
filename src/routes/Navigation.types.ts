export type StackParamList = {
  Home: {} | undefined;
  OAuthSignIn: {} | undefined;
  Profile: {} | undefined;
  CreateFriendGroup: {} | undefined;
  FriendGroupDetails:
    | {
        groupId: number;
      }
    | undefined;
  SearchGroup: {} | undefined;
  DrawFriendDetails:
    | {
        joinId: number;
      }
    | undefined;
};
