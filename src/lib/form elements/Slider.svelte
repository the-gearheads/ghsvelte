<script lang="ts">
	import { RangeSlider } from "@skeletonlabs/skeleton"
    
    export let step: number;
    export let value = 0;
</script>

<RangeSlider name="range-slider" bind:value {step} _style="background:rgb(245,245,245); border-radius: 10%; padding: 0.5em"/>