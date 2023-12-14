<script lang="ts">
    import InputLong from "$lib/formElements/InputLong.svelte";
	import Slider from "$lib/formElements/Slider.svelte";
    import InputShort from "$lib/formElements/InputShort.svelte";
    import Radio from "$lib/formElements/Radio.svelte";
    import Checkbox from "$lib/formElements/Checkbox.svelte";


    // slider
    let sliderValue: number;
    let step = 50;
    // input short
    let value: string;
    // input long
    let longInput: string;
    let longLabel = "HHHHHHHHHHHHAAAAAAAAAAAAA";
    let name = "What is this?";
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
    let selected: string[] = [];
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

<Checkbox {question} {options} bind:selected />
<Slider step={5} bind:value={sliderValue} />
<InputLong label={longLabel} bind:value={longInput} placeholder="this is a placeholder" />
<InputShort label="What is the capital of ecuador?" bind:value placeholder="i bet you don't know" />
<Radio bind:selected={radioSelected} question={radioQuestion} options={radioOptions} />


<br><br>
<h4>Here's what you selected:</h4>
<b>You slidered: </b><p>{sliderValue}</p>
<b>You radio selected: </b><p>{radioSelected}</p>
<b>You entered in the short input: </b><p>{value}</p>
<b>You entered in the long input: </b><p>{longInput}</p>
{#each selected as obj, i}
    <p><b>{i}:</b> {obj}</p>
{/each}
