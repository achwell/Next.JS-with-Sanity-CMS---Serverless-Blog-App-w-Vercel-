import {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';

import {useGetBlogsPages} from 'actions/pagination';
import {getPaginatedBlogs} from 'lib/api';

import AuthorIntro from 'components/AuthorIntro';
import BlogList from "../components/BlogList";
import CardItemBlank from "../components/CardItemBlank";
import CardListItemBlank from "../components/CardListItemBlank";
import FilteringMenu from 'components/FilteringMenu';
import PageLayout from 'components/PageLayout';
import PreviewAlert from 'components/PreviewAlert';

export default function Home({blogs, preview}) {
    const [filter, setFilter] = useState({
        view: {list: 0},
        date: {asc: 0}
    });

    const {
        data, size, setSize, hitEnd, isValidating
    } = useGetBlogsPages({blogs, filter});

    return (
        <PageLayout>
            {preview && <PreviewAlert/>}
            <AuthorIntro/>
            <FilteringMenu
                filter={filter}
                onChange={(option, value) => setFilter({...filter, [option]: value})}
            />
            <hr/>
            <Row className="mb-5">
                <BlogList data={data || [blogs]} filter={filter}/>
                {isValidating &&
                    Array(3)
                        .fill(0)
                        .map((_, i) =>
                            filter.view.list ?
                                <Col key={i} md="9">
                                    <CardListItemBlank/>
                                </Col>
                                :
                                <Col key={`${i}-item`} lg="4" md="6">
                                    <CardItemBlank/>
                                </Col>
                        )
                }
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button
                    onClick={() => setSize(size + 1)}
                    disabled={hitEnd}
                    size="lg"
                    variant="outline-secondary">
                    Load More
                </Button>
            </div>
        </PageLayout>
    )
}

export async function getStaticProps({preview = false}) {
    const blogs = await getPaginatedBlogs({offset: 0, date: 'desc'});
    return {
        props: {
            blogs, preview
        },
        revalidate: 1
    }
}