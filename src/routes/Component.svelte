<script>
  import TopAppBar from 'svmd/src/TopAppBar.svelte';
  import H2 from 'svmd/src/Typography/H2.svelte';
  import Icon from 'svmd/src/Icon.svelte';
  import Fab from 'svmd/src/Fab.svelte';
  import getDoc from '../js';
  export let name;
  $: doc = getDoc(name);
</script>

{#await doc}
  loading...
{:then data}
  <article class="mdc-typography">
    <H2>
      {data.title}
      <a href={data.mdcDocs}><Icon>open_in_new</Icon></a>
    </H2>
    {@html data.html}
  </article>
  <Fab icon="open_in_new" fixed href={data.demo} />
{:catch e}
  <b>Error: </b>
  <span>{e.message}</span>
{/await}
