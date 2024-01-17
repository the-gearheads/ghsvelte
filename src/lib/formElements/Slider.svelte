<script lang="ts">
	import { RangeSlider } from "@skeletonlabs/skeleton"
    
    export let step: number|undefined = undefined;
    export let name = "";
    export let value = 0;
    export let min: number|undefined = undefined;
    export let max: number|undefined = undefined;
</script>

<label class="label" for="range-slider">
    <span>{name}</span>
    <RangeSlider name="range-slider" bind:value {step} {min} {max} />
    <span>{value}</span>
</label>
