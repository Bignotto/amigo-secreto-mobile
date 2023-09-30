import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <AppScreenContainer>
      <AppText>
        RN Expo StyledComponents with Stack Navigation and Clerk authentication
      </AppText>
      <AppText>Template version: 2</AppText>

      <SignedIn>
        <AppText>User logged in: {user?.fullName}</AppText>
        <AppText>Session id is: {sessionId}</AppText>
        <AppButton title="Log out" onPress={() => signOut()} />
      </SignedIn>
      <SignedOut>
        <AppText>No user logged in</AppText>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("OAuthSignIn")}
        />
      </SignedOut>
    </AppScreenContainer>
  );
}
