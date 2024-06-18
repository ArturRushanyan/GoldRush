const bucketModelService = require("../dbServices/bucketServices");
const config = require("../config");

const getBucketByEventIdForCurrentUser = async (eventId, userId) => {
  return bucketModelService.getBucketByEventIdForCurrentUser(eventId, userId);
};

const getBucketByEventIdAndAvailability = async (eventId, user) => {
  // Searching user in buckets
  let bucket = await bucketModelService.getBucketByEventIdAndUserId(
    eventId,
    user._id
  );

  if (!bucket) {
    bucket = await bucketModelService.getAvailableBucketByEventId(
      eventId,
      user.user_type,
      config.ROLE_LIMITS[user.user_type],
      config.MAX_USERS_PER_BUCKET
    );

    return { bucket, existInBucket: false };
  }

  return { bucket, existInBucket: true };
};

const createNewBucket = async (eventId) => {
  return bucketModelService.createNewBucket(eventId);
};

const addUserAndGoldsToBucket = async (bucketId, user, goldCount) => {
  await bucketModelService.addUserAndGoldsToBucket(bucketId, user, goldCount);
};

module.exports = {
  getBucketByEventIdForCurrentUser,
  getBucketByEventIdAndAvailability,
  createNewBucket,
  addUserAndGoldsToBucket,
};
