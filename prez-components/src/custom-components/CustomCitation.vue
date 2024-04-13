<script lang="ts" setup>
import { PrezProperty, PrezLiteral, PrezNode } from 'prez-lib';
import type { CitationProperties } from './CustomCitation'
defineProps<{focusNode: PrezNode, properties: CitationProperties}>();

const propertyValue = (property:PrezProperty|undefined, dataType?:string) => 
    property?.objects?.filter(obj => !dataType || (obj.termType == "Literal" && dataType == (obj as PrezLiteral).datatype?.value))
    .map(obj => obj.value).join(', ') || "";

const firstTruthy = (...args: any[]): any => args.find(Boolean);

</script>

<template>

    <div v-if="propertyValue(properties['http://purl.org/dc/terms/identifier'], 'http://www.opengis.net/def/metamodel/ogc-na/doc_no')">
        Open Geospatial Consortium, 
        <em>{{ propertyValue(properties['http://purl.org/dc/terms/title']) }}</em> 
        (<em>{{ propertyValue(properties['http://purl.org/dc/terms/identifier'], 'http://www.opengis.net/def/metamodel/ogc-na/doc_no') }}</em>) 
        ({{ propertyValue(properties['http://purl.org/dc/terms/created']) }}).
        OGC {{ propertyValue(properties['https://www.opengis.net/def/metamodel/ogc-na/doctype']) }}, 
        Eds. {{ propertyValue(properties["http://purl.org/dc/terms/creator"]) }}. 
        {{ firstTruthy(
                propertyValue(properties['http://purl.org/dc/terms/identifier'], 'http://example.com/datatypes/DOI'), 
                focusNode?.value
            ) }}
    </div>

</template>
<style scoped>
div {
    float:right;
    width:400px;
    font-size:small;
}
</style>