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
* Dimension (Volume | Weight | Count)
* Basis (l, ml, g, kg, cnt, gal, cup, qrt, pint, tbsp, tsp)

+ normalize(metric measurement) // Given a measurement in metric, normalize it to Milliliters / Grams / Count
+ toMetric(measurement)
+ toImperial(measurement)
+ parseMeasurement(string)
