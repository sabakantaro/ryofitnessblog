import { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";


export const usePreview = (preview: boolean, previewData: any) => {
  const [client, setClient] = useState<import("next-sanity").SanityClient | undefined>(undefined);

  useEffect(() => {
    if (preview && previewData?.token && previewData?.projectId) {
      const config = {
        apiVersion: apiVersion,
        dataset: previewData.dataset,
        projectId: previewData.projectId,
        token: previewData.token,
        useCdn: false
      };
      setClient(createClient(config));
    }
  }, [preview, previewData]);

  return client;
}

