<script lang="ts">
  import { encodeAndSegment } from '$lib/msgpacking'
  import QrCodeViewer from '$lib/QRCodeViewer.svelte';
  import type Data from '$lib/data';

  let highScore = 0;
  let lowScore = 0;
  let midScore = 0;

  const randomLongString = function () {
    let out = "";
    for (let i = 0; i < 4000; i++) {
      out += String.fromCharCode(Math.floor(Math.random() * 94 + 32));
    }
    return out;
  }()

  let data: Uint8Array[] = [];

  async function submit() {
    data = encodeAndSegment({"stTest": randomLongString} as Data);
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>High node score : <input type="number" min=0 max=100 bind:value={highScore}/></p>
<p>Low node score: <input type="number" min=0 max=100 bind:value={lowScore}/></p>
<p>Mid score: <input type="number" min=0 max=100 bind:value={midScore}/></p>
<button on:click={submit}>submit</button>

<QrCodeViewer {data} />