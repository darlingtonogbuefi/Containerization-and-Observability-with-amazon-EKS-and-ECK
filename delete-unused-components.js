const fs = require("fs");
const path = require("path");

// List of unused components — based on your `check-used-components.js` output
const unusedComponents = [
  "accordion.tsx",
  "alert-dialog.tsx",
  "alert.tsx",
  "aspect-ratio.tsx",
  "avatar.tsx",
  "badge.tsx",
  "card.tsx",
  "carousel.tsx",
  "checkbox.tsx",
  "collapsible.tsx",
  "command.tsx",
  "context-menu.tsx",
  "date-picker-with-range.tsx",
  "drawer.tsx",
  "form.tsx",
  "hover-card.tsx",
  "input.tsx",
  "menubar.tsx",
  "navigation-menu.tsx",
  "pagination.tsx",
  "progress.tsx",
  "radio-group.tsx",
  "resizable.tsx",
  "scroll-area.tsx",
  "select.tsx",
  "separator.tsx",
  "sheet.tsx",
  "skeleton.tsx",
  "slider.tsx",
  "switch.tsx",
  "table.tsx",
  "tabs.tsx",
  "textarea.tsx",
  "toaster.tsx",
  "toggle.tsx",
  "tooltip.tsx",
];

const uiDir = path.join(__dirname, "src", "components", "ui");

unusedComponents.forEach((file) => {
  const filePath = path.join(uiDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(` Deleted: ${file}`);
  } else {
    console.log(` Not found: ${file}`);
  }
});
