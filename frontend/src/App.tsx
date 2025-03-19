// import React from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
// import Home from './screens/Home'
import AnotherHome from './screens/AnotherHome'
import Analytics from './screens/Analytics'
import CreateTrack from './screens/CreateTrack'
import Layout from './comps/Layout'
import { RecoilRoot } from 'recoil'
import IndieTrack from './screens/IndieTrack'
// import Indietest from './screens/Indietest'
import Auth from './screens/Auth'
import NoteTimer from './comps/NoteTimer'
import LiBrary from './screens/LiBrary'
import axios from 'axios'
import LandingPage from './screens/LandingPage'
axios.defaults.withCredentials=true;
const App = () => {
  return (
    <RecoilRoot>
    <Router>
      <Layout>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>  
        <Route path='/home' element={<AnotherHome/>}/>
        <Route path='/createTrack' element={<CreateTrack/>}/>
        <Route path='/analysis' element={<Analytics/>}/>
        <Route path='/track/:id' element={<IndieTrack/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/note' element={<NoteTimer/>}/>
        <Route path='/lib' element={<LiBrary/>}/>
      </Routes>
      </Layout>
    </Router>
    </RecoilRoot>
  )
}

export default App
// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AnotherHome from './screens/AnotherHome';
// import Analytics from './screens/Analytics';
// import CreateTrack from './screens/CreateTrack';
// import Layout from './comps/Layout';
// import { RecoilRoot } from 'recoil';
// import IndieTrack from './screens/IndieTrack';
// import Auth from './screens/Auth';
// import NoteTimer from './comps/NoteTimer';
// import LiBrary from './screens/LiBrary';
// import axios from 'axios';
// import LandingPage from './screens/LandingPage';

// axios.defaults.withCredentials = true;

// const App = () => {
//   useEffect(() => {
//     const faviconUrl = `${process.env.PUBLIC_URL}/logo.jpg`;

//     const link = document.querySelector("link[rel~='icon']");
//     if (link) {
//       (link as HTMLLinkElement).href = faviconUrl; // Type assertion here
//     } else {
//       const newLink = document.createElement('link');
//       newLink.rel = 'icon';
//       newLink.href = faviconUrl;
//       document.head.appendChild(newLink);
//     }
//   }, []);

//   return (
//     <RecoilRoot>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/home" element={<AnotherHome />} />
//             <Route path="/createTrack" element={<CreateTrack />} />
//             <Route path="/analysis" element={<Analytics />} />
//             <Route path="/track/:id" element={<IndieTrack />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/note" element={<NoteTimer />} />
//             <Route path="/lib" element={<LiBrary />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </RecoilRoot>
//   );
// };

// export default App;