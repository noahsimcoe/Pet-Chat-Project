import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'; 

const CatComponent = () => {
  const [catImageUrl, setCatImageUrl] = useState('');

  const fetchRandomKitty = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const json = await response.json();
      const imageUrl = json[0].url;

      setCatImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchRandomKitty();
  }, []); 

  const btnClick = () => {
    fetchRandomKitty();
  };

  return (
    <Card>
      <img id="kittyImage" src={catImageUrl} alt="Random Kitty" />
      <Button id="nextCatBtn" onClick={btnClick}>
        Next Kitty
      </Button>
    </Card>
  );
};

export default CatComponent;
