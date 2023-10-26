import { CircularProgress } from "@mui/material"
import { Button } from '../../../components';
import { array, boolean } from "yup";
import { MouseEventHandler, useEffect, useState } from "react";
// import { Warp } from "./WarpRecomend.styled";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../modules/slice";
import InsertRecommend from "./InsertRecomend";
import { RecommendAllDetails } from "../modules/interface";
import { DivButtons, DivFormWrapper } from "../../../components/FormStyeld/form.styeld";
import { FormRow, FormStyled, RecommendWrapper } from "./WarpRecomend.styled";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';


interface Props {
}

const WarpRecomend: React.FC<Props> = ({}) => {

const dispatch = useDispatch();

const titleName = "המלצות";
const addName="הוספה";
 const nextName="דלג";
const saveAndContinue="שמור והמשך";


const Recomends=useSelector(selectors.getRecomendsById);
const recomendsDeleted=useSelector(selectors.getRecomendsDeleted);

// const [isUpdate,setIsUpdate]=useState(false);
const[isAllFieldsFilled,setIsAllFieldsFilled]=useState(true);

useEffect(()=>{
  dispatch(actions.getRecomendById());
},[])

      const addRecomend=()=>{
        // alert("addRecomend to arr")
        const isFilled=checkFill();
        isFilled && dispatch(actions.onAddRecomend())
      }


      function SaveAllRecomends(event:any) {
        console.log("onSaveAllRecomends");
        (event as MouseEvent).preventDefault();
        const isFiled=checkFill();
        if(isFiled)
        {
          console.log("isFiled",isFiled);
          dispatch(actions.OnDeleteRecomend());
          dispatch(actions.onInsertRecomend());
        }
        else{
          console.log("isFiled",isFiled);
          dispatch(actions.OnDeleteRecomend());
        }
        dispatch(actions.isFill()) ;  
        // dispatch(actions.getRecomendById());//לבדוק האם לעשות זאת דרך כאן או במקום אחר?
        // console.log("recomendsAll",Recomends)
      } 

      // const SaveAllRecomends=(event:any)=>
      // {
      //   console.log("onSaveAllRecomends");
      //   (event as MouseEvent).preventDefault();
      //   const isFiled=checkFill();
      //   if(isFiled)
      //   {
      //     dispatch(actions.OnDeleteRecomend());
      //     dispatch(actions.onInsertRecomend());
      //   }
      //   else{dispatch(actions.OnDeleteRecomend());
      //   }
      //   dispatch(actions.isFill()) ;  
      //   dispatch(actions.getRecomendById());//לבדוק האם לעשות זאת דרך כאן או במקום אחר?
      // }
      

      //לבדוק האם מה שלא חייבים להכניס שזה באמת לא יחייב
      const checkFill=()=>{
        const isFilled=Recomends.every(
        (rec:RecommendAllDetails)=>
        rec.nvName !== "" &&
        rec.nvEmail !== "" &&
        rec.nvPhone !== ""
        ); 
        setIsAllFieldsFilled(isFilled);
        return isFilled;
      }

      const isLoading = useSelector(selectors.getIsLoading) as boolean;

    return (
    <DivFormWrapper>
        <h1>{titleName}</h1>
        <hr />
        <br />      
        {isLoading == true? <div><CircularProgress color="inherit" /></div> : <div>
        <Button style={{ padding: "3px 15px" }} onClick={()=>dispatch(actions.next())}>{nextName}</Button>
        <RecommendWrapper>
        <FormStyled> 
          {Recomends.map((rec:RecommendAllDetails,index:number)=>  
          <InsertRecommend index={index} recomend={rec} length={Recomends.length} isFill={isAllFieldsFilled} initialValues={rec}/>
          )}
</FormStyled>   
</RecommendWrapper>
        <DivButtons>
            <ControlPointOutlinedIcon titleAccess='  ממליץ נוסף ' fontSize='large' onClick={addRecomend} />
            <Button style={{ padding: "3px 15px" }} onClick={(e:any)=>SaveAllRecomends(e)}>{saveAndContinue}</Button>
        </DivButtons>
        
     </div>}
    </DivFormWrapper>
    );
   }
  export default WarpRecomend;