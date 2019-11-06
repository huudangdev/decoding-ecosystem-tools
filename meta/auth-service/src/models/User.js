const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const { Schema, model } = mongoose;
const SALT = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  fullName: String,
  password: String,
  phone: {
    code: String,
    number: String,
    verified: Boolean
  },
  isPartner: {
    type: Boolean,
    default: false
  },
  avatar: {
    avatar: { type: String, default: "" },
    old: { type: Boolean, default: false }
  },
  tokenPlatforms: {
    type: [
      {
        platform: { type: String, default: "" },
        token: { type: String, default: "" }
      }
    ],
    default: []
  },
  introduction: String,
  profile: {
    cover: { type: String, default: "" },
    coverPosition: { type: Number, default: 50 }
  },
  statics: {
    totalTestCreated: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    totalFollowing: { type: Number, default: 0 }
  },
  birthday: Date,
  role: {
    type: String,
    default: "PLAYER"
  },
  active: {
    type: Object,
    default: {
      isActive: false,
      code: ""
    }
  },
  facebookID: String,
  googleID: String,
  gender: String,
  isOwner: {
    type: Boolean,
    default: false
  },
  privacy: {
    playedTest: {
      type: Boolean,
      default: false
    },
    activity: {
      type: Boolean,
      default: false
    },
    blog: {
      type: Boolean,
      default: false
    }
  },
  firstLogin: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  followers: {
    type: [
      {
        _id: { type: Schema.Types.ObjectId },
        username: { type: String },
        email: { type: String },
        avatar: {},
        fullName: { type: String },
        isPartner: { type: Boolean }
      }
    ],
    default: []
  },
  following: {
    type: [
      {
        _id: { type: Schema.Types.ObjectId },
        username: { type: String },
        email: { type: String },
        avatar: {},
        fullName: { type: String },
        isPartner: { type: Boolean }
      }
    ],
    default: []
  },
  followedTags: {
    type: [
      {
        _id: { type: Schema.Types.ObjectId },
        name: { type: String },
        slug: { type: String }
      }
    ],
    default: []
  },
  fbFriendIds: {
    type: [String],
    default: []
  },
  subscription: {
    key: {
      type: String,
      default: "FREE"
    },
    plan: {
      type: String,
      default: "payment:plan.free.title"
    },
    boughtAt: {
      type: Date,
      default: Date.now
    },
    validTo: {
      type: Date
    }
  },
  balance: {
    type: Number,
    default: 0
  },
  holdBalance: {
    type: Number,
    default: 0
  },
  isTrialed: {
    type: Boolean,
    default: false
  },
  isTrialing: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      email: this.email,
      _id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    config.authSecret
  );
};

UserSchema.methods.toAuthJSON = () => {
  return {
    ...this.toObject(),
    password: -1
  };
};

UserSchema.methods.comparePassword = async password => {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

UserSchema.methods.updatePassword = async password => {
  this.password = await bcrypt.hash(password, SALT);
  this.lastUpdatedPassword = new Date();
  return this.save();
};

module.exports = model("users", UserSchema, {
    checkExists: async (query) => {
        return !!await this.findOne(query);
    },
    createUser: async (query) => {
        return this.findOneAndUpdate(
            query,
            {
                $set: {
                    active: {
                        isActive: true
                    }
                }
            },
            {new: true}
        )
    },
    loginUser: async (userData) => {
        const user = await this.findOne(
            {
                email: userData.email
            },
            {
                'active.code': 0,
                followed_tags: 0,
                followed_users: 0,
                bookmarks: 0,
                followedTags: 0,
                followedUsers: 0,
                followers: 0,
                following: 0
            }
        )
        if (!user) return false;
        const isCorrectPassword = await bcrypt.compare(
            userData.password,
            user.password
        )
        return isCorrectPassword ? user : false
    }
});
