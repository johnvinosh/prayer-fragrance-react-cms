import { EntityReference } from "firecms";

export type PrayerPoint = {
  title: string;
  content: (ContentImage | ContentVideo | ContentText)[];
  date: Date;
  image: string;
  source: string;
  sourceLink: string;
  availableLanguage: string[];
  tags: string[];
  amens: EntityReference[];
  views: EntityReference[];
  createdAt: Date;
  createdBy: EntityReference;
  modifiedAt: Date;
  modifiedBy: EntityReference;
};

export type PrayerPointLocale = {
  title: string;
  content: (ContentImage | ContentVideo | ContentText)[];
  source: string;
  sourceLink: string;
};

type ContentImage = {
  type: "image";
  value: string;
};

type ContentVideo = {
  type: "video";
  value: string;
};

type ContentVideoURL = {
  type: "videoURL";
  value: string;
};

type ContentText = {
  type: "text";
  value: string;
};
