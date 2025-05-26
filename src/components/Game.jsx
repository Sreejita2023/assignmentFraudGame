// components/Game.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Sidebar from './Sidebar'; // Assuming Sidebar already exists
import SlideImage from './SlideImage';
import '../styles/Game.css';



const Game = () => {
  const [images, setImages] = useState([]);
  const [points,setPoints]=useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'fraudImages'));
        const imageList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageList);
      } catch (error) {
        console.error('Error fetching images from Firestore:', error);
      }
    };
    fetchImages();
  }, []);



  return (
    <div className="game-container">
      <Sidebar />

      <div className="header">
        <h1 className="title">CATCH THE FAKE</h1>
        <div className="score-container">
          <div className="score-icon">⭐</div>
          <div className="score-value">{points}</div>
        </div>
      </div>

       {images.length > 0 ? (
      <SlideImage images={images} points={points} setPoints={setPoints} />
    ) : (
      <p className="loading-text">Loading images...</p>
    )}

      {/* <div className="instruction">
        <div className="instruction-icon">🖐️</div>
        <div className="instruction-text">
          Drag <strong>“Up”</strong> the fraud message and <br />
          Drag <strong>“Down”</strong> the Safe message
        </div>
      </div> */}
    </div>
  );
};

export default Game;
