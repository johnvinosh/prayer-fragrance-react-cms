import { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, FirebaseCMSApp } from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import {
  MissionaryCollection,
  PrayerGuideCollection,
  PrayerPointCollection,
  PrayerQuoteCollection,
  PrayerRequestCollection,
  UserCollection,
} from "./collections";
import { firebaseConfig } from "./firebase";

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email?.includes("flanders")) {
        throw Error("Stupid Flanders!");
      }

      console.log("Allowing access to", user?.email);
      // This is an example of retrieving async data related to the user
      // and storing it in the user extra field.
      const sampleUserRoles = await Promise.resolve(["admin"]);
      authController.setExtra(sampleUserRoles);

      return true;
    },
    []
  );

  return (
    <FirebaseCMSApp
      name={"Prayer Fragrance Admin"}
      logo={"/pf-logo.png"}
      authentication={myAuthenticator}
      collections={[
        PrayerPointCollection,
        PrayerQuoteCollection,
        PrayerGuideCollection,
        PrayerRequestCollection,
        MissionaryCollection,
        UserCollection,
      ]}
      firebaseConfig={firebaseConfig}
    />
  );
}
