import React, { Component } from "react";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import { BookList, BookListItem } from "../components/RecipeList";
import { Container, Row, Col } from "../components/Grid";
import Header from "../components/Header";
import axios from "axios";
import style from "./style.css"
import SaveBtn from "../components/SaveBtn"
import ViewBtn from "../components/ViewBtn";

class Search extends Component {
  state = {
    books: [],
    booksearch: "",
    title: "",
    authors: "",
    description: "",
    thumbnail: "",
    link: "",
    saved: ""
  };

// componentWillMount = () => {
//   this.findbook()
// }

findbook = () => {
  // Use axios to retrieve books from the google books api
  axios({
    method:'get',
    url:'https://www.googleapis.com/books/v1/volumes?q=' + this.state.booksearch,
    responseType:'json'
  }).then((res) => {
  //Set the state of books to res.data.items
  //Use items because items is where the array starts; (can't map over objectS)
    this.setState({books: res.data.items}, () => {console.log(res.data)})
  }).catch((err) => {console.log(err)});
}

Submitbook = event => {
event.preventDefault();
alert("saved button clicked!")
if(this.state.title) {
  API.saveBook({
    title: this.state.title,
    authors: this.state.authors,
    description: this.state.description,
    thumbnail: this.state.thumbnail,
    link: this.state.link,
    saved: true
  }) 
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
  .catch(err => console.log(err));
  }  
};

  
 
  
    // .then(res => this.loadBooks())
    

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
    // alert("sent")
    this.findbook(this.state.booksearch)
    
  
  };
// viewPage = () => {
//   const url = this.state.link;
//     window.open(url, '_blank');
// }
            
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
                    <Col >
                      <Input
                        name="booksearch"
                        value={this.state.booksearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"
                        
                      />
                    
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
            <Col>
              {!this.state.books.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                
                <BookList>
                {this.state.books.map(book => {
                    const title = book.volumeInfo.title;
                    console.log("title:" +title);
                    const authors = book.volumeInfo.authors;
                    console.log("author:" +authors);
                    const link = book.volumeInfo.infoLink;
                    console.log("link:" +link);
                    const thumbnail = book.volumeInfo.imageLinks.thumbnail;
                    console.log("thumbnail:" +thumbnail);
                    const description = book.volumeInfo.description;
                    console.log("description:" +description);
                    return (
                      <BookListItem key={book._id}
                        title={title}
                        infoLink={link}
                        authors={authors}
                        thumbnail={thumbnail}
                        description={description}>
                         <a href={"/books/" + book._id}>
                       
                      </a>
                   
                    <ViewBtn
                
                    >View
                    </ViewBtn>
                     <SaveBtn
                     onClick={() => this.Submitbook()}/>
                     
    
                      </BookListItem>
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
