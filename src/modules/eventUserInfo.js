const eventUserInfoModelService = require("../dbServices/EventUserInfo");

const findRewardByUserIdAndEventId = async (eventId, userId) => {
  return eventUserInfoModelService.findRewardByUserIdAndEventId(
    eventId,
    userId
  );
};

const updateRewardsByEventIdAndUserId = async (eventId, userId, reward) => {
  await eventUserInfoModelService.updateRewardsByEventIdAndUserId(
    eventId,
    userId,
    reward
  );
};

const addUserEventInfo = async (userId, bucketId, eventId) => {
  await eventUserInfoModelService.addEventUserInfo(userId, bucketId, eventId);
};

const getEventUserInfo = async (eventId, userId) => {
  return eventUserInfoModelService.getEventUserInfo(eventId, userId);
};

const updateClaimByUserIdAndEventId = async (eventId, userId) => {
  return eventUserInfoModelService.updateClaimByUserIdAndEventId(
    eventId,
    userId
  );
};

const filterNeedToClaimUserInfo = async (userId) => {
  return eventUserInfoModelService.filterNeedToClaimUserInfo(userId);
};

module.exports = {
  findRewardByUserIdAndEventId,
  updateRewardsByEventIdAndUserId,
  addUserEventInfo,
  getEventUserInfo,
  updateClaimByUserIdAndEventId,
  filterNeedToClaimUserInfo,
};
