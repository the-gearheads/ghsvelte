
<script lang="ts">
	import { Button, Portal, Drawer } from 'stwui';

   let open = false;

   function openDrawer() {
		open = true;
	}

   function closeDrawer() {
		open = false;
	}
</script>

<Button type="primary" on:click={openDrawer}>Open</Button>

<Portal>
	{#if open}
		<Drawer handleClose={closeDrawer}>
			<Drawer.Header slot="header">Drawer Header</Drawer.Header>
			<Drawer.Content slot="content">Drawer Content</Drawer.Content>
			<Drawer.Footer slot="footer">Drawer Footer</Drawer.Footer>
		</Drawer>
	{/if}
</Portal>