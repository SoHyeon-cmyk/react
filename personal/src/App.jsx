import {Routes, Route} from 'react-router-dom'
import './App.scss';
import Home from './pages/Home'
import QuickBtn from './components/QuickBtn';
import TopNav from './components/TopNav';
import Mypage from './pages/Mypage'
import Recipe from './pages/Recipe'
import Comunity from './pages/Comunity'
import Search from './pages/Search'

function App() {
  return (
    <>
  <TopNav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/recipe" element={<Recipe/>}></Route>
        <Route path="/comunity" element={<Comunity/>}></Route>
        <Route path="/mypage" element={<Mypage/>}></Route>
      </Routes>

      <QuickBtn/>

    </>

  );
}

export default App;
