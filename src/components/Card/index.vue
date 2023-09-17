<script setup>
import {Recommend,Star,Starfilled,Starhalffilled,Heart,Heartfilled} from '@/assets/Card'
function greet()
{
    alert("คลิกทำไม ยังไม่เสร็จครับ")
}
</script>

<template>
    <div class="  bg-white p-2 rounded-xl w-[13.5rem] h-[18rem] flex flex-col" @click="cardClick">

        <div class="flex items-end  h-[9rem] w-[12.5rem] absolute flex-col mt-[-0.5rem] justify-stretch" >
        <img v-if="isRecommended" :src=Recommend class="w-10 z-0"> 
        </div>

        <div class="flex absolute  h-[8.7rem] w-[12.5rem] items-end justify-end">
            <img v-if="!liked" :src=Heart  class="w-10">
            <img v-if="liked" :src=Heartfilled  class="w-10">
        </div>
        <img  :src="itemImage" class="rounded-xl h-[8.7rem] ">

        <h1>{{itemName}}</h1>
        <div class="flex flex-wrap h-[3rem] overflow-hidden mx-auto">
            <div v-for="item in Tag" :key="item.id">
                <div class="border-[1px] border-grey rounded-[3px] px-1 text-center text-[10px] m-1 hover:bg-slate-400 hover:cursor-pointer" @click="(e)=>{e.stopPropagation();tagClick}" >
                {{ item.label }}
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-3">

        <div>
            <div class="flex items-center  gap-2">
                <img :src=sellerImage class="rounded-full w-6 h-6 border-2">
                <p class="text-[0.8rem] hover:underline hover:cursor-pointer" @click="(e)=>{e.stopPropagation();nameClick}">{{sellerName}}</p>
            </div>
            <div class="flex mt-1">
                <img
                v-for="index in 5"
                :key="index"
                :src="getStarImage(index)"
                class="w-4"
                />
            </div>
        </div>
            <div class="flex items-end justify-end  flex-col">
                <h1 class="text-[1.4rem] leading-4 font-bold"> 
                    {{itemPrice}}
                </h1>
                <h1 class=" text-[0.7rem]"> 
                    บาท
                </h1>
            </div>
        </div>

    </div>
</template>


<script>
export default {
  name: "Cardproduct",
  props: {
    isRecommended: 
    {
        type:Boolean,
        default:false,
    },
    itemName: 
    {
        type:String,
        default:"placeholderText",    
    },
    Tag: 
    {
        type:String
    },
    itemImage: 
    {
        type:String,
        default:"https://placehold.co/600x400"
    },
    sellerImage: 
    {
        type:String,
        default:"https://placehold.co/600x400"
    },
    itemPrice: 
    {
        type:Float32Array,
        default:0
    },
    sellerName: 
    {
        type:String,
        default:"Seller Name"
    },
    nameClick:
    {
        type:Function,
        default:null
    },
    cardClick:
    {
        type:Function,
        default:null
    },
    tagClick:
    {
        type:Function,
        default:null
    },
    rating: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getStarImage() {
      return (index) => {
        const fullStars = Math.floor(this.rating);
        const halfStar = this.rating % 1 >= 0.5;
        if (index <= fullStars) {
          return Starfilled;
        } else if (halfStar && index === fullStars + 1) {
          return Starhalffilled; 
        } else {
          return Star; 
        }
      };
    },
  },
  methods: {
    empty() {},
  },
  data() {
    return {
      Recommend: Recommend,
    };
  },
};
</script>