<template>
    <div class="flex space-x-2">
        <img
            v-for="index in 5"
            :id="index"
            :key="index"
            :src="getStarImage(index)"
            class="w-10 cursor-pointer"
            :class="{ ' hover:translate-y-[-0.15rem] duration-75': clickable }"
            @mouseover="hoverScore"
        />
    </div>
</template>

<script>
import { star, starfilled, starhalffilled } from "@/assets/product_card";

export default {
    props: {
        reviewStar: {
            type: Number,
            default: 0,
        },
        clickable: {
            type: Boolean,
            default: false,
        },
        isReviewed: false,
    },
    emits: ["setRating"],
    mounted() {
        if (this.reviewStar > 0) {
            this.rating = this.reviewStar;
        }
    },
    data() {
        return { rating: 5 };
    },
    computed: {
        getStarImage() {
            return (index) => {
                const fullStars = Math.floor(this.rating);
                const halfStar = this.rating % 1 >= 0.5;
                if (index <= fullStars) {
                    return starfilled;
                } else if (halfStar && index === fullStars + 1) {
                    return starhalffilled;
                } else {
                    return star;
                }
            };
        },
    },
    methods: {
        hoverScore(event) {
            if (this.isReviewed === false) {
                const id = parseInt(event.target.id);
                this.rating = id;
                this.$emit("setRating", id);
            }
        },
    },
};
</script>

