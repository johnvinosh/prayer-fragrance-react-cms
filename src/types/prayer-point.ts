export type PrayerPoint = {
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
  availableLanguage: string[];
};

export type PrayerPointLocale = {
  title: string;
  description: (DescImages | DescText)[];
  source: string;
  sourceLink: string;
};

type DescImages = {
  type: "images";
  value: string[];
};

type DescText = {
  type: "text";
  value: string;
};
