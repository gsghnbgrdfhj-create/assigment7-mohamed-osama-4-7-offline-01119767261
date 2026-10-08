import express from "express"
const app = express()
app.use(express.json())
import { DB, testconnection } from "./src/DB/db.connection.js";
import chalk from "chalk";
import { bookmodel } from "./src/DB/models/books.model.js";
import { authorsmodel } from "./src/DB/models/authors.model.js";
import { logsmodel } from "./src/DB/models/logs.model.js";
await testconnection();

const result = await authorsmodel.insertOne({
    name: "ahmed",
    age: 12
});


await bookmodel.createIndex({
    title: 1
})

await bookmodel.insertOne({
    title: "Future",
    author: "Ahmed",
    year: 2020,
    genre: "Science Fiction"
})

await bookmodel.insertMany([
    {
        title: "BraveNewWorld",
        author: "Aldous Huxley",
        year: 1932,
    },
    {
        title: "TheHobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        year: 1965,
    }
])
await logsmodel.insertOne({
    message: "Server started",
    level: "info",
})

await bookmodel.updateOne(
    { title: "Future" },
    {
        $set: {
            year: 2022
        }
    }
)
const user = await bookmodel.findOne({
    title: "BraveNewWorld"
})
const book = await bookmodel.find({
    year: {
        $gte: 1990,
        $lte: 2010
    }
}).toArray()


const books = await bookmodel.find({
    genre: "Science Fiction"
}).toArray()


const Book = await bookmodel.find().sort({ year: -1 }).skip(2).limit(3).toArray()

const Books = await bookmodel.find({
    year: {
        $type: "int"
    }
}).toArray()

const BOOKS = await bookmodel.find({
    genre: {
        $nin: ["Horror", "Science Fiction"]
    }
}).toArray()

const results = await bookmodel.deleteMany({
    year: {
        $lt: 2000
    }
})
const BOOK = await bookmodel.aggregate([
    {
        $match: {
            year: {
                $gte: 2000
            }
        }
    },
    {
        $sort: {
            year: -1
        }
    }
]).toArray()
console.log(BOOK);

const arre_book = await bookmodel.aggregate([
    {
        $match: {
            year: {
                $gte: 2000

            }
        }
    },
    {
        $project: {
            title: 1,
            author: 1,
            year: 1
        }
    }
])

const Arre_book = await bookmodel.aggregate([{
    $unwind : "$genres"
}]).toArray()

const Result = await bookmodel.aggregate([
    {
        $lookup: {
            from: "logs",
            localField: "title",
            foreignField: "title",
            as: "logs"
        }
    }
]).toArray();

console.log(Result);

console.log(result);
app.listen(3000, () => {
    console.log(chalk.green("serever is running sucessefuly"));

})