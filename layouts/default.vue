<template>
  <header>
    <NavBar :base-id="'menu'" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <Footer />
  </footer>
  <LazyAlert />
</template>