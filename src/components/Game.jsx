// components/Game.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SlideImage from './SlideImage';
import '../styles/Game.css';
import Topbar from './Topbar';


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
      <Topbar />
       <img src='/redCircle.png' width={500} height={250} className='red'/>
      
      <div className="score-container">
         <img src="/star.png" alt="star" width={40} height={40}/>
          <div className="score-value">{points}</div>
        </div>

       {images.length > 0 ? (
      <SlideImage images={images} points={points} setPoints={setPoints} />
    ) : (
      <p className="loading-text">Loading images...</p>
    )}
      
      <div className="instruction">
        <div className="instruction-icon"><img src='/instructionIcon.png' width={40} height={40}/></div>
        <div className="instruction-text">
          Drag <strong>“Up”</strong> the fraud message and 
          Drag <strong>“Down”</strong> the Safe message
        </div>
      </div>
      <img src='/greenCircle.png' width={500} height={250}className='green'/>
    </div>
  );
};

export default Game;
