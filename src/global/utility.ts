import { UploadedFileContext } from "firecms";

export const getContentProp = () => {
  return {
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
        storagePath: "prayer-points/thumbnail",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
        fileName: (context: UploadedFileContext) => {
          return context.entityId?.toString() ?? context.file.name;
        },
      },
    },
    video: {
      name: "Video",
      dataType: "string",
      storage: {
        storeUrl: true,
        storagePath: "prayer-points/thumbnail",
        acceptedFiles: ["video/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
        fileName: (context: UploadedFileContext) => {
          return context.entityId?.toString() ?? context.file.name;
        },
      },
    },
    videoURL: {
      name: "Video URL",
      dataType: "string",
      url: true,
    },
  };
};
