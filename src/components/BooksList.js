import React, { 
  useCallback, 
  useEffect, 
  useState 
} from 'react';
import queryString from 'query-string';
import { 
  useHistory, 
  useLocation 
} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Jumbotron,
  Dropdown,
  Accordion,
  Navbar,
  Nav,
  Card,
  Button,
  Spinner
} from 'react-bootstrap';

import api from '../api/api';

import Finder from './Finder/Finder';
import NoResults from './NoResults/NoResults';

const BooksList = () => {

  const history = useHistory();
  const location = useLocation();
  const path = window.location.pathname;

  const initialQuery = queryString.parse(location.search);
  const initialPage = Number(initialQuery.page) || 1;

  const [data, setData] = useState (null);
  const [hasLoaded, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
 
  const [findCharacter, setFindCharacter] = useState('');
  const [find, setFinder] = useState(false);

  useEffect(() => {
    history.push(`${path}?pageNumber=${currentPage}`);
  }, []);

  useEffect(() => {
    setLoader(false);

    api.postBooks({
        page: currentPage,
        itemsPerPage: 20,
        filters: [{ type: 'all', values: [findCharacter] }]
      })
      .then(res => {
        setLoader(true);
        setFinder(false);
        return setData(res);
      });
  }, [currentPage, find]);

  useEffect(() => {
    if (currentPage > 0) {
      history.push(`${path}?pageNumber=${currentPage}`);
    }
  }, [currentPage, history, path]);

  const handleFinderChange = useCallback(findValue => {
    setFindCharacter(findValue);
  }, []);

  const handleFinderSubmit = useCallback(event => {
    event.preventDefault();
    setCurrentPage(1);
    setFinder(true);
  }, []);

  return (
    <Container w="100">
      <Jumbotron className="text-white text-center my-5 bg-primary w-100" fluid>
        <h1 className="h1 text-center">A little Book Client</h1>
        <h2 className="h2 text-center font-weight-light"> by ANR </h2>      
      </Jumbotron>
      <Row className="mt-4 mb-4 justify-content-md-center">
        <Col>
          <Finder
            buttonDisabled={!findCharacter}
            handleSubmit={e => handleFinderSubmit(e)}
            onInputChange={(value) => handleFinderChange(value)}
          />
        </Col>
      </Row>
      <Dropdown.Divider />      
      <Row className="mt-3 mb-5">
        {data && hasLoaded ? (
          <Col className="mb-5">
            <Accordion defaultActiveKey="0">
              {
                data.items.books.map(book => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={book.id}>
                      {book.book_title}>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={book.id}>
                      <Card.Body>
                        <Card.Text>
                          Author:{' '}
                          {book.book_author.map(bookAuthor => bookAuthor)}
                        </Card.Text>
                        <Card.Text>Pages: {book.book_pages}</Card.Text>
                        <Card.Text>
                          Year: {book.book_publication_year}
                        </Card.Text>
                        <Card.Text>
                          Country: {book.book_publication_country}
                        </Card.Text>
                        <Card.Text>
                          City: {book.book_publication_city}
                        </Card.Text>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              }
            </Accordion>
          </Col>
        ) : (
          <Col
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ minHeight: '50vh' }}
          >
            <Spinner animation="border" />
          </Col>
        )}
      </Row>
      {data && hasLoaded && data.items.books.length <= 0 && <NoResults />}
      <Navbar className="justify-content-center w-100 shadow" fixed="bottom" bg="white">
        <Nav className="d-flex justify-content-between w-50">
          <Nav.Item>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              size="lg"
              className="flex-fill bg-secondary border-secondary"
              style={{width:"120px"}}
            >
              Previous
            </Button>
          </Nav.Item>
          <Nav.Item    
            className="mx-5"
          >
            <p className="navbar-text mb-0"> 
              Page
              <span className="text-primary font-weight-bold"> {currentPage} </span>
            </p>
          </Nav.Item>
          <Nav.Item>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={data ? data.moreItems : false}
              size="lg"
              className="flex-fill bg-secondary border-secondary"
              style={{width:"120px"}}
            >
              Next
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default BooksList;