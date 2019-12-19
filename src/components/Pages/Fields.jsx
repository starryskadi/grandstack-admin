import React from "react";
import Layout from "components/Layout/Layout";

const Fields = props => {
  const { fields } = props;

  // Fields to Render
  const renderFields = fields.map(each => {
    const type = each.type;
    if (type.kind === "NamedType") {
      const namedType = type.name.value;
      return namedType;
    } else {
      return type.type.name.value;
    }
  });

  const renderContent = () => {
    return renderFields.map(each => {
      switch (each) {
        case "String":
          return "String";
        case "Boolean":
          return "Boolean";
        case "Int":
          return "Int";
        case "ID":
          return null;
        default:
          return "FieldsType";
      }
    });
  };
  return <Layout>{renderContent()}</Layout>;
};

export default Fields;
