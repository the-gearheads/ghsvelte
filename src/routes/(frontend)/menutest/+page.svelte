
<script lang="ts">
	
	//import { Button, Portal, Drawer, Icon } from 'stwui';

	let open = false;
	function openDrawer() {
		open = true;
	}

	function closeDrawer() {
		open = false;
	}


</script>

<button type="button" on:click={openDrawer}>
	<img src="/menu.svg" width=7% alt="Menu Button" />
</button>
<!--
<Portal>
	{#if open}
		<Drawer handleClose={closeDrawer} placement=left>
			<Drawer.Header slot="header">Drawer Header</Drawer.Header>
			<Drawer.Content slot="content">Drawer Content</Drawer.Content>
			<Drawer.Footer slot="footer">Drawer Footer</Drawer.Footer>
		</Drawer>
	{/if}
</Portal>
-->