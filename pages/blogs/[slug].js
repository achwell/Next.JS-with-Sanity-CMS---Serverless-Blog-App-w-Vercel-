import PageLayout from 'components/PageLayout';
import {Row, Col} from 'react-bootstrap'
import {getBlogBySlug, getAllBlogs, urlFor} from 'lib/api'
import BlogHeader from 'components/BlogHeader';
import BlogContent from 'components/BlogContent';
import moment from "moment";

const BlogDetail = ({blog}) => {
    const {author, content, coverImage, date, subtitle, title} = blog;

    let imgUrl = !!coverImage ? urlFor(coverImage).height(600).url() : undefined;

    return <PageLayout className="blog-detail-page">
        <Row>
            <Col md={{span: 10, offset: 1}}>
                <BlogHeader
                    title={title}
                    subtitle={subtitle}
                    coverImage={imgUrl}
                    author={author}
                    date={moment(blog.date).format('LLL')}
                />
                <hr/>
                {content && <BlogContent content={content}/>}
            </Col>
        </Row>
    </PageLayout>;
}

// TODO: Introduce fallback
export async function getStaticProps({params}) {
    const blog = await getBlogBySlug(params.slug);
    return {
        props: {blog}
    }
}

export async function getStaticPaths() {
    const blogs = await getAllBlogs();
    return {
        paths: blogs?.map(b => ({params: {slug: b.slug}})),
        fallback: false
    }
}

export default BlogDetail;