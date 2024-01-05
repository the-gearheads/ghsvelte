<script lang="ts">
    export let options: Checkbox[];
    export let question: string;
    interface Checkbox {
        id: string;
        text: string;
    }

    export let selected: string[] = [];
</script>

<label class="label">
    <span>{question}</span>
    <div class="space-y-2">
        {#each options as option, i}
    	    <label class="flex items-center space-x-2">
    	    	<input class="checkbox" type="checkbox" bind:group={selected} value={option.id} />
    	    	<p>{option.text}</p>
    	    </label>
        {/each}
    </div>
</label>