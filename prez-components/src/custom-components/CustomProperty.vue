<script lang="ts" setup>
import { PrezProperty, PrezLiteral, PrezNode, PrezProperties } from 'prez-lib';
defineProps<{focusNode: PrezNode, properties: PrezProperties}>();

const propertyValue = (property:PrezProperty|undefined, dataType?:string) => 
    property?.objects?.filter(obj => !dataType || (obj.termType == "Literal" && dataType == (obj as PrezLiteral).datatype?.value))
    .map(obj => obj.value).join(', ') || "";

</script>

<template>

  <h1>Properties</h1>

  <div v-for="(value, key) in properties" :key="key">
    <p v-if="value">{{ key }}: {{ propertyValue(value) }}</p>
  </div>

  Focus Node = {{ focusNode?.value }}

</template>
