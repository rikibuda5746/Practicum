export const JOBS = "משרות";
export const USERS = "משתמשים";
export const SEARCH = "חיפוש משרה";
export const HOME = "עמוד הבית";
export const MANAGERJOBS = "משרות שפרסמתי";
export const USERJOBS = "משרות שהגשתי מועמדות";
export const PUBLISHNEWJOB = "פרסום משרה חדשה";
export const CANDIDATESLIST = "רשימת מועמדים";
export const FAVORITEMANAGER = "מועדפים";
export const PERSNALDETAILS = "פרטים אישיים";
export default interface IListItem {
    path: string;
    text: string;
    icon: string;
}