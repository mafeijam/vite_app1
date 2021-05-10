<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-page-container.bg-blue-grey-1
    q-page.q-mx-auto(padding style="width: 1280px;")
      router-link(to="/bank") bank
      router-link(to="/setting") setting
      router-view
</template>
