"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Phase = "starting" | "live" | "error" | "analyzing" | "done";

export function SkinScanClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>("starting");
  const [message, setMessage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function openCamera() {
      setPhase("starting");
      setMessage(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const el = videoRef.current;
        if (el) {
          el.srcObject = stream;
          await el.play();
        }
        setPhase("live");
      } catch (e) {
        if (!cancelled) {
          setMessage(
            e instanceof Error
              ? e.message
              : "Could not access the camera. Allow permission or use HTTPS on a supported browser.",
          );
          setPhase("error");
        }
      }
    }
    void openCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  const runAnalysis = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || phase === "analyzing") return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    const maxDim = 1280;
    let tw = vw;
    let th = vh;
    if (vw > maxDim || vh > maxDim) {
      if (vw >= vh) {
        tw = maxDim;
        th = Math.round((vh * maxDim) / vw);
      } else {
        th = maxDim;
        tw = Math.round((vw * maxDim) / vh);
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, tw, th);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    const base64 = dataUrl.split(",")[1];
    if (!base64) return;

    setPhase("analyzing");
    setAnalysis(null);
    setMessage(null);

    try {
      const res = await fetch("/api/skin-scan/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: "image/jpeg" }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; text?: string; devDetail?: string };
      if (!res.ok || !data.ok) {
        const extra = data.devDetail ? ` (${data.devDetail})` : "";
        setMessage(`${data.error ?? `Something went wrong (${res.status}).`}${extra}`);
        setPhase("live");
        return;
      }
      setAnalysis(data.text ?? "");
      setPhase("done");
      trackEvent("skin_scan_analyze_success", {});
    } catch {
      setMessage("Network error. Check your connection and try again.");
      setPhase("live");
    }
  }, [phase]);

  const scanAgain = () => {
    setAnalysis(null);
    setMessage(null);
    setPhase("live");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <nav className="text-sm text-navy/60">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy">Skin scan</span>
      </nav>

      <h1 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">AI skin scan</h1>
      <p className="mt-3 text-sm leading-relaxed text-navy/75">
        Position your face in good light. This tool uses AI to suggest <strong>general educational</strong> observations
        only — it does <strong>not</strong> diagnose medical conditions. Always see a dermatologist or surgeon in person.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[#0f172a] shadow-lg">
        <div className="relative aspect-[4/3] w-full bg-black">
          <video ref={videoRef} className="h-full w-full object-cover" playsInline muted autoPlay />
          {phase === "starting" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm text-white">
              Starting camera…
            </div>
          )}
        </div>
      </div>

      {message && (
        <p className="mt-4 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-sm text-navy" role="alert">
          {message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant="primary" disabled={phase !== "live" && phase !== "done"} onClick={runAnalysis}>
          {phase === "analyzing" ? "Analyzing…" : "Capture & analyze"}
        </Button>
        {phase === "done" && (
          <Button type="button" variant="outline" onClick={scanAgain}>
            New capture
          </Button>
        )}
        <Button href="/book-consultation" variant="outline">
          Book consultation
        </Button>
      </div>

      {analysis && (
        <div className="mt-10 rounded-2xl border border-teal/25 bg-surface p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">AI summary</p>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-navy/90">{analysis}</div>
        </div>
      )}
    </div>
  );
}
