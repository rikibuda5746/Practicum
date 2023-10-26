import { Item } from "../../interfaces";

export interface NewJob {
    institutionName: number,//ניהולית
    dateBegin?: Date,
    dateEnd?: Date,
    jobRoleId: number,
    ageGroupId?: String,
    hoursOfJobsId?: String,
    areaId?: String,
    cityId?: string,
    experienYears?: number,
    isMonthlySalary?:  number,
    isPublic: boolean | number,
    isOpen: boolean,
    typesOfJobsId?: String,
    datePublish: Date,
    jobDescription?: any,
    minSalary?: number,
    maxSalary?: number,
    hoursPerWeek?: number,
    jobName?: string,
}


export interface Lists {
    jobsRole: Item[],
    AgesGroups: Item[],
    hoursOfJobs: Item[],
    areas: Item[],
    cities: {}
    typesOfJobs: Item[],
}


export interface Data {
    lists: Lists
}

export interface updateJob{
    oldJobID:number,
    job:NewJob
}






