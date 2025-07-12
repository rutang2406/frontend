// import React from 'react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import TextAlign from '@tiptap/extension-text-align'
// import Mention from '@tiptap/extension-mention'
// import Image from '@tiptap/extension-image'
// import Link from '@tiptap/extension-link'
// import { ReactRenderer } from '@tiptap/react'
// import tippy from 'tippy.js'
// import MentionList from './MentionList'
// import { 
//   Bold, 
//   Italic, 
//   Strikethrough, 
//   List, 
//   ListOrdered, 
//   AlignLeft, 
//   AlignCenter, 
//   AlignRight,
//   Link as LinkIcon,
//   Image as ImageIcon,
//   Smile
// } from 'lucide-react'

// const RichTextEditor = ({ content, onChange, placeholder = "Start writing..." }) => {
//   const fileInputRef = React.useRef(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           HTMLAttributes: {
//             class: 'list-disc ml-4',
//           },
//         },
//         orderedList: {
//           HTMLAttributes: {
//             class: 'list-decimal ml-4',
//           },
//         },
//       }),
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//       Image,
//       Link.configure({
//         openOnClick: false,
//       }),
//       Mention.configure({
//         HTMLAttributes: {
//           class: 'mention',
//         },
//         suggestion: {
//           items: ({ query }) => {
//             const users = [
//               { id: '1', name: 'John Doe' },
//               { id: '2', name: 'Jane Smith' },
//               { id: '3', name: 'Alice Johnson' },
//             ]
//             return users.filter(user => 
//               user.name.toLowerCase().includes(query.toLowerCase())
//             ).slice(0, 5)
//           },
//           render: () => {
//             let component
//             let popup

//             return {
//               onStart: props => {
//                 component = new ReactRenderer(MentionList, {
//                   props,
//                   editor: props.editor,
//                 })

//                 popup = tippy('body', {
//                   getReferenceClientRect: props.clientRect,
//                   appendTo: () => document.body,
//                   content: component.element,
//                   showOnCreate: true,
//                   interactive: true,
//                   trigger: 'manual',
//                   placement: 'bottom-start',
//                 })
//               },
//               onUpdate(props) {
//                 component?.updateProps(props)
//                 popup?.[0].setProps({
//                   getReferenceClientRect: props.clientRect,
//                 })
//               },
//               onKeyDown(props) {
//                 if (props.event.key === 'Escape') {
//                   popup?.[0].hide()
//                   return true
//                 }
//                 return component?.ref?.onKeyDown(props)
//               },
//               onExit() {
//                 popup?.[0].destroy()
//                 component?.destroy()
//               },
//             }
//           },
//         },
//       }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML())
//     },
//   })

//   if (!editor) {
//     return null
//   }

//   const addImage = () => {
//     const choice = window.confirm('Do you want to upload a local image? Click OK for local upload or Cancel for URL')

//     if (choice) {
//       fileInputRef.current?.click()
//     } else {
//       const url = window.prompt('Enter image URL:')
//       if (url) {
//         editor.chain().focus().setImage({ src: url }).run()
//       }
//     }
//   }

//   const handleLocalImage = (event) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         const imageUrl = e.target?.result
//         if (imageUrl) {
//           editor.chain().focus().setImage({ src: imageUrl }).run()
//         }
//       }
//       reader.readAsDataURL(file)
//     }
//     event.target.value = ''
//   }

//   const addLink = () => {
//     const url = window.prompt('Enter URL:')
//     if (url) {
//       editor.chain().focus().setLink({ href: url }).run()
//     }
//   }

//   const addEmoji = () => {
//     const emoji = window.prompt('Enter emoji:')
//     if (emoji) {
//       editor.chain().focus().insertContent(emoji).run()
//     }
//   }

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden">
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleLocalImage}
//         accept="image/*"
//         className="hidden"
//       />
//       <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive('bold') ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <Bold className="h-4 w-4" />
//         </button>

//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive('italic') ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <Italic className="h-4 w-4" />
//         </button>

//         <button
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive('strike') ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <Strikethrough className="h-4 w-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive('bulletList') ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <List className="h-4 w-4" />
//         </button>

//         <button
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive('orderedList') ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <ListOrdered className="h-4 w-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           onClick={() => editor.chain().focus().setTextAlign('left').run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <AlignLeft className="h-4 w-4" />
//         </button>

//         <button
//           onClick={() => editor.chain().focus().setTextAlign('center').run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <AlignCenter className="h-4 w-4" />
//         </button>

//         <button
//           onClick={() => editor.chain().focus().setTextAlign('right').run()}
//           className={`p-2 rounded hover:bg-gray-200 ${
//             editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
//           }`}
//           type="button"
//         >
//           <AlignRight className="h-4 w-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           onClick={addLink}
//           className="p-2 rounded hover:bg-gray-200"
//           type="button"
//         >
//           <LinkIcon className="h-4 w-4" />
//         </button>

//         <button
//           onClick={addImage}
//           className="p-2 rounded hover:bg-gray-200"
//           type="button"
//           title="Add image (local or URL)"
//         >
//           <ImageIcon className="h-4 w-4" />
//         </button>

//         <button
//           onClick={addEmoji}
//           className="p-2 rounded hover:bg-gray-200"
//           type="button"
//         >
//           <Smile className="h-4 w-4" />
//         </button>
//       </div>

//       <EditorContent 
//         editor={editor} 
//         className="prose max-w-none p-4"
//         placeholder={placeholder}
//       />
//     </div>
//   )
// }

// export default RichTextEditor






// import { useState, useEffect, useRef, useMemo } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import {
//   ClassicEditor,
//   Alignment,
//   AutoImage,
//   AutoLink,
//   Autosave,
//   BalloonToolbar,
//   BlockQuote,
//   BlockToolbar,
//   Bold,
//   Bookmark,
//   CloudServices,
//   CodeBlock,
//   Essentials,
//   GeneralHtmlSupport,
//   Heading,
//   HorizontalLine,
//   ImageBlock,
//   ImageCaption,
//   ImageInline,
//   ImageInsertViaUrl,
//   ImageResize,
//   ImageStyle,
//   ImageTextAlternative,
//   ImageToolbar,
//   ImageUpload,
//   Indent,
//   IndentBlock,
//   Italic,
//   Link,
//   List,
//   ListProperties,
//   Mention,
//   Paragraph,
//   Style,
//   Table,
//   TableCaption,
//   TableCellProperties,
//   TableColumnResize,
//   TableProperties,
//   TableToolbar,
//   TodoList,
//   Underline,
// } from 'ckeditor5';

// import 'ckeditor5/ckeditor5.css';
// // import './App.css';

// const LICENSE_KEY = 'GPL';

// export default function RichTextEditor({data=""}) {
//   const editorContainerRef = useRef(null);
//   const editorRef = useRef(null);
//   const [isLayoutReady, setIsLayoutReady] = useState(false);

//   useEffect(() => {
//     setIsLayoutReady(true);
//     return () => setIsLayoutReady(false);
//   }, []);

//   const { editorConfig } = useMemo(() => {
//     if (!isLayoutReady) return {};

//     return {
//       editorConfig: {
//         toolbar: {
//           items: [
//             'undo',
//             'redo',
//             '|',
//             'heading',
//             'style',
//             '|',
//             'bold',
//             'italic',
//             'underline',
//             '|',
//             'horizontalLine',
//             'link',
//             'bookmark',
//             'insertImageViaUrl',
//             'insertTable',
//             'blockQuote',
//             'codeBlock',
//             '|',
//             'alignment',
//             '|',
//             'bulletedList',
//             'numberedList',
//             'todoList',
//             'outdent',
//             'indent',
//           ],
//           shouldNotGroupWhenFull: false,
//         },
//         plugins: [
//           Alignment,
//           AutoImage,
//           AutoLink,
//           Autosave,
//           BalloonToolbar,
//           BlockQuote,
//           BlockToolbar,
//           Bold,
//           Bookmark,
//           CloudServices,
//           CodeBlock,
//           Essentials,
//           GeneralHtmlSupport,
//           Heading,
//           HorizontalLine,
//           ImageBlock,
//           ImageCaption,
//           ImageInline,
//           ImageInsertViaUrl,
//           ImageResize,
//           ImageStyle,
//           ImageTextAlternative,
//           ImageToolbar,
//           ImageUpload,
//           Indent,
//           IndentBlock,
//           Italic,
//           Link,
//           List,
//           ListProperties,
//           Mention,
//           Paragraph,
//           Style,
//           Table,
//           TableCaption,
//           TableCellProperties,
//           TableColumnResize,
//           TableProperties,
//           TableToolbar,
//           TodoList,
//           Underline,
//         ],
//         balloonToolbar: [
//           'bold',
//           'italic',
//           '|',
//           'link',
//           '|',
//           'bulletedList',
//           'numberedList',
//         ],
//         blockToolbar: [
//           'bold',
//           'italic',
//           '|',
//           'link',
//           'insertTable',
//           '|',
//           'bulletedList',
//           'numberedList',
//           'outdent',
//           'indent',
//         ],
//         heading: {
//           options: [
//             {
//               model: 'paragraph',
//               title: 'Paragraph',
//               class: 'ck-heading_paragraph',
//             },
//             {
//               model: 'heading1',
//               view: 'h1',
//               title: 'Heading 1',
//               class: 'ck-heading_heading1',
//             },
//             {
//               model: 'heading2',
//               view: 'h2',
//               title: 'Heading 2',
//               class: 'ck-heading_heading2',
//             },
//             {
//               model: 'heading3',
//               view: 'h3',
//               title: 'Heading 3',
//               class: 'ck-heading_heading3',
//             },
//             {
//               model: 'heading4',
//               view: 'h4',
//               title: 'Heading 4',
//               class: 'ck-heading_heading4',
//             },
//             {
//               model: 'heading5',
//               view: 'h5',
//               title: 'Heading 5',
//               class: 'ck-heading_heading5',
//             },
//             {
//               model: 'heading6',
//               view: 'h6',
//               title: 'Heading 6',
//               class: 'ck-heading_heading6',
//             },
//           ],
//         },
//         htmlSupport: {
//           allow: [
//             {
//               name: /^.*$/,
//               styles: true,
//               attributes: true,
//               classes: true,
//             },
//           ],
//         },
//         image: {
//           toolbar: [
//             'toggleImageCaption',
//             'imageTextAlternative',
//             '|',
//             'imageStyle:inline',
//             'imageStyle:wrapText',
//             'imageStyle:breakText',
//             '|',
//             'resizeImage',
//           ],
//         },
//         initialData:data,

//         licenseKey: LICENSE_KEY,
//         link: {
//           addTargetToExternalLinks: true,
//           defaultProtocol: 'https://',
//           decorators: {
//             toggleDownloadable: {
//               mode: 'manual',
//               label: 'Downloadable',
//               attributes: { download: 'file' },
//             },
//           },
//         },
//         list: {
//           properties: {
//             styles: true,
//             startIndex: true,
//             reversed: true,
//           },
//         },
//         mention: {
//           feeds: [
//             {
//               marker: '@',
//               feed: ['@Barney', '@Lily', '@Ted', '@Robin', '@Marshall'],
//             },
//           ],
//         },
//         menuBar: {
//           isVisible: true,
//         },
//         placeholder: 'Type or paste your content here!',
//         style: {
//           definitions: [
//             { name: 'Article category', element: 'h3', classes: ['category'] },
//             { name: 'Title', element: 'h2', classes: ['document-title'] },
//             { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
//             { name: 'Info box', element: 'p', classes: ['info-box'] },
//             {
//               name: 'CTA Link Primary',
//               element: 'a',
//               classes: ['button', 'button--green'],
//             },
//             {
//               name: 'CTA Link Secondary',
//               element: 'a',
//               classes: ['button', 'button--black'],
//             },
//             { name: 'Marker', element: 'span', classes: ['marker'] },
//             { name: 'Spoiler', element: 'span', classes: ['spoiler'] },
//           ],
//         },
//         table: {
//           contentToolbar: [
//             'tableColumn',
//             'tableRow',
//             'mergeTableCells',
//             'tableProperties',
//             'tableCellProperties',
//           ],
//         },
//       },
//     };
//   }, [isLayoutReady]);

//   return (
//     <div className="main-container">
//       <div
//         className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar"
//         ref={editorContainerRef}
//       >
//         <div className="editor-container__editor">
//           <div ref={editorRef}>
//             {editorConfig && (
//               <CKEditor
//                 editor={ClassicEditor}
//                 config={editorConfig}
//                 onReady={(editor) => {
//                   console.log('✅ Editor is ready to use!', editor);
//                 }}
//                 onChange={(event, editor) => {
//                   const data = editor.getData();
//                   console.log('📝 Editor data changed:', data);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// RichTextEditor.jsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  CloudServices,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Mention,
  Paragraph,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY = 'GPL';

export default function RichTextEditor({ data = '', isReadOnly = true, onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      editorConfig: {
        toolbar: {
          items: !isReadOnly
            ? [
              'undo', 'redo', '|',
              'heading', 'style', '|',
              'bold', 'italic', 'underline', '|',
              'horizontalLine', 'link', 'bookmark',
              'insertImageViaUrl', 'insertTable', 'blockQuote', 'codeBlock', '|',
              'alignment', '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
            ]
            : [],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment, AutoImage, AutoLink, Autosave, BalloonToolbar, BlockQuote, BlockToolbar,
          Bold, Bookmark, CloudServices, CodeBlock, Essentials, GeneralHtmlSupport, Heading,
          HorizontalLine, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl, ImageResize,
          ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic,
          Link, List, ListProperties, Mention, Paragraph, Style, Table, TableCaption, TableCellProperties,
          TableColumnResize, TableProperties, TableToolbar, TodoList, Underline
        ],
        initialData: data,
        licenseKey: LICENSE_KEY,
        placeholder: 'Type or paste your content here!',
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: { download: 'file' },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: '@',
              feed: ['@Barney', '@Lily', '@Ted', '@Robin', '@Marshall'],
            },
          ],
        },
        image: {
          toolbar: [
            'toggleImageCaption', 'imageTextAlternative', '|',
            'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage',
          ],
        },
        table: {
          contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'
          ],
        },
      },
    };
  }, [isLayoutReady, data]);

  return (
    <div className="main-container">
      <div
        className="editor-container"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                className="w-full"
                editor={ClassicEditor}
                config={editorConfig}
                data={data}
                disabled={isReadOnly}
                onReady={(editor) => console.log('Editor ready', editor)}
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  if (onChange) onChange(newData);
                }}

              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





