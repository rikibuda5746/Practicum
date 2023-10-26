import { useEffect, useState } from 'react';
import { Item } from '../../pages/userDetails/components/userDetails.styled';
import { useSelector } from 'react-redux';
import { selectors } from '../../redux/data/user';

interface BlessProps { }

function getBlessing(day: Date): string {
    const hour: number = day.getHours();
    if (hour >= 6 && hour <= 11)
      return "בוקר טוב";
    if (hour > 11 && hour <= 17)
      return "צהריים טובים";
    if (hour > 17 && hour <= 21)
      return "ערב טוב";
    else
      return "לילה טוב";
  }

const Bless: React.FC<BlessProps> = (props) => {
    const [currentBlessing, setcurrentBlessing]= useState("");
 const user=useSelector(selectors.getUserDetails)
 
 console.log(user,'user');
 
    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentBlessing(getBlessing(new Date()));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (<Item>{currentBlessing} {user.firstName}</Item>);

};

export default Bless;

