import axios from "axios";

// Export an object containing methods 

export default {
  getBooks: function() {
    return axios.get("https://www.googleapis.com/books/v1/volumes");
  },
};
