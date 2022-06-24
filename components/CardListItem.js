import {Card} from 'react-bootstrap';
import Link from "next/link";

const CardListItem = ({blog, link}) => {
    const {author, date, subtitle, title} = blog
    return (
        <Card className={`fj-card fj-card-list`}>
            <div className="card-body-wrapper">
                <Card.Header
                    className="d-flex flex-row">
                    {author && <img src={author.avatar} className="rounded-circle mr-3" height="50px" width="50px" alt="avatar"/>}
                    <div>
                        {author && <Card.Title className="font-weight-bold mb-1">{author.name}</Card.Title>}
                        <Card.Text className="card-date">{date}</Card.Text>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="card-main-title">{title}</Card.Title>
                    <Card.Text>{subtitle}</Card.Text>
                </Card.Body>
            </div>
            { link &&
                <Link {...link}>
                    <a className="card-button">
                        Read More
                    </a>
                </Link>
            }
        </Card>
    )
}

export default CardListItem;