// // src/components/Login.js
// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const auth = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       auth.handleLogin({ email, password });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-coral-400">
//       <div className="p-6 max-w-sm w-full bg-white bg-opacity-80 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-teal-700 mb-4">Login</h2>
//         {auth.message && (
//           <div className={`mb-4 p-2 text-white rounded ${auth.messageType === 'success' ? 'bg-teal-500' : 'bg-red-500'}`}>
//             {auth.message}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-teal-700">Email:</label>
//             <input
//               type="email"
//               className="w-full p-2 border border-teal-300 rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-teal-700">Password:</label>
//             <input
//               type="password"
//               className="w-full p-2 border border-teal-300 rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded transition"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <Link to="/signup" className="text-teal-500 hover:underline">
//             Don't have an account? Sign up here!
//           </Link>
//         </div>
//         <div className="mt-2 text-center">
//           <Link to="/forgot-password" className="text-teal-400 hover:underline">
//             Forgot Password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
