import Content from "components/content";
import { Recipe } from "lib/models/recipe";
import { getRecipe } from "lib/models/repositories/recipe";
import { GetServerSideProps, NextPage } from "next";
import RecipeView from "components/views/recipe";

type Props = { recipe: Recipe };

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  if (params === undefined) {
    return { notFound: true };
  }
  const id = Number(params["id"]);
  if (!isFinite(id)) {
    return { notFound: true };
  }
  const recipe = await getRecipe(id);
  if (recipe === undefined) {
    return { notFound: true };
  }
  return { props: { recipe } };
};

const RecipePage: NextPage<Props> = ({ recipe }) => (
  <Content title={recipe.recipeName}>
    <RecipeView recipe={recipe} />
  </Content>
);

export default RecipePage;
