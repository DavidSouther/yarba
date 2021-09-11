export interface Recipe {
  id?: number;
  recipeName: string;
  servingCount: number;
  instructions: string;
}

export function newRecipe(recipe: Recipe): Promise<{}> {
  return fetch("/api/recipes/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then(async (response) => {
    const { ok, statusText } = response;
    const body = await response.json();
    if (!ok) {
      const name = body.error["name"] ?? statusText;
      const message = body.error["message"] ?? "Failed to save recipe";
      throw { name, message };
    }
    return body;
  });
}

export function parseRecipe(body: Record<string, string>): Recipe | Error {
  const recipeName = body["recipeName"] ?? "";
  const servingCount = Number(body["servingCount"]);
  const instructions = body["instructions"] ?? "";

  if (recipeName.length <= 0) {
    return {
      name: "RECIPE_NAME_REQUIRED",
      message: "A name is required for a recipe",
    };
  }
  if (recipeName.length > 55) {
    return {
      name: "RECIPE_NAME_TOO_LONG",
      message: "Recipe names should be short and savory",
    };
  }
  if (!isFinite(servingCount)) {
    return {
      name: "SERVING_COUNT_NOT_FINITE",
      message: "We only deal with normal numbers of people",
    };
  }
  if (instructions.length <= 0) {
    return {
      name: "INSTRUCTIONS_REQUIRED",
      message:
        "Lists of ingredients are fine, but how do we put them together?",
    };
  }

  return { recipeName, servingCount, instructions };
}
