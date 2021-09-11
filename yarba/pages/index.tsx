import Content from "components/content";
import { Recipe } from "lib/models/recipe";
import { listRecipes } from "lib/models/repositories/recipe";
import type { GetServerSideProps, NextPage } from "next";
import RecipeList from "components/views/recipe_list";

type Props = { recipes: Recipe[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recipes = await listRecipes();
  return { props: { recipes } };
};

const Home: NextPage<Props> = ({ recipes }) => {
  return (
    <Content title="Recipes">
      <RecipeList recipes={recipes} />
    </Content>
  );
};

export default Home;
