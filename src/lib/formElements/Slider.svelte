<script lang="ts">
	import { RangeSlider } from "@skeletonlabs/skeleton"
    
    interface Props {
        step?: number|undefined;
        name?: string;
        value?: number;
        min?: number|undefined;
        max?: number|undefined;
    }

    let {
        step = undefined,
        name = "",
        value = $bindable(0),
        min = undefined,
        max = undefined
    }: Props = $props();
</script>

<label class="label" for="range-slider">
    <span>{name}</span>
    <RangeSlider name="range-slider" bind:value {step} {min} {max} />
    <span>{value}</span>
</label>
