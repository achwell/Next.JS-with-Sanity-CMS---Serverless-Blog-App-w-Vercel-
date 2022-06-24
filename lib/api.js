import client, {previewClient} from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  coverImage,
`

const builder = imageUrlBuilder(client)
const getClient = preview => preview ? previewClient : client

export function urlFor(source) {
    return builder.image(source);
}

export async function getAllBlogs() {
    const query = `*[_type == "blog"]{${blogFields}}`;
    return await client.fetch(query);
}

export async function getBlogBySlug(slug, preview) {
    const currentClient = getClient(preview);
    let query = `*[_type == "blog" && slug.current == $slug] { ${blogFields} content[]{..., "asset": asset->}}`;
    return await currentClient
        .fetch(query, {slug})
        .then(res => preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]);
}
