import React from 'react'

export default function TagsInput(props) {

  const [tags, setTags] = React.useState([]);
  const addTags = (event) => {
    if(event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = (index) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
  };

  return (
    <div className="">
      <label htmlFor="tags">Tags</label>
      <ul className="row start">
        {tags.map((tag, index) => (
          <li className="popCard row " key={index}>
            <div className="icon-border">
              {tag}
            </div>
            <div className="icon-border">
              <i 
                className="fa fa-close"
                onClick={() => removeTags(index)}
              />
            </div>
          </li>
        ))}
      </ul>
      <span />
      <ul className="row">
        <input 
          className="col-1"
          type="text"
          onKeyUp={event => addTags(event)}
          palceholder="Press enter to add tags"
        />
      </ul>
      
    </div>
  )
}
