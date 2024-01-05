<script lang="ts">
    // must be unique, maybe we could randomize this
    export let groupName: string = "";
    export let selected: string;
    export let question: string;
    interface radio {
        id: string;
        text: string;
    }
    export let options: radio[];
    
</script>

<label class="label">
    <span>{question}</span>
    <div class="space-y-2">
        {#each options as radio, i}
    	    <label class="flex items-center space-x-2">
    	    	<input class="radio" type="radio" bind:group={selected} name={groupName} value={radio.id} />
    	    	<p>{radio.text}</p>
    	    </label>
        {/each}
    </div>
</label>