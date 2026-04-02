<script setup>
const list = [
  { name: "海外便宜服务器", url: "/赞助和推广/海外便宜的服务器.html" },
  { name: "腾讯云优惠", url: "/赞助和推广/腾讯云优惠.html" },
  { name: "阿里云优惠", url: "/赞助和推广/阿里云优惠.html" },
];
</script>

<template>
  <div class="ad-header">
    <span class="ad-label">推广</span>
    <div class="ad-divider"></div>
    <a
      v-for="value in list"
      :key="value.name"
      class="ad-link"
      :href="value.url"
    >
      <span class="dot"></span>
      {{ value.name }}
    </a>
  </div>
</template>

<style scoped>
.ad-header {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #472298 0%, #4b1d7f 50%, #a82086 100%);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(251, 191, 36, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
}

.ad-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 80px,
    rgba(251, 191, 36, 0.03) 80px,
    rgba(251, 191, 36, 0.03) 81px
  );
  pointer-events: none;
}

.ad-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.4);
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.ad-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.ad-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #fafbfc;
  text-decoration: none;
  font-size: 12.5px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ad-link:hover {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.08);
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #475569;
  transition: background 0.2s;
  flex-shrink: 0;
}

.ad-link:hover .dot {
  background: #fbbf24;
}
</style>