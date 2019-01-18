import axios from "axios";

// Export an object containing methods 

export default {
  getBooks: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
};
