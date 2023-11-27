<script lang="ts">
    import { CheckboxGroup } from 'stwui';

    export let options: Checkbox[];
    export let question: string;
    interface Checkbox {
        name: string;
        value: string;
        label: string;
    }

    export let selected: Record<string, boolean> = {};
</script>

<div class="questions" style="padding: 0.5em;">
<CheckboxGroup>
    <CheckboxGroup.Label slot="label">{question}</CheckboxGroup.Label>
    {#each options as checkbox, i}
        <CheckboxGroup.Checkbox name={checkbox.name} value={checkbox.value} bind:checked={selected[checkbox.name]}>
            <CheckboxGroup.Checkbox.Label slot="label">{checkbox.label}</CheckboxGroup.Checkbox.Label>
        </CheckboxGroup.Checkbox>
    {/each}
</CheckboxGroup>
</div>