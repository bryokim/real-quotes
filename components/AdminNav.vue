<script setup lang="ts">
const userInfo = useUserInfo();

const writeRoles = [
  Roles.readWrite,
  Roles.write,
  Roles.admin,
  Roles.root,
  Roles.superuser,
];
const deleteRoles = [Roles.admin, Roles.superuser, Roles.root];
const manageAdminRoles = [Roles.superuser, Roles.root];

const links = [
  [
    {
      label: "Home",
      icon: "i-heroicons-home-20-solid",
      to: "/admin",
      replace: true,
      color: "text-blue-900 dark:text-blue-500",
    },
  ],
];

if (userInfo.value) {
  if (writeRoles.includes(userInfo.value.role)) {
    links[1] ?? links.push([]);
    links[1].push(
      {
        label: "Create",
        icon: "i-fluent-add-circle-32-filled",
        to: "/admin/create",
        replace: true,
        color: "text-green-600 dark:text-teal-400",
      },
      {
        label: "Update",
        icon: "i-fluent-phone-update-checkmark-24-filled",
        to: "/admin/update",
        replace: true,
        color: "text-sky-600 dark:text-sky-400",
      }
    );
  }

  if (deleteRoles.includes(userInfo.value.role)) {
    links[1] ?? links.push([]);
    links[1].push({
      label: "Delete",
      icon: "i-fluent-delete-48-filled",
      to: "/admin/delete",
      replace: true,
      color: "text-red-500",
    });
  }

  if (manageAdminRoles.includes(userInfo.value.role)) {
    // New section
    links.push([
      {
        label: "Admins",
        icon: "i-fluent-people-star-48-filled",
        to: "/admin/admins",
        replace: true,
        color: "text-fuchsia-500",
      },
    ]);
  }
}
</script>

<template>
  <UVerticalNavigation :links="links">
    <template #icon="{ link }">
      <UIcon :name="link.icon" :class="link.color" class="text-base" />
    </template>
  </UVerticalNavigation>
</template>
