<script lang="ts">
  import QRCode from 'qrcode'
  export let data: Uint8Array[] | undefined;
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

<canvas bind:this={canvas} width="724" height="724"></canvas>
<br>

{#if maxCodes > 1}
  <button on:click={()=>{
    currentCode = (currentCode + 1) % maxCodes;
  }}>
    Next
  </button>
  <button on:click={()=>{
      currentCode = (currentCode - 1 + maxCodes) % maxCodes;
  }}>
    Prev
  </button>

  <span>{currentCode + 1} / {maxCodes}</span>
{/if}
