import {Col, Image, Row} from "react-bootstrap";

const AuthorIntro = () =>
    <Row>
        <Col md="8">
            {/* AUTHOR INTRO STARTS */}
            <div className="mb-4 admin-intro media">
                <Image
                    roundedCircle
                    width={64}
                    height={64}
                    className="mr-3"
                    src="https://avatars1.githubusercontent.com/u/9482724?s=460&u=69a6acab13fd5547a4e316e496b573271077147f&v=4"
                    alt="Generic placeholder"
                />
                <div className="media-body">
                    <h5 className="font-weight-bold mb-0">Hello Friends,</h5>
                    <p className="welcome-text">
                        My name is Filip Jerga and I am an experienced software engineer and freelance developer.
                        and this is my blog page.
                    </p>
                </div>
            </div>
            {/* AUTHOR INTRO ENDS */}
        </Col>
    </Row>
export default AuthorIntro;