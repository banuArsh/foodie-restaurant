import { useState, useEffect } from "react";
import "./styles.css";
import Searchbar from "./component/Searchbar";
import RecipiCard from "./component/Recipicard";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
function App() {
  const [isLoading, SetisLoading] = useState(false);
  const [querry, SetQuerry] = useState("");
  const [recipes, SetRecipi] = useState([]);

  const searchRecipi = async () => {
    SetisLoading(true);
    const url = apiUrl + querry;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    SetRecipi(data.meals);
    SetisLoading(false);
  };

  useEffect(() => {
    searchRecipi();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipi();
  };

  return (
    <div className="container">
      <h2>Foodie Restaurant</h2>
      <Searchbar
        handleSubmit={handleSubmit}
        value={querry}
        onChange={(event) => SetQuerry(event.target.value)}
        isLoading={isLoading}
      />
      <div className="recipe">
        {recipes
          ? recipes.map((recipe) => (
              <RecipiCard key={recipe.idMeal} recipe={recipe} />
            ))
          : "No Recipes "}
      </div>
    </div>
  );
}

export default App;
