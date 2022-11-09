import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  apiVersion: "2022-08-24",
  dataset: "production",
  useCdn: true,
  projectId: "qwoxusny"
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
