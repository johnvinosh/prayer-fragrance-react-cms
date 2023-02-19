import { COLLECTIONS } from "./../enums";
import { buildCollection } from "firecms";
import { PFUser } from "../types";

export const UserCollection = buildCollection<PFUser>({
  name: "Users",
  singularName: "User",
  path: COLLECTIONS.USERS,
  properties: {
    name: {
      name: "Name",
      dataType: "string",
    },
    email: {
      name: "Email",
      dataType: "string",
      email: true,
    },
    photoURL: {
      name: "Google Image",
      dataType: "string",
      url: true,
    },
    token: {
      name: "Token",
      dataType: "string",
    },
    roles: {
      name: "Name",
      dataType: "array",
      of: {
        dataType: "string",
        name: "Role",
      },
    },
    bookmarks: {
      name: "Bookmarks",
      dataType: "array",
      of: {
        dataType: "reference",
        path: COLLECTIONS.PRAYER_POINTS,
      },
    },
    prayerRequest: {
      name: "Prayer Request",
      dataType: "array",
      of: {
        dataType: "reference",
        path: COLLECTIONS.PRAYER_REQUESTS,
      },
    },
    appVersion: {
      name: "App Version",
      dataType: "string",
    },
    newUser: {
      name: "Is New User ?",
      dataType: "boolean",
    },
    lastLoggedIn: {
      name: "Last Logged In",
      dataType: "date",
    },
    createdAt: {
      name: "Created At",
      dataType: "date",
      autoValue: "on_create",
    },
    modifiedAt: {
      name: "Modified At",
      dataType: "date",
      autoValue: "on_update",
    },
  },
});
