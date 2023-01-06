import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              alt="Array.jpg"
              src="images/Array.jpg"
              text="Start solving Array Problems"
              path="/services"
            />
            <CardItem
              alt="Comming_soon.jpg"
              src="images/Comming_soon.jpg"
              text="Start solving Linked List Problems"
              path="/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              alt="Comming_soon.jpg"
              src="images/Comming_soon.jpg"
              text="Start solving Stack Problems"
              path="/"
            />
            <CardItem
              alt="Comming_soon.jpg"
              src="images/Comming_soon.jpg"
              text="Start preparing for Communication"
              path="/"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
