const eventModule = require("../../modules/event");
const constMessages = require("../../utils/constMessages");
const eventUserInfoModule = require("../../modules/eventUserInfo");
const rewardModule = require("../../modules/reward");
const bucketModule = require("../../modules/bucket");

const getCurrentEvent = async (req, res, next) => {
  const { user } = req;

  try {
    const needToClaimEventUserInfo =
      await eventUserInfoModule.filterNeedToClaimUserInfo(user._id);

    if (needToClaimEventUserInfo) {
      const { eventId, userId } = needToClaimEventUserInfo;
      let { reward } = needToClaimEventUserInfo;
      if (!reward) {
        reward = await rewardModule.getUserRewardsByEvent(eventId, userId);
        await eventUserInfoModule.updateRewardsByEventIdAndUserId(
          eventId,
          userId,
          reward
        );
      }

      return res.status(200).json({ data: { reward } });
    }

    const activeEvent = await eventModule.getCurrentActiveEvent();

    if (!activeEvent) {
      return res.status(200).json({ message: constMessages.NO_ACTIVE_EVENTS });
    }

    return res.status(200).json({
      data: {
        _id: activeEvent._id,
        state: activeEvent.state,
        endDate: activeEvent.endDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

const reportScore = async (req, res, next) => {
  const { eventId, goldCount } = req.body;
  const { user } = req;

  try {
    const isEventActive = await eventModule.isEventActive(eventId);

    if (!isEventActive) {
      const rewardInfo = await eventUserInfoModule.findRewardByUserIdAndEventId(
        eventId,
        user._id
      );

      if (rewardInfo.reward) {
        return res.status(200).json({ data: { reward: rewardInfo.reward } });
      }

      const reward = await rewardModule.getUserRewardsByEvent(
        eventId,
        user._id
      );
      await eventUserInfoModule.updateRewardsByEventIdAndUserId(
        eventId,
        user._id,
        reward
      );

      return res.status(200).json({ data: { reward } });
    }

    let bucketInfo = await bucketModule.getBucketByEventIdAndAvailability(
      eventId,
      user
    );

    if (!bucketInfo.bucket) {
      // this is the case when no available bucket to add user
      bucketInfo.bucket = await bucketModule.createNewBucket(eventId);
      await eventUserInfoModule.addUserEventInfo(
        user._id,
        bucketInfo.bucket._id,
        eventId
      );
    } else if (bucketInfo.bucket && !bucketInfo.existInBucket) {
      // this is the case when bucket is available but user dos not exists it that bucket
      await eventUserInfoModule.addUserEventInfo(
        user._id,
        bucketInfo.bucket._id,
        eventId
      );
    }
    await bucketModule.addUserAndGoldsToBucket(
      bucketInfo.bucket._id,
      user,
      goldCount
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const leaderBoard = async (req, res) => {
  const { user } = req;
  const { eventId } = req.body;

  const leaderBoardData = await bucketModule.getBucketByEventIdForCurrentUser(
    eventId,
    user._id
  );

  if (!leaderBoardData) {
    return res
      .status(400)
      .json({ error: { message: constMessages.NOT_PARTICIPATED_TO_EVENT } });
  }
  return res.status(200).json({ data: leaderBoardData });
};

const claim = async (req, res, next) => {
  const { eventId } = req.body;
  const { user } = req;

  try {
    const isEventActive = await eventModule.isEventActive(eventId);

    if (isEventActive) {
      return res.status(200).json({
        error: {
          message: constMessages.EVENT_IS_ACTIVE_CANNOT_CLAIM,
        },
      });
    }

    const eventUserInfo = await eventUserInfoModule.getEventUserInfo(
      eventId,
      user._id
    );

    if (!eventUserInfo) {
      return res
        .status(400)
        .json({ error: { message: constMessages.NOT_PARTICIPATED_TO_EVENT } });
    }

    if (eventUserInfo.claim) {
      return res
        .status(400)
        .json({ error: { message: constMessages.CLAIM_ALREADY_DONE } });
    }

    await eventUserInfoModule.updateClaimByUserIdAndEventId(eventId, user._id);

    return res.status(200).json({ data: { reward: eventUserInfo.reward } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentEvent,
  reportScore,
  leaderBoard,
  claim,
};
