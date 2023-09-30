<template>
    <div class="container">
        <div class="slider-tracker"></div>
        <input type="range" min="0" max="100" value="30" id="slider-1"/>
        <input type="range" min="0" max="100" value="70" id="slider-2"/>
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
    },
    setup() {},
    data() {
      return {
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
  