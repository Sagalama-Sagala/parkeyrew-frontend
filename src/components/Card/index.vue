<script setup></script>

<template>
    <div class="  bg-white p-2 rounded-xl w-[13.5rem] h-[18rem] flex flex-col" @click="cardClick">

        <div class="flex items-end  h-[9rem] w-[12.5rem] absolute flex-col mt-[-0.5rem] justify-stretch" >
        <img v-if="isRecommended" :src=Recommend class="w-10 z-0"> 
        </div>

        <div  v-if="likeshow" class="flex absolute  h-[8.7rem] w-[12.5rem] items-end justify-end rounded-sm" >
            <img v-if="!liked" :src=Heart  class="w-10 [clip-path:polygon(49%_100%,100%_50%,100%_0,0%_0%,0%_49%)] hover:pb-[0.1rem]" @click="heartClick">
            <img v-if="liked" :src=Heartfilled  class="w-10 [clip-path:polygon(49%_100%,100%_50%,100%_0,0%_0%,0%_49%)] hover:pb-[0.1rem]" @click="heartClick">
        </div>
        <img  :src="itemImage" class="rounded-xl h-[8.7rem] object-cover">

        <h1>{{itemName}}</h1>
        <div class="flex flex-wrap h-[3rem] overflow-hidden mx-auto ">
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
import {ref} from 'vue';
import {Recommend,Star,Starfilled,Starhalffilled,Heart,Heartfilled} from '@/assets/Card'

export default {
  name: "Cardproduct",
  props: {
    isRecommended: 
    {
        type:Boolean,
        default:false,
    },
    likeshow:
    {
      type:Boolean,
      default:true
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
    heartClick:
    {
      type: Function,
      default:null
    }
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
  setup()
  {
    
  },
  data() {
    return {
      Recommend:Recommend,
      Star:Star,
      Starfilled:Starfilled,
      Starhalffilled:Starhalffilled,
      Heart:Heart,
      Heartfilled:Heartfilled
    };
  },
};
</script>