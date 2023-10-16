<template>
    <div class="md:text-2xl text-lg flex justify-between w-[95%]">
        <div class="md:text-2xl text-lg my-2 font-semibold">ที่อยู่ของฉัน</div>
        <button
            class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
            @click="togglePopup"
        >
            เพิ่ม +
        </button>
    </div>

    <!-- new address modal -->
    <div
        v-if="showPopup"
        class="z-20 h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30"
        @click="togglePopup"
    ></div>
    <div
        class="z-30 fixed top-[20%] h-[500px] md:py-5 md:pr-12 md:pl-12 ml-4 px-12 pt-8 bg-white rounded shadow-xl md:text-base text-sm md:w-1/2"
        :class="showPopup ? 'block' : 'hidden'"
    >
        <div class="">
            <p class="text-lg md:text-2xl font-bold">ที่อยู่ใหม่</p>
            <input
                type="text"
                class="focus:outline-none mt-6 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="ชื่อจริง-นามสกุล"
                v-model="name"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="หมายเลขโทรศัพท์"
                v-model="phone"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="จังหวัด, เขต, อำเภอ, รหัสไปรษณีย์"
                v-model="address"
            />
            <textarea
                type="text"
                class="focus:outline-none block w-full h-[100px] mt-4 px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล"
                v-model="addressDescription"
            />
            <div class="flex mt-8">
                <input type="checkbox" v-model="checked" />
                <div class="ml-1">เลือกเป็นที่อยู่ตั้งต้น</div>
            </div>

            <div class="mt-8 justify-end flex">
                <button
                    class="px-4 py-2 mx-1 rounded-lg md:hover:bg-gray-100"
                    @click="togglePopup"
                >
                    ยกเลิก
                </button>
                <button
                    class="border-[0.05rem] border-black px-4 py-2 mx-1 rounded-lg md:hover:shadow-md"
                    @click="createNewAddr"
                    :disabled="loading"
                >
                    ยืนยัน
                </button>
            </div>
        </div>
    </div>

    <!-- End of new address modal -->

    <!-- new address modal -->
    <div
        v-if="showEditAddressModal"
        class="z-20 h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30"
        @click="showEditAddressModal = !showEditAddressModal"
    ></div>
    <div
        class="z-30 fixed top-[20%] h-[500px] md:py-5 md:pr-12 md:pl-12 ml-4 px-12 pt-8 bg-white rounded shadow-xl md:text-base text-sm md:w-1/2"
        :class="showEditAddressModal ? 'block' : 'hidden'"
    >
        <div class="">
            <p class="text-lg md:text-2xl font-bold">แก้ไขที่อยู่</p>
            <input
                type="text"
                class="focus:outline-none mt-6 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="ชื่อจริง-นามสกุล"
                v-model="name"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="หมายเลขโทรศัพท์"
                v-model="phone"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="จังหวัด, เขต, อำเภอ, รหัสไปรษณีย์"
                v-model="address"
            />
            <textarea
                type="text"
                class="focus:outline-none block w-full h-[100px] mt-4 px-8 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล"
                v-model="addressDescription"
            />
            <div class="flex mt-8" v-if="currentIndex !== 0">
                <input type="checkbox" v-model="checked" />
                <div class="ml-1">เลือกเป็นที่อยู่ตั้งต้น</div>
            </div>
            <div class="flex mt-8" v-else>
                <input
                    type="checkbox"
                    checked="true"
                    @click.prevent="preventDisableDefaultAddr"
                />
                <div class="ml-1">เลือกเป็นที่อยู่ตั้งต้น</div>
            </div>

            <div class="mt-8 justify-end flex">
                <button
                    class="px-4 py-2 mx-1 rounded-lg md:hover:bg-gray-100"
                    @click="showEditAddressModal = false"
                >
                    ยกเลิก
                </button>
                <button
                    class="border-[0.05rem] border-black px-4 py-2 mx-1 rounded-lg md:hover:shadow-md"
                    @click="updateAddr()"
                    :disabled="loading"
                >
                    บันทึก
                </button>
            </div>
        </div>
    </div>
    <!-- end of edit address modal -->

    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div
        v-for="(adr, index) in profileStore.addr"
        class="w-full font-bold flex items-center justify-start my-2 md:px-16 py-4 shadow"
        :key="index"
    >
        <!-- desktop scale -->
        <div class="w-full my-4 pl-4 hidden md:block">
            <div class="flex justify-around mr-8">
                <p class="md:text-xl">{{ adr.firstname }}</p>
                <p class="md:text-xl">{{ adr.lastname }}</p>
                <div
                    class="w-[10px] border-r-[0.08rem] h-[24px] border-black"
                ></div>
                <p class="w-1/4 md:text-xl">{{ adr.phone }}</p>
            </div>
            <div class="w-full font-normal">
                <p class="break-words mt-2">
                    {{ adr.address + " " + adr.addressDescription }}
                </p>
            </div>
            <div v-if="index === 0" class="justify-start">
                <button
                    class="border-[0.05rem] rounded-lg px-2 border-primary text-white p-[3px] mt-2 bg-blue-600 font-light text-xs"
                >
                    ค่าเริ่มต้น
                </button>
            </div>
        </div>

        <!-- mobile scale -->
        <div
            class="w-full my-4 pl-4 md:hidden"
            @click="
                () => {
                    setEditAddressValue(adr, index);
                    showEditAddressModal = true;
                }
            "
        >
            <div class="flex justify-around mr-8">
                <p class="">{{ adr.firstname }}</p>
                <p class="">{{ adr.lastname }}</p>
                <div
                    class="w-[10px] border-r-[0.08rem] h-[24px] border-black"
                ></div>
                <p class="w-1/4">{{ adr.phone }}</p>
            </div>
            <div class="w-full font-normal">
                <p class="break-words mt-2">
                    {{ adr.address + " " + adr.addressDescription }}
                </p>
            </div>
            <div v-if="index === 0" class="justify-start">
                <button
                    class="border-[0.05rem] rounded-lg px-2 border-primary text-white p-[3px] mt-2 bg-blue-600 font-light text-xs"
                >
                    ค่าเริ่มต้น
                </button>
            </div>
        </div>

        <!-- desktop scale -->
        <div class="hidden md:block">
            <div
                class="flex justify-center items-center align-bottom px-4 flex-col md:flex-row"
            >
                <button
                    class="border-b-[0.05rem] px-2 pt-2 border-black md:mx-2"
                    @click="
                        () => {
                            setEditAddressValue(adr, index);
                            showEditAddressModal = true;
                        }
                    "
                >
                    แก้ไข
                </button>
                <button
                    v-if="index !== 0"
                    class="border-b-[0.05rem] px-2 pt-2 border-black md:mx-2"
                    @click="deleteAddr(index)"
                >
                    ลบ
                </button>
            </div>
            <div v-if="index !== 0" class="flex justify-center mt-4 items-end">
                <button
                    class="border-[0.05rem] rounded-md px-2 border-black text-black font-normal"
                    @click="setMainAddr(index)"
                >
                    ตั้งเป็นค่าเริ่มต้น
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useProfileStore } from "@/store/profile.store.js";
import axios from "axios";

export default {
    setup() {
        const profileStore = useProfileStore();
        profileStore.fetchMyAddress();
        return { profileStore };
    },
    data() {
        return {
            checked: ref(false),
            showPopup: false, // new address modal
            showEditAddressModal: false, // edit address modal
            firstname: "",
            lastname: "",
            address: "",
            addressDescription: "",
            phone: "",
            isMainAddress: null,
            id: null,
            currentIndex: -1,
            loading: false,
        };
    },
    computed: {
        name: {
            set(value) {
                const splited = value.split(" ");
                this.firstname = splited[0];
                if (splited.length > 1) {
                    this.lastname = splited[1];
                }
            },
            get() {
                return `${this.firstname} ${this.lastname}`.trim();
            },
        },
    },
    mounted() {
        if (this.profileStore.addr.length === 0) {
            this.checked = true;
        }
    },
    methods: {
        preventDisableDefaultAddr(e) {
            alert("อย่าติ๊กออกไอเย็ดแม่");
            this.checked = true;
        },
        togglePopup() {
            this.showPopup = !this.showPopup;
        },
        setEditAddressValue(currentValue, index) {
            // Set current value to data
            this.address = currentValue.address;
            this.phone = currentValue.phone;
            this.addressDescription = currentValue.addressDescription;
            this.firstname = currentValue.firstname;
            this.lastname = currentValue.lastname;
            this.id = currentValue._id;
            this.currentIndex = index;
            if (index === 0) {
                this.checked = true;
            } else {
                this.checked = false;
            }

            // console.log("setEditAddressValue", currentValue);
        },
        editAddr(index) {
            // console.log(this.profileStore.addr[index]);
        },
        async setMainAddr(index) {
            try {
                const res = await axios({
                    url: "/user/set-main-address",
                    method: "POST",
                    data: {
                        addressId: this.profileStore.addr[index]._id,
                    },
                });
                this.profileStore.fetchMyAddress();
                this.$toast.success("เปลี่ยนที่อยู่ตั้งต้นสำเร็จแล้ว");

                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAddr(index) {
            try {
                const res = await axios({
                    url: `/address/delete-address/${this.profileStore.addr[index]._id}`,
                    method: "POST",
                });
                this.profileStore.fetchMyAddress();
                this.$toast.success("ลบที่อยู่เรียบร้อยแล้ว");
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async updateAddr() {
            try {
                if (this.checked) {
                    await this.setMainAddr(this.currentIndex);
                }

                const res = await axios({
                    url: `/address/update-address-info`,
                    method: "POST",
                    data: {
                        addressId: this.id,
                        firstname: this.firstname,
                        lastname: this.lastname,
                        address: this.address,
                        addressDescription: this.addressDescription,
                        phone: this.phone,
                        isMainAddress: this.checked,
                    },
                });

                this.profileStore.fetchMyAddress();
                this.$toast.success("แก้ไขข้อมูลเรียบร้อยแล้ว");
                this.showEditAddressModal = false;
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async createNewAddr() {
            if (this.loading) return;

            try {
                if (this.name === "") {
                    this.$toast.info("กรุณากรอกชื่อ-นามสกุล");
                    return;
                } else if (!/^\d{10}$/.test(this.phone)) {
                    this.$toast.info(
                        "หมายเลขโทรศัพท์ต้องมีจำนวน 10 หลัก(เลข 0-9)"
                    );
                    this.phone = "";
                    return;
                } else if (
                    this.address === "" ||
                    this.addressDescription === ""
                ) {
                    this.$toast.info("กรุณากรอที่อยู่");
                    return;
                }

                this.loading = true;

                const res = await axios({
                    url: "/address/create-address",
                    method: "POST",
                    data: {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        address: this.address,
                        addressDescription: this.addressDescription,
                        phone: this.phone,
                        isMainAddress: this.checked,
                    },
                });
                console.log(res.data);
                this.$toast.success("เพิ่มที่อยู่ใหม่สำเร็จแล้ว");
                this.showPopup = !this.showPopup;
                this.profileStore.fetchMyAddress();
                this.firstname = "";
                this.lastname = "";
                this.address = "";
                this.addressDescription = "";
                this.phone = "";
                this.isMainAddress = "";
                this.checked = false;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

