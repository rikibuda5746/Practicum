import { fork , all } from "redux-saga/effects";
import { sagas as dataSaga } from "../data";
import authSaga  from '../../pages/auth/modules/saga'
import { onChangeCandidatesActionsInSaga } from "../../pages/candidatesForJob/modules/saga";
import registrationSaga from '../../pages/personalDetails/modules/saga'
import citiesAndStreets from '../../pages/saga'
import { ManagerJobsSaga } from "../../pages/managerJobs/moduls/saga";
import { ManagerJobSaga } from "../../components/ManagerJob/modules/saga";
import { watchGetJobs } from "../../pages/GetJobs/modules/saga";
import newJobSAGA from '../../pages/addNewJob/moduls/saga';
import LoginSaga from "../data/user/modules/saga";
import { watchRecomend } from "../../pages/Recomend/modules/saga"
import { watchExperience } from '../../pages/experience/modules/saga';
import { watchTraining } from '../../pages/training/modules/saga';
import { submittedJobsSaga } from "../../pages/submitedJobs/moduls/saga";
import {PopupCandidateInSaga} from "../../pages/candidatesForJob/popupcandidatesForJob/modules/saga"
import {SagafavoriteCandidate} from "../../pages/ManagerFavorite/modules/saga";
import watchUploadFiles from "../../pages/upload_file/modules/saga";
/*
 * The entry point for all general sagas used in this application.
 */
export default function* root() {
  yield all([
  fork(dataSaga),
  fork(authSaga),
  fork(onChangeCandidatesActionsInSaga), 
  fork(registrationSaga), 
  fork(citiesAndStreets),
  fork(LoginSaga),
  fork(watchGetJobs),
  fork(newJobSAGA),
  // fork(watchSaveExperience) , 
  // fork(watchSavetraining),
  fork(watchRecomend),
  fork(watchExperience) , 
  fork(watchTraining),
  // fork(onInsertRecomendInSaga),
  fork(submittedJobsSaga),
  fork(PopupCandidateInSaga),
  fork(SagafavoriteCandidate),
  fork(watchUploadFiles),
  fork(ManagerJobsSaga),
  fork(ManagerJobSaga),
]);
}
