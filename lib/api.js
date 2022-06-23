import client from './sanity';

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  image,
  'coverImage': coverImage.asset->url
`

export async function getAllBlogs() {
    return await client.fetch(`*[_type == "blog"]{${blogFields}}`);
}

export async function getBlogBySlug(slug) {
    return await client.fetch(`*[_type == "blog" && slug.current == $slug] {${blogFields}}`, {slug}).then(res => res?.[0]);
}