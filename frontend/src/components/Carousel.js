import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

function displayCarousel ({ items }) {

  return (
    <Carousel className="Carousel">
        {items.map(item => (
             <div id={"Carroussel_" + item.id} key={item.id} className="Caroussel_item">
                  <img src={item.src} className="caroussel_image" alt="website" />
               <div id="caroussel_text-div">
                  <h2 className="carroussel_title">{item.recommendation_society}</h2>
                  <p>{item.recommandation}</p>
               </div>    
           </div>
          ))}
    </Carousel>
  );
}

export default displayCarousel;