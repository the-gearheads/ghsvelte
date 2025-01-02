<script lang="ts">
    interface Checkbox {
        id: string;
        text: string;
    }

    interface Props {
        options: Checkbox[];
        question: string;
        selected?: string[];
        required?: boolean;
    }

    let {
        options,
        question,
        selected = $bindable([]),
        required = false
    }: Props = $props();
</script>

<label class="label">
    <span>{question}</span>
    <div class="space-y-2">
        {#each options as option, i}
    	    <label class="flex items-center space-x-2">
    	    	<input class="checkbox" type="checkbox" bind:group={selected} {required} value={option.id} />
    	    	<p>{option.text}</p>
    	    </label>
        {/each}
    </div>
</label>