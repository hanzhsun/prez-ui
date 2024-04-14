import { PrezProperties, PrezProperty, PrezTerm } from "prez-lib";

const fields = [
    'http://purl.org/dc/terms/title',
    'http://purl.org/dc/terms/isPartOf',
    'http://purl.org/dc/terms/identifier',
//    'http://www.w3.org/ns/dcat#Resource',
    'https://www.opengis.net/def/metamodel/ogc-na/doctype',
    'http://purl.org/dc/terms/creator',
    'http://purl.org/dc/terms/created',
] as const;

export type ItemFields = typeof fields[number];

export type ItemProperties = Partial<Record<ItemFields, PrezProperty>>;

function getProps(obj, props) {
    const result = {};
    props.forEach(prop => {
        if (obj.hasOwnProperty(prop)) {
            result[prop] = obj[prop];
        }
    });
    return result;
}

export function filterProps(properties: PrezProperties) {
    return getProps(
        properties, 
        [
            'http://www.opengis.net/def/metamodel/ogc-na/status',
            'http://www.w3.org/2000/01/rdf-schema#seeAlso'
        ]
    )
}