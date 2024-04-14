<script lang="ts" setup>
import { PrezProperty, PrezLiteral, PrezNode } from 'prez-lib';
import type { ItemProperties } from './CustomItem';
import PrezUITerm from '../components/PrezUITerm.vue';
import CopyButton from "../components/CopyButton.vue";
const props = defineProps<{focusNode: PrezNode, properties: ItemProperties}>();

const propertyValue = (property:PrezProperty|undefined, dataType?:string) => 
    property?.objects?.filter(obj => !dataType || (obj.termType == "Literal" && dataType == (obj as PrezLiteral).datatype?.value))
    .map(obj => obj.value).join(', ') || "";

</script>

<template>
    <div class="item-header">
        <h1>{{ props.focusNode?.label?.value || props.focusNode?.value }}</h1>
        <div class="flex-row">
            IRI:
            <div class="iri">
                <a :href="props.focusNode?.value" target="_blank" rel="noopener noreferrer">{{ props.focusNode?.value }}</a>
                <CopyButton :value="props.focusNode?.value" iconOnly />
            </div>
        </div>

        <div class="flex-row">
            <div>Defined by: </div>
            <PrezUITerm 
                v-if="props.properties?.['http://purl.org/dc/terms/isPartOf']" 
                v-for="o in props.properties['http://purl.org/dc/terms/isPartOf'].objects"
                v-bind="o"
            />
        </div>

        <p class="desc">
            <template v-if="props.focusNode">{{ props.focusNode.description?.value }}</template>
        </p>

    </div>
</template>

<style scoped>
.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}

.types {
    display: flex;
    flex-direction: row;
    gap: 6px;
}

.iri {
    padding: 8px;
    background-color: #e9e9e9;
    border-radius: 4px;
    font-family: monospace;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.desc {
    font-style: italic;
}

#right-nav {
    padding: 12px;
    min-width: 280px;
    max-width: 280px;
}
</style>