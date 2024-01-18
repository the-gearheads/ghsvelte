HERES ALL THE DATA YOU GOT

<script>
  import { formDataStore } from "$lib/data/collectedData";
	import QrCodeViewer from "$lib/qr/QRCodeViewer.svelte";
	import { encodeAndSegment } from "$lib/qr/msgpacking";

  let data = encodeAndSegment($formDataStore);
</script>

<p>{JSON.stringify($formDataStore)}</p>

<QrCodeViewer {data} />
