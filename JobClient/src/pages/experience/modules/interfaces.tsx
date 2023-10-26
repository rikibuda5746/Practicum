export interface IExperience {
    placeExperience: string;
    fromYear: number;
    toYear: number;
    job: string;
    description: string;
}

export interface Data {
    experiences: IExperience[];
    IsFillExperience:boolean;
    isLoading:boolean;
    isNextExperience:boolean;
}
