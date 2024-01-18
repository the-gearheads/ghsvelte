<script lang="ts">
  import { pwaInfo } from 'virtual:pwa-info'
  import { initializeStores } from '@skeletonlabs/skeleton';

  initializeStores();
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

<main>
  <slot />
</main>