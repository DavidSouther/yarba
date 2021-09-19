# Data Model

## Recipe

* ID (Primary Key)
* Name (String, Unique)
* Ingredients (Many relationship)
* Instructions (Many relationship, ordered)

+ parseRecipe(Partial<{name: string, ingredients: string[], instructions: string}>)

## Instruction

* Recipe
* Sequence Number
* Instructions

+ parseInstructions(string)
+ resequence(Instruction[])

## Ingredient

* Name (Indexed)
* Recipe (One relationship)
* Measurement (Embedded Data)

+ parseIngredient(`${name} ${measurement}|${measurement} ${name}`)

## Measurement

* Amount (Number)
* Volume (Liter) | Weight (Grams) | Count

+ parseMeasurement(string)
+ toMetric()
+ toImperial()
