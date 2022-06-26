import {Row, Col} from 'react-bootstrap'
import ErrorPage from 'next/error';
import {useRouter} from 'next/router';

import moment from 'moment';

import {getBlogBySlug, getAllBlogs} from 'lib/api';
import {urlFor} from 'lib/api';

import BlogContent from 'components/BlogContent';
import BlogHeader from 'components/BlogHeader';
import PageLayout from 'components/PageLayout';
import PreviewAlert from 'components/PreviewAlert';

const BlogDetail = ({blog, preview}) => {
    const router = useRouter();

    if (!router.isFallback && !blog?.slug) {
        return <ErrorPage statusCode="404"/>
    }

    if (router.isFallback) {
        return (
            <PageLayout className="blog-detail-page">
                Loading...
            </PageLayout>
        )
    }

    return <PageLayout className="blog-detail-page">
        <Row>
            <Col md={{span: 10, offset: 1}}>
                {preview && <PreviewAlert/>}
                <BlogHeader
                    title={blog.title}
                    subtitle={blog.subtitle}
                    coverImage={urlFor(blog.coverImage).height(600).url()}
                    author={blog.author}
                    date={moment(blog.date).format('LLL')}
                />
                <hr/>
                {blog.content &&
                    <BlogContent content={blog.content}/>
                }
            </Col>
        </Row>
    </PageLayout>
}

export async function getStaticProps({params, preview = false, previewData}) {
    const blog = await getBlogBySlug(params.slug, preview);
    return {
        props: {blog, preview}
    }
}

// TODO: Introduce fallback
export async function getStaticPaths() {
    const blogs = await getAllBlogs();
    const paths = blogs?.map(b => ({params: {slug: b.slug}}));
    return {
        paths,
        fallback: true
    }
}

export default BlogDetail;