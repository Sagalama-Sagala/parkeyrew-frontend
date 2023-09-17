<script setup>
const Tag = [{id:0,label:"สีขาว"},{id:2,label:"ตลาดล่าง"}]
</script>
<template>
  <div class="bg-primary  pt-20 min-h-screen min-w-full">
    <div class="flex flex-wrap p-10 gap-4  z-[-100]" >
      <Cardproduct :is-recommended="true" item-name="พ่อง" :-tag="Tag" :item-price="123" item-image="https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg" :rating="4.65" seller-image="https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png"  :liked="like" :heart-click="togglelike" />
      <Cardproduct item-name="แมวน้อน่ารัก" :-tag="Tag" item-image="https://cms-cdn.placeholder.co/Home_page1_30861c64b2.webp" :item-price="1000" seller-name="ฟหก" :rating="3" seller-image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/640px-2010-brown-bear.jpg" :likeshow="false"/>
      <Cardproduct :is-recommended="true" :-tag="Tag" item-image="https://loremflickr.com/cache/resized/65535_52214085447_8f528b2c61_z_640_360_nofilter.jpg" :rating="2"      seller-image="https://static.wikia.nocookie.net/meme-time/images/1/15/Killer_Fish.png" :heart-click="greet"/>
    </div>
</div>
  
  
</template>

<script>
import Cardproduct from '../../components/Card/index.vue'
import Recommend from '../../assets/Card/Recommend.png'
import {ref} from "vue"
export default {
  data()
  {
    return{
      like:true,
      Cardproduct:Cardproduct,
      Recommend:Recommend,
    }
  },
  methods: {
    togglelike(){
      this.like = !this.like;
    }
  },
}
</script>

