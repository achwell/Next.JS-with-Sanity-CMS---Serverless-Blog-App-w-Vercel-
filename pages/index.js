import { useState } from 'react';
import {Row, Col} from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardItem from 'components/CardItem'
import CardListItem from 'components/CardListItem'
import FilteringMenu from 'components/FilteringMenu';
import {getAllBlogs} from 'lib/api'
import { useGetBlogs } from 'actions';

export default function Home({blogs: initialData}) {
    const [filter, setFilter] = useState({
        view: { list: 0 }
    });

    const { data: blogs, error } = useGetBlogs(initialData);

    return (
        <PageLayout>
            <AuthorIntro/>
            <FilteringMenu
                filter={filter}
                onChange={(option, value) => setFilter({...filter, [option]: value})}
            />
            <hr/>
            <Row className="mb-5">
                { blogs.map(blog => {
                    let link = {href: '/blogs/[slug]', as: `/blogs/${blog.slug}`};
                    return filter.view.list ?
                            <Col md="9" key={`${blog.slug}-list`}>
                                <CardListItem blog={blog} link={link}/>
                            </Col>
                            :
                            <Col key={blog.slug} md="4">
                                <CardItem blog={blog} link={link}/>
                            </Col>;
                    }
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
    return {
        props: {
            blogs
        }
    }
}