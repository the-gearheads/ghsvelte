<script lang="ts">
  import "../../app.pcss";
  import { page } from "$app/stores"
  import { AppBar, Toast } from "@skeletonlabs/skeleton"
  import { LightSwitch } from '@skeletonlabs/skeleton';
  
  interface Tab {
      href: string;
      title: string;
  }

  const tabs: Tab[] = [
  {
    href: '/',
    title: 'Main',
  },
  {
    href: '/data',
    title: 'Data',
  },
  {
    href: '/qr',
    title: 'QR Codes',
  },
];

  $: activeUrl = $page.url.pathname
  $: console.log("active url updated " + activeUrl)
  
</script>

<style>
  .active {
    color: orangered;
  }
</style>

<AppBar class="mb-3 shadow">
	<svelte:fragment slot="lead"><img class="object-contain h-10" alt="logo" src="/gearhead.png"></svelte:fragment>
	<svelte:fragment slot="trail">
    {#each tabs as tab,i}
      <!-- yeah its a little cursed -->
      <a href={tab.href} class:active={(activeUrl === '/' ? activeUrl : activeUrl.replace(/\/$/, '')) === tab.href}>{tab.title}</a>
    {/each}
    <LightSwitch />
  </svelte:fragment>
</AppBar>

<Toast position="tr" />

<!-- Slot is where actual page is rendered  -->
<div class="container mx-auto">
  <slot />
</div>

<!-- Really just triggers the toast above -->
{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt}}
  <ReloadPrompt />
{/await}