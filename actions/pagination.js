import {useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {useSWRPages} from 'swr';
import moment from 'moment';
import {useGetBlogs} from 'actions';
import CardItem from 'components/CardItem';
import CardItemBlank from 'components/CardItemBlank';
import CardListItem from 'components/CardListItem';
import CardListItemBlank from 'components/CardListItemBlank';

export const useGetBlogsPages = ({blogs, filter}) => {

    useEffect(() => {
        window.__pagination__init = true;
    }, [])

    return useSWRPages(
        'index-page',
        ({offset, withSWR}) => {
            let initialData = !offset && blogs;

            if (typeof window !== 'undefined' && window.__pagination__init) {
                initialData = null;
            }
            const {data: paginatedBlogs} = withSWR(useGetBlogs({offset, filter}, initialData));
            if (!paginatedBlogs) {
                return Array(3)
                    .fill(0)
                    .map((_, i) =>
                        filter.view.list ?
                            <Col key={i} md="9">
                                <CardListItemBlank />
                            </Col>
                            :
                            <Col key={`${i}-item`} md="4">
                                <CardItemBlank />
                            </Col>
                    )
            }

            return paginatedBlogs
                .map(blog =>
                    filter.view.list ?
                        <Col key={`${blog.slug}-list`} md="9">
                            <CardListItem
                                author={blog.author}
                                title={blog.title}
                                subtitle={blog.subtitle}
                                date={moment(blog.date).format('LLL')}
                                link={{
                                    href: '/blogs/[slug]',
                                    as: `/blogs/${blog.slug}`
                                }}
                            />
                        </Col>
                        :
                        <Col key={blog.slug} md="4">
                            <CardItem
                                author={blog.author}
                                title={blog.title}
                                subtitle={blog.subtitle}
                                date={moment(blog.date).format('LLL')}
                                image={blog.coverImage}
                                link={{
                                    href: '/blogs/[slug]',
                                    as: `/blogs/${blog.slug}`
                                }}
                            />
                        </Col>
                )
        },
        // here you will compute offset that will get passed into previous callback function with 'withSWR'
        // SWR: data you will get from 'withSWR' function
        // index: number of current page
        (SWR, index) => {
            return SWR.data && SWR.data.length === 0 ? null : (index + 1) * 6;
        },
        [filter]
    )
}