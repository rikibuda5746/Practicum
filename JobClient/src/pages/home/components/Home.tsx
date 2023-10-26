import React, { useEffect } from "react";
import Title from "../../../components/Title";
// import RouteProcessRegistration  from "../../RouteProcessRegistration/component/RouteProcessRegistration";
import Jobs from "../../GetJobs/components/Jobs";
import { mockNews } from "../modules/constant";
import { CardsWrapper, HomeWrapper } from "./Home.styled";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux/data/user";
import { Role } from "../../../routes/modules/constants";
import HomeAdmin from "./HomeAdmin";
import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";

interface HomeProps {
  // isLoggedIn: boolean
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {

  const dispach=useDispatch()
  
  useEffect(()=>{
  dispach(actions.onUploudSite())
  },[])

  const userRole = useSelector(selectors.getUserRole);

  {
    switch (userRole) {
      case Role.USER:
        return <HomeUser />;
      case Role.ADMIN:
        return <HomeAdmin />;
      default:
        console.log(userRole ," userroooool ");
        return <HomeGuest />;

    }
  }
};

export default Home;
