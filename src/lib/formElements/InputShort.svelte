<script lang="ts">
    export let label = "";
    export let value = "";
    export let placeholder = "";
</script>

<label class="label">
    <span>{label}</span>
    <input class="input" title={label} type="text" {placeholder} bind:value />
</label>