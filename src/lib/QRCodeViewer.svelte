<script lang="ts">
  import QRCode from 'qrcode'
  export let data: Uint8Array[] | undefined;
  let canvas: HTMLCanvasElement | undefined;
  let currentCode = 0;
  let maxCodes = 0;
  $: maxCodes = data?.length ? data.length : 0;

  $: if(canvas) {
      if (data && data.length != 0) {
        QRCode.toCanvas(canvas, [{data: data[currentCode], mode: 'byte'}], {errorCorrectionLevel: 'Q', version: 39}, function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
      } else {
        let ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        if(ctx) ctx.fillStyle = 'black';
        ctx?.fillText('No data', 0, 0);
      }
    }
  
</script>

<canvas bind:this={canvas} width="400" height="400"></canvas>

{#if maxCodes > 1}
  <button on:click={()=>{
    currentCode = (currentCode + 1) % maxCodes;
  }}>Next</button>
  <button on:click={()=>{
      currentCode = (currentCode - 1 + maxCodes) % maxCodes;
    }}>Prev</button>
  <p>{currentCode + 1} / {maxCodes}</p>
{/if}