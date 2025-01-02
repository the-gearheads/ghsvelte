<script lang="ts">
  import { run } from 'svelte/legacy';

  import "../../app.pcss";
  import { page } from "$app/stores"
  import { AppBar, Modal, Toast } from "@skeletonlabs/skeleton"
  import { LightSwitch } from '@skeletonlabs/skeleton';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  
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
    href: '/debug',
    title: 'Debug',
  }
];

  let activeUrl = $derived($page.url.pathname)
  run(() => {
    console.log("active url updated " + activeUrl)
  });
  
</script>

<style>
  .active {
    color: orangered;
  }
</style>

<AppBar class="mb-3 shadow">
	{#snippet lead()}
    <img class="object-contain h-10" alt="logo" src="/gearhead.png">
  {/snippet}
	{#snippet trail()}
  
      {#each tabs as tab,i}
        <!-- yeah its a little cursed -->
        <a href={tab.href} class:active={(activeUrl === '/' ? activeUrl : activeUrl.replace(/\/$/, '')) === tab.href}>{tab.title}</a>
      {/each}
      <LightSwitch />
    
  {/snippet}
</AppBar>

<Modal />
<Toast position="tr" />

<!-- Slot is where actual page is rendered  -->
<div class="container m-auto px-2 pb-2">
  {@render children?.()}
</div>

<!-- Really just triggers the toast above -->
{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt}}
  <ReloadPrompt />
{/await}

<!-- {#await import ('$lib/AutoSubmit.svelte') then { default: AutoSubmit }}
  <AutoSubmit />
{/await} -->