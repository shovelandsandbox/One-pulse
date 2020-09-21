import { metaHelpers as helpers } from "@pru-rt-internal/pulse-common";
import metaConstants from "./configs/metaConstants";

const {
  SCREEN_KEY_LIKES_AND_COMMENTS,
  ELEMENT_KEY_LIKE_CAP,
  ELEMENT_KEY__REPLAY,
  ELEMENT_KEY_VIEW_ALL_COMMENT,
  ELEMENT_KEY_LIKES,
  ELEMENT_KEY_COMMENTS,
  ELEMENT_KEY_COMMENT,
  ELEMENT_KEY_LIKE,
  ELEMENT_KEY_ENTER_YOUR_COMMENT,
  ELEMENT_KEY_SHARE_MSG,
  ELEMENT_KEY_COMMENT_CAP,
  ELEMENT_KEY_SHARE_CAP,
  ELEMENT_KEY_COMMENTS_CAP,
  ELEMENT_KEY_PROFANITY_ERROR,
  ELEMENT_KEY_MODIFY,
  ELEMENT_KEY_SHARE,
  ELEMENT_KEY_SHARES,
} = metaConstants;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const initializeScreenMeta = () => {
  return {
    likeCap: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_LIKE_CAP),
      "likeCap"
    ),
    commentCap: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_LIKES_AND_COMMENTS,
        ELEMENT_KEY_COMMENT_CAP
      ),
      "commentCap"
    ),
    shareCap: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_SHARE_CAP),
      "shareCap"
    ),
    reply: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY__REPLAY),
      "reply"
    ),
    viewAllComment: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_LIKES_AND_COMMENTS,
        ELEMENT_KEY_VIEW_ALL_COMMENT
      ),
      "viewAllComment"
    ),
    comments: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_COMMENTS),
      "comments"
    ),
    likes: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_LIKES),
      "likes"
    ),
    comment: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_COMMENT),
      "comment"
    ),
    like: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_LIKE),
      "like"
    ),
    enterYourComment: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_LIKES_AND_COMMENTS,
        ELEMENT_KEY_ENTER_YOUR_COMMENT
      ),
      "enterYourComment"
    ),
    shareMessage: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_SHARE_MSG),
      "shareMessage"
    ),
    commentsCap: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_LIKES_AND_COMMENTS,
        ELEMENT_KEY_COMMENTS_CAP
      ),
      "commentsCap"
    ),
    profanityError: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_LIKES_AND_COMMENTS,
        ELEMENT_KEY_PROFANITY_ERROR
      ),
      "profanityError"
    ),
    modify: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_MODIFY),
      "modify"
    ),
    share: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_SHARE),
      "share"
    ),
    shares: fetchLabel(
      helpers.findElement(SCREEN_KEY_LIKES_AND_COMMENTS, ELEMENT_KEY_SHARES),
      "shares"
    ),
  };
};

export default {
  initializeScreenMeta,
};
