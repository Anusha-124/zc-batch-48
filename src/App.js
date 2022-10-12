import HomePage from "./Components/Home/HomePage";
import SearchPage from "./Components/Search/SearchPage";
import { Routes, Route } from 'react-router-dom'
import RestaurantPage from "./Components/restaurant/RestaurantPage"


function App() {
  return (
    <>
      <main className="contaianer-fluid ">
        <Routes>
          <Route path ="/" element= {<HomePage />}/>
          <Route path ="/search-page/:meal_id" element= {<SearchPage />}/>
          <Route path ="/restaurant/:id" element={< RestaurantPage />}/>
          
        </Routes>

      </main>

    </>

  );
}

export default App;
