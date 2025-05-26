// GameOverPopup.jsx
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/GameOver.css'
import { ref, update } from 'firebase/database'
import { realtimeDB } from '../firebase'  // adjust path if needed
import { useUser } from '../context/UserContext' 
import { get } from 'firebase/database';

const GameOver=({ points })=> {
  const navigate = useNavigate()
  const { uid } = useUser()

 useEffect(() => {
  if (uid && points >= 0) {
    const userRef = ref(realtimeDB, `users/${uid}`);

    // Fetch current points and add the new points
    get(userRef)
      .then(snapshot => {
        const currentPoints = snapshot.val().points;
        const updatedPoints = currentPoints + points;

        return update(userRef, { points: updatedPoints });
      })
      .then(() => {
        console.log('Points successfully updated in Firebase');
      })
      .catch(err => {
        console.error('Error updating points:', err);
      });
  }
}, [uid, points]);

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2 className="game-over-title">GAME <br /> OVER</h2>
        <p className="game-over-subtitle">You have scored</p>
        <div className="game-over-points">
          <div className="star-icon">⭐</div>
          <span className="points-text">{points} <span className="points-unit">Points</span></span>
        </div>
        <button className="continue-button" onClick={() => navigate('/dashboard')}>
          Continue
        </button>
      </div>
    </div>
  )
}
export default GameOver
