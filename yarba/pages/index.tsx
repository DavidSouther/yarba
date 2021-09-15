import Content from "components/content";
import { Recipe } from "lib/models/recipe";
import type { GetServerSideProps, NextPage } from "next";
import RecipeList from "components/views/recipe_list";
import { unwrapOr } from "lib/result";
import { getRepository } from "lib/models/repositories/recipe";

type Props = { recipes: Recipe[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const list = await getRepository().list();
  const recipes = unwrapOr(list, []);
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
