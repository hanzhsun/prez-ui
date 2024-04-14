<script lang="ts" setup>
import { PrezUINode, CopyButton, CustomCitation, CustomItem } from "prez-components";
import type { ProfileHeader, PrezItem, PrezProperties } from "prez-lib";
import Message from "primevue/message";
import Skeleton from "primevue/skeleton";
import PrezUIObjectTable from "./PrezUIObjectTable.vue";

const props = defineProps<{
    data?: PrezItem;
    path: string;
    profiles: ProfileHeader[];
    loading?: boolean;
    error?: Error | null;
}>();

const tableData = computed(() => {
    if (props.data) {
        return {
            properties: props.data.properties,
            members: props.data.focusNode?.members,
            concepts: props.data.focusNode?.concepts
        }
    } else {
        return undefined;
    }
});

function getProps(obj: any, props: string[]) {
    const result:any = {};
    props.forEach((prop:string) => {
        if (obj.hasOwnProperty(prop)) {
            result[prop] = obj[prop];
        }
    });
    return result;
}

function filterDocumentProps(properties?: PrezProperties) {
    if(!properties) {
        return properties;
    }
    return getProps(
        properties, 
        [
            'http://www.opengis.net/def/metamodel/ogc-na/status',
            'http://www.w3.org/2000/01/rdf-schema#seeAlso'
        ]
    )
}

</script>

<template>
    <main>
        <Message v-if="props.error" severity="error" :closable="false">Error: {{ props.error.message }}</Message>
        <template v-else>
            <div v-if="props.data?.properties?.['http://purl.org/dc/terms/isPartOf']?.objects.find(o=>o.value == 'https://placeholder.com/catalogue/documents')" class="item-header">
                <div v-if="props.data?.focusNode" style="float:right;">
                    <CustomCitation :focusNode="props.data?.focusNode" :properties="props.data?.properties" />
                </div>
                <CustomItem :focusNode="props.data?.focusNode" :properties="props.data?.properties"></CustomItem>
                <slot></slot>
                <PrezUIObjectTable :data="{...tableData, properties: filterDocumentProps(tableData?.properties)}" :key="Object.keys(props.data?.properties || {}).length" :loading="props.loading" />
                <br/>

                <img v-tooltip="'Widgets can be used to output custom diagrams'" src="/diagram.png" style="width:500px;"/>

            </div>
            <template v-else>
                <div class="item-header">
                    <template v-if="props.loading">
                        <Skeleton height="2rem" width="12rem" class="mb-2" style="margin-bottom: 20px"></Skeleton>
                        <Skeleton width="30rem" class="mb-2" style="margin-bottom: 8px"></Skeleton>
                        <Skeleton width="30rem" class="mb-2" style="margin-bottom: 12px"></Skeleton>
                    </template>
                    <template v-else-if="props.data">
                        <div style="float:right;">
                            <CustomCitation :focusNode="props.data?.focusNode" :properties="props.data?.properties" />
                        </div>
                        <h1>{{ props.data.focusNode.label?.value || props.data.focusNode.value }}</h1>
                        <div class="flex-row" style="margin-bottom: 8px">Type: <div class="types"><PrezUINode v-for="t in props.data.focusNode.rdfTypes" v-bind="t" badge :showProv="false" :showType="false" /></div></div>
                        <div class="flex-row">IRI: <div class="iri"><a :href="props.data.focusNode.value" target="_blank" rel="noopener noreferrer">{{ props.data.focusNode.value }}</a><CopyButton :value="props.data.focusNode.value" iconOnly /></div></div>
                    </template>
                </div>
                <p class="desc">
                    <Skeleton v-if="props.loading" width="30rem" class="mb-2"></Skeleton>
                    <template v-else-if="props.data">{{ props.data.focusNode.description?.value }}</template>
                </p>
                <slot></slot>
                <PrezUIObjectTable :data="tableData" :key="Object.keys(props.data?.properties || {}).length" :loading="props.loading" />
            </template>
        </template>
    </main>
    <div id="right-nav">
        <slot name="rightNav"></slot>
        <ProfileNav :profiles="props.profiles" :path="props.path" :loading="props.loading" />
    </div>
</template>

<style lang="scss" scoped>
.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
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