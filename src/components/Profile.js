import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/1234').then(res => setUser(res.data));
  }, []);

  return user ? (
    <div>
      <h1>{user.name}'s Profile</h1>
      <ul>
        {user.skills.map(s => (
          <li key={s.skillName}>{s.skillName}: {s.rating}/5</li>
        ))}
      </ul>
    </div>
  ) : <p>Loading...</p>;
};

export default Profile;
