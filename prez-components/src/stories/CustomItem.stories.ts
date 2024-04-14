import type { Meta, StoryObj } from "@storybook/vue3";
import CustomItem from "../custom-components/CustomItem.vue";
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
    title: "CustomItem",
    component: CustomItem,
    tags: ["autodocs"],
    argTypes: { properties: argTypeProps, focusNode: { "description": "Focus Node URI"} }
} satisfies Meta<typeof CustomItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DocumentPage: Story = {
    args:  {
        properties: setProperties(
            {
                "http://purl.org/dc/terms/title": "Sensor Collection Service",
                'http://purl.org/dc/terms/isPartOf': [literal('Catalog of Documents')],
                "http://purl.org/dc/terms/creator": "Tom McCarthy",
                "http://purl.org/dc/terms/created": "2002-04-19",
                "http://purl.org/dc/terms/identifier": [
                    literal({datatype: node('http://www.opengis.net/def/metamodel/ogc-na/doc_no'), value: "02-028"})],
                "https://www.opengis.net/def/metamodel/ogc-na/doctype": "Interoperability Program Report"
            } as CitationInputFields
        ),
        focusNode: node({label: literal("Sensor Collection Service"), value: 'http://www.opengis.net/def/docs/02-028'})
    }
};
