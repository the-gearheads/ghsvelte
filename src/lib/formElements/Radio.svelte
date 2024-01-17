<script lang="ts">
    // must be unique, maybe we could randomize this
    export let groupName: string = "";
    export let selected: string;
    export let question: string;
    export let horizontal = false;
    interface radio {
        id: string;
        text: string;
    }
    export let options: radio[];
    
</script>

<!-- idk i just messed around with flex until i got this -->
<div class={horizontal ? "label scale-text-50 items-center space-x-2" : "label"}>
    <span class={horizontal ? "text-xs" : "mb-1.5"}>{question}</span>
    <div class={horizontal ? "space-x-2 flex flex-row": "space-y-2"}>
        {#each options as radio, i}
    	    <label class="flex items-center space-x-2">
    	    	<input class="radio" type="radio" bind:group={selected} name={groupName} value={radio.id} />
    	    	<p>{radio.text}</p>
    	    </label>
        {/each}
    </div>
</div>