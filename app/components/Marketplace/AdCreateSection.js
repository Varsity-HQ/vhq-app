import React from "react";
import CreateName from "./CreateService/CreateName";
import { connect } from "react-redux";
import CreateDescription from "./CreateService/CreateDescription";

const mapStateToProps = (state) => {
  return {
    tabIndex: state.marketplaceReducer.create.tabIndex,
  };
};

function AdCreateSection({ tabIndex }) {
  switch (tabIndex) {
    case 1:
      return <CreateDescription />;
    case 0:
      return <CreateName />;
    default:
      return <CreateName />;
  }
}
export default connect(mapStateToProps, null)(AdCreateSection);
