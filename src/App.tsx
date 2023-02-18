import { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
  Authenticator,
  buildCollection,
  buildProperty,
  EntityReference,
  FirebaseCMSApp,
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

const firebaseConfig = {
  apiKey: "AIzaSyDGzWoWb92isfMgMMqYDKcP1wkjlr9YHQw",
  authDomain: "prayer-fragrance-react.firebaseapp.com",
  projectId: "prayer-fragrance-react",
  storageBucket: "prayer-fragrance-react.appspot.com",
  messagingSenderId: "829853995899",
  appId: "1:829853995899:web:b2f72e9dbf0fa727aba3de",
};

const locales = {
  ta: "Tamil",
};

type DescText = {
  type: "text";
  value: string;
};

type DescImages = {
  type: "images";
  value: string[];
};

type User = {
  name: string;
};

type PrayerPoint = {
  amens: EntityReference[];
  createdAt: Date;
  createdBy: EntityReference;
  date: Date;
  image: string;
  modifiedAt: Date;
  modifiedBy: EntityReference;
  tags: string[];
  thumbnail: string;
  views: EntityReference[];
  title: string;
  source: string;
  sourceLink: string;
  description: (DescImages | DescText)[];
};

type PrayerPointLocale = {
  title: string;
  description: string;
  source: string;
  sourceLink: string;
};

const userCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
  properties: {
    name: {
      name: "Name",
      dataType: "string",
    },
  },
});

const prayerPointLocaleCollection = buildCollection<PrayerPointLocale>({
  path: "locale",
  customId: locales,
  name: "Locales",
  singularName: "Locale",
  properties: {
    title: {
      name: "Title",
      dataType: "string",
      validation: {
        required: true,
      },
    },
    description: {
      name: "Description",
      dataType: "string",
      markdown: true,
    },
    source: {
      name: "Source",
      dataType: "string",
    },
    sourceLink: {
      name: "Source Link",
      dataType: "string",
      url: true,
    },
  },
});

const prayerPointsCollection = buildCollection<PrayerPoint>({
  name: "Prayer Points",
  singularName: "Prayer Point",
  path: "prayer-points",
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: false,
  }),
  subcollections: [prayerPointLocaleCollection],
  properties: {
    amens: {
      dataType: "array",
      name: "Amens",
      description: "Reference to User",
      of: {
        dataType: "reference",
        path: "users",
      },
    },
    views: {
      dataType: "array",
      name: "Views",
      description: "Reference to User",
      of: {
        dataType: "reference",
        path: "users",
      },
    },
    date: {
      name: "Date",
      dataType: "date",
    },
    modifiedAt: {
      name: "Modified On",
      dataType: "date",
      autoValue: "on_update",
    },
    createdAt: {
      name: "Created On",
      dataType: "date",
      autoValue: "on_create",
    },
    createdBy: {
      name: "Created By",
      dataType: "reference",
      path: "users",
    },
    modifiedBy: {
      name: "Modified By",
      dataType: "reference",
      path: "users",
    },
    image: buildProperty({
      name: "Image",
      dataType: "string",
      storage: {
        storagePath: "prayer-points/images",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    thumbnail: buildProperty({
      name: "Thumbnail",
      dataType: "string",
      storage: {
        storeUrl: true,
        storagePath: "prayer-points/thumbnail",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
        fileName: (context) => {
          return context.entityId?.toString() ?? context.file.name;
        },
      },
    }),
    tags: {
      name: "Tags",
      dataType: "array",
      of: {
        dataType: "string",
        name: "Tag",
      },
    },
    title: {
      name: "Title",
      dataType: "string",
      validation: {
        required: true,
      },
    },
    description: {
      name: "Description",
      dataType: "array",
      oneOf: {
        properties: {
          text: {
            name: "Text",
            dataType: "string",
            markdown: true,
          },
          image: {
            name: "Image",
            dataType: "array",
            of: {
              dataType: "string",
              storage: {
                storeUrl: true,
                storagePath: "prayer-points/thumbnail",
                acceptedFiles: ["image/*"],
                metadata: {
                  cacheControl: "max-age=1000000",
                },
                fileName: (context) => {
                  return context.entityId?.toString() ?? context.file.name;
                },
              },
            },
          },
        },
      },
    },
    source: {
      name: "Source",
      dataType: "string",
    },
    sourceLink: {
      name: "Source Link",
      dataType: "string",
      url: true,
    },
  },
});

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
      logo={"./../public/pf-logo.png"}
      authentication={myAuthenticator}
      collections={[prayerPointsCollection, userCollection]}
      firebaseConfig={firebaseConfig}
    />
  );
}
