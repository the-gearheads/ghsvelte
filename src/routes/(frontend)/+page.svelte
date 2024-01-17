<script lang="ts">
	import InputLong from '$lib/formElements/InputLong.svelte';
	import Slider from '$lib/formElements/Slider.svelte';
	import InputShort from '$lib/formElements/InputShort.svelte';
	import Radio from '$lib/formElements/Radio.svelte';
	import Checkbox from '$lib/formElements/Checkbox.svelte';
	import localStore from '$lib/localStore';
	import type { Writable } from 'svelte/store';
	import { questions, type QuestionList } from '$lib/data/questions';
	import type Data from '$lib/data/data';


	let answers: Writable<Record<string, any>> = localStore('answers', {} as Record<string, any>);
	let savedData: Writable<Data> = localStore('formData', {} as Data);
	
		function setDefaults(questions: QuestionList) {
			questions.forEach((question) => {
				if ('default' in question && !(question.id in $answers)) {
					$answers[question.id] = question.default;
				}
			});
		}

	$: setDefaults(questions);

	/* need it to be saved before submit but must be stored separately */
	let headerInfo: Writable<{color: string, position: string, matchNum: number, teamNum?: number}> = localStore('headerInfo', {color: "red", matchNum: 0, position: "1"});

	function formSubmitted() {
		// clear and reset the form
		answers.set({});
		$headerInfo.matchNum++;
		setDefaults(questions);
	}
</script>

<form on:submit|preventDefault={formSubmitted}>
	<div class="flex items-center">
		<div class="w-full p-1">
			<input class="input" type="text" bind:value={$savedData.event} placeholder="Event Name" />
		</div>
		<div class="w-full p-1">
			<input class="input" type="text" bind:value={$savedData.username} placeholder="Username (anything's fine)" />
		</div>
	</div>


	<div class="flex items-center justify-center space-x-8">
		<div class="scale-75 p-1">
			<Radio question="Color" options= {
				[
					{id: "red", text: "Red"},
					{id: "blue", text: "Blue"},
				]
			} bind:selected={$headerInfo.color}/>
		</div>
		<div class="p-1">
			<Radio question="Position" options={[
				{id: "1", text: "1"},
				{id: "2", text: "2"},
				{id: "3", text: "3"},
			]} bind:selected={$headerInfo.position} horizontal={true}/>
		</div>
	</div>

	<div class="flex items-center">
		<div class="p-1 w-full">
			<input class="input" type="number" min=0 max=100 step=1 bind:value={$headerInfo.matchNum} placeholder="Match Number" />
		</div>
		<div class="p-1 w-full">
			<input class="input" type="number" min=0 max=9999 step=1 bind:value={$headerInfo.teamNum} placeholder="Team Number" />
		</div>
	</div>

	<hr class="m-6">


	{#each questions as question, i}
		{#if question.type == 'slider'}
			<Slider step={question.step} name={question.question} min={question.min} max={question.max} bind:value={$answers[question.id]} />
		{/if}
		{#if question.type == 'shorttext'}
			<InputShort label={question.question} bind:value={$answers[question.id]} />
		{/if}
		{#if question.type == 'longtext'}
			<InputLong label={question.question} bind:value={$answers[question.id]} />
		{/if}
		{#if question.type == 'radio'}
			<Radio bind:selected={$answers[question.id]} question={question.question} options={question.options} />
		{/if}
		{#if question.type == 'checkbox'}
			<Checkbox question={question.question} bind:selected={$answers[question.id]} options={question.options} />
		{/if}
		<br>
	{/each}
	<button type="submit" class="btn variant-filled-primary">Submit</button>
</form>

<!-- todo: display/save/submit answers -->

<p>{JSON.stringify($answers)}</p>