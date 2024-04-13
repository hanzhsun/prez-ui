import { PrezProperty, PrezTerm } from "prez-lib";
const fields = [
    'http://purl.org/dc/terms/title',
    'http://purl.org/dc/terms/identifier',
//    'http://www.w3.org/ns/dcat#Resource',
    'https://www.opengis.net/def/metamodel/ogc-na/doctype',
    'http://purl.org/dc/terms/creator',
    'http://purl.org/dc/terms/created',
] as const;

export type CitationFields = typeof fields[number];

export type CitationProperties = Partial<Record<CitationFields, PrezProperty>>;
