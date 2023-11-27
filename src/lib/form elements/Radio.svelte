<script lang="ts">
    import { RadioGroup } from 'stwui';

    export let selected: string = "";
    export let question: string;
    interface radio {
        value: string;
        label: string;
    }
    export let options: radio[];
    
</script>

<div class="questions" style="padding: 0.5em;">
<RadioGroup bind:selected>
    <RadioGroup.Label slot="label">{question}</RadioGroup.Label>
    {#each options as radio, i}
        <RadioGroup.Radio value={radio.value}>
            <RadioGroup.Radio.Label slot="label">{radio.label}</RadioGroup.Radio.Label>
        </RadioGroup.Radio>
    {/each}
</RadioGroup>
</div>