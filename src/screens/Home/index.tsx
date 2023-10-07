import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import Header from "@components/Header";
import ProfileCompleteCard from "@components/ProfileCompleteCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "src/@types/UserProfile";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  const [profileComplete, setProfileComplete] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  async function loadProfile() {
    try {
      let { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", user?.primaryEmailAddress?.emailAddress);
      if (error) {
        console.log({ error, key: error.details });
        return;
      }

      setUserProfile(data![0]);

      if (data?.length === 0 && isSignedIn) {
        let { data, error } = await supabase.from("users").insert([
          {
            id: userId,
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          },
        ]);
        setProfileComplete(0);
        setUserProfile({
          id: userId,
          email: `${user?.primaryEmailAddress?.emailAddress}`,
          name: `${user?.fullName}`,
        });
        if (error) console.log({ error });
        return;
      }

      //TODO: move this to profile card component
      let profilePoints = 0;
      const profile: UserProfile = data![0];
      if (profile.clothesSize) profilePoints += 25;
      if (profile.shoeSize) profilePoints += 25;
      if (profile.likeThings) profilePoints += 25;
      if (profile.dontLikeThings) profilePoints += 25;

      setProfileComplete(profilePoints);
    } catch (error) {}
  }

  useEffect(() => {
    if (isSignedIn) {
      loadProfile();
    }
  }, [isSignedIn]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  return (
    <AppScreenContainer>
      <SignedIn>
        <Header />
        {profileComplete < 100 && (
          <>
            <AppSpacer verticalSpace="xlg" />
            <ProfileCompleteCard
              avatarUrl={`${user?.imageUrl}`}
              userName={`${user?.firstName}`}
              percentCompeted={profileComplete}
            />
          </>
        )}
        <AppSpacer verticalSpace="xlg" />
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </AppScreenContainer>
  );
}
