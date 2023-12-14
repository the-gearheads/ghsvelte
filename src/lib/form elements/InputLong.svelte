<script lang="ts">
    export let placeholder = "";
    export let value = "";
    export let label = "";
</script>


<label class="label">
    <span>{label}</span>
    <textarea class="textarea" rows="4" bind:value {placeholder}/>
</label>