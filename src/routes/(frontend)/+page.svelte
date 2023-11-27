<script lang="ts">
	import Checkbox from "$lib/form elements/Checkbox.svelte";
	import InputShort from "$lib/form elements/InputShort.svelte";
    import Radio from "$lib/form elements/Radio.svelte";

    // input short
    let value: string;
    // radio
    let radioOptions = [
        {
            value: "Option1",
            label: "The lettuce"
        },
        {
            value: "Option2",
            label: "The Cheese"
        },
        {
            value: "Option3",
            label: "A"
        },
        {
            value: "Option4",
            label: "Tomate"
        },
    ];
    let radioQuestion = "what are you";
    let radioSelected: string;
    // checkbox
    let selected: Record<string, boolean> = {};
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
<Radio bind:selected={radioSelected} question={radioQuestion} options={radioOptions}></Radio>

<br><br>
<h4>Here's what you selected:</h4>
<b>You radio selected: </b><p>{radioSelected}</p>
<b>You entered in the short input: </b><p>{value}</p>
{#each Object.keys(selected) as key}
    <p><b>{key}:</b> {selected[key]}</p>
{/each}
