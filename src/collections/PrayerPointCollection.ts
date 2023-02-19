import { COLLECTIONS } from "./../enums";
import { buildCollection } from "firecms";
import { PrayerPoint, PrayerPointLocale } from "../types";
import { locales } from "../enums";

const PrayerPointLocaleCollection = buildCollection<PrayerPointLocale>({
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

export const PrayerPointsCollection = buildCollection<PrayerPoint>({
  name: "Prayer Points",
  singularName: "Prayer Point",
  path: COLLECTIONS.PRAYER_POINTS,
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: false,
  }),
  subcollections: [PrayerPointLocaleCollection],
  properties: {
    availableLanguage: {
      name: "Available Languages",
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: locales,
      },
    },
    amens: {
      dataType: "array",
      name: "Amens",
      description: "Reference to User",
      of: {
        dataType: "reference",
        path: COLLECTIONS.USERS,
      },
    },
    views: {
      dataType: "array",
      name: "Views",
      description: "Reference to User",
      of: {
        dataType: "reference",
        path: COLLECTIONS.USERS,
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
      path: COLLECTIONS.USERS,
    },
    modifiedBy: {
      name: "Modified By",
      dataType: "reference",
      path: COLLECTIONS.USERS,
    },
    image: {
      name: "Image",
      dataType: "string",
      storage: {
        storagePath: "prayer-points/images",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    thumbnail: {
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
    },
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
