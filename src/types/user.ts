import { EntityReference } from "firecms";

export type PFUser = {
  name: string;
  email: string;
  photoURL: string;
  token: string;
  roles: string[];
  bookmarks: EntityReference[];
  prayerRequest: EntityReference[];
  appVersion: string;
  newUser: boolean;
  lastLoggedIn: Date;
  createdAt: Date;
  modifiedAt: Date;
};
