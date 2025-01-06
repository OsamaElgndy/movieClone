import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './module/components/1-search/Search'
import List from './module/components/2-list/List'
import CartMovies from './module/components/3-cardMovies/CardMovies.tsx'
import Details from './module/components/4-details/Details.tsx';
function App() {
  return (
    <>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <>
          <Search />
          <List />
          <CartMovies />
        </>
      } />
      <Route path="/details" element={<Details />}>
      </Route>
    </Routes>
  </BrowserRouter>
    </>

  )
}

export default App
