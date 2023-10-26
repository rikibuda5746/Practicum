
import { useEffect, useState } from "react";
import { FileUploadDiv, NameAndDelIconDiv, WraperUploadDiv, WrapperUpload } from "./UploadFile.styled";
import { useDispatch, useSelector } from "react-redux";
import { FileState, actions, selectors } from "../modules/slice";
import { Button as ButtonFail,Input, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from "@mui/material";
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from "axios";
import { Item } from "../../interfaces";
import backendService from "../../../service/backendService";
import { AppRoutesEnum } from "../../../routes/modules/constants";
import Home from "../../home";
import { TableCellMe } from "../../candidatesForJob/components/candidateForJob.styled";
import { DivFormWrapper } from "../../../components/FormStyeld/form.styeld";
import { selectors as userSelectors} from "../../../redux/data/user"
import { Button } from "../../../components";

const UploadFile: React.FC = () => {

    const nextName="דלג"
    const titleName="העלאת מסמכים"

    const dispatch = useDispatch();
    const files = useSelector(selectors.getFiles);
    const prevFils=useSelector(selectors.getPrevFails);
    const [uploadIndex, setUploadIndex] = useState(0);
    const [fileType, setFileType] = useState("");
    const user = useSelector(userSelectors.getUserDetails )

    const [documentTypes, setDocumentTypes]: [Item[], Function] = useState([]);
    useEffect(() => {
        dispatch(actions.getFiles({userId:user.id}));
        console.log("documentTypes");
        const fetchData = async () => {
            try {
                setDocumentTypes((await backendService.getSelect({ tableName: "dbo.DocumentsTypes", idColumnName: "iDocumentId", valueColumnName: "nvDocumentTypeName" })).data)
                console.log("documentTypes", documentTypes);
            } catch (error) {
        
            }
        }
        fetchData();
    }, [])
    const handleFileChange = async (event: any | null, index: number) => {
        const file = event?.target.files[0];
        if (file) {
            dispatch(actions.onUploadFile({ File: file, index: index, fileType: fileType }));
        }
    };
    const handleFileTypeChanged = async (e: any | null, index: number) => {
        // console.log("file????", e.target.value);
        
        setFileType(e.target.value as string)
        console.log("e.target.value", e.target.value);
        console.log("index ", index);

        const file_type = e.target.value
        console.log("file type: ", fileType);
        if (file_type)
            dispatch(actions.onChangeFiletype({ fileType: e.target.value, index: index }))
    }

    const handleClickSave = async () => {
        console.log("files ", files);
        await files?.map(async (f: FileState) => {
            const formData = new FormData();
            formData.append("file", f.file?f.file:"", f.file?.name);
            const { data: respons } = await axios.post(
                `https://test.w2030.co.il/students/newSystem/backend/index1.php?function=upload_file`,
                formData,
                {headers: { "Content-Type": "multipart/form-data" },}
            );
            console.log(respons);
            dispatch(actions.onSetSave({nameFile:String(f.file?.name),UserId:user.id,DocumentType:fileType,Respons:respons}))
        });
        
    }

    const handleDowload = async (pathFile:string,nameFile:string) => {
        // files?.map(async (f: FileState) => {
            //     formData.append("file", f.file?f.file:"", f.file?.name);
            const fileData : any = await axios.get(
                `https://test.w2030.co.il/students/newSystem/backend/index1.php?function=receiving_file&filePath=${pathFile}.pdf`,
                );
                console.log("respons",  fileData);

                const url = window.URL.createObjectURL(
                    new Blob([fileData.data]),
                  );
                //   const link = document.createElement('a');
                //   link.href = url;
                //   link.setAttribute(
                //     'הורדת הקובץ',
                //     `${nameFile}`,
                //   );
              
                  // Append to html link element page
                //   document.body.appendChild(link);
              
                  // Start download
                //   link.click();
              
                  // Clean up and remove the link
                //   link.parentNode!.removeChild(link);
                const formData = new FormData();
        // })
        // window.location.href="/jobs"
    }

   

   
    return (



        <div >
            <DivFormWrapper>
            <h1>{titleName}</h1>
            <hr />
            <br />    
            {/* <WrapperUpload> */}
                <WraperUploadDiv>
                    <ButtonFail variant="outlined" component="label" color="inherit">
                        צרף קובץ
                        <input type="file" onChange={(e) => handleFileChange(e, uploadIndex)} hidden />
                    </ButtonFail>
                    {/* <a  onClick={()=>handleDowload("racheli","name")} download>הורדת הקובץ</a> */}
                </WraperUploadDiv>
                <img src=""/>
                {files?.map((f: FileState, index: number) => (
                    <NameAndDelIconDiv key={index}>
                        <p title={f?.file?.name}>
                            {f?.file?.name && f.file.name.length > 15 ? f.file.name.substring(0, 15) + "..." : f?.file?.name}
                        </p>
                        <Select
                            onChange={(e) => handleFileTypeChanged(e, index)}
                            name="filetype"
                            type="select"
                            value={f.fileType}
                            fullWidth>
                            {
                                documentTypes?.map((item: Item) => (
                                    <MenuItem key={item.id} value={item.value} >{item.value ? item.value : ""}</MenuItem>
                                ))
                            }
                        </Select>
                        <RiDeleteBin6Line onClick={() => dispatch(actions.onRemoveFile(index))} />
                    </NameAndDelIconDiv>
                ))}
            {/* </WrapperUpload> */}
            <Button onClick={() => { handleClickSave() }} style={{ padding: "3px 15px" }}>שמור</Button>
            {/* 
            {prevFils?.map((faile:any,index:any)=>
            (
            <div key={index} >
            <Typography>{faile.nameFile}</Typography>
            <Typography>{faile.DocumentType}</Typography>
            <Button  
             onClick={()=>handleDowload(faile.Respons,faile.nameFile)} >הורדת הקובץ</Button>
            </div>
            )
             */}
            {/* )} */}

    <TableContainer  component={Paper}>
      <Table >
        <TableHead>
          <TableRow>
          <TableCellMe align="right">שם הקובץ</TableCellMe>
            <TableCellMe align="right"> סוג הקובץ</TableCellMe>
            <TableCellMe align="right">הורדת הקובץ</TableCellMe>
          </TableRow>
        </TableHead>
        <TableBody>
        <>
        {prevFils?.map((faile:any)=>(
        <TableRow>
        <TableCellMe align="right">{faile.nameFile} </TableCellMe>
            <TableCellMe align="right"> {faile.DocumentType} </TableCellMe>
            <TableCellMe align="right">
            <Button  
             onClick={()=>handleDowload(faile.Respons,faile.nameFile)} style={{ padding: "3px 15px" }}> להורדת הקובץ
            </Button>
            </TableCellMe>
       </TableRow>
        ))}</>
        </TableBody>
      </Table>
    </TableContainer>
            </DivFormWrapper>
        </div>
    )
}
export default UploadFile;