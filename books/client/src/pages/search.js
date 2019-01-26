import React, { Component } from "react";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import { BookList, BookListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import Header from "../components/Header";
import axios from "axios";
import style from "./style.css";
import Savebtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import Thumbnail from "../components/Thumbnail";

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
  
  this.setState({books: res.data.items,   
          
    }, () => {console.log(res.data)})  
  }).catch((err) => {console.log(err)});
}

Submitbook = id => {
  //Find the book in the books array that is equal to the book id of the book that was clicked
const book = this.state.books.find(book => book.id === id);
alert("saved button clicked!") 

   API.saveBook({
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    description: book.volumeInfo.description,
    thumbnail: book.volumeInfo.imageLinks.thumbnail,
    link: book.volumeInfo.infoLink,
    saved: true
  }) 

  // .then(res => {
  //   console.log(res);
  //   console.log(res.data);
  // })
  .catch(err => console.log(err)); 
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
                    const key = book.id;
                    console.log(key)
                    return (
                      <BookListItem key={key}>
                       <Container className="contain"> 
      <Row>
        <Col>
            <Thumbnail src={thumbnail} className="thumb-img" />
           
            <h3>{title}</h3>
            <h5>{authors}></h5>
            <p>{description}</p>
            <ViewBtn onClick={link}> 
            View
            </ViewBtn>
            <Savebtn onClick={() => this.Submitbook(book.id)} className="save">
            Save
            </Savebtn>
            
         </Col>
        </Row>
       </Container> 
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
