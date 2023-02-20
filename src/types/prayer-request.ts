import { EntityReference } from "firecms";

export type PrayerRequest = {
  name: string;
  place: string;
  reply: string;
  request: string;
  status: string;
  createdAt: Date;
  createdBy: EntityReference;
  modifiedAt: Date;
  modifiedBy: EntityReference;
};
