<script setup>
const list = [
  { name: "海外便宜服务器", url: "/赞助和推广/海外便宜的服务器.html" },
  { name: "腾讯云优惠", url: "/赞助和推广/腾讯云优惠.html" },
  { name: "阿里云优惠", url: "/赞助和推广/阿里云优惠.html" },
];
</script>

<template>
  <div>
    <a
      v-for="value in list"
      :key="value.name"
      style="color: red; font-size: small;text-decoration: underline;text-underline-position: below;"
      :href="value.url"
      >{{ value.name }}
      <br />
    </a>
    <hr />
  </div>
</template>

<style scoped></style>
