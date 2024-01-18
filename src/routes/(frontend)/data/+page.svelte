HERES ALL THE DATA YOU GOT

<script lang="ts">
  import { formDataStore } from "$lib/data/collectedData";
	import QrCodeModalOpener from "$lib/qr/QRCodeModalOpener.svelte";
	import QrCodeViewer from "$lib/qr/QRCodeViewer.svelte";
	import { encodeAndSegment } from "$lib/qr/msgpacking";

  let data = encodeAndSegment($formDataStore);
</script>

<p>{JSON.stringify($formDataStore)}</p>

<QrCodeModalOpener {data} />
