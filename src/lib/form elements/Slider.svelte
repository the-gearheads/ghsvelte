<script lang="ts">
	import { Range } from "flowbite-svelte"
    
    export let step: number;
    export let value = -1
</script>

<Range bind:value {step} _style="background:rgb(245,245,245); border-radius: 10%; padding: 0.5em"/>