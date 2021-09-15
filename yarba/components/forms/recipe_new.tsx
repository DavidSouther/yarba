import Form from "components/form";
import Input from "components/input";
import Textarea from "components/textarea";
import { Recipe } from "lib/models/recipe";
import { getRepository } from "lib/models/repositories/recipe";
import { Err, isErr, unwrap } from "lib/result";
import URLs from "lib/urls";
import { useRouter } from "next/dist/client/router";
import { FC, FormEventHandler, useState } from "react";

const NewRecipeForm: FC<{}> = () => {
  const router = useRouter();
  const [err, setErr] = useState<Error | undefined>(undefined);

  const onSubmit = async (e: Record<string, string>) => {
    setErr(undefined);
    const recipeName = e["recipe-name"];
    const servingCount = Number(e["serving-count"]);
    const instructions = e["instructions"];

    const recipe: Recipe = { recipeName, servingCount, instructions };

    const add = await getRepository().add(recipe);
    if (isErr(add)) {
      const err = Err(add);
      setErr(err);
    } else {
      router.push(URLs.home);
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
