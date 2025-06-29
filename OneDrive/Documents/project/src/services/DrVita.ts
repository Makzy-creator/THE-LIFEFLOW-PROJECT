// import React, { useEffect } from 'react';
// import TavusService from '../services/tavusService';

// const tavusConfig = {
//   apiKey: 'YOUR_API_KEY',
//   replicaId: 'YOUR_REPLICA_ID',
//   // ...other config
// };

// const tavusService = new TavusService(tavusConfig);

// const DrVita: React.FC = () => {
//   // Replace these with your actual user data
//   const userId = 'some-user-id';
//   const userProfile = { name: 'User Name' };

//   useEffect(() => {
//     // Register the error handler ONCE
//     tavusService.onError((error) => {
//       alert("Please wait a minute before trying again.");
//     });

//     // Call initializeSession safely
//     const init = async () => {
//       try {
//         await tavusService.initializeSession(userId, userProfile);
//       } catch (error) {
//         alert("Please wait a minute before trying again.");
//       }
//     };
//     init();
//   }, [userId, userProfile]);

//   return (
//     <div>
//       {/* Your DrVita UI goes here */}
//     </div>
//   );
// };

// export default DrVita;