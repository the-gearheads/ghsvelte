<script lang="ts">
	import { Input } from 'stwui';

    export let label = "";
    export let value = "";

</script>

<Input bind:value={value} name="input">
	<Input.Label slot="label">{label}</Input.Label>
</Input>