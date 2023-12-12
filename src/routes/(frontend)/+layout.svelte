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

<!--
<Tabs {currentTab} style="display: flex">
  {#each tabs as tab, i}
  <Tabs.Tab style="flex-grow: 1; justify-content: center" key={tab.href} href={tab.href} on:click={() => (currentTab = tab.href)}>
    {tab.title}
  </Tabs.Tab>
  {/each}
</Tabs>
-->
<!-- <Badge style='float: right; margin: 0.3em' type='success'>Connection</Badge> -->

<AppBar class="mb-3">
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