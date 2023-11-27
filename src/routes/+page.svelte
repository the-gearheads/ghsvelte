<script lang="ts">
	import Checkbox from "../form elements/Checkbox.svelte";
	import InputShort from "../form elements/InputShort.svelte";

    let selected: Record<string, boolean> = {};
    let value: string;
    let options = [
        {
            name: 'unlimited games, but no games',
            value: 'unlimited games, but no games',
            label: 'unlimited games, but no games'
        },
        {
            name: 'unlimited bacon but no more video games',
            value: 'unlimited bacon but no more video games',
            label: 'unlimited bacon but no more video games',
        },
        {
            name: 'could you repeat the question?',
            value: 'could you repeat the question?',
            label: 'could you repeat the question?',
        },
        {
            name: 'hoot hoot',
            value: 'hoot hoot',
            label: 'hoot hosefesfot',
        }
    ]
    let question = "Would you rather have unlimited bacon, but no more games. Or games, unlimited games, but no games"
</script>
<Checkbox {question} {options} bind:selected></Checkbox>
<InputShort label="What is the capital of ecuador?" bind:value></InputShort>

<b>You entered: {value}</b>
<br><br><h4>Here's what you selected:</h4>
{#each Object.keys(selected) as key}
    <p><b>{key}:</b> {selected[key]}</p>
{/each}
