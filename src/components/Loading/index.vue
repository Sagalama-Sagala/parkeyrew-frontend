<template>
        <div v-if:="isLoading" class="h-full fixed z-[3000] w-full bg-black bg-opacity-50">
            <div class="flex flex-1 justify-center items-center h-full">
            <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-primary " />
            </div>
        </div>
</template>

<script>
export default {
    name: "Loading",
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>

</style>
