import {Row, Col} from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardItem from 'components/CardItem'
import CardListItem from 'components/CardListItem'

import {getAllBlogs} from 'lib/api'

export default function Home({blogs}) {
    return (
        <PageLayout>
            <AuthorIntro/>
            <hr/>
            <Row className="mb-5">
                {/*<Col md="10">*/}
                {/*    <CardListItem/>*/}
                {/*</Col>*/}
                {blogs.map(blog =>
                    <Col key={blog.slug} md="4">
                        <CardItem blog={blog} link={{
                            href: '/blogs/[slug]',
                            as: `/blogs/${blog.slug}`
                        }}/>
                    </Col>
                )}
            </Row>
        </PageLayout>
    )
}

// This function is called during the build (build time)
// Provides props to your page
// It will create static page
export async function getStaticProps() {
    const blogs = await getAllBlogs()
    console.log(blogs)
    return {
        props: {
            blogs
        }
    }
}