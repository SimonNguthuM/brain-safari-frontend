// import React, { useEffect, useState } from 'react';

// const Leaderboard = () => {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await fetch('https://brain-safari-backend.onrender.com/leaderboard');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setLeaderboard(data.leaderboard);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard">
//       <h2>Leaderboard</h2>
//       {error ? (
//         <div className="error">{error}</div>
//       ) : (
//         <table className="table-auto w-full text-left">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Rank</th>
//               <th className="px-4 py-2">Username</th>
//               <th className="px-4 py-2">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.map((user, index) => (
//               <tr key={user.id} className="border-t border-gray-200">
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2">{user.username}</td>
//                 <td className="px-4 py-2">{user.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;
import React from 'react';

const Leaderboard = () => {
  const sampleLeaderboard = [
    { id: 1, username: 'Alice', score: 120 },
    { id: 2, username: 'Bob', score: 110 },
    { id: 3, username: 'Charlie', score: 105 },
    { id: 4, username: 'David', score: 100 },
    { id: 5, username: 'Eve', score: 95 },
  ];

  return (
    <div className="leaderboard bg-teal-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-coral-600">Leaderboard</h2>
      <table className="table-auto w-full text-left">
        <thead className="bg-teal-500 text-white">
          <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {sampleLeaderboard.map((user, index) => (
            <tr key={user.id} className="border-t border-gray-200">
              <td className="px-4 py-2 text-teal-700">{index + 1}</td>
              <td className="px-4 py-2 text-teal-700">{user.username}</td>
              <td className="px-4 py-2 text-teal-700">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
