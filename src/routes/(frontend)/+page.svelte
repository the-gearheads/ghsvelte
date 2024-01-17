<script lang="ts">
	import InputLong from '$lib/formElements/InputLong.svelte';
	import Slider from '$lib/formElements/Slider.svelte';
	import InputShort from '$lib/formElements/InputShort.svelte';
	import Radio from '$lib/formElements/Radio.svelte';
	import Checkbox from '$lib/formElements/Checkbox.svelte';
	import localStore from '$lib/localStore';
	import type { Writable } from 'svelte/store';
	import type { QuestionList } from '$lib/questions';
	import type { PageData } from './$types';

	export let data: PageData;

	let answers: Record<string, any> = {};

	let questions: Writable<QuestionList> = localStore('questions', []);
	if(data.questions.length != 0) {
		$questions = data.questions;
	}

	$questions.forEach((question) => {
		if ('default' in question) {
			answers[question.id] = question.default;
		}
	});
</script>

{#each $questions as question, i}
	{#if question.type == 'slider'}
		<Slider step={question.step} bind:value={answers[question.id]} />
	{/if}
  {#if question.type == 'shorttext'}
    <InputShort label={question.question} bind:value={answers[question.id]} />
  {/if}
  {#if question.type == 'longtext'}
    <InputLong label={question.question} bind:value={answers[question.id]} />
  {/if}
  {#if question.type == 'radio'}
    <Radio bind:selected={answers[question.id]} question={question.question} options={question.options} />
  {/if}
  {#if question.type == 'checkbox'}
    <Checkbox question={question.question} bind:selected={answers[question.id]} options={question.options} />
  {/if}
  <br>
{/each}


<!-- todo: display/save/submit answers -->

<p>{JSON.stringify(answers)}</p>