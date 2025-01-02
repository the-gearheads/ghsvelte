<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import QrCodeViewer from "./QRCodeViewer.svelte";

  const modalStore = getModalStore();
  interface Props {
    data?: Uint8Array[] | undefined;
  }

  let { data = undefined }: Props = $props();

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

<button class="btn variant-filled-primary" onclick={show}>Show QR</button>