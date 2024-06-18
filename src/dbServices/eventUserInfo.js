const eventUserInfoModel = require("../models/EventUserInfo");

const findRewardByUserIdAndEventId = async (eventId, userId) => {
  return eventUserInfoModel.findOne({ eventId, userId }, { reward: 1, _id: 0 });
};

const updateRewardsByEventIdAndUserId = async (eventId, userId, reward) => {
  await eventUserInfoModel.findOneAndUpdate({ eventId, userId }, { reward });
};

const addEventUserInfo = async (userId, bucketId, eventId) => {
  const entity = new eventUserInfoModel({
    userId,
    bucketId,
    eventId,
  });

  await entity.save();
};

const getEventUserInfo = async (eventId, userId) => {
  return eventUserInfoModel.findOne({ eventId, userId });
};

const updateClaimByUserIdAndEventId = async (eventId, userId) => {
  return eventUserInfoModel.findOneAndUpdate(
    {
      eventId,
      userId,
    },
    { claim: true }
  );
};

const filterNeedToClaimUserInfo = async (userId) => {
  return eventUserInfoModel.findOne({ userId, claim: false });
};

module.exports = {
  findRewardByUserIdAndEventId,
  updateRewardsByEventIdAndUserId,
  addEventUserInfo,
  getEventUserInfo,
  updateClaimByUserIdAndEventId,
  filterNeedToClaimUserInfo,
};
