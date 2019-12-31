import { SAVE_UID, SAVE_USER_PROFILE } from './types';

function saveUid(uid) {
  return {
    type: SAVE_UID,
    uid,
  }
}

function saveUserProfile(userProfile) {
  return {
    type: SAVE_USER_PROFILE,
    userProfile,
  }
}

export {
  saveUid,
  saveUserProfile,
}
