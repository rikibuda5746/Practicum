export interface Job {

    InstitutionName: string,
    JobStockId: number,
    DateBegin: Date | null,
    DateEnd: Date | null,
    JobName: string,
    AgeGroupName: string,
    HoursOfJobsName: string,
    AreaName: string,
    CityName: string,
    IsMonthlySalary: boolean,
    ExperienYears: number,
    IsPublic: boolean,
    IsOpen: string,
    TypesOfJobsName: string,
    DatePublish: Date,
    JobDescription: string,
    DateJobRequest: Date,
    favorite: boolean,
    minSalary: number | null,
    maxSalary: number | null,
}

export interface Data {
    jobs: Job[]
}

export interface Props {
    job: Job,
    jobToShow:number,
    setShowJobs:Function
}