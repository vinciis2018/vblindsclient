import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="searchbox" onSubmit={submitHandler}>
      <div className="row">
        <input
          className="transparent"
          type="text"
          id="q" 
          label="Search here" 
          required
          onChange={e => setName(e.target.value)}
        ></input>
        <button className="icon" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

