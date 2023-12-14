<script lang="ts">
    export let options: Checkbox[];
    export let question: string;
    interface Checkbox {
        name: string;
        value: string;
        label: string;
    }

    export let selected: string[] = [];
</script>

<label class="label">
    <span>{question}</span>
    <div class="space-y-2">
        {#each options as option, i}
    	    <label class="flex items-center space-x-2">
    	    	<input class="checkbox" type="checkbox" bind:group={selected} name="test" value={option.value} />
    	    	<p>{option.label}</p>
    	    </label>
        {/each}
    </div>
</label>