import React from "react";
import CreateName from "./CreateService/CreateName";

function AdCreateSection({ step }) {
  switch (step) {
    case 1:
      return <CreateName />;
    default:
      return <CreateName />;
  }
}
export default AdCreateSection;
