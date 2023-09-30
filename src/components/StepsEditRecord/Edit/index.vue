<template>
    <div class="w-full flex flex-col ">
        <div v-for="(record, index) in records" class="flex  w-full font-light md:flex md:my-0 my-2 " :key="index">
            <div class="md:m-6 m-2 md:w-[40%] w-[30%] ">{{record.title}}</div>
            
            <input
                class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
                :placeholder="record.value"
            />
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