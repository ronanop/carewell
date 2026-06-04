"use client";

import type { Editor } from "@tiptap/react";
import clsx from "clsx";

type ToolBtnProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolBtn({ onClick, active, disabled, title, children }: ToolBtnProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "rounded-md px-2 py-1.5 text-sm font-medium transition",
        active ? "bg-teal text-white" : "text-navy/80 hover:bg-surface",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({
  editor,
  onInsertImage,
  onPickFromLibrary,
  onAddSection,
  uploading,
}: {
  editor: Editor | null;
  onInsertImage: () => void;
  onPickFromLibrary?: () => void;
  onAddSection?: () => void;
  uploading?: boolean;
}) {
  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface/60 px-2 py-1.5">
      <ToolBtn
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolBtn>
      <ToolBtn
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolBtn>
      <span className="mx-1 h-5 w-px bg-border" aria-hidden />
      <ToolBtn
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolBtn>
      <ToolBtn
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolBtn>
      <ToolBtn
        title="Paragraph"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        ¶
      </ToolBtn>
      <span className="mx-1 h-5 w-px bg-border" aria-hidden />
      <ToolBtn
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </ToolBtn>
      <ToolBtn
        title="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        “
      </ToolBtn>
      <span className="mx-1 h-5 w-px bg-border" aria-hidden />
      <ToolBtn title="Insert link" active={editor.isActive("link")} onClick={setLink}>
        Link
      </ToolBtn>
      <ToolBtn title="Upload image" disabled={uploading} onClick={onInsertImage}>
        {uploading ? "…" : "Upload"}
      </ToolBtn>
      {onPickFromLibrary ? (
        <ToolBtn title="Choose from media library" onClick={onPickFromLibrary}>
          Gallery
        </ToolBtn>
      ) : null}
      {onAddSection ? (
        <ToolBtn title="Insert readymade section" onClick={onAddSection}>
          Sections
        </ToolBtn>
      ) : null}
      <span className="flex-1" />
      <ToolBtn
        title="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
      </ToolBtn>
      <ToolBtn
        title="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
      </ToolBtn>
    </div>
  );
}
