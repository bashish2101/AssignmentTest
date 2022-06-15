const services = require('../services/userServices');
const { sendResponse } = require('../utils/appUtils');


exports.getAllUsers = async (req, res) => {
    try { console.log("in")
        let user = await services.getAllUsers(req);

        return await sendResponse(res, {statusCode: 200, message: "Users get successfully", user})
    } catch (error) {console.log("in12", error)
        return sendResponse(res, "Internal server error");
    }
}

exports.createUser = async (req, res) => {
    try {
        let user = await services.createUser(req);

        return await sendResponse(res, {statusCode: 201, message: "User added successfully", user})
    } catch (error) {
        return sendResponse(res, "Internal server error");
    }
}

exports.updateUser = async (req, res) => {
    try {
        let user = await services.updateUser(req);

        return await sendResponse(res, {statusCode: 200, message: "User updated successfully", user})
    } catch (error) {
        return sendResponse(res, "Internal server error");
    }
}

exports.getUserById = async (req, res) => {
    try {
        let user = await services.getUserById(req);

        return await sendResponse(res, {statusCode: 200, message: "User get successfully", user})
    } catch (error) {
        return sendResponse(res, "Internal server error");
    }
}

exports.addDummyData = async (req, res) => {
    await seedDB()
}

async function seedDB() {

const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
    // Connection URL
    const uri = "mongodb+srv://dzi:bGpjRReAsaRQBDb7@dzi.yzpnz.mongodb.net";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("assignment").collection("users");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const fname = faker.name.firstName();
            const lname = faker.name.lastName();
            let newDay = {
               fname,
               lname,
               password: faker.random.word(),
               email: faker.internet.email(fname, lname),
               address: faker.address.streetAddress() + faker.address.city() + faker.address.country()
            };
            timeSeriesData.push(newDay);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}