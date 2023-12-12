<script lang="ts">
  import "../../app.pcss";
  import { page } from "$app/stores"
  import { AppBar } from "@skeletonlabs/skeleton"
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
	<svelte:fragment slot="lead"><span>GEARHAEDS</span></svelte:fragment>
	Top 10 Scouting Apps
	<svelte:fragment slot="trail">
    {#each tabs as tab,i}
      <a href={tab.href} class:active={activeUrl === tab.href}>{tab.title}</a>
    {/each}
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<!-- Slot is where actual page is rendered  -->
<slot />