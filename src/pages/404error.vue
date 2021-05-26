<template lang="pug">
.window-height.window-width.column.items-center.justify-center.flex-row.bg-blue-grey-10
  img(src="/404-error.svg" style="width: 60px;")
  .text-h6.text-grey-5.q-my-lg 404 Page Not Found
  q-btn(@click="$router.push('/')" flat text-color="orange-14" icon="r_keyboard_return" label="go back")
</template>
