import { DB } from "../db.connection.js";

export const bookmodel  =DB.collection("books", {
    validator: {
        $jsonSchema: {
            required: ["title"],
            properties: {
                title: {
                    bsonType: "string",
                    minLength: 1
                }
            }
        }
    }
});