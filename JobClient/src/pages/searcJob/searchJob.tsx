import { Theme } from "@emotion/react";
import { AppBar, Box, Tab, Tabs, Typography, makeStyles } from "@mui/material";
import React, { useEffect, useState } from "react";
import { STabs, Search_column } from "./searchJob.style";
import { Item } from "../interfaces";
import backendService from "../../service/backendService";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { selectors as CitiesAndStreetsSelector, actions as actionsCitiesAndStreets, CitiesI, actions } from '../slice';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import {actions as actionsGet} from '../GetJobs/modules/slice'
import { number } from "yup";
import { Button } from "../../components";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


const SearchJob=()=>{

  const [cities, setCities]:[Item[],Function] = useState([]);
  const [areas, setAreas]:[Item[],Function] = useState([]);
  const [jobs, setJobs]:[Item[],Function] = useState([]);
  const [institution, setInstitution]:[Item[],Function] = useState([]);
  const [ageGroup, setAgeGroup]:[Item[],Function] = useState([]);
  console.log({jobs});

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('in useeffect');
      const fetchData = async () => {
        try {
          setCities((await (backendService.getSelect({ tableName: "dbo.City", idColumnName: "iCityId", valueColumnName: "nvCityName" }))).data);
          setAreas((await (backendService.getSelect({ tableName: "dbo.Area", idColumnName: "iAreaId", valueColumnName: "nvAreaName" }))).data);
          setJobs((await (backendService.getSelect({ tableName: "dbo.Jobs", idColumnName: "iJobId", valueColumnName: "nvJobName" }))).data);
          setInstitution((await (backendService.getSelect({ tableName: "dbo.Institution", idColumnName: "iInstitutionId", valueColumnName: "nvInstitutionName" }))).data);
          setAgeGroup((await (backendService.getSelect({ tableName: "dbo.AgeGroup", idColumnName: "iAgeGroupId", valueColumnName: "nvAgeGroupName" }))).data);
          dispatch(actionsCitiesAndStreets.onGetCitiesRequested({}));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      console.log("erea-----------------------------------------",areas);
      
    }, []);
    
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const cities1 = useSelector(CitiesAndStreetsSelector.getCities)
  console.log("cities",cities1);
  const [cities2,setCities2]:[CitiesI[],Function]= useState(cities1?.result?.records);
  console.log("cities2 ",cities2);
 
  useEffect(()=>{
    if(cities1 && cities1.result){
      setCities2(cities1?.result?.records);
    }
  },[cities1])

  const handleCityChange=(event:any,value:CitiesI[])=>{
      let i:number;
      value?.forEach((element) => {
      i = cities2.indexOf(element);
      let temp:string=cities2[i].שם_ישוב;
      let nameCity:string[];
      nameCity=temp.split(" ");
      let nameC:string[]=[];
      nameCity.map(e=>e.length>0?nameC.push(e):null);
      let j=  cities?.findIndex(i=>i.value===nameC.toString().replace(","," "));
      console.log("j------------",j);
      
      j!==-1? chackedCity.push(cities[j].id):alert("אין כזאת עיר");
     
      
      
      // j===undefined?null:chackedCity.push(cities[j].id);
    }); 
  }
  
  const [chackedCity, setChackedCity]:[string[],Function] = useState([]);
  const [chackedArea, setChackedArea]:[string[],Function] = useState([]);
  const [chackedJobs, setChackedJobs]:[string[],Function] = useState([]);
  const [chackedInstitution, setChackedInstitution]:[string[],Function] = useState([]);
  const [chackedAgeGroup, setChackedAgeGroup]:[string[],Function] = useState([]);
 


  var index:number=0;
  const handleAreaChange=(e: CheckboxChangeEvent,item:Item)=>{
    if(!chackedArea){
      if(e.target.checked){
        setChackedArea([item.id]) ;
      }
    } 
    else{
      if(e.target.checked){
        chackedArea.push(item.id);
      }
      else {
        index=chackedArea.indexOf(e.target.value);
        chackedArea.splice(index,1);
      }
    }
    console.log("chackedArea",chackedArea);
    
  }
  const handleJobsChange=(e: CheckboxChangeEvent,item:Item)=>{
    
    if(!chackedJobs){
      if(e.target.checked){
        setChackedJobs ([item.id]);
      }
    } 
    else{
      if(e.target.checked){
        chackedJobs.push(item.id);
      }
      else {
         index=chackedJobs.indexOf(item.id);
         chackedJobs.splice(index,1);
      }
    }
    console.log("chackedJobs",chackedJobs);
    
  }
  const handleInstitutionsChange=(e: CheckboxChangeEvent,item:Item)=>{
    if(!chackedInstitution){
      if(e.target.checked){
        setChackedInstitution([item.id]);
      }
    } 
    else{
      if(e.target.checked){
        chackedInstitution.push(item.id);
      }
      else {
        index=chackedInstitution.indexOf(e.target.value);
        chackedInstitution.splice(index,1);
      }
    }
    console.log("chackedInstitution",chackedInstitution);
    
  }
  const handleAgeGroupsChange=(e: CheckboxChangeEvent,item:Item)=>{
    if(!chackedAgeGroup){
      if(e.target.checked){
        setChackedAgeGroup ([item.id]);
      }
    } 
    else{
      if(e.target.checked){
        chackedAgeGroup.push(item.id);
      }
      else {
        index=chackedAgeGroup.indexOf(e.target.value);
        chackedAgeGroup.splice(index,1);
      }
    }
    console.log("chackedAgeGroup",chackedAgeGroup);
    
  }

   //----------------------send data--------------------------------------------------------------------------
   const sendData=()=>{
    // console.log( " city   ", chackedCity.toString());
    dispatch(actionsGet.onGetJobRequest({userId:1,cities:chackedCity.toString(),areas:chackedArea.toString(),jobs:chackedJobs.toString(),institutions:chackedInstitution.toString(),ageGroups:chackedAgeGroup.toString()}));
    // setChackedAgeGroup([]);
    // setChackedInstitution([]);
    // setChackedJobs([]);
    // setChackedArea([]);
    // setChackedCity([]);
  }
  return (
    <div >
        <STabs>
      {/* <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="city" {...a11yProps(0)} />
          <Tab label="area" {...a11yProps(1)} />
          <Tab label="job" {...a11yProps(2)} />
          <Tab label="Institution" {...a11yProps(3)} />
          <Tab label="AgeGroup" {...a11yProps(4)} />
        </Tabs>
      </AppBar> */}
      <Search_column >
        <h3 >עיר</h3>
      {/* {<TabPanel value={value} index={0}> */}
       {cities2&&
      <Stack spacing={3} sx={{ width: 200 }}>
      <Autocomplete
        multiple
        limitTags={2}
        id="tags-outlined"
        options={cities2}
        getOptionLabel={(option) => option.שם_ישוב}
        filterSelectedOptions
        onChange={(event, value)=>handleCityChange(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="עיר"
            placeholder="עיר"
           />
        )} 
       />
    </Stack>  }        
      {/* </TabPanel> } */}
      {/* <TabPanel value={value} index={1}> */}
      </Search_column>
      {/*    {areas.map((item:Item,key:number)=>{return <Checkbox key={key} onChange={(e: CheckboxChangeEvent) => handleAreaChange(e,item)} style={{ display: +item.value == value ? 'block' : 'none' }}>{item.value}</Checkbox> })}
     </TabPanel>
      <TabPanel value={value} index={2}> */}
     
      <Search_column >
      <h3 >משרה</h3>
      {jobs.map((item:any,key:number)=>{return <Checkbox key={key} onChange={(e: CheckboxChangeEvent) => handleJobsChange(e,item)}>{item.value}</Checkbox> })}
      {/* </TabPanel>
      <TabPanel value={value} index={3}> */}
     </Search_column>
      <Search_column >
      <h3 >מוסד</h3>
      {institution.map((item:any,key:number)=>{return <Checkbox key={key} onChange={(e: CheckboxChangeEvent) => handleInstitutionsChange(e,item)}>{item.value}</Checkbox> })}
      </Search_column>
      <Search_column >
      <h3 >גיל</h3>
      
         {/* </TabPanel>                                                                                     
      <TabPanel value={value} index={4}> */}
      {ageGroup.map((item:any,key:number)=>{return <Checkbox key={key} onChange={(e: CheckboxChangeEvent) => handleAgeGroupsChange(e,item)}>{item.value}</Checkbox> })}
      {/* </TabPanel> */}
      </Search_column>
  
      </STabs>
      <Button onClick={()=>sendData()}>סנן</Button>
    </div>
  );
}

export default SearchJob;
