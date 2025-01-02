<script lang="ts">
  import { run } from 'svelte/legacy';

	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
  import QRCode from 'qrcode'
	import type { SvelteComponent } from 'svelte';
	import { QR_CODE_ERROR_CORRECTION, QR_CODE_VERSION } from './msgconsts';

  const modalStore = getModalStore();


  
  interface Props {
    data: Uint8Array[] | undefined;
    /* little hack to get rid of a warning because skeleton passes a prop we dont care abt */
    parent?: SvelteComponent | undefined;
  }

  let { data, parent = $bindable(undefined) }: Props = $props();
  parent = parent;

  let canvas: HTMLCanvasElement | undefined = $state();
  let currentCode = $state(0);
  let maxCodes = $state(0);
  run(() => {
    maxCodes = data?.length ? data.length : 0;
  });

  run(() => {
    if(canvas) {
        if (data && data.length != 0) {
          QRCode.toCanvas(canvas, [{data: data[currentCode], mode: 'byte'}], {errorCorrectionLevel: QR_CODE_ERROR_CORRECTION, version: QR_CODE_VERSION}, function (error) {
            if (error) console.error(error)
          })
        } else {
          let ctx = canvas.getContext('2d');
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          if(ctx) ctx.fillStyle = 'black';
          ctx?.fillText('No data', 0, 0);
        }
      }
  });
  
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

  <footer class="modal-footer flex justify-end items-center space-x-1">
    {#if maxCodes > 1}
      <span class="text-m">Make sure to scan all the QR codes!</span>
      <span class="text-lg whitespace-nowrap px-3">{currentCode + 1} / {maxCodes}</span>
      <button class="btn variant-filled-primary variant-ghost-surface" onclick={()=>{
          currentCode = (currentCode - 1 + maxCodes) % maxCodes;
      }}>
        Prev
      </button>
      <button class="btn variant-filled-primary variant-filled" onclick={()=>{
        currentCode = (currentCode + 1) % maxCodes;
      }}>
        Next
      </button>
    
    {:else}
      <button class="btn variant-filled-primary variant-filled" onclick={()=>{
        modalStore.close();
      }}>
        Close
      </button>
    {/if}
    </footer>
</div>