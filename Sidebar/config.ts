import { type ComponentConfig } from "@superblocksteam/custom-components";

export default {
  // DO NOT CHANGE THE ID ONCE THE COMPONENT HAS BEEN REGISTERED!
  id: "fb6ec0e0-7358-4b68-9ce8-eb0fc08e9644",
  name: "Sidebar",
  displayName: "Sidebar",
  componentPath: "components/Sidebar/component.tsx",
  properties: [{
    path: "items",
    dataType: "any",
    propertiesPanelDisplay: {
      "label":"Navigation items",
      "controlType":"js-expr",
      "defaultValue": '[]'
    },
    isExternallyReadable: true,
    isExternallySettable: true
    },
    {
    path: "selectedItem",
    dataType: "string",
    propertiesPanelDisplay: undefined,
    isExternallyReadable: true,
    isExternallySettable: true
    },],
  events: [{
    label: "onItemSelect",
    path: "onItemSelect"
    },],
  gridDimensions: {
    initialColumns: 50,
    initialRows: 30,
  },
} satisfies ComponentConfig;
