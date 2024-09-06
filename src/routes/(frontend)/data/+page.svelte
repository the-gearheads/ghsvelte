<script lang="ts">
  import { formDataStore, type Answer } from "$lib/data/collectedData";
	import QrCodeModalOpener from "$lib/qr/QRCodeModalOpener.svelte";
	import { encodeAndSegment } from "$lib/qr/msgpacking";
	import idToQuestion, { type Question } from "$lib/data/questions";

	import 'fontawesome-free/css/fontawesome.css';
	import 'fontawesome-free/css/solid.css';
	import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let data: Uint8Array[] | undefined = undefined;
  $: data = encodeAndSegment($formDataStore.md);

	function stringAnswer(answer: Answer, question: Question) {
		if (question.type == "radio" && typeof answer === "string") {
			return question.options.find((option) => option.id === answer)?.text;
		}

		if (question.type == "checkbox" && Array.isArray(answer)) {
			return answer
				.map((answer) => {
					return question.options.find((option) => option.id === answer)?.text;
				})
				.join(", ");
		}

		if (typeof answer === "string" || typeof answer === "number") {
			return answer;
		} else {
			return "ERROR";
		}
	}

	function removeEntry(e: Event) {
		var elem = e.target as HTMLElement;
		modalStore.trigger({
			type: "confirm",
			title: "Are you sure?",
			body: "Are you sure you want to delete this entry?",
			response: (r: boolean) => {
				if (r) {
					// kinda a little sketch, might wanna do some sanity checks
					const id = String(elem.dataset.matchid);
					const match = $formDataStore.md[id];
					delete $formDataStore.md[id];
					$formDataStore = $formDataStore;
					toastStore.trigger({
						background: 'variant-filled-primary',
						message: "Entry for match " + match.m + " deleted."
					});
				}
			}
		});
	}


</script>

HERES ALL THE DATA YOU GOT

<!-- <p>{JSON.stringify($formDataStore)}</p> -->

<div class="flex flex-col space-y-3">
	{#each Object.keys($formDataStore.md) as matchId, i}
	{@const match = $formDataStore.md[matchId]}
		<div class="card p-4 variant-filled-surface space-y-2">
			<div class="flex w-full justify-items-stretch">
				<span class="text-xl w-full">Team {match.t}</span>
				<div class="w-full space-x-2 text-right">
					<span class="font-bold text-s ">{#if !match.s}Not submitted to server!{/if}</span>
					<span class="font-bold text-xs ">#{match.m}</span>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<!-- svelte-ignore a11y-missing-content -->
					<a href="#" data-matchid={matchId} class="fa-trash-alt text-xs fa" on:click|preventDefault={removeEntry}></a>
				</div>
			</div>
			<hr>
			{#each Object.keys(match.a) as questionId}
				{@const q = idToQuestion(questionId)}
				<p class=""><b>{q.question} - </b> <i>{stringAnswer(match.a[questionId], q)}</i></p>
			{/each}
		</div>
	{/each}
</div>

<div class="mt-5 float float-right px-2">
		<QrCodeModalOpener {data} />
</div>
