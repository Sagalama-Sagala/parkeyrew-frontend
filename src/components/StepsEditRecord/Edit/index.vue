<template>
    <div class="w-full flex flex-col   ">
        <div v-for="(record, index) in records" class="flex justify-center w-full font-light md:flex md:my-0 my-2 " :key="index">
            <div class="md:m-10 m-2 md:w-1/2 w-[30%] ">{{record.title}}</div>
            <div class="md:m-10 m-2 md:w-1/2 w-[40%] text-gray-400 border-y-gray-200 border rounded-lg p-4">{{record.value}}</div>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {

        records:[
                    {title: "ชื่อผู้ใช้", value: "mmayyiisuay"},
                    {title: "ชื่อ", value: "ณัชชา"},
                    {title: "นามสกุล", value: "สวยสะอาด"},
                    {title: "เบอร์โทร", value: "0949193350"},
                ],
    }}
}
</script>