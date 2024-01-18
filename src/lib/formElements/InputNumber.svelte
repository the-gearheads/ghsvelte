<script lang="ts">
    export let label = "";
    export let value: number|undefined = undefined;
    export let placeholder = "";
    export let min: number|undefined = undefined;
    export let max: number|undefined = undefined;
    export let step: number|undefined = undefined;
    export let required = false;
</script>

<label class="label space-y-2">
    <span class="pl-1 overflow-hidden">{label}</span>
    <input class="input" title={label} type="number" {min} {max} {step} {required} {placeholder} bind:value />
</label>