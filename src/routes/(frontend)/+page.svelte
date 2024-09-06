<script lang="ts">
	import InputLong from '$lib/formElements/InputLong.svelte';
	import Slider from '$lib/formElements/Slider.svelte';
	import InputShort from '$lib/formElements/InputShort.svelte';
	import Radio from '$lib/formElements/Radio.svelte';
	import Checkbox from '$lib/formElements/Checkbox.svelte';
	import localStore from '$lib/localStore';
	import type { Writable } from 'svelte/store';
	import { questions, type QuestionList } from '$lib/data/questions';
	import type Data from '$lib/data/collectedData';
	import InputNumber from '$lib/formElements/InputNumber.svelte';
	import { type MatchData, formDataStore } from '$lib/data/collectedData';
	import { generateID } from '$lib/generateID';

	type AnswerType = {
		id: string,
		// Question ID -> Answer (of some type)
		answers: Record<string, any>
	}; 
	let curAnswers: Writable<AnswerType> = localStore('answers', {id: generateID(), answers: {}});
	
	/* Initializes all questions to their default / clears the form */
	function setDefaults(questions: QuestionList) {
		questions.forEach((question) => {
			if ('default' in question && !(question.id in $curAnswers)) {
				$curAnswers.answers[question.id] = question.default;
			}
			if (question.required === undefined) question.required = true;
		});
	}

	$: setDefaults(questions);

	/* need it to be saved before submit but must be stored separately */
	type HeaderInfo = {color: "red"|"blue", position: string, matchNum: number, teamNum?: number};
	let headerInfo: Writable<HeaderInfo> = localStore('headerInfo', {color: "red", matchNum: 0, position: "1"});

	function formSubmitted() {
		// clear and reset the form
		var matchData: MatchData = {
			m: $headerInfo.matchNum,
			t: $headerInfo.teamNum as number,
			c: $headerInfo.color,
			p: Number($headerInfo.position),
			a: $curAnswers.answers,
			s: false
		}

		$formDataStore.md[$curAnswers.id] = matchData; // Save under the id. Overwrite if it exists (we're editing).
		$curAnswers.answers = {};
		$curAnswers.id = generateID(); // Prepare a new ID for usage.
		$headerInfo.matchNum++;
		setDefaults(questions);
	}

</script>

<form on:submit|preventDefault={formSubmitted}>
	<div class="flex items-center">
		<div class="w-full p-1">
			<InputShort label="Event Name" bind:value={$formDataStore.eventCode} required />
		</div>
		<div class="w-full p-1">
			<InputShort label="Username (anything's fine)" bind:value={$formDataStore.username} required />
		</div>
	</div>


	<div class="flex items-center justify-center space-x-8 mb-1">
		<div class="scale-75 p-1">
			<Radio question="Color" options= {
				[
					{id: "red", text: "Red"},
					{id: "blue", text: "Blue"},
				]
			} bind:selected={$headerInfo.color} required />
		</div>
		<div class="p-1">
			<Radio question="Position" options={[
				{id: "1", text: "1"},
				{id: "2", text: "2"},
				{id: "3", text: "3"},
			]} bind:selected={$headerInfo.position} horizontal required />
		</div>
	</div>

	<div class="flex items-center">
		<div class="p-1 w-full">
			<InputNumber label="Match Number" bind:value={$headerInfo.matchNum} min={0} max={500} step={1} required />
		</div>
		<div class="p-1 w-full">
			<InputNumber label="Team Number" bind:value={$headerInfo.teamNum} min={0} max={9999} step={1} required />
		</div>
	</div>

	<hr class="m-6">


	{#each questions as question, i}
		{#if question.type == 'slider'}
			<Slider step={question.step} name={question.question} min={question.min} max={question.max} bind:value={$curAnswers.answers[question.id]} />
		{/if}
		{#if question.type == 'shorttext'}
			<InputShort label={question.question} bind:value={$curAnswers.answers[question.id]} required={question.required} />
		{/if}
		{#if question.type == 'longtext'}
			<InputLong label={question.question} bind:value={$curAnswers.answers[question.id]} required={question.required} />
		{/if}
		{#if question.type == 'radio'}
			<Radio bind:selected={$curAnswers.answers[question.id]} question={question.question} options={question.options} required={question.required}  />
		{/if}
		{#if question.type == 'checkbox'}
			<Checkbox question={question.question} bind:selected={$curAnswers.answers[question.id]} options={question.options} required={question.required} />
		{/if}
		<br>
	{/each}
	<button type="submit" class="btn variant-filled-primary">Submit</button>
</form>

<!-- todo: display/save/submit answers -->

<p>{JSON.stringify($curAnswers)}</p>