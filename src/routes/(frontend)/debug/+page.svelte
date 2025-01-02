<script lang="ts">
  import { browser } from '$app/environment';
	import QrCodeScannerModalOpener from '$lib/qr/QRCodeScannerModalOpener.svelte';
  function clearLocalStorage() {
    localStorage.clear();
    localStorageEntries = [];
  }

  let localStorageEntries = $state(browser ? Object.entries(localStorage): []);

  function reloadLSView() {
    localStorageEntries = Object.entries(localStorage);
  }
</script>

<h1 class="text-2xl mb-4">Debug/testing menu</h1>

<button class="btn variant-filled-primary" onclick={clearLocalStorage}>Clear localstorage</button>
<button class="btn variant-filled-primary" onclick={reloadLSView}>Reload list</button>
<p>Localstorage contents:</p>

{#each localStorageEntries as [key, value]}
  <p><b>{key}:</b> {value}</p>
{/each}


<QrCodeScannerModalOpener />