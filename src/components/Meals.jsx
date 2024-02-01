import { useHttp } from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";
const requestConfig = {};
export default function Meals() {
  const { data, error, isLoading } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );
  return (
    <>
      {isLoading && <p className="center">Fetching data...</p>}
      {!isLoading && !error && (
        <ul id="meals">
          {data.map((meal) => (
            <MealItem {...meal} key={meal.id} />
          ))}
        </ul>
      )}
      {error && <Error title="Failed to fetch meals" message={error} />}
    </>
  );
}
