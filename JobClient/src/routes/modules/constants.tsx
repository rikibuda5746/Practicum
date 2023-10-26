import React from "react";
import Management from "../../pages/management";
import SearchMechanism from "../../pages/searchMechanism";
import Home from "../../pages/home";
import JobsList from "../../pages/jobs_gallery";
import Login from "../../pages/auth";
import Jobs from "../../pages/GetJobs/components/Jobs";
import { Params } from "../../pages/personalDetails/modules/interfaces";
import AddNewJob from "../../pages/addNewJob/components/AddNewJob";
import RouteProcessRegistration from "../../pages/RouteProcessRegistration/component/RouteProcessRegistration";
import SubmittedJobs from "../../pages/submitedJobs";
import CandidateSForJob from "../../pages/candidatesForJob/components/candidateSForJob";

import FavoriteCandidate from "../../pages/ManagerFavorite/components/managerFavorites";
import FavoriteCandidates from "../../pages/ManagerFavorite/components/managerFavorit";
import ManagerJobs from "../../pages/managerJobs";
import { CandidateSForJobWrapper } from "../../pages/candidatesForJob/components/candidateForJobsWrapper";
export enum AppRoutesEnum {
    HOME = '/',
    SEARCH_MECHANISM = '/searhMechanism',
    AUTH = '/auth',
    MANAGEMENT = '/management',
    JOBSLIST = '/jobs',
    REGISTRATION = '/registration',
    MANAGERJOBS = '/ManagerJobs',
    ROUTEEPROCESSREGISTRATION = '/RouteProcessRegistration',
    ADDNEWJOB='/AddNewJob',
    JOBSAPPLYFOR='/jobsApplyFor',
    CANDIDATE='/candidate',
    FAVORITEMANAGER='/favoriteManager'
}

export enum Role {
    ADMIN = 'admin',
    GUEST = 'guest',
    USER = 'user',
}
export const appRoutes = [
    { path: AppRoutesEnum.JOBSLIST, element: <Jobs /> },
    { path: AppRoutesEnum.HOME, element: <Home /> },
    { path: AppRoutesEnum.ROUTEEPROCESSREGISTRATION, element: <RouteProcessRegistration />},
    { path: AppRoutesEnum.JOBSAPPLYFOR, element: <SubmittedJobs/>},
    { path: AppRoutesEnum.ADDNEWJOB, element: <AddNewJob/>},
    { path: AppRoutesEnum.CANDIDATE, element: <CandidateSForJobWrapper/>},
    { path: AppRoutesEnum.MANAGERJOBS, element: <ManagerJobs/>},
    { path: AppRoutesEnum.FAVORITEMANAGER, element: <FavoriteCandidates/>},

    // { path: AppRoutesEnum.AUTH, element: <Login /> },
];
export const privateRoutes = [
    { path: AppRoutesEnum.SEARCH_MECHANISM, element: <SearchMechanism />, roles: [null] },
    // { path: AppRoutesEnum.MANAGEMENT, element: <Management />, roles: [Role.GUEST] },
]
// export const paramsRoute=[
// { path: AppRoutesEnum.ROUTEEPROCESSREGISTRATION, element: <RouteProcessRegistration />, parameters:[null]},
// ]
