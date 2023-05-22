import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getMeals = async () => {
    setIsLoading(true);
    setError(false);
    const response = await fetch(
      "https://react-http-83ecd-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    setIsLoading(false);
    setData(data);

    return;
  };

  useEffect(() => {
    try {
      getMeals();
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
    }
  }, []);

  let mealsList;
  let loadingMessage;
  let errorMessage;

  if (isLoading) {
    loadingMessage = <p>Loading data...</p>;
  }

  if (error) {
    errorMessage = <p>Something went wrong. Couldn't fetch meals</p>;
  }

  if (data === null) {
    mealsList = <p>Something went wrong! Couldn't fetch meals.</p>;
  } else {
    mealsList = data.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  return (
    <section className={classes.meals}>
      <Card>
        {errorMessage}
        {loadingMessage}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
