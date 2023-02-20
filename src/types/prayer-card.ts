import { EntityReference } from "firecms";

export type PrayerCard = {
  title: string;
  content: (ContentText | ContentImage | ContentVideo | ContentVideoURL)[];
  attachment: string[];
  image: string;
  availableLanguage: string[];
  order: string;
  tags: string[];
  amens: EntityReference[];
  views: EntityReference[];
  createdAt: Date;
  createdBy: EntityReference;
  modifiedAt: Date;
  modifiedBy: EntityReference;
};

export type PrayerCardLocale = {
  title: string;
  content: (ContentText | ContentImage | ContentVideo | ContentVideoURL)[];
  attachment: string;
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
