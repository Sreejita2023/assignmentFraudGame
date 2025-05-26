import React, { useEffect, useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { realtimeDB } from '../firebase'; // make sure this exports your realtime DB instance
import { useUser } from '../context/UserContext';
import '../styles/Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { uid } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const dbRef = ref(realtimeDB);
      try {
        const snapshot = await get(child(dbRef, 'users'));
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const dataArray = Object.values(dataObj);

          // Sort by points descending
          const sorted = dataArray
            .sort((a, b) => b.points - a.points)
            .map((user, index) => ({
              ...user,
              rank: index + 1,
            }));

          setUsers(sorted);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="dashboard-container">
        <Sidebar/>
      <h1 className="title">CATCH THE FAKE</h1>
      <div className="leaderboard-box">
        <h2>LEADERBOARD</h2>
        <div className="leaderboard">
          {users.map((user, index) => (
            <div
              key={user.uid}
              className={`leaderboard-entry ${user.uid === uid ? 'highlighted' : ''}`}
            >
              <div className="rank">{index + 1}</div>
              <div className="circle">{user.name[0]}</div>
              <div className="name">
                {user.name} {user.uid === uid && <span>(you)</span>}
              </div>
              <div className="points">{user.points} points</div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="btn share">🔗 Share</button>
          <button className="btn play-again">🔁 Play Again</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
