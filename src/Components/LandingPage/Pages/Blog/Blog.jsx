import React from "react";
import blogImg from "../../Images/blogImg.svg";
import blogImg2 from "../../Images/blogImg2.svg";
import blogImg3 from "../../Images/blogImg3.svg";
import blogImg4 from "../../Images/blogImg4.svg";
import heroImg from "../../Images/heroImg.svg";
import BlogItem from "./../../LandingPageScreen/BlogItem/BlogItem";
import Navbar from "../../LandingPageScreen/Navbar/Navbar";
import Footer from "../../LandingPageScreen/Footer/Footer";
import "./Blog.css";

const cardData = [
  {
    image: heroImg,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    image: blogImg2,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    image: blogImg3,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    image: blogImg4,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    image: heroImg,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    image: blogImg,
    title: "Lorem, ipsum.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
];

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="blog-main-container">
        <div className="blog-container-heading">
          <h2>On the move in Pune</h2>
          <h2>Things to do and ways to get there</h2>
        </div>
        <div className="blog-items">
          {cardData.map((item) => {
            return (
              <BlogItem
                image={item.image}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
