<script lang="ts">
    export let label = "";
    export let value = "";
    export let placeholder = "";
    export let required = false;
</script>

<label class="label space-y-2">
    <span class="pl-1 overflow-hidden text-nowrap whitespace-nowrap">{label}</span>
    <input class="input" title={label} type="text" {required} {placeholder} bind:value />
</label>