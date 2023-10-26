export interface ITraining {
    placeTraining: string,
    fromYear:  number ,
    toYear: number
    typeOfTraining:string,
    note:string,
}

export interface Data {
    trainings: ITraining[],
    isFillTraining:boolean,
    isLoading:boolean,
    isNextTraining:boolean
}