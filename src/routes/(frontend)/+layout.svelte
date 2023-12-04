<script lang="ts">
  import "../../app.pcss";
  import { page } from "$app/stores"
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  
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

<Navbar class="shadow mb-2">
  <NavHamburger />
  <NavBrand href="/">
    <img src="/gearhead.png" alt="logo" class="me-3 h-6 sm:h-9" />
    <span class="text-lg font-bold">Gearhead</span>
  </NavBrand>
  <NavUl {activeUrl}>
    {#each tabs as tab, i}
      <NavLi href={tab.href}>{tab.title}</NavLi>
    {/each}
  </NavUl>
</Navbar>

<!-- Slot is where actual page is rendered  -->
<slot />