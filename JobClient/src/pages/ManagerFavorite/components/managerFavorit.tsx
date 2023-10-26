
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../modules/slice';
import { FC, useEffect } from 'react';
import FavoriteCandidate from './managerFavorites';
import {selectors as userSelectors} from '../../../redux/data/user/modules/slice'
import { select } from 'redux-saga/effects';

const FavoriteCandidates:FC<{}>=()=>{

    console.log("in component");
    
    let candidates=useSelector(selectors.getfavoriteCandidate);
    const dispach=useDispatch();

    
    const institution=useSelector(userSelectors.getUserId);
    // console.log(institution,"--------ins");
    // const mySlice:any = select((state:any) => state);
    // const userId:number=mySlice.data.user.id;

    useEffect(()=>{
    dispach(actions.GetfavoriteCandidate({institution}));
    },[]);


    return(
        <div style={{display:'flex' , flexDirection:'column'}}>
            <h1>מועדפים</h1>
            <hr />
        {console.log("candidates--------------------------------------------",candidates)}
       
      {  candidates?.map((candidate:any,i:any)=>(
           <FavoriteCandidate candidate={candidate} key={i}/>
            ))}

        </div>
    )}

    export default FavoriteCandidates;