import React, { useEffect, useState } from "react";
import { All, Circle, ContainCircleP, ContainerAllCircle, Line, SmallCircle, SmallCircleRed, V } from "../component/RouteProcessRegistration.styled";
import { AllHeader, Header, P, Process } from "./RouteProcessRegistration.styled";
// import Details from "./Details";
import Experience from "../../experience";
// import Registration from "./Registration";
import Training from "../../training";
import { selectors as trainingSelectors } from "../../training/modules/slice";
import { selectors as experienceSelectors } from "../../experience/modules/slice";
import { selectors as recomendSelectors } from "../../Recomend/modules/slice";
import { BsBook, BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import WarpRecomend from "../../Recomend/component/WarpRecomend";
import { selectors as personalDetailsSelectors } from "../../personalDetails/modules/slice";
import { selectors as  UploadFileSelectors} from "../../upload_file/modules/slice";
import PersonalDetails from "../../personalDetails/components/PersonalDetails";
import UploadFile from "../../upload_file/components/UploadFile";
import Registeration from "../../registration";

interface Props {
}

const RouteProcessRegistration: React.FC<Props> = (props) => {

    //צריך לשלוח את זה לפונקציה שמכניסה ממליץ
    // const UserId=useSelector(UserIdSelectors.getUserId);

    const [userRegistration, setRegistration] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<boolean>(false);
    const [userExperience, setUserExperience] = useState<boolean>(false);
    const [userTraining, setUserTraining] = useState<boolean>(false);
    const [userRecommends, setUserRecommends] = useState<boolean>(false);
    const [userUploadFile, setUserUploadFile] = useState<boolean>(false);

    const [touchRegistration, setTouchRegistration] = useState<boolean>(false);
    const [touchDetails, setTouchDetails] = useState<boolean>(false);
    const [touchExperience, setTouchExperience] = useState<boolean>(false);
    const [touchTraining, setTouchTraining] = useState<boolean>(false);
    const [touchRecommends, setTouchRecommends] = useState<boolean>(false);
    const [touchUploadFile, setTouchUploadFile] = useState<boolean>(false);

    let IsFillRegistration: boolean = true;
    let IsFillExperience = useSelector(experienceSelectors.getExperience) as unknown as boolean;
    let IsFillTraining = useSelector(trainingSelectors.getTraining) as unknown as boolean;
    let IsFillDetails = useSelector(personalDetailsSelectors.getPersonalDetails) as unknown as boolean;
    let isFillRecomend = useSelector(recomendSelectors.getIsFillRecomend) as unknown as boolean;
    let IsFillUploadFile=useSelector(UploadFileSelectors.getUploadFile) as unknown as boolean;

    let isNextExperience = useSelector(experienceSelectors.getIsNextExperience) as unknown as boolean;
    let isNextTraining = useSelector(trainingSelectors.getIsNextTraining) as unknown as boolean;
    let isNextDetails = useSelector(personalDetailsSelectors.getIsNextDetails) as unknown as boolean;
    let isNextRecomend = useSelector(recomendSelectors.getIsNextRecomend) as unknown as boolean;
    let isNextUploadFile=useSelector(UploadFileSelectors.getIsNextUploadFile) as unknown as boolean;

    function OnTouchRegistration() {
        setTouchRegistration(true);
        OnRegistration(userRegistration);
    }

    function OnTouchDetails() {
        setTouchDetails(true);
        OnDetails(userDetails);
    }

    function OnTouchExperience() {
        setTouchExperience(true);
        OnExperience(userExperience);
    }

    function OnTouchTraining() {
        setTouchTraining(true);
        OnTraining(userTraining);
    }

    function OnTouchRecommends() {
        setTouchRecommends(true);
        OnRecommends(userRecommends)
    }

    function OnTouchUploadFile() {
        setTouchUploadFile(true);
        OnUploadFile(userUploadFile);
    }


    function OnRegistration(userRegistration: boolean) {
        setRegistration(true);
        setUserDetails(false)
        setUserExperience(false)
        setUserTraining(false)
        setUserRecommends(false)
        setUserUploadFile(false)
    }

    function OnDetails(userDetails: boolean) {
        setUserDetails(true);
        setRegistration(false)
        setUserExperience(false)
        setUserTraining(false)
        setUserRecommends(false)
        setUserUploadFile(false)
    }

    function OnExperience(userExperience: boolean) {
        setUserExperience(true);
        setRegistration(false)
        setUserDetails(false)
        setUserTraining(false)
        setUserRecommends(false)
        setUserUploadFile(false)
    }

    const OnTraining = (userTraining: boolean) => {
        setUserTraining(true)
        setRegistration(false);
        setUserDetails(false)
        setUserExperience(false)
        setUserRecommends(false)
        setUserUploadFile(false)
    }

    function OnRecommends(userRecommends: boolean) {
        setUserRecommends(true)
        setRegistration(false);
        setUserDetails(false)
        setUserExperience(false)
        setUserTraining(false)
        setUserUploadFile(false)
    }

    function OnUploadFile(userDocument: boolean) {
        setUserUploadFile(true)
        setRegistration(false)
        setUserDetails(false)
        setUserExperience(false)
        setUserTraining(false)
        setUserRecommends(false)
    }

    useEffect(() => {
        if (IsFillRegistration) {
            OnTouchDetails();
        }
    }, [IsFillRegistration]);

    useEffect(() => {
        if (IsFillDetails) {
            OnTouchExperience();
        }
    }, [IsFillDetails]);

    useEffect(() => {
        if (IsFillExperience) {
            OnTouchTraining();
        }
    }, [IsFillExperience]);

    useEffect(() => {
        if (IsFillTraining) {
            OnTouchRecommends();
        }
    }, [IsFillTraining]);

    useEffect(() => {
        if (isFillRecomend) {
            OnTouchUploadFile();
        }
    }, [isFillRecomend]);

      useEffect(() => {
        if (IsFillUploadFile) {
            OnTouchRegistration();
            }
      }, [IsFillUploadFile]);


    useEffect(() => {
        if (isNextDetails) {
            OnTouchExperience();
        }
    }, [isNextDetails]);

    useEffect(() => {
        if (isNextExperience) {
            OnTouchTraining();
        }
    }, [isNextExperience]);

    useEffect(() => {
        if (isNextTraining) {
            OnTouchRecommends();
        }
    }, [isNextTraining]);

    useEffect(() => {
        if (isNextRecomend) {
            OnTouchUploadFile();
        }
    }, [isNextRecomend]);

      useEffect(() => {
        if (isNextUploadFile) {
            OnTouchRegistration();
            }
      }, [isNextUploadFile]);

    return (
        <div>
            <AllHeader>
                <Header src="/assets/RouteProcessRegistration/rectangle.svg"></Header>
                <br />
                <Line src="/assets/RouteProcessRegistration/line.svg"></Line>
                <Process>תהליך הרשמה</Process>
                <br />
                <All>
                    <ContainerAllCircle>
                        <ContainCircleP>
                            <Circle src="/assets/RouteProcessRegistration/recommends.svg" ></Circle>
                            {(touchRegistration && !IsFillRegistration) && <SmallCircleRed></SmallCircleRed>}
                            {(!touchRegistration && !IsFillRegistration) && <SmallCircle></SmallCircle>}
                            {(IsFillRegistration) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            <br />
                            <P>הרשמות לאתר</P>
                        </ContainCircleP>


                        <ContainCircleP>
                            <Circle src="/assets/RouteProcessRegistration/details.svg" onClick={() => OnTouchDetails()}></Circle>
                            {(touchDetails && !IsFillDetails) && <SmallCircleRed></SmallCircleRed>}
                            {(!touchDetails && !IsFillDetails) && <SmallCircle></SmallCircle>}
                            {(IsFillDetails) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            <br />
                            <P>פרטים אישיים</P>
                        </ContainCircleP>

                        <ContainCircleP>
                            <img src="/assets/RouteProcessRegistration/circle.svg" onClick={() => OnTouchExperience()} style={{ padding: "1", justifyContent: "center", alignItems: "center", alignContent: "center", position: "absolute" }} ></img>
                            <BsHandbag onClick={() => OnTouchExperience()} size={'2.3em'} style={{ marginTop: "1.5vh", position: "absolute", marginRight: "0.9vw" }} />
                            {(IsFillExperience) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            {(touchExperience && !IsFillExperience) && <SmallCircleRed></SmallCircleRed>}
                            {(!touchExperience && !IsFillExperience) && <SmallCircle></SmallCircle>}
                            <br />
                            <P>נסיון</P>
                        </ContainCircleP>

                        <ContainCircleP>
                            <img src="/assets/RouteProcessRegistration/circle.svg" onClick={() => OnTouchTraining()} style={{ padding: "1", justifyContent: "center", alignItems: "center", alignContent: "center", position: "absolute" }} ></img>
                            <BsBook onClick={() => OnTouchTraining()} size={'2.3em'} style={{ marginTop: "1.5vh", position: "absolute", marginRight: "0.9vw" }} />
                            {(IsFillTraining) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            {(touchTraining && !IsFillTraining) && <SmallCircleRed></SmallCircleRed>}
                            {(!touchTraining && !IsFillTraining) && <SmallCircle></SmallCircle>}
                            <br />
                            <P>הכשרה</P>
                        </ContainCircleP >

                        <ContainCircleP>
                            <Circle src="/assets/RouteProcessRegistration/training.svg" onClick={() => OnTouchRecommends()}></Circle>
                            {(isFillRecomend) && (!userRecommends) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            {(touchRecommends && !isFillRecomend) && <SmallCircleRed></SmallCircleRed>}
                            {(isFillRecomend && userRecommends) && <SmallCircleRed></SmallCircleRed>}
                            {(!touchRecommends && !isFillRecomend) && <SmallCircle></SmallCircle>}
                            <br />
                            <P>המלצות</P>
                        </ContainCircleP>

                        <ContainCircleP>
                            <Circle src="/assets/RouteProcessRegistration/document.svg" onClick={() => OnTouchUploadFile()}></Circle>
                            {(IsFillUploadFile) && <V src="/assets/RouteProcessRegistration/v.svg"></V>}
                            {(touchUploadFile && !IsFillUploadFile) && <SmallCircleRed></SmallCircleRed>} 
                            {(!touchUploadFile && !IsFillUploadFile) && <SmallCircle></SmallCircle>}   
                            <br />
                            <P>העלאת מסמכים</P>
                        </ContainCircleP>
                    </ContainerAllCircle >
                    <br />
                </All >
            </AllHeader >
            
            {userDetails &&
                (
                    <PersonalDetails />
                )
            }
            {userExperience &&
                (
                    <Experience />
                )
            }
            {userTraining &&
                (
                    <Training />
                )
            }
            {userRecommends &&
                (
                    <WarpRecomend />
                )
            }
            {userUploadFile&&        
            (
            <UploadFile/>
            )
            }
        </div >
    );
};

export default RouteProcessRegistration;
