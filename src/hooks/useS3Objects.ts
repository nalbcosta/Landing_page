export function useS3Objects() {
  const bucketHost = "landing-page-043005634019-sa-east-1-an.s3.sa-east-1.amazonaws.com";
  const basePath = "images";

  const getUrl = (key: string) => {
    return `https://${bucketHost}/${basePath}/${key.replace(/^\/+/, "")}`;
  };

  return { getUrl };
}