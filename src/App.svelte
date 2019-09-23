<script>
  import { Router, Route, Layout as RouterLayout, Redirect } from 'swheel';
  import Layout from './Layout.svelte';
  import Loadable from 'svelte-loadable';
  import { windowWidth } from './stores';
  const Index = () => import('./routes/Index.svelte')
  const Component = () => import('./routes/Component.svelte')
</script>

<svelte:window bind:innerWidth={$windowWidth}></svelte:window>
<Router>
  <RouterLayout component={Layout}>
    <Route path="/" lazy={Index} exact />
    <Route path="/component/:name" let:params exact>
      <Loadable loader={Component} name={params.name} />
    </Route>
  </RouterLayout>
</Router>
