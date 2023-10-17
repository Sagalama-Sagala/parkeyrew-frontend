<template>
    <button :class="class" @click="onClick" :disabled="loading">
        <div class="flex justify-center" v-if="loading">
            <img class="animate-spin h-5 w-5" :src="loadingSVG" />
        </div>
        <p v-else>{{ text }}</p>
    </button>
</template>

<script>
import { loadingSVG } from "@/assets/buttons";
export default {
    props: {
        loading: false,
        class: "",
        text: "",
        onClick: {
            type: Function,
        },
    },
    setup() {},
    data() {
        return { loadingSVG };
    },
};
</script>

