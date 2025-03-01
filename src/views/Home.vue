<template>
  <div class="max-w-[85rem] w-full flex flex-row items-center">
    <div class="z-10">
      <h1 class="text-5xl font-bold leading-tight text-gray-900">
        Effortlessly Track and Manage Student Attendance
      </h1>
      <ul class="mt-5 text-lg text-gray-600 space-y-2">
        <li class="flex items-center">
          <span class="mr-2 text-purple-500">✔</span> Seamless Attendance Tracking
        </li>
        <li class="flex items-center">
          <span class="mr-2 text-purple-500">✔</span> Automated Reports and Insights
        </li>
        <li class="flex items-center">
          <span class="mr-2 text-purple-500">✔</span> Effortless Integration and Accessibility
        </li>
      </ul>
      <el-button
        type="primary"
        size="large"
        class="mt-6 px-6 py-3 text-lg font-medium shadow-lg bg-purple-500 hover:bg-purple-600"
      >
        Get Started
      </el-button>
    </div>

    <!-- Right Section (Image) -->
    <div class="absolute right-10 bottom-0 w-[50%]">
      <img
        src="@/assets/images/logo.png"
        alt="Attendance Management Interface"
        class="w-full h-auto drop-shadow-xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// You can add any necessary logic here, but it's not required for the static design.
</script>

<style scoped>
/* Add custom styles for the shine effect or additional tweaks */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #f3f4f6, #e9d5ff);
}

.drop-shadow-xl {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
}

/* Ensure text is readable and aligned properly */
.text-gray-900 {
  color: #1f2937;
}

.text-purple-500 {
  color: #9333ea;
}

.text-purple-200 {
  background-color: #e9d5ff;
}
</style>
