<template>
    <div class="w-full flex flex-col">
        <div
            v-for="(record, index) in records"
            class="flex w-full font-light md:flex md:my-0 my-2"
            :key="index"
        >
            <div class="md:m-6 m-2 md:w-[40%] w-[30%]">{{ record.title }}</div>

            <input
                class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
                :placeholder="record.value"
            />
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

