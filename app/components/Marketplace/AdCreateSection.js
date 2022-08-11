import React from "react";
import CreateName from "./CreateService/CreateName";
import { connect } from "react-redux";
import CreateDescription from "./CreateService/CreateDescription";
import CreateMPPhotos from "./CreateService/CreateMPPhotos";
import CreateTarget from "./CreateService/CreateTarget";

const mapStateToProps = (state) => {
  return {
    tabIndex: state.marketplaceReducer.create.tabIndex,
    data: state.marketplaceReducer.create.data,
  };
};

function AdCreateSection({ tabIndex, categories, data }) {
  console.log({ data });
  switch (tabIndex) {
    case 3:
      return <CreateTarget />;
    case 2:
      return <CreateMPPhotos />;
    case 1:
      return <CreateDescription />;
    case 0:
      return <CreateName categories={categories} />;
    default:
      return <CreateName categories={categories} />;
  }
}
export default connect(mapStateToProps, null)(AdCreateSection);
