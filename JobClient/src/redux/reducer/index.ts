import { combineReducers } from "redux";
import managerJobReducer, { MANAGER_JOB_STATE_KEY } from "../../components/ManagerJob/modules/slice";
import jobReducer, { JOB_STATE_KEY } from '../../pages/GetJobs/modules/slice';
import authReducer, { STATE_KEY as authStateKey, } from '../../pages/auth/modules/slice';
import managerJobsReducer, { MANAGER_JOBS_STATE_KEY } from "../../pages/managerJobs/moduls/slice";
import registrationReducer, { STATE_KEY as registrationStateKey } from "../../pages/personalDetails/modules/slice";
import cityAndStreet, { STATE_KEY } from "../../pages/slice";
import submittedReducer, { SUBMITTED_JOBS_STATE_NAME } from "../../pages/submitedJobs/moduls/slice";
import uploadFileReducer, { UPLOAD_FILE_STATE_KEY as uploadFileStateKey } from '../../pages/upload_file/modules/slice';
import { reducer as dataReducer } from "../data";
import DATA_STATE_KEY from "../data/constants";

const createdAppReducer = combineReducers({
  [DATA_STATE_KEY]: dataReducer,
  // [user]: userReducer,
  [JOB_STATE_KEY]: jobReducer,
  [DATA_STATE_KEY]: dataReducer,
  [authStateKey]: authReducer,
  [registrationStateKey]: registrationReducer,
  [STATE_KEY]: cityAndStreet,
  [JOB_STATE_KEY]: jobReducer,
  [uploadFileStateKey]: uploadFileReducer,
  [MANAGER_JOBS_STATE_KEY]: managerJobsReducer,
  [MANAGER_JOB_STATE_KEY]:managerJobReducer,
  [SUBMITTED_JOBS_STATE_NAME]:submittedReducer,
  
});


const reducer = (state: any, action: any) => {
  return createdAppReducer(state, action);
};

export default reducer;
