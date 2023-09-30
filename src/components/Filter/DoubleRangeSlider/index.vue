<template>
    <div class="relative w-[100%] h-[100px] text-[1.4rem]">
        <div class="slider-track"></div>
        <div class="relative mt-[15px]">
            <input type="range" :min="minRange" :max="maxRange" v-model="value1" id="slider-1" class="range" :step="step" v-on:change="handleOnchange1" />
            <span class="bubble1">test</span>
        </div>

        <div class="relative mt-[15px]">
            <input type="range" :min="minRange" :max="maxRange" v-model="value2" id="slider-2" class="range" :step="step" v-on:change="handleOnchange2" />
            <span class="bubble2">test</span>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    maxRange: {
      type: Number ,
      default: 100,
    },
    minRange:
    {
      type: Number,
      default: 0
    },
    unit:
    {
      type: String,
      default: ''
    },
    startValue:
    {
      type:Number,
      default: null
    },
    endValue:
    {
      type:Number,
      default: null, 
    },
    step:
    {
      type:Number,
      default: 1, 
    }
  },
  default:
  {
    startValue() 
    {
      return this.maxRange;
    },
    endValue()
    {
      return this.minRange
    }
  },
  methods: {
    updateSlider(value, bubbleClass, sliderId) {
      const val = this[value];
      const slider = this.$el.querySelector(`#${sliderId}`);
      const min = slider.min || 0;
      const max = slider.max || 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      const bubble = this.$el.querySelector(`.${bubbleClass}`);
      bubble.innerHTML = `${val} ${this.unit}`;
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    },
    updateSliderValues() {
      this.updateSlider('value1', 'bubble1', 'slider-1');
      this.updateSlider('value2', 'bubble2', 'slider-2');
    },
    updateSliderTrack() {
      const percent1 = (this.$el.querySelector('#slider-1').value / this.$el.querySelector('#slider-1').max) * 100;
      const percent2 = (this.$el.querySelector('#slider-2').value / this.$el.querySelector('#slider-1').max) * 100;
      const sliderTrack = this.$el.querySelector('.slider-track');
      const gradientValue = `linear-gradient(to right, #dadae5 ${percent1}%, #000000 ${percent1}%, #000000 ${percent2}%, #dadae5 ${percent2}%)`;
      sliderTrack.setAttribute('style', `background: ${gradientValue}`);
    },

    handleOnchange1(value) {
      this.$emit("onChange1", value);
    },
    handleOnchange2(value) {
      this.$emit("onChange2", value);
    },
  },
  mounted() {
    this.updateSliderValues();
    this.updateSliderTrack();
  },
  watch: {
    value1() {
      if (parseInt(this.$el.querySelector('#slider-2').value) - parseInt(this.$el.querySelector('#slider-1').value) <= 0) {
        this.value1 = this.$el.querySelector('#slider-2').value;
      }
      if (parseInt(this.$el.querySelector('#slider-1').value) === this.maxRange) {
        this.$el.querySelector('#slider-2').disabled = true;
      } else {
        this.$el.querySelector('#slider-2').disabled = false;
      }
      this.updateSliderValues();
      this.updateSliderTrack();
    },
    value2() {
      if (parseInt(this.$el.querySelector('#slider-2').value) - parseInt(this.$el.querySelector('#slider-1').value) <= 0) {
        this.value2 = this.$el.querySelector('#slider-1').value;
      }
      this.updateSliderValues();
      this.updateSliderTrack();
    },
  },
  data() {
    return {
      value1: this.startValue === null ? this.minRange : this.startValue,
      value2: this.endValue === null ? this.maxRange : this.endValue,
    };
  },
};
</script>

<style scoped>
.range-wrap {
  position: relative;
  margin-top: 15px;
}

.range {
  width: 100%;
}

.slider-track {
  width: 100%;
  height: 5px;
  background-color: #d5d5d5;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 5px;
}

.bubble1 {
  color: black;
  padding: 4px 12px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  white-space: nowrap; 
}

.bubble2 {
  color: black;
  padding: 4px 12px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  white-space: nowrap; 
}

input[type="range"] {
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

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 5px;
}

input[type="range"]::-moz-range-track {
  -moz-appearance: none;
  height: 5px;
}

input[type="range"] ::-ms-track {
  appearance: none;
  height: 5px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.1rem;
  width: 1.1rem;
  background-color: black;
  cursor: pointer;
  border-radius: 10px;
  margin-top: -6px;
  pointer-events: auto;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.1rem;
  width: 1.1rem;
  background-color: black;
  cursor: pointer;
  border-radius: 50%;
  margin-top: -6px;
  pointer-events: auto;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 1.1rem;
  width: 1.1rem;
  background-color: black;
  cursor: pointer;
  border-radius: 50%;
  margin-top: -6px;
  pointer-events: auto;
}

input[type="range"]:active::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 3px solid black;
}

input[type="range"][disabled]::-webkit-slider-thumb {
  pointer-events: none;
}

input[type="range"][disabled]::-ms-thumb {
  pointer-events: none;
}

input[type="range"][disabled]::-moz-range-thumb {
  pointer-events: none;
}



</style>