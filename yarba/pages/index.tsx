import Content from "components/content";
import { Recipe } from "lib/models/recipe";
import { makeApiRecipeRepository } from "lib/models/repositories/recipe/api";
import type { GetServerSideProps, NextPage } from "next";
import RecipeList from "components/views/recipe_list";
import { isOk } from "lib/models/repositories/repository";

type Props = { recipes: Recipe[] };
const api = makeApiRecipeRepository();

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recipes = await api.list();
  return isOk(recipes)
    ? { props: { recipes: recipes.ok } }
    : { props: { recipes: [] } };
};

const Home: NextPage<Props> = ({ recipes }) => {
  return (
    <Content title="Recipes">
      <RecipeList recipes={recipes} />
    </Content>
  );
};

export default Home;
