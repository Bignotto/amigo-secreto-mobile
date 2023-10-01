import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { ActivityIndicator } from "react-native";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  return (
    <AppScreenContainer>
      <AppText>
        RN Expo StyledComponents with Stack Navigation and Clerk authentication
      </AppText>
      <AppText>Template version: 2</AppText>

      {!isLoaded ? (
        <ActivityIndicator />
      ) : (
        <>
          <SignedIn>
            <AppText>{user?.primaryEmailAddress?.emailAddress}</AppText>
            <AppButton title="Log out" onPress={() => signOut()} />
            <AppText>Is logged in? {`${isSignedIn}`}</AppText>
          </SignedIn>
          <SignedOut>
            <AppText>No user logged in</AppText>
            <AppButton
              title="Login"
              onPress={() => navigation.navigate("OAuthSignIn")}
            />
          </SignedOut>
        </>
      )}
    </AppScreenContainer>
  );
}
