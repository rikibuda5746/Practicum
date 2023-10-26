export interface State {
    data: Item[];
    loading: boolean;
    error: string | null;
}

export interface Item {
    id: string,
    value: string,
    checked:boolean|null
}

export interface CitiesI {
    לשכה: ""
    סמל_ישוב: "0"
    סמל_לשכת_מנא: "0 "
    סמל_מועצה_איזורית: "0 "
    סמל_נפה: "0 "
    שם_ישוב: "לא רשום "
    שם_ישוב_לועזי: " "
    שם_מועצה: null
    שם_נפה: "לא ידוע "
    _id: 1
}

export interface tableParams{
    tableName:string,
    idColumnName:string,
    valueColumnName:string
}
