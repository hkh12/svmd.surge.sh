<script>
  import TopAppBar from 'svmd/src/TopAppBar.svelte';
  import Drawer from 'svmd/src/Drawer.svelte';
  import List from 'svmd/src/List/List.svelte';
  import ListItem from 'svmd/src/List/ListItem.svelte';
  import { isMobile } from './stores';
  import { getHistory } from 'swheel';

  const { currentPath } = getHistory();
  const items = ['Button', 'Fab', 'Tabs', 'Radio', 'Checkbox'];
  const componentLink = name => `/component/${name.toLowerCase()}`;
  $: activeComponent = items.findIndex(item => componentLink(item) === $currentPath)

  let drawerOpen = !$isMobile;
</script>

<TopAppBar fixed title="SVMD" on:nav-icon-click={
  () => drawerOpen = !drawerOpen
} />
<div class="mdc-top-app-bar--fixed-adjust">
  <Drawer bind:open={drawerOpen} dismissible={!$isMobile} modal={$isMobile}>
    <List>
      {#each items as item, i}
        <ListItem
          class={i === activeComponent ? "mdc-list-item--activated" : ''}
          href={componentLink(item)}
          tabindex={i === 0 ? 0 : ""}>{item}</ListItem>
      {/each}
    </List>
  </Drawer>
  <div class="mdc-drawer-app-content">
    <slot></slot>
  </div>
</div>
