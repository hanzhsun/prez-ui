import type { Meta, StoryObj } from "@storybook/vue3";
import CustomCitation from "../custom-components/CustomCitation.vue";
import type { CitationFields } from '../custom-components/CustomCitation'
import { node, literal, PrezTerm } from "prez-lib";
import { setProperties } from "../util/helpers";

type CitationInputFields = Record<CitationFields, string|PrezTerm[]>

        //{

    // title: { description: "Doc Title", value: "object"},
    // docId: { description: "Doc Id", value: "string"},
    // year: { description: "Year", value: "number"},
    // docType: { description: "Doc Type", value: "string"},
    // // 'https://www.opengis.net/def/metamodel/ogc-na/doctype': 
    // //     { description: "Doc Type", value: "string"},
    // creatorNames: { description: "Creator Names", value: "string"},
    // url: { description: "url", value: "string"},
    // doi: { description: "doi", value: "string"},
        //}

const argTypeProps:Record<CitationFields, object> = {
    "http://purl.org/dc/terms/creator": { description: "Creator Names"},
    "https://www.opengis.net/def/metamodel/ogc-na/doctype": { description: "Doc Type"},
    "http://purl.org/dc/terms/created": { description: "Date created"},
    "http://purl.org/dc/terms/identifier": { description: "Doc Identifier"},
    "http://purl.org/dc/terms/title": { description: "Title" }
};

const meta = {
    title: "CustomCitation",
    component: CustomCitation,
    tags: ["autodocs"],
    argTypes: { properties: argTypeProps, focusNode: { "description": "Focus Node URI"} }
} satisfies Meta<typeof CustomCitation>;

export default meta;

type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//     render: (args)=> ({
//         components: { CustomCitation },
//         setup() {
//             return {args}
//         },
//         template: `<CustomCitation :properties="args"></CustomCitation>`
//     }),
//     args:  {
//         properties: {
//             title: "Sensor Collection Service",
//             docId: "02-028",
//             year: 2002,
//             docType: "Interoperability Program Report",
//             creatorNames: "Tom McCarthy",
//             url: "http://www.opengis.net/def/docs/02-028",
//         }
//     }
// };

export const WithoutDOI: Story = {
    args:  {
        properties: setProperties(
            {
                "http://purl.org/dc/terms/creator": "Tom McCarthy",
                "http://purl.org/dc/terms/created": "2002-04-19",
                "http://purl.org/dc/terms/identifier": [
                    literal({datatype: node('http://www.opengis.net/def/metamodel/ogc-na/doc_no'), value: "02-028"})],
                "http://purl.org/dc/terms/title": "Sensor Collection Service",
                "https://www.opengis.net/def/metamodel/ogc-na/doctype": "Interoperability Program Report"
            } as CitationInputFields
        ),
        focusNode: node('http://www.opengis.net/def/docs/02-028')
    }
};

export const WithDOI: Story = {
    args:  {
        properties: setProperties(
            {
                "http://purl.org/dc/terms/creator": "Tom McCarthy",
                "http://purl.org/dc/terms/created": "2002-04-19",
                "http://purl.org/dc/terms/identifier": [
                    literal({datatype: node('http://www.opengis.net/def/metamodel/ogc-na/doc_no'), value: "02-028"}),
                    literal({datatype: node('http://example.com/datatypes/DOI'), value: 'https://doi.org/ogc-02-028'})
                ],
                "http://purl.org/dc/terms/title": "Sensor Collection Service",
                "https://www.opengis.net/def/metamodel/ogc-na/doctype": "Interoperability Program Report"
            } as CitationInputFields
        ),
        focusNode: node('http://www.opengis.net/def/docs/02-028')
    }
};

export const WithNoDocNo: Story = {
    args:  {
        properties: setProperties(
            {
                "http://purl.org/dc/terms/creator": "Tom McCarthy",
                "http://purl.org/dc/terms/created": "2002-04-19",
                "http://purl.org/dc/terms/identifier": [
                    literal({datatype: node('http://example.com/datatypes/DOI'), value: 'https://doi.org/ogc-02-028'})
                ],
                "http://purl.org/dc/terms/title": "Sensor Collection Service",
                "https://www.opengis.net/def/metamodel/ogc-na/doctype": "Interoperability Program Report"
            } as CitationInputFields
        ),
        focusNode: node('http://www.opengis.net/def/docs/02-028')
    }
};


// export const WithDOI: Story = {
//     args:  {
//         title: "Sensor Collection Service",
//         docId: "02-028",
//         year: 2002,
//         docType: "Interoperability Program Report",
//         creatorNames: "Tom McCarthy",
//         url: "http://www.opengis.net/def/docs/02-028",
//         doi: "https://doi.org/ogc-00-029"
//     }
// };
