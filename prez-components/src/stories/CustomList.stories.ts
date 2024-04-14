import type { Meta, StoryObj } from "@storybook/vue3";
import CustomList from "../custom-components/CustomList.vue"

const meta = {
    title: "CustomList",
    component: CustomList,
    tags: ["autodocs"],
    argTypes: {
        list: {
            description: "List"
        }
    },
} satisfies Meta<typeof CustomList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CatalogGrid: Story = {
    args:  {
        layout: 'grid',
        list: [
            {title: "Building Blocks - OGC Main", description: `The OGC Building Blocks register provides an overview of a series of building blocks managed by the OGC community through a variety of processes: - formal standards publication processes the Standards Working Groups - agreements with other standards bodies (eg. ISO) - community hosted examples of re-use (profiles and extensions of OGC standards) - informal "incubator" processes where more than one project needs a solution, and appropriate SWG scope is yet to be determined ![](https://lucid.app/publicSegments/view/9d075f82-8611-4f32-83eb-994143669cc8/image.png) Notes: 1. Policies are in preparation for naming and governance of these sub-registers, and this is subject to change pending adoption of such policies. 1. Building Block identification will be designed to support transition between governance domains without change using symbolic references. 1. A formal definition of Building Blocks and the level of "granularity" they represent with respect to the OGC Modular Specification is TBD.`},
            {title: "Catalog of Documents", description: "The OGC's Catalog of Documents"},
            {title: "Catalog of Definitions", description: "The OGC's Catalog of Definitions"}
        ]
    }
};

export const CatalogList: Story = {
    args:  {
        layout: 'table',
        listHeaders: [
            {field: 'title', header: 'Title', sortable: true},
            {field: 'description', header: 'Description', sortable: true}
        ],
        list: [
            {title: "Building Blocks - OGC Main", description: `The OGC Building Blocks register provides an overview of a series of building blocks managed by the OGC community through a variety of processes: - formal standards publication processes the Standards Working Groups - agreements with other standards bodies (eg. ISO) - community hosted examples of re-use (profiles and extensions of OGC standards) - informal "incubator" processes where more than one project needs a solution, and appropriate SWG scope is yet to be determined ![](https://lucid.app/publicSegments/view/9d075f82-8611-4f32-83eb-994143669cc8/image.png) Notes: 1. Policies are in preparation for naming and governance of these sub-registers, and this is subject to change pending adoption of such policies. 1. Building Block identification will be designed to support transition between governance domains without change using symbolic references. 1. A formal definition of Building Blocks and the level of "granularity" they represent with respect to the OGC Modular Specification is TBD.`},
            {title: "Catalog of Documents", description: "The OGC's Catalog of Documents"},
            {title: "Catalog of Definitions", description: "The OGC's Catalog of Definitions"}
        ]
    }
};


export const CollectionList: Story = {
    args:  {
        layout: 'table',
        listHeaders: [
            {field: 'title', header: 'Title', sortable: true},
            {field: 'description', header: 'Description', sortable: true},
            {field: 'owner', header: 'Owner', sortable: true},
        ],
        list: [
            {title: "Topic 11 - Metadata", description: `ISO 19115 was adopted as a replacement for OGC Abstract Specification Topics 9 and 11. In June 2001, a motion to include material in addition to ISO 19115 was adopted as document 01-111 Metadata AS. The approved addition to document 01-111 is contained in document 01-053r1, which normatively references parts of the old AS Topic 9, document 99-109r1. FGDC in conjunction with ANSI INCITS L1 are planning the migration of the FGDC Content Standard for Geospatial Metadata to be a profile of ISO 19115`, owner: "OGC"},
            {title: "Web Coverage Service", description: "Extends the Web Map Server (WMS) interface to allow access to geospatial coverages that represent values or properties of geographic locations, rather than WMS generated maps (pictures).", owner: "John Evans"},
            {title: "Sensor Collection Service", description: "The basic function of the Sensor Collection Service (SCS) is to provide a web-enabled interface to a sensor, collection of sensors or sensor proxy. Sensors are defined as devices that measure physical quantities.", "owner": "Tom McCarty"}
        ]
    }
};
