<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
  import QrScanner from 'qr-scanner';
  import type { SvelteComponent } from 'svelte';
	import { MsgDecoder } from './msgunpacking';

  const modalStore = getModalStore();

  /* little hack to get rid of a warning because skeleton passes a prop we dont care abt */
  export let parent: SvelteComponent | undefined = undefined;
  parent = parent;
  let videoElem: HTMLVideoElement | undefined;
  let qrScanner: QrScanner | undefined;
  let msgDecoder = new MsgDecoder();

  function handleQRResult(result: QrScanner.ScanResult) {
    console.log(result);
    // Number[] -> number[]
    const resultBytes: number[] = result.bytes.map((byte) => byte.valueOf());
    const uint8Array = new Uint8Array(resultBytes);
    msgDecoder.ingestQr(uint8Array);

    if(msgDecoder.allSegmentsScanned()) {
      qrScanner?.stop();
      let outData = msgDecoder.assembleAndDecode();
      modalStore.close();
      modalStore.trigger({
        type: "alert",
        title: "QR Code Fully Scanned",
        body: JSON.stringify(outData, null, 2),
      });
    }
  }

  $: if(videoElem) {
    qrScanner = new QrScanner(
      videoElem,
      handleQRResult,
      { returnDetailedScanResult: true },
    );

    console.log("we made a code scanner wooo")

  }

  let status = "Ready.";
  let isErr = false;
  $: if($modalStore[0]) {
    qrScanner?.start();
    msgDecoder = new MsgDecoder();
    msgDecoder.registerStatusCallback((msg: string, isAnErr: boolean) => {
      status = msg;
      isErr = isAnErr
    });
  } else {
    qrScanner?.stop();
  }


</script>


<div class="card flex flex-col p-4 w-modal-slim shadow-xl space-y-4">
  <div class="flex justify-center">
    <!-- <canvas class="" bind:this={canvas} width="724" height="724"></canvas> -->
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={videoElem}></video>
  </div>

  <footer class="modal-footer flex justify-end items-center space-x-1">
    <span class="text-m">{status}</span>
      <button class="btn variant-filled-primary variant-filled" on:click={()=>{
        modalStore.close();
      }}>
        Close
      </button>

    </footer>
</div>