"use client";

import { useCallback, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableBody } from "@/components/content/PortableBody";
import { MediaPicker } from "@/components/admin/content/MediaPicker";
import type { MediaItem } from "@/components/admin/content/media-types";
import { EmbedSectionExtension } from "@/components/admin/editor/EmbedSectionExtension";
import { EditorToolbar } from "@/components/admin/editor/EditorToolbar";
import { SectionPickerModal } from "@/components/admin/editor/SectionPickerModal";
import type { PageSectionType } from "@/page-sections/registry";
import { htmlToPortableText } from "@/portable-text/from-html";
import { portableTextToHtml } from "@/portable-text/to-html";
import "@/components/admin/editor/editor.css";

type Tab = "edit" | "preview";

export function VisualEditor({
  label = "Page content",
  value,
  onChange,
  placeholder = "Start writing… Use the toolbar for headings, lists, links, images, and readymade sections.",
  contextServiceSlug,
}: {
  label?: string;
  value: PortableTextBlock[] | unknown | null;
  onChange: (blocks: PortableTextBlock[]) => void;
  placeholder?: string;
  /** When editing a service, pre-select its slug for embedded sections. */
  contextServiceSlug?: string | null;
}) {
  const [tab, setTab] = useState<Tab>("edit");
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sectionPickerOpen, setSectionPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const initialHtml = portableTextToHtml(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
      EmbedSectionExtension,
    ],
    content: initialHtml,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const blocks = htmlToPortableText(ed.getHTML());
      onChangeRef.current(blocks);
    },
  });

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);
      try {
        const fd = new FormData();
        fd.set("file", file);
        const res = await fetch("/api/admin/content/upload", { method: "POST", body: fd });
        const json = (await res.json()) as { ok?: boolean; media?: { url?: string } };
        const url = json.media?.url;
        if (json.ok && url) {
          editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
          onChangeRef.current(htmlToPortableText(editor.getHTML()));
        }
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  const insertFromLibrary = useCallback(
    (media: MediaItem) => {
      if (!editor) return;
      const alt = media.alt?.trim() || media.filename.replace(/\.[^.]+$/, "") || "Image";
      editor.chain().focus().setImage({ src: media.url, alt }).run();
      onChangeRef.current(htmlToPortableText(editor.getHTML()));
    },
    [editor],
  );

  const insertSection = useCallback(
    (payload: { sectionType: PageSectionType; serviceSlug?: string | null }) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "embedSection",
          attrs: {
            sectionType: payload.sectionType,
            serviceSlug: payload.serviceSlug ?? null,
          },
        })
        .run();
      onChangeRef.current(htmlToPortableText(editor.getHTML()));
    },
    [editor],
  );

  const previewBlocks = (value as PortableTextBlock[] | null) ?? htmlToPortableText(editor?.getHTML() ?? "");

  return (
    <div className="visual-editor rounded-card border border-border bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-navy">{label}</p>
        <div className="flex rounded-button border border-border p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`rounded-md px-3 py-1.5 ${tab === "edit" ? "bg-teal text-white" : "text-navy/70"}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`rounded-md px-3 py-1.5 ${tab === "preview" ? "bg-teal text-white" : "text-navy/70"}`}
          >
            Preview
          </button>
        </div>
      </div>

      {tab === "edit" ? (
        <>
          <EditorToolbar
            editor={editor}
            uploading={uploading}
            onInsertImage={() => fileRef.current?.click()}
            onPickFromLibrary={() => setPickerOpen(true)}
            onAddSection={() => setSectionPickerOpen(true)}
          />
          <EditorContent editor={editor} />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadImage(f);
              e.target.value = "";
            }}
          />
        </>
      ) : (
        <div className="min-h-[320px] border-t border-border/60 px-6 py-6">
          {previewBlocks?.length ? (
            <PortableBody value={previewBlocks} />
          ) : (
            <p className="text-sm text-text-tertiary">Nothing to preview yet.</p>
          )}
        </div>
      )}

      <p className="border-t border-border/60 px-4 py-2 text-xs text-text-tertiary">
        Use <strong>Sections</strong> for pricing, EMI, FAQ, and other reusable blocks. <strong>Gallery</strong> inserts
        library images; <strong>Upload</strong> adds a new file.
      </p>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Insert image from library"
        imagesOnly
        onSelect={insertFromLibrary}
      />

      <SectionPickerModal
        open={sectionPickerOpen}
        onClose={() => setSectionPickerOpen(false)}
        defaultServiceSlug={contextServiceSlug}
        onInsert={insertSection}
      />
    </div>
  );
}
