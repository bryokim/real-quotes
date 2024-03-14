<template>
    <div
      class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white bg-no-repeat default-font"
    >
      <Navbar />
      <slot class="flex-1" />
  
      <UNotifications />
    </div>
  </template>
  
  <style>
  .default-font{
    font-family: "Crymson Pro", "Josefin Sans", sans-serif;
  }
  </style>