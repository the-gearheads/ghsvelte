<script lang="ts">
  import QRCode from 'qrcode'

  let highScore = 0;
  let lowScore = 0;
  let midScore = 0;

  let str = "";

  let canvas: HTMLCanvasElement;

  async function submit() {
    str = `${highScore} ${lowScore} ${midScore}`
    QRCode.toCanvas(canvas, str, {errorCorrectionLevel: 'Q', version: 25}, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>High node score: <input type="number" min=0, max=100 bind:value={highScore}/></p>
<p>Low node score: <input type="number" min=0, max=100 bind:value={lowScore}/></p>
<p>Mid score: <input type="number" min=0, max=100 bind:value={midScore}/></p>

<button on:click={submit}>Submit</button>

<p>{str}</p>

<canvas bind:this={canvas} width="400" height="400"></canvas>