import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import QuickBtn from './components/QuickBtn';
import TopNav from './components/TopNav';
import Mypage from './pages/Mypage'
import Recipe from './pages/Recipe'
import Events from './pages/Events'
import Comunity from './pages/Comunity'
import Search from './pages/Search'
import Footer from './components/Footer';
import MainPopupModal from './components/MainPopupModal.tsx';
import './App.scss';



function App() {
  return (
    <div className='app'>
    <MainPopupModal/>
    <TopNav/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/recipe" element={<Recipe/>}></Route>
          <Route path="/events" element={<Events/>}></Route>
          <Route path="/comunity" element={<Comunity/>}></Route>
          <Route path="/mypage" element={<Mypage/>}></Route>
        </Routes>
        <QuickBtn/>
            <Footer/>
  
      </div>
  );
}

export default App;
