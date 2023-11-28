<script lang="ts">
	import { Slider } from 'stwui';
    
    export let step: number;
    export let value = -1
</script>

<Slider bind:value {step} style="background:rgb(245,245,245); border-radius: 10%; padding: 0.5em"/>