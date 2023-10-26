import React from "react";
import { LockWrapper } from "./Lock.styled";

interface LockProps  {

}

const Lock: React.FC<LockProps> = (props) => {
  return (
    <LockWrapper >
        "אין לך הרשאת גישה לעמוד זה"
    </LockWrapper>
  );
};

export default Lock;