require('dotenv').config();

require('../config/connection');
const { User } = require('../models');
const data = require("./data.json");

async function seed() {
    await User.create(data.user);
    process.exit(0);
}

seed();