
export interface RecomendStore {
    recomends: RecommendAllDetails[],
    isFillRecomend: boolean,
    isLoading:boolean,
    deletedRecomends:RecommendAllDetails[];
    isNextRecomend:boolean
}


export interface RecommendAllDetails{
    iRecommenId:number,
    nvName:string,
    nvJob:string,
    Note:string,
    nvPhone:string,
    nvEmail:string,
    iUserId:number,
    iJobsStockId:number,
}
