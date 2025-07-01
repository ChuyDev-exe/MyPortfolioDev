import { jsx } from 'react/jsx-runtime';

function TagTopic({ type }) {
  let text, classes;
  switch (type) {
    case "vscode":
      text = "Visual Studio Code";
      classes = "bg-blue-900 text-slate-200";
      break;
    case "arm":
      text = "Arm";
      classes = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      break;
    case "linux":
      text = "Linux";
      classes = "bg-amber-400 text-yellow-500 dark:bg-yellow-700 dark:text-yellow-300";
      break;
    case "qt":
      text = "Qt Creator";
      classes = "bg-green-600 text-slate-300";
      break;
    case "android":
      text = "Android";
      classes = "bg-green-600 text-slate-300";
      break;
    case "bbb":
      text = "BeagleBone";
      classes = "bg-stone-900 text-slate-300";
      break;
    case "raspberry":
      text = "Raspberry";
      classes = "bg-red-400 text-slate-200";
      break;
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `text-xs font-medium me-2 px-2.5 py-0.5 rounded absolute bottom-3 left-3 ${classes}`,
      children: text
    }
  );
}

export { TagTopic as T };
