<script lang="ts">
  import { pwaInfo } from 'virtual:pwa-info'
  import { initializeStores } from '@skeletonlabs/skeleton';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  initializeStores();
  let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

<main>
  {@render children?.()}
</main>