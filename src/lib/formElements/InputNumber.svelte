<script lang="ts">
    interface Props {
        label?: string;
        value?: number|undefined;
        placeholder?: string;
        min?: number|undefined;
        max?: number|undefined;
        step?: number|undefined;
        required?: boolean;
    }

    let {
        label = "",
        value = $bindable(undefined),
        placeholder = "",
        min = undefined,
        max = undefined,
        step = undefined,
        required = false
    }: Props = $props();
</script>

<label class="label space-y-2">
    <span class="pl-1 overflow-hidden">{label}</span>
    <input class="input" title={label} type="number" {min} {max} {step} {required} {placeholder} bind:value />
</label>