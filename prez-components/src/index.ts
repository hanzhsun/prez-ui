// import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "primevue/resources/themes/aura-light-blue/theme.css";
import "primeicons/primeicons.css";
import "./assets/sass/main.scss";
import CopyButton from "./components/CopyButton.vue";
import PrezUIItemList from "./components/PrezUIItemList.vue";
import PrezUIObjectTable from "./components/PrezUIObjectTable.vue";
import PrezUITerm from "./components/PrezUITerm.vue";
import PrezUINode from "./components/PrezUINode.vue";
import PrezUILiteral from "./components/PrezUILiteral.vue";
import PrezUIBlankNode from "./components/PrezUIBlankNode.vue";
import CustomCitation from './custom-components/CustomCitation.vue';
import CustomItem from './custom-components/CustomItem.vue';
import { filterProps } from "./custom-components/CustomItem.d";

export * from "./types";

export {
    CopyButton,
    PrezUIItemList,
    PrezUIObjectTable,
    PrezUITerm,
    PrezUINode,
    PrezUILiteral,
    PrezUIBlankNode,
    CustomCitation,
    CustomItem
};
