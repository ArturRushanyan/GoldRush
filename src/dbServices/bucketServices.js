const mongoose = require("mongoose");
const bucketModel = require("../models/Bucket");

const getBucketByEventIdAndUserId = async (eventId, userId) => {
  return bucketModel.findOne({
    eventId,
    "users.user": userId,
  });
};

const getBucketByEventIdForCurrentUser = async (eventId, userId) => {
  const result = await Bucket.aggregate([
    // Match the bucket with the given eventId
    { $match: { eventId: eventId } },
    // Check if the user exists in the users array
    { $unwind: "$users" },
    // NOTE: This style is deprecated, didn't fount another solution
    { $match: { "users.user": new mongoose.Types.ObjectId(userId) } },
    // Regroup to reconstruct the bucket
    {
      $group: {
        _id: "$_id",
        users: { $push: "$users" },
        eventId: { $first: "$eventId" },
        userTypesCount: { $first: "$userTypesCount" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    // If user is found, continue with the pipeline
    {
      $lookup: {
        from: "buckets",
        localField: "_id",
        foreignField: "_id",
        as: "bucket",
      },
    },
    { $unwind: "$bucket" },
    // Unwind the users array to sort and populate
    { $unwind: "$bucket.users" },
    // Lookup to join user details from the User collection
    {
      $lookup: {
        from: "users",
        localField: "bucket.users.user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    // Unwind the userDetails array to merge with the users array
    { $unwind: "$userDetails" },
    // Add userDetails to users
    {
      $addFields: {
        "bucket.users.user": "$userDetails",
      },
    },
    // Sort the deconstructed users by golds in descending order
    { $sort: { "bucket.users.golds": -1 } },
    // Group back into buckets with sorted users
    {
      $group: {
        _id: "$bucket._id",
        users: { $push: "$bucket.users" },
        eventId: { $first: "$bucket.eventId" },
        userTypesCount: { $first: "$bucket.userTypesCount" },
        createdAt: { $first: "$bucket.createdAt" },
        updatedAt: { $first: "$bucket.updatedAt" },
      },
    },
  ]);

  return result;
};

const getAvailableBucketByEventId = async (
  eventId,
  userType,
  userTypeLimit,
  maxUserLimit
) => {
  return bucketModel.findOne({
    eventId,
    [`userTypesCount.${userType}`]: {
      $lt: userTypeLimit,
    },
    $expr: { $lt: [{ $size: "$users" }, maxUserLimit] },
  });
};

const createNewBucket = async (eventId) => {
  const newBucket = new bucketModel({
    eventId,
  });

  await newBucket.save();
  return newBucket;
};

const addUserAndGoldsToBucket = async (bucketId, user, goldsToAdd) => {
  const bucket = await bucketModel.findOne({ _id: bucketId });

  console.log("bucket =>>>", bucket);

  // NOTE: Find the index of the user in the users array
  const userIndex = await bucket.users.findIndex(
    (userObj) => userObj.user.toString() === user._id.toString()
  );

  if (userIndex !== -1) {
    // NOTE: User found, incrementing golds.
    await (bucket.users[userIndex].golds += goldsToAdd);
  } else {
    // NOTE: User not found, add user and golds
    await bucket.users.push({ user: user._id, golds: goldsToAdd });
    await bucket.userTypesCount[user.user_type]++;
  }

  await bucket.save();
};

module.exports = {
  getBucketByEventIdAndUserId,
  getBucketByEventIdForCurrentUser,
  getAvailableBucketByEventId,
  createNewBucket,
  addUserAndGoldsToBucket,
};
