<script lang="ts">
  import "../../app.pcss";
  import { Tabs, Badge } from 'stwui';

  interface Tab {
      href: string;
      title: string;
      data: string;
  }

  const tabs: Tab[] = [
  {
    href: '/',
    title: 'Main',
    data: ''
  },
  {
    href: '/data',
    title: 'Data',
    data: ''
  },
  {
    href: '/qr',
    title: 'QR Codes',
    data: ''
  },
];

  let currentTab = "/"
</script>

<Tabs {currentTab} style="display: flex">
  {#each tabs as tab, i}
  <Tabs.Tab style="flex-grow: 1; justify-content: center" key={tab.href} href={tab.href} on:click={() => (currentTab = tab.href)}>
    {tab.title}
  </Tabs.Tab>
  {/each}
</Tabs>
<!-- <Badge style='float: right; margin: 0.3em' type='success'>Connection</Badge> -->

<!-- Slot is where actual page is rendered  -->
<slot />