"use client";

import { btnSecondary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";

export function FaqRepeater({
  items,
  onChange,
}: {
  items: { question: string; answer: string }[];
  onChange: (items: { question: string; answer: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="space-y-2 rounded-button border border-border/60 bg-surface/30 p-3">
          <input
            className={inputClass}
            placeholder="Question"
            value={faq.question}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], question: e.target.value };
              onChange(next);
            }}
          />
          <textarea
            className={textareaClass}
            placeholder="Answer"
            rows={3}
            value={faq.answer}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], answer: e.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="text-xs text-alert hover:underline"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className={btnSecondary}
        onClick={() => onChange([...items, { question: "", answer: "" }])}
      >
        + Add FAQ
      </button>
    </div>
  );
}

export function QuickFactsRepeater({
  items,
  onChange,
}: {
  items: { label: string; value: string }[];
  onChange: (items: { label: string; value: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((fact, i) => (
        <div key={i} className="grid gap-2 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Label (e.g. Recovery)"
            value={fact.label}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], label: e.target.value };
              onChange(next);
            }}
          />
          <input
            className={inputClass}
            placeholder="Value"
            value={fact.value}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], value: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={btnSecondary}
        onClick={() => onChange([...items, { label: "", value: "" }])}
      >
        + Add quick fact
      </button>
    </div>
  );
}

export function StepsRepeater({
  items,
  onChange,
}: {
  items: { title: string; description: string }[];
  onChange: (items: { title: string; description: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((step, i) => (
        <div key={i} className="space-y-2 rounded-button border border-border/60 p-3">
          <p className="text-xs font-semibold text-teal">Step {i + 1}</p>
          <input
            className={inputClass}
            placeholder="Step title"
            value={step.title}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], title: e.target.value };
              onChange(next);
            }}
          />
          <textarea
            className={textareaClass}
            placeholder="Description"
            rows={2}
            value={step.description}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], description: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={btnSecondary}
        onClick={() => onChange([...items, { title: "", description: "" }])}
      >
        + Add step
      </button>
    </div>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium text-navy">{label}</p> : null}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={inputClass}
            placeholder={placeholder}
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className="shrink-0 text-xs text-alert"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={btnSecondary} onClick={() => onChange([...items, ""])}>
        + Add line
      </button>
    </div>
  );
}
