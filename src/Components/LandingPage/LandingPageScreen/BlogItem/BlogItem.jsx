

import React from 'react';
import './BlogItem.css'; 
import { SlArrowRight } from "react-icons/sl";

const BlogItem = ({ image, title, description }) => {
  return (
    <div className="card">
      <img src={image} alt="card" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <SlArrowRight className='showMoreArrow' style={{ float: 'right' }}/>

    </div>
  );
}

export default BlogItem;
