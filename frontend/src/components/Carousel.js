import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="blur-background">
          <img
            className="d-block w-100 blur"
            src={require("../images/tablet.jpg")}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>First Minimalist Image</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="blur-background">
          <img
            className="d-block w-100 blur"
            src={require("../images/office.jpg")}
            alt="Second slide"
          />
        </div>

        <Carousel.Caption>
          <h3>Second Minimalist Image</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="blur-background">
          <img
            className="d-block w-100 blur"
            src={require("../images/office-1.jpg")}
            alt="Third slide"
          />
        </div>

        <Carousel.Caption>
          <h3>Third Minimalist Image</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
