<script>
	import Checkbox from "../form elements/Checkbox.svelte";

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
            label: 'hoot hoot',
        }
    ]
    let question = "Would you rather have unlimited bacon, but no more games. Or games, unlimited games, but no games"
</script>
<Checkbox {question} {options}></Checkbox>