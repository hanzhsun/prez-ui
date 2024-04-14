<script lang="ts" setup>
import { PrezProperty, PrezLiteral, PrezNode } from 'prez-lib';
import type { CitationProperties } from './CustomCitation'
const props = defineProps<{focusNode: PrezNode, properties: CitationProperties}>();
import CopyButton from "../components/CopyButton.vue";
import Button from 'primevue/button';
//import Tooltip from 'primevue/tooltip';

const propertyValue = (property:PrezProperty|undefined, dataType?:string) => 
    property?.objects?.filter(obj => !dataType || (obj.termType == "Literal" && dataType == (obj as PrezLiteral).datatype?.value))
    .map(obj => obj.value).join(', ') || "";

const firstTruthy = (...args: any[]): any => args.find(Boolean);

// Compute the citation text
const citationText = `Open Geospatial Consortium, 
        <em>${propertyValue(props.properties['http://purl.org/dc/terms/title'])}</em> 
        (<em>${propertyValue(props.properties['http://purl.org/dc/terms/identifier'], 'http://www.opengis.net/def/metamodel/ogc-na/doc_no')}</em>) 
        (${propertyValue(props.properties['http://purl.org/dc/terms/created']).toString().split('-')[0]}).
        OGC ${propertyValue(props.properties['https://www.opengis.net/def/metamodel/ogc-na/doctype'])}, 
        Eds. ${propertyValue(props.properties["http://purl.org/dc/terms/creator"])}. 
        ${firstTruthy(
                propertyValue(props.properties['http://purl.org/dc/terms/identifier'], 'http://example.com/datatypes/DOI'), 
                props.focusNode?.value
            )}`;

</script>

<template>
    <div v-if="propertyValue(properties['http://purl.org/dc/terms/identifier'], 'http://www.opengis.net/def/metamodel/ogc-na/doc_no')"
        v-tooltip="'This widget will use a configurable range of properties to show data in human and machine readable form'">
        <div v-html="citationText" />
        
        <div style="padding-top: 5px;">
            <CopyButton :value="citationText" iconOnly class="sm" />
            &nbsp;
            <Button size="small">XML</Button>
            &nbsp;
            <Button size="small"><i class="pi pi-share-alt"/></Button>
        </div>
    </div>
</template>

<style scoped>
div {
    float:right;
    width:400px;
    font-size:small;
}
.copy-btn.sm {
    padding: 8px 10px;
    width: 33px;
    height: 33px;
}

</style>