<script lang="ts" setup>
import { PrezProperty, PrezLiteral, PrezNode } from 'prez-lib';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

//import type { CitationProperties } from './CustomCitation'
//defineProps<{focusNode: PrezNode, properties: CitationProperties}>();

defineProps<{layout: 'grid' | 'table', 
    listHeaders?: {field: string, header: string, sortable: boolean}[], 
    list: {title: string, description: string, [key: string]: string | undefined}[]}>();

const propertyValue = (property:PrezProperty|undefined, dataType?:string) => 
    property?.objects?.filter(obj => !dataType || (obj.termType == "Literal" && dataType == (obj as PrezLiteral).datatype?.value))
    .map(obj => obj.value).join(', ') || "";

const firstTruthy = (...args: any[]): any => args.find(Boolean);

</script>

<template>
<div v-if="layout == 'table'">

    <DataTable :value="list" tableStyle="min-width: 50rem">
        <Column v-for="col of listHeaders" body="" v-bind="col" v-bind:key="col.field" style="width: 25%" />
    </DataTable>

</div>
    <div v-if="layout == 'grid'" class="catalog-grid">
        <div v-for="item in list" class="catalog-item">
            <h1>{{ item.title }}</h1>
            <p class="description">{{ item.description }}</p>
        </div>
    </div>

</template>
<style scoped>
.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Two items in a row */
    gap: 20px; /* Adjust spacing between items */
}

.catalog-item {
    border: 1px solid #ddd; /* Optional: Add border for visual separation */
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    overflow: hidden; /* Ensure text overflow is hidden */
}

.catalog-item h1 {
    margin-bottom: 10px;
}

.description {
    display: -webkit-box;
    -webkit-line-clamp: 4; /* Limit to 4 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>