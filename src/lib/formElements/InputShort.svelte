<script lang="ts">
    interface Props {
        label?: string;
        value?: string;
        placeholder?: string;
        required?: boolean;
    }

    let {
        label = "",
        value = $bindable(""),
        placeholder = "",
        required = false
    }: Props = $props();
</script>

<label class="label space-y-2">
    <span class="pl-1 overflow-hidden text-nowrap whitespace-nowrap">{label}</span>
    <input class="input" title={label} type="text" {required} {placeholder} bind:value />
</label>