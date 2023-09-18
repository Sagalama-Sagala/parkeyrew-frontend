<template>
    <div class="bg-secondary min-h-screen flex flex-col  overflow-hidden relative">
        <div class="bg-white h-[8rem] w-full flex text-black items-end iten text-xl font-bold"> 
            <div class="mx-20 my-3 justify-between w-full hidden md:flex">
                <div class="flex">
                    <h1 class=" text-[#949494] hover:cursor-pointer hover:text-[#838383]" @click="handleMainClick"> 
                        เลือกซื้อตามหมวดหมู่&nbsp;
                    </h1> 
                    <h1 class="text-primary"> 
                        /&nbsp;{{$route.params.id}}
                    </h1>
                </div>
                
                <div class="flex gap-2 justify-center items-center"> 
                    <h1>เรียงตาม</h1>
                    <select name="cars" id="cars" class="border-[1px] border-black text-[1.2rem] font-normal">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="flex flex-1 gap-10">

            <div class="w-[25%] bg-white hidden md:block mt-[1px] text-2xl font-[500]"> 
                <div class="flex flex-col gap-5 justify-evenly items-center h-full">
                    <div class="w-[16rem] flex flex-col gap-3"> 
                        <div class="flex w-full justify-between"> 
                            <h1>แบรนด์</h1>
                            <h1>+</h1>
                        </div>
                        <div class="flex flex-col justify-around ml-5"> 
                            <div v-for="Option in brandOptions" :key="Option.id" class="flex gap-3">
                                <input type="checkbox" v-model="selected" :value="Option.id" class="w-[1.2rem]">
                                <label>{{ Option.label }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-[16rem] flex flex-col gap-3"> 
                        <div class="flex w-full justify-between"> 
                            <h1>ไซต์</h1>
                            <h1>+</h1>
                        </div>
                        <div class="flex flex-col ml-5 flex-wrap h-[6rem]"> 
                            <div v-for="size in sizes" :key="size.id" class="flex gap-3">
                                <input type="checkbox" v-model="selectedSize" :value="size.id" class="w-[1.2rem]">
                                <label>{{ size.label }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-[16rem] flex flex-col gap-3"> 
                        <div class="flex w-full justify-between"> 
                            <h1>สี</h1>
                            <h1>+</h1>
                        </div>
                        <div class="flex  ml-5 flex-wrap w-[12rem] gap-4"> 

                            <div v-for="color in colorOptions" :key="color.id" class="flex gap-3">
                                <div class="w-[1.2rem] aspect-square rounded-full hover:opacity-[0.5] hover:border-[2px] border-black" :style="{ backgroundColor: color.label }"> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[16rem] flex flex-col gap-3"> 
                        <div class="flex w-full justify-between"> 
                            <h1>สภาพ</h1>
                            <h1>+</h1>
                        </div>
                        <div class="flex flex-col ml-5 flex-wrap h-[2rem]"> 
                            <input type="range" id="volume-slider">
                        </div>
                    </div>
                    <div class="w-[16rem] flex flex-col gap-3"> 
                        <div class="flex w-full justify-between"> 
                            <h1>ราคา</h1>
                            <h1>+</h1>
                        </div>
                        <div class="flex flex-col ml-5 flex-wrap h-[2rem]"> 
                            <input type="range" id="volume-slider">
                        </div>
                    </div>
                </div>
            </div>

            <div class=" flex-1 flex flex-wrap mx-auto overflow-y-auto  "> 
                <div class="flex flex-wrap mt-10 gap-5 h-[0px] justify-center md:justify-start">
                <ProductCard class="w-[18rem]"
                    v-for="(item, index) in products"
                    :id="item.id"
                    :key="item.title"
                    :is-recommended="item.recommended"
                    :item-name="item.title"
                    :tags="item.tags"
                    :item-price="item.price"
                    :item-image="item.productImage"
                    :rating="item.rating"
                    :seller-image="item.sellerImage"
                    :liked="item.liked"
                    />
                </div>
            </div>
        </div>

    </div>
  </template>
  
  <script>
  import { Sharearrow } from "@/assets/Product";
  import { Heart } from "@/assets/Product";
  import ProductCard from "@/components/ProductCard/index.vue";
  import { Recommend } from "@/assets/product-card";
  import Rating from "@/components/Rating/index.vue";
  
  import { Chat, Call } from "@/assets/Product";
  
  import { T1, T2, T3, T4 } from "@/assets/TestImage";
  
  export default {
    components: {
      ProductCard,
      Rating,
    },
    methods: {
        handleMainClick(){
            this.$router.push(`/`)
        }
    },
    data() {
      return {
        ProductImage: [T1, T2, T3, T4, Call, Chat, Heart],
        isOpen: false,
        selectedOption: null,
        sizes: [
            { id: "S", label: "S" },
            { id: "M", label: "M" },
            { id: "L", label: "L" },
            { id: "XL", label: "XL" },
            { id: "XXL", label: "XXL" },
            { id: "Oversize", label: "Oversize" },
        ],
        brandOptions: [
            { id: 0, label: "ไม่มี" },
            { id: 1, label: "มีแบรนด์" },
        ],
        colorOptions: [
            { id: 0, label: "#000000" },
            { id: 1, label: "#1FFC11" },
            { id: 2, label: "#6F3222" },
            { id: 3, label: "#F14131" },
            { id: 4, label: "#123456" },
            { id: 5, label: "#555555" },
        ],

        products: [
          {
            id: "a0000001",
            recommended: true,
            title: "ขdsยะ",
            price: 300,
            productImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
            rating: 4.45,
            sellerImage:
              "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
            liked: true,
            tags: [
              { id: 0, label: "สีขาว" },
              { id: 1, label: "เล็ก" },
              { id: 2, label: "50%" },
              { id: 0, label: "no-brand" },
            ],
          },
          {
            id: "a0000002",
            recommended: true,
            title: "ขยะ",
            price: 300,
            productImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
            rating: 4.55,
            sellerImage:
              "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
            liked: true,
            tags: [
              { id: 0, label: "สีขาว" },
              { id: 1, label: "เล็ก" },
              { id: 2, label: "50%" },
              { id: 2, label: "เล็กมาก" },
              { id: 2, label: "ถูกเกิน" },
              { id: 2, label: "ลดได้อีกๆ" },
            ],
          },
          {
            id: "a0000003",
            recommended: true,
            title: "ขยะ",
            price: 300,
            productImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
            rating: 4.55,
            sellerImage:
              "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
            liked: true,
            tags: [
              { id: 0, label: "สีขาว" },
              { id: 1, label: "เล็ก" },
              { id: 2, label: "50%" },
              { id: 2, label: "เล็กมาก" },
              { id: 2, label: "ถูกเกิน" },
              { id: 2, label: "ลดได้อีกๆ" },
            ],
          },
          {
            id: "a0000004",
            recommended: true,
            title: "ขยะ",
            price: 300,
            productImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
            rating: 4.55,
            sellerImage:
              "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
            liked: true,
            tags: [
              { id: 0, label: "สีขาว" },
              { id: 1, label: "เล็ก" },
              { id: 2, label: "50%" },
              { id: 2, label: "เล็กมาก" },
              { id: 2, label: "ถูกเกิน" },
              { id: 2, label: "ลดได้อีกๆ" },
            ],
          },
          {
            id: "a0000004",
            recommended: true,
            title: "ขยะ",
            price: 300,
            productImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
            rating: 4.55,
            sellerImage:
              "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
            liked: true,
            tags: [
              { id: 0, label: "สีขาว" },
              { id: 1, label: "เล็ก" },
              { id: 2, label: "50%" },
              { id: 2, label: "เล็กมาก" },
              { id: 2, label: "ถูกเกิน" },
              { id: 2, label: "ลดได้อีกๆ" },
            ],
          },
        ],
      };
    },
  };
  </script>
  