<script lang="ts">
  import { run } from 'svelte/legacy';

	import { getModalStore } from '@skeletonlabs/skeleton';
  import QrScanner from 'qr-scanner';
  import type { SvelteComponent } from 'svelte';
	import { MsgDecoder } from './msgunpacking';

  const modalStore = getModalStore();

  
  interface Props {
    /* little hack to get rid of a warning because skeleton passes a prop we dont care abt */
    parent?: SvelteComponent | undefined;
  }

  let { parent = $bindable(undefined) }: Props = $props();
  parent = parent;
  let videoElem: HTMLVideoElement | undefined = $state();
  let overlay: HTMLDivElement | undefined = $state();
  let qrScanner: QrScanner | undefined = $state();
  let msgDecoder = $state(new MsgDecoder());

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

  run(() => {
    if(videoElem && overlay) {
      qrScanner = new QrScanner(
        videoElem,
        handleQRResult,
        { returnDetailedScanResult: true,
          calculateScanRegion(video) {
          return {
            x: 0,
            y: 0,
            width: video.width,
            height: video.height,
          };
        },
        overlay: overlay,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      console.log("we made a code scanner wooo")

    }
  });

  let status = $state("Ready.");
  let isErr = $state(false);
  run(() => {
    if($modalStore[0]) {
      qrScanner?.start();
      msgDecoder = new MsgDecoder();
      msgDecoder.registerStatusCallback((msg: string, isAnErr: boolean) => {
        status = msg;
        isErr = isAnErr
      });
    } else {
      qrScanner?.stop();
    }
  });


</script>


<div class="card flex flex-col p-4 w-modal-slim shadow-xl space-y-4">
  <div class="flex justify-center">
    <!-- <canvas class="" bind:this={canvas} width="724" height="724"></canvas> -->
    <!-- svelte-ignore a11y_media_has_caption -->
    <video bind:this={videoElem}></video>
    <div bind:this={overlay}></div>
  </div>

  <footer class="modal-footer flex justify-end items-center space-x-1">
    <span class="text-m">{status}</span>
      <button class="btn variant-filled-primary variant-filled" onclick={()=>{
        modalStore.close();
      }}>
        Close
      </button>

    </footer>
</div>