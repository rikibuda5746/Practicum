import React from "react";
import { useSelector } from "react-redux";
import Bless from "../../../components/Bless";
import Clock from "../../../components/Clock";
import MyDate from "../../../components/Date";
import { selectors as userSelectors } from "../../../redux/data/user/modules/slice";
import { BoldLine, Item, Line, LinesWrapper, ThinLine } from "./userDetails.styled";

interface UserDetailsProps {

}

function getDay(day: Date) {
  const Days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  return (<Item>יום {Days[day.getDay()]}</Item>);
};

const UserDetails: React.FC<UserDetailsProps> = (props) => {
  const isLoggedin = !!useSelector(userSelectors.getUserId);
  const userDetails = useSelector(userSelectors.getUserDetails);

  const currentTimestamp = new Date(userDetails.lastLogin); 
  const currentOffsetMinutes = currentTimestamp.getTimezoneOffset();
  const newTimestamp = currentTimestamp.getTime() - (currentOffsetMinutes * 60 * 1000);
  const newDateTime = new Date(newTimestamp);

  return (
    <LinesWrapper>
      <Line>{getDay(new Date())} {<MyDate />} {<Clock />}</Line>
      <BoldLine>{<Bless/>}{userDetails.name}</BoldLine>
      <ThinLine>כניסה אחרונה: {currentTimestamp.toLocaleDateString("en-GB")} {newDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ThinLine>
    </LinesWrapper>
  );

};

export default UserDetails;