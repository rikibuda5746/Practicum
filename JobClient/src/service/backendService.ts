import Axios from 'axios';
import { NewJob, updateJob } from '../pages/addNewJob/moduls/interfaces';
import { StatusJobsRequestId } from '../pages/candidatesForJob/modules/candidateDatils';
import { IExperience } from '../pages/experience/modules/interfaces';
import { ITraining } from '../pages/training/modules/interfaces';
import { tableParams } from '../pages/interface';
// import { Data } from '../pages/registration/modules/personalDetails/slice';
import { RecommendAllDetails } from '../pages/Recomend/modules/interface';
import { date } from 'yup';
import { Data } from '../pages/personalDetails/modules/slice';
import { SendData } from '../pages/upload_file/modules/slice';



const apiCalls = 
{

  ManagerJob_POST:(jobID:number)=>({
    url:`api/manager/managerJob.php?job_stock_id=${jobID}`,
    mathod:'POST',
    requireAuth:true,
  }),

  ManagerJobs_GET: (id:any) => ({
  url: `api/manager/managerJobs.php?Inst_Id=${id}`,
  mathod: 'GET',
  requireAuth: true,
  }),
  getFiles:(userId:number)=>({
    url:`api/UploadFile/GetFails.php?userId=${userId}`,
    mathod:'GET',
    requireAuth:true,
  }),
  setSaveUploudFile: (data: SendData) => ({
    url: `api/UploadFile/Post.php?func="set_data"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),
  login: (username: string, password: string) => ({
    url: `https://test.w2030.co.il/students/newSystem/backend/index1.php?function=authenticate&username=${username}&password=${password}`,
    method: 'GET',
    requireAuth: true,
  }),
  loginDB: () => ({
    url: `api/Login/post.php?func="loginDetails"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),

  Training: (iUserId: string, Training: ITraining) =>
  ({
    url: `api/training/post.php?func="addTraining"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),


  // login: () => ({
  //   url: `api/Login/post.php?func="loginDetails"`,
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ title: 'React POST Request Example' })
  // }),
  
  JobRequest_UPD: (userId: number, newStatusJobRequestId: StatusJobsRequestId, idJobstock: number) => ({
    url: `api/candidatesForJob/statusCange.php`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),


  UserRecommends_INS: (rec: RecommendAllDetails) => ({
    url: `api/Recomend/insertAndUpdate.php?func="insert_update"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),

  addNewJob: (newJob: NewJob) => ({
    url: `api/AddNewJob/addNewJob.php?`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),
  

  JobRequest_GET: (idJobstock?: number) => ({
    url: `api/candidatesForJob/candidatesForJob.php?func="JobRequest_GET"&iJobsStockId=${idJobstock}`,
    mathod: 'GET',
    requireAuth: true,
  }),

  Get_favoriteCandidate: (institution: number) => ({
    url: `api/favoriteManager/favoriteManager.php?func="FavoriteCandidate"&institution=${institution}`,
    mathod: 'GET',
    requireAuth: true,
  }),

  getData: (path: string) => ({
    url: path,//'api/users/get.php?func="get_countrySource_options"',
    method: 'GET',
    requireAuth: true,
  }),

  getUserById: (userId: number) => ({
    url: `api/PersonalDetails/registration.php?func="get_UserId"&user_id=${userId}`,
    method: 'GET',
    requireAuth: true,
  }),

  setData: (data: Data) => ({
    url: `api/PersonalDetails/post.php?func="set_data"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),

    getUsers:(userId: string) => ({
      url: `api/users/get.php?func="get_all_user_details"&user_id=${userId}`,
      method: 'GET',
      requireAuth: true,
    }),

    JobRequest_Favorite_UPD: (userId: number, favoriteChange: boolean, idJobstock: number) => ({
      url: `api/candidatesForJob/candidatesForJob.php?func="JobRequest_Favorite_UPD"&iJobsStockId=${idJobstock}&iUserId=${userId}&bIsFavoriteByManager=${favoriteChange}`,
      method: 'PUT',
      requireAuth: true,
    }),
  
    insertRequest: (iJobsStockId: number, iUserId: number) => ({
      url: `api/jobs/insertRequest.php?`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    }),


    removeCandidacy: (iJobsStockId: number, iUserId: number) => ({
      url: `api/jobs/removeCandidacy.php?`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    }),

    favorite_upd: (iJobsStockId: number, iUserId: number, isFavorite: number) => ({
      url: `api/jobs/favorite_upd.php?`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' }),
    }),

    submittedJobs_slct:(id:any)=>({
      url:`api/jobs/selectJobsPerUser.php?func=%22selectJobsPerUser%22&iUserId=${id}`,
      method:'GET',
      requireAuth:true,
    }),
    getJobById: (jobStockId: number) => ({
      url: `api/AddNewJob/getJobById.php?func="getJobById"&iJobsStockId=${jobStockId}`,
      method: 'GET',
      requireAuth: true,
    }),

  getTrainingById: (iUserId: number) => ({
    url: `api/training/get.php?func="get"&iUserId=${iUserId}`,
    method: 'GET',
    requireAuth: true,
  }),

  getExperiencesById: (iUserId: number) => ({
    url: `api/experience/get.php?func="get"&iUserId=${iUserId}`,
    method: 'GET',
    requireAuth: true,
  }),

  deleteExperiences: (iUserId: number) => ({
    url: `api/experience/delete.php?func="delete"&iUserId=${iUserId}`,
    method: 'GET',
    requireAuth: true,
  }),

  deleteTrainings: (iUserId: number) => ({
    url: `api/training/delete.php?func="delete"&iUserId=${iUserId}`,
    method: 'GET',
    requireAuth: true,
  }),


  
  Experience: (userId: string, experience: IExperience) =>
  ({
    url: `api/experience/post.php?func="addExperience"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),
  GetCandidate:(jobStockId:number,userId:number)=>({
    url:`api/candidatesForJob/popupCandidatesForJob.php?func="CandidateDetails"&userid=${userId}&jobsStockId=${jobStockId}`,
    mathod:'PUT',
    requireAuth:true,
  }),
  favoritUPD: (userId: number, favoriteChange: boolean,idJobstock: number) => ({
    url: `api/candidatesForJob/favorite.php?func="JobRequest_Favorite_UPD"`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }),
  registeration: (username: string, email: string, firstName: string, lastname: string) => ({
    url: `https://test.w2030.co.il/students/newSystem/backend/index1.php?function=create_user&username=${username}&email=${email}&first_name=${firstName}&last_name=${lastname}`,
    method: 'GET',
    requireAuth: true,
  }),

  deleteRecomend:(iRecommenId:number)=>({
    url:`api/Recomend/deleteRecommend.php?iRecommenId=${iRecommenId}`,
    method: 'GET',
    requireAuth: true,
  }),

  getRecomendById:(iUserId:string)=>({
    // url: `api/getRecommendById.php?"get_recomend_byId"&userId=${iUserId}`,
    url:`api/Recomend/getRecommendById.php?iUserId=${iUserId}`,
    method: 'GET',
    requireAuth: true,
  }),
jobStock_UPD: (updateJob: updateJob) => ({
    url: `api/AddNewJob/updateJobsStock.php?`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: 'React POST Request Example' }),
    requireAuth: true,
  }),
  getJobs: (userId?: number,cities?:string,areas?:string,jobs?:string,institutions?:string,ageGroups?:string) => ({
    url: `api/jobs/selectJobsStock.php?func="get_all_jobs_details"&userId=${userId}&cities=${cities}&areas=${areas}&jobs=${jobs}&institutions=${institutions}&ageGroups=${ageGroups}`,
    method: 'GET',
    requireAuth: true,
  }),
  getSelect: (tableParams: tableParams) => ({
    url: `api/GetTable/get.php?func=get&tableName=${tableParams.tableName}&idColumnName=${tableParams.idColumnName}&valueColumnName=${tableParams.valueColumnName}`,
    method: 'GET',
    requireAuth: true,
  }),

}


class BackendService {
  _axios;
  constructor() {
    this._axios = Axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }
  submittedJobs_slct = (id:any) => this._axios.request(apiCalls.submittedJobs_slct(id));
  ManagerJob_POST = (data: { jobID: number }) => this._axios.request(apiCalls.ManagerJob_POST(data.jobID));
  ManagerJobs_GET = (id:any) => this._axios.request(apiCalls.ManagerJobs_GET(id));
  getSelect = (tableParams: tableParams) => this._axios.request(apiCalls.getSelect(tableParams));
  favorite_upd = (data:{iJobsStockId:number ,iUserId:number,isFavorite:number}) => this._axios.post(`api/jobs/favorite_upd.php?`,data);
  removeCandidacy = (data:{iJobsStockId:number,iUserId:number}) => this._axios.post(`api/jobs/removeCandidacy.php?`,data);
  insertRequest = (data:{iJobsStockId:number,iUserId:number}) => this._axios.post(`api/jobs/insertRequest.php?`,data);
  getJobs=(data:{userId?:number,cities?:string,areas?:string,jobs?:string,institutions?:string,ageGroups?:string}) => this._axios.request(apiCalls.getJobs(data.userId,data.cities,data.areas,data.jobs,data.institutions,data.ageGroups));
  login=(data: { username: string,password:string }) => this._axios.request(apiCalls.login(data.username, data.password));
  loginDB = (dataDB: { username: string, password: string }) => this._axios.post(`api/Login/post.php?func="loginDetails"`, dataDB)
  registeration = (data: { username: string, email: string, firstname: string, lastname: string }) => this._axios.request(apiCalls.registeration(data.username, data.email, data.firstname, data.lastname));
 
  jobStock_UPD = (updateJob: updateJob) => this._axios.put(`api/AddNewJob/updateJobsStock.php?`, { updateJob })
  getJobById = (jobStockId: number) => this._axios.request(apiCalls.getJobById(jobStockId));
  addNewJob = (newJob: NewJob) => { this._axios.post(`api/AddNewJob/addNewJob.php?`, newJob) }
  Training = (userId: string, training: ITraining) => this._axios.post(`api/training/post.php?func="addTraining"`, { userId, training });
  Experience = (userId: string, experience: IExperience) => this._axios.post(`api/experience/post.php?func="addExperience"`, { userId, experience });
  // login = (data: { username: string, password: string }) => this._axios.request(apiCalls.login(data.username, data.password));
  JobRequest_Favorite_UPD = (data: { userId: number, favoriteChange: boolean, idJobstock: number }) => this._axios.request(apiCalls.JobRequest_Favorite_UPD(data.userId, data.favoriteChange, data.idJobstock));
  // JobRequest_UPD = (data: { userId: number, newStatusJobRequestId: StatusJobsRequestId, idJobstock: number }) => this._axios.request(apiCalls.JobRequest_UPD(data.userId, data.newStatusJobRequestId, data.idJobstock));
  JobRequest_UPD = (data: { userId: number, newStatusJobRequestId: StatusJobsRequestId, idJobstock: number }) => this._axios.post(`api/candidatesForJob/statusCange.php`,data);
  JobRequest_GET = (data: { idJobstock?: number }) => this._axios.request(apiCalls.JobRequest_GET(data.idJobstock));
  jobs = (data: { userId: number }) => this._axios.request(apiCalls.getJobs(data.userId));

  getData = (data: { path: string }) => this._axios.request(apiCalls.getData(data.path));
  //setData = (data: Data) => { this._axios.post(`api/users/post.php?func="set_data"`, data); };
  UserRecommends_INS = (rec:RecommendAllDetails) =>{this._axios.post(`api/Recomend/insertAndUpdate.php?func="insert_update"`,rec);};
  deleteRecomend = (iRecommenId: number) => this._axios.request(apiCalls.deleteRecomend(iRecommenId));
  getRecomendById = (iUserId: string) => this._axios.request(apiCalls.getRecomendById(iUserId));
  getUserById = (data:{userId:number}) => this._axios.request(apiCalls.getUserById(data.userId));
  setData = (data: Data) => { this._axios.post(`api/PersonalDetails/post.php?func="set_data"`, data); };
  getExperiencesById = (iUserId: number) => this._axios.request(apiCalls.getExperiencesById(iUserId));
  getTrainingById = (iUserId: number) => this._axios.request(apiCalls.getTrainingById(iUserId));
  deleteTrainings = (iUserId: number) => this._axios.request(apiCalls.deleteTrainings(iUserId));
  deleteExperiences = (iUserId: number) => this._axios.request(apiCalls.deleteExperiences(iUserId));
  GetCandidate=(data:{jobStockId:number,userId:number})=>this._axios.request(apiCalls.GetCandidate(data.jobStockId,data.userId));
  favoritUPD = (data:{userId: number, favoriteChange: boolean,idJobstock: number}) => { this._axios.post(`api/candidatesForJob/favorite.php?func="JobRequest_Favorite_UPD"`, data); };
  Get_favoriteCandidate = (data: { institution: number }) => this._axios.request(apiCalls.Get_favoriteCandidate(data.institution));
  getFiles=(userId:number)=>this._axios.request(apiCalls.getFiles(userId));
  setSaveUploudFile = (data: SendData) => { this._axios.post(`api/UploadFile/Post.php?func="set_data"`, data); };
}
export default new BackendService();
