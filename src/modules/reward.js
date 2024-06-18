const config = require("../config");
const bucketModule = require("./bucket");

const getUserRewardsByEvent = async (eventId, userId) => {
  const sortedBucketUsers = await bucketModule.getBucketByEventIdForCurrentUser(
    eventId,
    userId
  );

  const userRank = sortedBucketUsers.users.map((item, index) => {
    if (item.user._id.equals(userId)) {
      return index + 1;
    }
  });

  return config.MAX_USERS_PER_BUCKET - userRank;
};

module.exports = {
  getUserRewardsByEvent,
};
