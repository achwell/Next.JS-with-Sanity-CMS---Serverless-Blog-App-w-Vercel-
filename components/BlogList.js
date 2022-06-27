import {Col} from "react-bootstrap";
import moment from "moment";
import CardItem from "./CardItem";
import CardListItem from "./CardListItem";

export const BlogList = ({data, filter}) => {
    return data
        .map(page => page.map(blog =>
                filter.view.list ?
                    <Col key={`${blog.slug}-list`} md="9">
                        <CardListItem
                            author={blog.author}
                            title={blog.title}
                            subtitle={blog.subtitle}
                            date={moment(blog.date).format('LL')}
                            link={{
                                href: '/blogs/[slug]',
                                as: `/blogs/${blog.slug}`
                            }}
                        />
                    </Col>
                    :
                    <Col key={blog.slug} lg="4" md="6">
                        <CardItem
                            author={blog.author}
                            title={blog.title}
                            subtitle={blog.subtitle}
                            date={moment(blog.date).format('LL')}
                            image={blog.coverImage}
                            link={{
                                href: '/blogs/[slug]',
                                as: `/blogs/${blog.slug}`
                            }}
                        />
                    </Col>
            )
        )
}
export default BlogList