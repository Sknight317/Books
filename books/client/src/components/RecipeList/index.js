import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import "./style.css";
import Savebtn from "../SaveBtn";
// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group list">{children}</ul>;
}

//  renders a bootstrap list item containing data from the recipe api call
export function BookListItem({
  title,
  authors,
  description,
  thumbnail = "https://placehold.it/300x300",
  infoLink
}) {
  return (
  <li className="list-group-item">
    <Container className="contain"> 
      <Row>
        <Col>
            <Thumbnail src={thumbnail} className="thumb-img" />
           
            <h3>{title}</h3>
            <h5>{authors}></h5>
            <p>{description}</p>
            {/* <button rel="noreferrer noopener" target="_blank" onClick={infoLink}>
              View
            </button> */}
            <Savebtn className="save"/>
            
         </Col>
        </Row>
       </Container>   
    </li>
  
    
  );
}
