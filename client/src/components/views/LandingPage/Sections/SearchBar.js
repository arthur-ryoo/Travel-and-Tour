import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchBar(props) {
  const handleSearchKeyword = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <Search
        placeholder="Search"
        onChange={handleSearchKeyword}
        style={{ width: 200 }}
        value={props.value}
      />
    </div>
  );
}

export default SearchBar;
