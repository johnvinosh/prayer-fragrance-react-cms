import { COLLECTIONS } from "./../enums";
import { buildCollection } from "firecms";
import { PrayerGuide, PrayerGuideLocale } from "../types";
import { locales } from "../enums";

const PrayerGuideLocaleCollection = buildCollection<PrayerGuideLocale>({
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
    attachment: {
      name: "Attachment",
      dataType: "array",
      of: {
        dataType: "string",
        storage: {
          storagePath: "missionaries/attachment",
          acceptedFiles: ["image/*", "application/*"],
        },
      },
    },
    content: {
      name: "Content",
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
            dataType: "string",
            storage: {
              storeUrl: true,
              storagePath: "missionaries/thumbnail",
              acceptedFiles: ["image/*"],
              metadata: {
                cacheControl: "max-age=1000000",
              },
              fileName: (context) => {
                return context.entityId?.toString() ?? context.file.name;
              },
            },
          },
          video: {
            name: "Video",
            dataType: "string",
            storage: {
              storeUrl: true,
              storagePath: "missionaries/thumbnail",
              acceptedFiles: ["video/*"],
              metadata: {
                cacheControl: "max-age=1000000",
              },
              fileName: (context) => {
                return context.entityId?.toString() ?? context.file.name;
              },
            },
          },
          videoURL: {
            name: "Video URL",
            dataType: "string",
            url: true,
          },
        },
      },
    },
  },
});

export const PrayerGuideCollection = buildCollection<PrayerGuide>({
  name: "Prayer quotes",
  singularName: "Prayer Quote",
  path: COLLECTIONS.PRAYER_QUOTES,
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: false,
  }),
  subcollections: [PrayerGuideLocaleCollection],
  properties: {
    availableLanguage: {
      name: "Available Languages",
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: locales,
      },
    },
    title: {
      name: "Title",
      dataType: "string",
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
    attachment: {
      name: "Attachment",
      dataType: "array",
      of: {
        dataType: "string",
        storage: {
          storagePath: "missionaries/attachment",
          acceptedFiles: ["image/*", "application/*"],
        },
      },
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
        storagePath: "missionaries/images",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
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
    content: {
      name: "Content",
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
            dataType: "string",
            storage: {
              storeUrl: true,
              storagePath: "missionaries/thumbnail",
              acceptedFiles: ["image/*"],
              metadata: {
                cacheControl: "max-age=1000000",
              },
              fileName: (context) => {
                return context.entityId?.toString() ?? context.file.name;
              },
            },
          },
          video: {
            name: "Video",
            dataType: "string",
            storage: {
              storeUrl: true,
              storagePath: "missionaries/thumbnail",
              acceptedFiles: ["video/*"],
              metadata: {
                cacheControl: "max-age=1000000",
              },
              fileName: (context) => {
                return context.entityId?.toString() ?? context.file.name;
              },
            },
          },
          videoURL: {
            name: "Video URL",
            dataType: "string",
            url: true,
          },
        },
      },
    },
  },
});
