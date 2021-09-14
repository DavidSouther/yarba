import Content from "components/content";
import { Recipe } from "lib/models/recipe";
import { GetServerSideProps, NextPage } from "next";
import RecipeView from "components/views/recipe";
import { getRepository } from "lib/models/repositories/recipe";
import { isErr, Ok } from "lib/result";

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
  const recipe = await getRepository().get(id);
  return isErr(recipe) ? { notFound: true } : { props: { recipe: Ok(recipe) } };
};

const RecipePage: NextPage<Props> = ({ recipe }) => (
  <Content title={recipe.recipeName}>
    <RecipeView recipe={recipe} />
  </Content>
);

export default RecipePage;
