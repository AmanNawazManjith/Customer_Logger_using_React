import React from "react";

const SearchBox = (props) => {
  return (
    <div>
      <input
        type="search"
        className="search"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
      
    </div>
  );
};

export default SearchBox;
