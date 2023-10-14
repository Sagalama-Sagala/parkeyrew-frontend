<template>
    <div class="w-full flex flex-col">
        <div
            v-for="(record, index) in records"
            class="flex justify-center w-full font-light md:flex md:my-0 my-2"
            :key="index"
        >
            <div class="md:m-6 m-2 md:w-full w-[40%]">{{ record.title }}</div>
            <div class="md:m-6 m-2 md:w-full w-[60%] font-semibold">
                {{ record.value }}
            </div>
        </div>
    </div>
</template>

<script>
import { useProfileStore } from "@/store/profile.store";

export default {
    setup() {
        const profileStore = useProfileStore();
        return {
            profileStore,
        };
    },
    computed: {
        records() {
            return [
                {
                    title: "ชื่อผู้ใช้",
                    value: this.profileStore.profile?.username,
                },
                { title: "ชื่อ", value: this.profileStore.profile?.firstname },
                {
                    title: "นามสกุล",
                    value: this.profileStore.profile?.lastname,
                },
                { title: "เบอร์โทร", value: this.profileStore.profile?.phone },
            ];
        },
    },
    data() {
        return {};
    },
};
</script>

