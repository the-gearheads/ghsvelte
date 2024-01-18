<script lang="ts">
    export let placeholder = "";
    export let value = "";
    export let label = "";
    export let required = false;
</script>


<label class="label">
    <span>{label}</span>
    <textarea class="textarea" rows="4" bind:value {required} {placeholder}/>
</label>