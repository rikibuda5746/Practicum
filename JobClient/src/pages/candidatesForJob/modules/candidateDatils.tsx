export enum StatusJobsRequestId{
    accepted=1,
    onProcess=2,
    onChecking=3,
    postponed=4,
}

export interface CandidateDetails{
    userId: number,
    firstName:string,
    lastName:string,
    phone:number,
    email:string,
    city:string,
    datePublish?:string,
    experienceYears:number,
    iStatusJobRequestId:StatusJobsRequestId,
    sector:string,
    gender:string,  
    idJobstock:number,  
    favorite:boolean,
    recommends?:string,
    trainings?:string,
    educations?:string,
    cv:string,
}

export interface CandidateLessDetails{
    userId: number,
    firstName:string,
    lastName:string,
    phone:number,
    email:string,
    datePublish?:string,
    experienceYears:number,
    iStatusJobRequestId:StatusJobsRequestId,
    idJobstock:number,  
    favorite:boolean,
}