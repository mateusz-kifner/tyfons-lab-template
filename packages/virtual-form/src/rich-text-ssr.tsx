// import {
//   type MutableRefObject,
//   useEffect,
//   useId,
//   useState,
//   type ReactNode,
// } from "react";

// import { useClickOutside } from "@mantine/hooks";
// import { EditorContent, useEditor } from "@tiptap/react";
// import DOMPurify from "dompurify";
// import TurndownService from "turndown";

// import Highlight from "@tiptap/extension-highlight";
// import Link from "@tiptap/extension-link";
// import Subscript from "@tiptap/extension-subscript";
// import Superscript from "@tiptap/extension-superscript";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";
// import StarterKit from "@tiptap/starter-kit";

// import preventLeave from "@/utils/preventLeave";

// import { Button } from "@acme/ui/button";
// import DisplayCellExpanding from "@acme/ui/DisplayCellExpanding";
// import { Label } from "@acme/ui/label";
// import type LiveFormInput from "./live-form";
// import {
//   IconAlignCenter,
//   IconAlignJustified,
//   IconAlignLeft,
//   IconAlignRight,
//   IconBold,
//   IconClearFormatting,
//   IconH1,
//   IconH2,
//   IconH3,
//   IconH4,
//   IconH5,
//   IconH6,
//   IconHighlight,
//   IconItalic,
//   IconList,
//   IconListNumbers,
//   IconStrikethrough,
//   IconSubscript,
//   IconSuperscript,
//   IconUnderline,
// } from "@tabler/icons-react";
// import { useLiveFormContext } from "./LiveForm";

// // TODO: refactor buttons rendering

// const controls: (
//   | {
//       label: string;
//       icon: ReactNode;

//       isActive?: { name: string; [key: string]: any };

//       operation: { name: string; [key: string]: any };
//     }
//   | {
//       label: string;
//       icon: ReactNode;

//       isActive?: { name: string; [key: string]: any };

//       operation: { name: string; [key: string]: any };
//     }[]
// )[] = [
//   {
//     label: "clearFormattingControlLabel",
//     icon: <IconClearFormatting strokeWidth={1.5} size={18} />,
//     operation: { name: "unsetAllMarks" },
//   },
//   [
//     {
//       label: "boldControlLabel",
//       icon: <IconBold strokeWidth={1.5} size={18} />,
//       isActive: { name: "bold" },
//       operation: { name: "toggleBold" },
//     },
//     {
//       label: "italicControlLabel",
//       icon: <IconItalic strokeWidth={1.5} size={18} />,
//       isActive: { name: "italic" },
//       operation: { name: "toggleItalic" },
//     },
//     {
//       label: "underlineControlLabel",
//       icon: <IconUnderline strokeWidth={1.5} size={18} />,
//       isActive: { name: "underline" },
//       operation: { name: "toggleUnderline" },
//     },
//     {
//       label: "strikeControlLabel",
//       icon: <IconStrikethrough strokeWidth={1.5} size={18} />,
//       isActive: { name: "strike" },
//       operation: { name: "toggleStrike" },
//     },
//     {
//       label: "subscriptControlLabel",
//       icon: <IconSubscript strokeWidth={1.5} size={18} />,
//       isActive: { name: "subscript" },
//       operation: { name: "toggleSubscript" },
//     },
//     {
//       label: "superscriptControlLabel",
//       icon: <IconSuperscript strokeWidth={1.5} size={18} />,
//       isActive: { name: "superscript" },
//       operation: { name: "toggleSuperscript" },
//     },
//     {
//       label: "highlightControlLabel",
//       icon: <IconHighlight strokeWidth={1.5} size={18} />,
//       isActive: { name: "highlight" },
//       operation: { name: "toggleHighlight" },
//     },
//   ],
//   [
//     {
//       label: "alignLeftControlLabel",
//       icon: <IconAlignLeft strokeWidth={1.5} size={18} />,
//       operation: { name: "setTextAlign", attributes: "left" },
//     },
//     {
//       label: "alignCenterControlLabel",
//       icon: <IconAlignCenter strokeWidth={1.5} size={18} />,
//       operation: { name: "setTextAlign", attributes: "center" },
//     },
//     {
//       label: "alignRightControlLabel",
//       icon: <IconAlignRight strokeWidth={1.5} size={18} />,
//       operation: { name: "setTextAlign", attributes: "right" },
//     },
//     {
//       label: "alignJustifyControlLabel",
//       icon: <IconAlignJustified strokeWidth={1.5} size={18} />,
//       operation: { name: "setTextAlign", attributes: "justify" },
//     },
//   ],
//   // {
//   //   label: "unlinkControlLabel",
//   //   icon: <UnlinkIcon strokeWidth={1.5} size={18} />,
//   //   operation: { name: "unsetLink" },
//   // },
//   [
//     {
//       label: "bulletListControlLabel",
//       icon: <IconList strokeWidth={1.5} size={18} />,
//       isActive: { name: "bulletList" },
//       operation: { name: "toggleBulletList" },
//     },
//     {
//       label: "orderedListControlLabel",
//       icon: <IconListNumbers strokeWidth={1.5} size={18} />,
//       isActive: { name: "orderedList" },
//       operation: { name: "toggleOrderedList" },
//     },
//   ],
//   [
//     {
//       label: "h1ControlLabel",
//       icon: <IconH1 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 1 } },
//       operation: { name: "toggleHeading", attributes: { level: 1 } },
//     },
//     {
//       label: "h2ControlLabel",
//       icon: <IconH2 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 2 } },
//       operation: { name: "toggleHeading", attributes: { level: 2 } },
//     },
//     {
//       label: "h3ControlLabel",
//       icon: <IconH3 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 3 } },
//       operation: { name: "toggleHeading", attributes: { level: 3 } },
//     },
//     {
//       label: "h4ControlLabel",
//       icon: <IconH4 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 4 } },
//       operation: { name: "toggleHeading", attributes: { level: 4 } },
//     },
//     {
//       label: "h5ControlLabel",
//       icon: <IconH5 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 5 } },
//       operation: { name: "toggleHeading", attributes: { level: 5 } },
//     },
//     {
//       label: "h6ControlLabel",
//       icon: <IconH6 strokeWidth={1.5} size={18} />,
//       isActive: { name: "heading", attributes: { level: 6 } },
//       operation: { name: "toggleHeading", attributes: { level: 6 } },
//     },
//   ],
//   // {
//   //   label: "blockquoteControlLabel",
//   //   icon: <BlockquoteIcon strokeWidth={1.5} size={18} />,
//   //   isActive: { name: "blockquote" },
//   //   operation: { name: "toggleBlockquote" },
//   // },
//   // {
//   //   label: "codeControlLabel",
//   //   icon: <CodeIcon strokeWidth={1.5} size={18} />,
//   //   isActive: { name: "code" },
//   //   operation: { name: "toggleCode" },
//   // },
//   // {
//   //   label: "codeBlockControlLabel",
//   //   icon: <CodeIcon strokeWidth={1.5} size={18} />,
//   //   isActive: { name: "codeBlock" },
//   //   operation: { name: "toggleCodeBlock" },
//   // },

//   // {
//   //   label: "hrControlLabel",
//   //   icon: <LineDashedIcon strokeWidth={1.5} size={18} />,
//   //   operation: { name: "setHorizontalRule" },
//   // },
//   // {
//   //   label: "unsetColorControlLabel",
//   //   icon: <CircleOffIcon strokeWidth={1.5} size={18} />,
//   //   operation: { name: "unsetColor" },
//   // },
// ];

// const turndownService = new TurndownService();

// interface LiveFormRichTextProps extends LiveFormInput<string> {
//   maxLength?: number;
// }

// const LiveFormRichText = (props: LiveFormRichTextProps) => {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     leftSection,
//     rightSection,
//     // maxLength = Number.MAX_SAFE_INTEGER,
//     // keyName
//   } = useLiveFormContext(props);
//   const uuid = useId();
//   const [text, setText] = useState<string>(
//     value ? DOMPurify.sanitize(value) : "",
//   );

//   const [focus, setFocus] = useState<boolean>(false);
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     editorProps: {
//       attributes: {
//         class:
//           "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-2 focus:outline-none editor",
//       },
//     },
//     content: text,
//     onUpdate: ({ editor }) => {
//       setText(editor.getHTML());
//     },
//   });
//   const clickOutsideRef = useClickOutside<HTMLDivElement>(() =>
//     setFocus(false),
//   );

//   useEffect(() => {
//     if (focus) {
//       window.addEventListener("beforeunload", preventLeave);
//     } else {
//       //prevent excessive updates
//       if (text !== value && text !== "") {
//         onSubmit?.(text);
//       }
//       window.removeEventListener("beforeunload", preventLeave);
//     }
//   }, [focus]);

//   useEffect(() => {
//     return () => {
//       window.removeEventListener("beforeunload", preventLeave);
//     };
//   }, []);

//   useEffect(() => {
//     if (value) {
//       const cleanValue = DOMPurify.sanitize(value);
//       setText(cleanValue);
//     }
//   }, [value]);

//   const plainText = unescape(
//     turndownService.turndown(
//       text
//         .replace(/h[0-9]>/g, "div>")
//         .replace(/<\/*(s|em|strong|a|b|i|mark|del|small|ins|sub|sup)>/g, ""),
//     ),
//   );

//   return (
//     // biome-ignore lint/a11y/useKeyWithClickEvents: This is intended to be focused with keyboard or mouse, no onPress needed
//     <div
//       ref={clickOutsideRef as MutableRefObject<HTMLDivElement | null>}
//       onClick={() => !disabled && setFocus(true)}
//       onFocus={() => !disabled && setFocus(true)}
//       // onBlur={handleBlurForInnerElements(() => setFocus(false))}
//     >
//       <Label
//         label={label}
//         copyValue={plainText.length > 0 ? plainText : ""}
//         required={required}
//         htmlFor={`rich_text${uuid}`}
//       />
//       <DisplayCellExpanding
//         leftSection={!focus && leftSection}
//         rightSection={!focus && rightSection}
//         className="h-auto py-2.5"
//         focus={focus}
//         disabled={disabled}
//       >
//         {focus ? (
//           <div className="flex flex-grow flex-col">
//             <div
//               className="-mx-2 flex flex-wrap gap-2 border-b border-b-input border-solid px-2 pb-2"
//               aria-label="Formatting options"
//             >
//               {controls.map((value, index) => {
//                 if (Array.isArray(value)) {
//                   return (
//                     <div key={`${uuid}${index}:group`}>
//                       {value.map((value, index2) => (
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           key={`${uuid}${index}:${index2}:group`}
//                           className={`h-8 w-8 rounded-none border-l-0 first:rounded-l last:rounded-r first:border-l${
//                             (
//                               value.isActive?.name
//                                 ? editor?.isActive(
//                                     value.isActive.name,
//                                     value.isActive.attributes,
//                                   )
//                                 : false
//                             )
//                               ? "bg-black/20 dark:bg-white/20"
//                               : ""
//                           }`}
//                           onClick={() =>
//                             // @ts-ignore
//                             editor
//                               ?.chain()
//                               .focus()
//                               [value.operation.name](value.operation.attributes)
//                               .run()
//                           }
//                           title={value.label}
//                         >
//                           {value.icon}
//                         </Button>
//                       ))}
//                     </div>
//                   );
//                 }
//                 return (
//                   <Button
//                     size="icon"
//                     variant="outline"
//                     key={`${uuid}${index}:item`}
//                     className={`h-8 w-8${
//                       (
//                         value.isActive?.name
//                           ? editor?.isActive(
//                               value.isActive.name,
//                               value.isActive.attributes,
//                             )
//                           : false
//                       )
//                         ? "bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-20"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       //@ts-ignore
//                       editor
//                         ?.chain()
//                         .focus()
//                         [value.operation.name](value.operation.attributes)
//                         .run()
//                     }
//                     title={value.label}
//                   >
//                     {value.icon}
//                   </Button>
//                 );
//               })}
//             </div>

//             <EditorContent
//               editor={editor}
//               name={`rich_text${uuid}`}
//               id={`rich_text${uuid}`}
//               className="leading-normal"
//             />
//           </div>
//         ) : (
//           <div
//             className={`plain-html editor w-full leading-normal${
//               text.length === 0 ||
//               text === "<p></p>" ||
//               text === "<p></p><p></p>"
//                 ? "text-gray-400 dark:text-stone-600"
//                 : "text-stone-950 dark:text-stone-200"
//             }`}
//             // biome-ignore lint/security/noDangerouslySetInnerHtml: This is intended and sanitized
//             dangerouslySetInnerHTML={{
//               __html:
//                 text.length === 0 ||
//                 text === "<p></p>" ||
//                 text === "<p></p><p></p>"
//                   ? "⸺"
//                   : text,
//             }}
//           />
//         )}
//       </DisplayCellExpanding>
//     </div>
//   );
// };

// export default LiveFormRichText;
