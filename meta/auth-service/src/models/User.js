const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const { Schema, model } = mongoose;
const SALT = 10;

const UserSchema = new Schema({});

module.exports = model("users", UserSchema, {});
