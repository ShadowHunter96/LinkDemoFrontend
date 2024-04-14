import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './LinkPreview.css';

const LinkPreview = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isFirefox, setIsFirefox] = useState(false);
    const [isChrome, setIsChrome] = useState(false);

    useEffect(() => {
        setIsFirefox(/firefox/i.test(navigator.userAgent));
        setIsChrome(/chrome|chromium|crios/i.test(navigator.userAgent) && !/edg/i.test(navigator.userAgent));
        const fetchLinks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/links-api/links');
                console.log("Response data:", response.data);
                setLinks(response.data);
            } catch (error) {
                console.error('Error with fetching the links:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    if (isLoading) {
        return <Placeholder as="p" animation="glow">Loading... Please wait...</Placeholder>;
    }

    if (!links.length) {
        return <p>No links available right now.</p>;
    }

    const handleCardClick = (link) => {
        const absoluteUrl = makeAbsoluteUrl(link.url);
        if (link.openInNewWindow) {
            window.open(absoluteUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = absoluteUrl;
        }
    };

    const makeAbsoluteUrl = (url) => {
        if (!url.match(/^[a-zA-Z]+:\/\//)) {
            return `http://${url}`;
        }
        return url;
    };

    const visibleLinks = links.filter(link =>
        link.active &&
        ((isChrome && link.availableInChrome) || (isFirefox && link.availableInFirefox))
    );
    return (
        <Container>
            <Row>
                {isLoading ? (
                    <Placeholder as="p" animation="glow">Loading...</Placeholder>
                ) : visibleLinks.length > 0 ? (
                    visibleLinks.map((link, index) => (
                        <Col sm={4} key={index} >
                            <Card className="mb-4 shadow-sm clickable-card" onClick={() => handleCardClick(link)}>
                                {link.imageBase64 ? (
                                    <Card.Img variant="top" src={`data:image/png;base64,${link.imageBase64}`} />
                                ) : (
                                    <Placeholder as={Card.Img} animation="glow" />
                                )}
                                <Card.Body>
                                    <ReactQuill value={link.description || ''}
                                        readOnly={true}
                                        theme={"bubble"}
                                        modules={{ toolbar: false }} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No links available.</p>
                )}
            </Row>
        </Container>
    );
};

export default LinkPreview;
