import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import "./style.css";
import Savebtn from "../SaveBtn";
import ViewBtn from "../ViewBtn";
// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group list">{children}</ul>;
}

export function BookListItem({ children }) {
  return (
    
      <li className="list-group-item">{children}</li>
   
  );
}
//  renders a bootstrap list item containing data from the recipe api call
// export function BookListItem({
//   title,
//   authors,
//   description,
//   thumbnail = "https://placehold.it/300x300",
//   infoLink
// }) {
//   return (
//   <li className="list-group-item">
    // {/* <Container className="contain"> 
//       <Row>
//         <Col>
//             <Thumbnail src={thumbnail} className="thumb-img" />
           
//             <h3>{title}</h3>
//             <h5>{authors}></h5>
//             <p>{description}</p>
//             <ViewBtn> 
//             <a href={infoLink} target="_blank" rel="noreferrer noopener">
//               View
//               </a>
//             </ViewBtn>
//             <Savebtn className="save">
//             Save
//             </Savebtn>
            
//          </Col>
//         </Row>
//        </Container>    */}
//     </li>
  
    
//   );
// }
