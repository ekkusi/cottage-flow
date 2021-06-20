// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

const requiredValidation = {
  codegen: { required: true },
  validation: Rule => Rule.required(),
};

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Programs",
      name: "program",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          type: "string",
          ...requiredValidation,
        },
        {
          title: "Description",
          name: "description",
          type: "text",
          ...requiredValidation,
        },
        {
          title: "Image",
          name: "image",
          type: "image",
        },
      ],
    },
  ]),
});
