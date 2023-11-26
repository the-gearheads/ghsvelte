<script lang="ts">
    import { CheckboxGroup } from 'stwui';
	import type { S } from 'vitest/dist/reporters-5f784f42.js';

    export let options: Checkbox[];
    export let question: string;
    interface Checkbox {
        name: string;
        value: string;
        label: string;
    }

</script>

<div class="questions" style="padding: 0.5em;">
<CheckboxGroup>
    <CheckboxGroup.Label slot="label">{question}</CheckboxGroup.Label>
    {#each options as checkbox, i}
        <CheckboxGroup.Checkbox name={checkbox.name} value={checkbox.value}>
            <CheckboxGroup.Checkbox.Label slot="label">{checkbox.label}</CheckboxGroup.Checkbox.Label>
        </CheckboxGroup.Checkbox>
    {/each}
</CheckboxGroup>
</div>