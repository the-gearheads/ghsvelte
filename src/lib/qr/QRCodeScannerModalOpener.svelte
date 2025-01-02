<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import QrCodeScanner from "./QRCodeScanner.svelte.svelte";

  const modalStore = getModalStore();

  function show() {
    modalStore.trigger({
      type: "component",
      component: {
        ref: QrCodeScanner,
      }
    });
  }
</script>

<button class="btn variant-filled-primary" onclick={show}>Open code scanner test</button>