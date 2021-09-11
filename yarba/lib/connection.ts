import { getConnectionManager } from "typeorm";
import { RecipeEntity } from "./models/entities/recipe";

const URL =
  process.env["DB_URL"] ?? "postgres://recipes:recipes@localhost:5432/recipes";
const TYPE = URL.match(/^([^:]+):/)?.[1] ?? "";

if (!["postgres"].includes(TYPE)) {
  throw new Error(`Invalid connection url ${URL}`);
}

const connectionManager = getConnectionManager();

export async function getConnection() {
  if (!connectionManager.has("default")) {
    connectionManager.create({
      type: TYPE as any,
      url: URL,
      synchronize: true,
      logging: true,
      entities: [RecipeEntity],
      migrations: [__dirname + "/migrations/**/*.ts"],
      subscribers: [__dirname + "/subscriber/**/*.ts"],
    });
  }

  const db = connectionManager.get();
  if (!db.isConnected) {
    await db.connect();
  }
  return db;
}
