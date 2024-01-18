<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
  import QRCode from 'qrcode'
	import type { SvelteComponent } from 'svelte';

  const modalStore = getModalStore();

  export let data: Uint8Array[] | undefined;

  /* little hack to get rid of a warning because skeleton passes a prop we dont care abt */
  export let parent: SvelteComponent | undefined = undefined;
  parent = parent;

  let canvas: HTMLCanvasElement | undefined;
  let currentCode = 0;
  let maxCodes = 0;
  $: maxCodes = data?.length ? data.length : 0;

  $: if(canvas) {
      if (data && data.length != 0) {
        QRCode.toCanvas(canvas, [{data: data[currentCode], mode: 'byte'}], {errorCorrectionLevel: 'M', version: 12}, function (error) {
          if (error) console.error(error)
        })
      } else {
        let ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        if(ctx) ctx.fillStyle = 'black';
        ctx?.fillText('No data', 0, 0);
      }
    }
  
</script>

<style>
  canvas {
    border: 1px solid black;
    margin: 1em 0 0 0; 
    display: block;
  }
</style>
<div class="card flex flex-col p-4 w-modal-slim shadow-xl space-y-4">
  <div class="flex justify-center">
    <canvas class="" bind:this={canvas} width="724" height="724"></canvas>
  </div>

  <footer class="modal-footer flex justify-end items-center space-x-2'">
    {#if maxCodes > 1}
      <span class="text-m">Make sure to scan all the QR codes!</span>
      <span class="text-lg whitespace-nowrap px-3">{currentCode + 1} / {maxCodes}</span>
      <button class="btn variant-filled-primary variant-ghost-surface" on:click={()=>{
          currentCode = (currentCode - 1 + maxCodes) % maxCodes;
      }}>
        Prev
      </button>
      <button class="btn variant-filled-primary variant-filled" on:click={()=>{
        currentCode = (currentCode + 1) % maxCodes;
      }}>
        Next
      </button>
    
    {:else}
      <button class="btn variant-filled-primary variant-filled" on:click={()=>{
        modalStore.close();
      }}>
        Close
      </button>
    {/if}
    </footer>
</div>