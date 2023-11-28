<script lang="ts">
	import { TextArea } from 'stwui';

    export let placeholder = "";
    export let label: string;
    export let name: string;
    export let value = "";
</script>

<TextArea {name} {placeholder} bind:value style="padding: 0.5em">
	<TextArea.Label slot="label">{label}</TextArea.Label>
</TextArea> 