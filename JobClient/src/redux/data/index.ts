import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import userReduser ,{ STATE_KEY } from "./user/modules/slice";
import { reducer as appReducer, appStateKey, saga as appSaga } from "./app";
import trainingReducer, { DATA_TRAINING_KEY as trainingDatatrainingKey } from "../../pages/training/modules/slice"
import experienceReducer, { DATA_EXPERIENCE_KEY as experienceDataExperienceKey } from "../../pages/experience/modules/slice"
import candidatesReducer,{CANDIDTES_SLICE} from "../../pages/candidatesForJob/modules/slice";
import popupCandidateReducer, {POPUP_CANDIDTE_SLICE } from "../../pages/candidatesForJob/popupcandidatesForJob/modules/slice";
import recomendReducer ,{ RECOMEND } from "../../pages/Recomend/modules/slice";
import ManagerJobReducer ,{ MANAGER_JOB_STATE_KEY } from "../../components/ManagerJob/modules/slice";
import jobReducer,{JOB_STATE_KEY as jobStateKey} from "../../pages/GetJobs/modules/slice"
import dataNewJobReducer, { DATA_NEW_JOB_KEY } from "../../pages/addNewJob/moduls/slice";
import registerationDetails,{ STATE_KEY_REGISTERATION  } from "../../pages/registration/modules/slice";
// import allSelectDataReducer, { ALL_SELECT_DATA } from "../../pages/tableSelect/modules/slice";
import submittedReducer, { SUBMITTED_JOBS_STATE_NAME } from "../../pages/submitedJobs/moduls/slice";
import favoriteCandidateReduser,{ FAVORIT_MANAGER } from "../../pages/ManagerFavorite/modules/slice";
import managerJobs, {MANAGER_JOBS_STATE_KEY} from '../../pages/managerJobs/moduls/slice'

export const reducer = combineReducers({
  [STATE_KEY]: userReduser,
  [appStateKey]: appReducer,
  [trainingDatatrainingKey]: trainingReducer,
  [experienceDataExperienceKey]:experienceReducer,
  [CANDIDTES_SLICE]:candidatesReducer,
  [POPUP_CANDIDTE_SLICE]:popupCandidateReducer,
  [RECOMEND]: recomendReducer,
  [jobStateKey]: jobReducer,
  [DATA_NEW_JOB_KEY]: dataNewJobReducer,
[SUBMITTED_JOBS_STATE_NAME]:submittedReducer,
[MANAGER_JOBS_STATE_KEY]: managerJobs,
  // [ALL_SELECT_DATA]:allSelectDataReducer,
  [SUBMITTED_JOBS_STATE_NAME]:submittedReducer,
  [FAVORIT_MANAGER]:favoriteCandidateReduser,
  [MANAGER_JOBS_STATE_KEY]: managerJobs,
});

export const sagas = function* root() {
  yield all([fork(appSaga)]);
};
