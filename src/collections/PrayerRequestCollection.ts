import { PrayerRequest } from "./../types/prayer-request";
import { COLLECTIONS } from "./../enums";
import { buildCollection } from "firecms";

export const PrayerRequestCollection = buildCollection<PrayerRequest>({
  name: "Prayer Requests",
  singularName: "Prayer Request",
  path: COLLECTIONS.PRAYER_REQUESTS,
  properties: {
    name: {
      name: "Name",
      dataType: "string",
    },
    place: {
      name: "Place",
      dataType: "string",
    },
    reply: {
      name: "Reply",
      dataType: "string",
    },
    request: {
      name: "Request",
      dataType: "string",
    },
    status: {
      name: "Status",
      dataType: "string",
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
    createdBy: {
      name: "Created By",
      dataType: "reference",
      path: COLLECTIONS.USERS,
    },
    modifiedBy: {
      name: "Modified By",
      dataType: "reference",
      path: COLLECTIONS.USERS,
    },
  },
});
