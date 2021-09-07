import Form from "components/form";
import Input from "components/input";
import Textarea from "components/textarea";
import { newRecipe, Recipe } from "models/recipe";
import { useRouter } from "next/dist/client/router";
import { FC, FormEventHandler, useState } from "react";

const NewRecipeForm: FC<{}> = () => {
  const router = useRouter();
  const [err, setErr] = useState<Error | undefined>(undefined);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setErr(undefined);
    const recipeName = e.currentTarget["recipe-name"].value;
    const servingCount = Number(e.currentTarget["serving-count"].value);
    const instructions = e.currentTarget["instructions"].value;

    const recipe: Recipe = { recipeName, servingCount, instructions };

    try {
      await newRecipe(recipe);
      router.push("/");
    } catch (e) {
      setErr(e as Error);
    }
  };

  return (
    <Form onSubmit={onSubmit} action="create" err={err}>
      <Input name="recipe-name" label="Recipe Name" />
      <Input name="serving-count" label="Servings" type="number" />
      <Textarea name="instructions" label="Instructions" rows={20} />
    </Form>
  );
};

export default NewRecipeForm;
