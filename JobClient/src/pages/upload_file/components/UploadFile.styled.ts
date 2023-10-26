import styled from "styled-components";

export const WrapperUpload = styled.div`
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
margin-top: 85px;
margin-right: 15px;
-webkit-flex-direction: rowflex-wrap:nowrapalign-content:centerjustify-content:space-aroundalign-items:flex-startwidth:30%;
-ms-flex-direction: rowflex-wrap:nowrapalign-content:centerjustify-content:space-aroundalign-items:flex-startwidth:30%;
flex-direction: column-reverse;
flex-wrap: wrap;
align-items:  stretch;
align-content: stretch;
*{
    margin: 5px 0px !important;
    // width: 150px !important;
    // width: 180px !important;
    // display: flex;
    // height: 50px !important;
    // position: absolute;
}
div{
    // display: flex;
    // width: 180px;
    // justify-content: space-between;
    // align-items: flex-end;
}
p{
    width: 140px;

}
`
export const WraperUploadDiv = styled.div`
*{
    margin: 10px !important;
    // display: -webkit-box;
    // display: -webkit-flex;
    // display: -ms-flexbox;
    // /* display: flex; */
    // /* width: 180px; */
    // /* -webkit-box-pack: justify; */
    // /* -webkit-justify-content: space-between; */
    // -ms-flex-pack: justify;
    // /* justify-content: space-between; */
    // /* -webkit-align-items: flex-end; */
    // -webkit-box-align: flex-end;
    // -ms-flex-align: flex-end;
    // align-items: center;
    // flex-direction: row;
    // flex-wrap: nowrap;
}
> * {
    &:first-child {
    //   color:red;
    }
    &:nth-child(2){
        width: 190px;
        height: 54px;
    }
  }

 
:nth-child(2) {
    /* Add your styles for the second child here */
}
`
export const NameAndDelIconDiv = styled.div`

    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    align-content: center;
    align-items: baseline;
    // width: 320px;
    justify-content: space-evenly;
    > * {
      
        &:nth-child(2){
            height: 48px;
            width: 167px;
            margin-right: 18px !important;
        }
      }
`
export const FileUploadDiv = styled.div`
text-align: center;
border: 3px dashed #8A56F9;
padding: 1.5rem;
position: relative;
cursor: pointer;
p{
    font-size: 0.87rem;
    margin-top: 10px;
    color: #8A56F9;
}

input{
    display: block;
    height: 100%;
    width: 150px !important;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    cursor: pointer;
}

img:nth-child(2){
    display: block;
    height: 20px;
    width: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
}
`