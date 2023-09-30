<template>
    <div class="container">
        <div class="slider-tracker"></div>
        <div class="range-wrap">
            <input type="range" min="0" max="100" v-model="value" id="slider-1" class="range" />
            <output class="bubble2">{{ value2 }}</output>
        </div>

        <div class="range-wrap">
            <input type="range" min="0" max="100" v-model="value2" id="slider-2" class="range" />
            <output class="bubble1">{{ value }}</output>
        </div>
    </div>
</template>
  
<script>
  export default {
    components: {
    },
    props: {
      id: {
        type: String,
        default: null,
      },
    },
    methods: {
        setBubble(value) {
            const val = this.value;
            const min = this.$el.querySelector(".range").min || 0;
            const max = this.$el.querySelector(".range").max || 100;
            const newVal = Number(((val - min) * 100) / (max - min));
            this.$el.querySelector(".bubble1").innerHTML = val;

            this.$el.querySelector(".bubble1").style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
            },
        setBubble2() {
        const val = this.value2;
        const min = this.$el.querySelector(".range").min || 0;
        const max = this.$el.querySelector(".range").max || 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        this.$el.querySelector(".bubble2").innerHTML = val;

        this.$el.querySelector(".bubble2").style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
        },
    },
    mounted()
    {
        this.setBubble();
        this.setBubble2();
    },
    watch:{
        value() {
            this.setBubble();
        },
        value2() {
            this.setBubble2();
        },
    },
    data() {
      return {
        value:30,
        value2:70,
      };
    },
  };
</script>

<style scoped>
.container
{
    position: relative;
    width: 100%;
    height: 100px;
}

input[type="range"]
{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background-color: transparent;
    pointer-events: none;
}

.slider-tracker
{
    width: 100%;
    height: 5px;
    background-color: #d5d5d5;
    position: absolute;
    margin:auto;
    top:0;
    bottom: 0;
    border-radius: 5px;
}

.range-wrap
{
    position: relative;
    margin-top: 15px;
}

.range
{
    width: 100%;
}

.bubble1 {
  color: black;
  padding: 4px 12px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
}

.bubble2 {
  color: black;
  padding: 4px 12px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
}

input[type='range']::-webkit-slider-runnable-track
{
    -webkit-appearance: none;
    height: 5px;
}

input[type="range"]::-moz-range-track
{
    -moz-appearance: none;
    height: 5px;
}

input[type="range"] ::-ms-track
{
    appearance: none;
    height:5px;
}

input[type="range"]::-webkit-slider-thumb
{
    -webkit-appearance: none;
    height: 1.1rem;
    width: 1.1rem;
    background-color: black;
    cursor:pointer;
    border-radius: 10px;
    margin-top:-6px;
    pointer-events: auto;
}
input[type="range"]::-moz-range-thumb
{
    -webkit-appearance: none;
    height: 1.1rem;
    width: 1.1rem;
    background-color: black;
    cursor:pointer;
    border-radius: 50%;
    margin-top:-6px;
    pointer-events: auto;
}

input[type="range"]::-ms-thumb
{
    -webkit-appearance: none;
    height: 1.1rem;
    width: 1.1rem;
    background-color: black;
    cursor:pointer;
    border-radius: 50%;
    margin-top:-6px;
    pointer-events: auto;
}

input[type="range"]:active::-webkit-slider-thumb
{
    background-color: #ffffff;
    border:3px solid black
}

</style>
  