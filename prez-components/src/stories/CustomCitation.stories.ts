import type { Meta, StoryObj } from "@storybook/vue3";
import CustomCitation from "../custom-components/CustomCitation.vue";
import type { CitationFields } from '../custom-components/CustomCitation'
import { node, literal, PrezTerm } from "prez-lib";
import { setProperties } from "../util/helpers";

type CitationInputFields = Record<CitationFields, string|PrezTerm[]>

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

