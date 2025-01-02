<script lang="ts">
    interface Props {
        placeholder?: string;
        value?: string;
        label?: string;
        required?: boolean;
    }

    let {
        placeholder = "",
        value = $bindable(""),
        label = "",
        required = false
    }: Props = $props();
</script>


<label class="label">
    <span>{label}</span>
    <textarea class="textarea" rows="4" bind:value {required} {placeholder}></textarea>
</label>