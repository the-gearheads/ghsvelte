<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte'
  import { getToastStore } from '@skeletonlabs/skeleton';

  const toastStore = getToastStore();

	const {
		needRefresh,
		updateServiceWorker,
		offlineReady
	} = useRegisterSW({
		  onRegistered(r) {
		    // uncomment following code if you want check for updates
		    r && setInterval(() => {
		       r.update();
		    }, 5000);

		  	console.log(`SW Registered: ${r}`);
		  },
		  onRegisterError(error) {
		  	console.log('SW registration error', error);
		  },
	});

  offlineReady.subscribe((value) => {
    if (value) {
      toastStore.trigger({message: 'App ready to work offline'});
    }
    offlineReady.set(false);
  });

  /* This shouldn't happen since we set the mode to 'autoUpdate' and not 'prompt', plus there's no button to actually update rn here */
  needRefresh.subscribe((value) => {
    if (value) {
      toastStore.trigger({message: 'New content available, click on reload button to update.'});
    }
    needRefresh.set(false);
  });
</script>