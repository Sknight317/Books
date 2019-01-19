import React, { Component } from "react";

import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import { BookList, BookListItem } from "../components/RecipeList";
import { Container, Row, Col } from "../components/Grid";
import Header from "../components/Header"
class Search extends Component {
  state = {
    books: [],
    booksearch: ""
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get books update the books state
    event.preventDefault();
    alert("sent")
    API.getBooks(this.state.booksearch)
      .then(res => this.setState({ books: this.res.data.items }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav />
        <Header />
        
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="booksearch"
                        value={this.state.booksearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.books.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                <BookList>
                  
                  {this.state.books.map(recipe => {
                    
                    return (
                      <BookListItem
                      
                        key={recipe.kind}
                        title={recipe.kind}
                  
                        // infoLink={recipe.infoLink}
                        // authors={recipe.authors}
                        // thumbnail={recipe.thumbnail}
                        // description={recipe.description}
                      />
                    );
                  })}
                </BookList>
              )
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
