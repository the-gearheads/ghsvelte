<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import QrCodeViewer from "./QRCodeViewer.svelte";

  const modalStore = getModalStore();
  export let data: Uint8Array[] | undefined = undefined;

  function show() {
    modalStore.trigger({
      type: "component",
      component: {
        ref: QrCodeViewer,
        props: { data: data }
      }
    });
  }
</script>

<button class="btn variant-filled-primary" on:click={show}>Show QR</button>