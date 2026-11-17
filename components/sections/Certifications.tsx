"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Image as ImageIcon,
  Cloud,
  Maximize2,
  X,
  BadgeCheck,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description: string;
  imageUrl: string;
  sourceType: "gallery" | "drive";
  createdAt: string;
}

const STORAGE_KEY_AUTH = "ayesha_cert_admin_token";
const STORAGE_KEY_DATA = "ayesha_certificates_cache";
const STORAGE_KEY_DELETED = "ayesha_certificates_deleted_ids";

function parseDriveUrl(url: string): string {
  const trimmed = url.trim();
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
  }
  return trimmed;
}

export default function Certifications() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin Security State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [sourceType, setSourceType] = useState<"gallery" | "drive">("gallery");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [driveUrlInput, setDriveUrlInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Lightbox State
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);

  // Deletion Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Secret Click Trigger for Badge
  const badgeClickCountRef = useRef(0);
  const badgeClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBadgeSecretClick = () => {
    badgeClickCountRef.current += 1;
    if (badgeClickTimerRef.current) clearTimeout(badgeClickTimerRef.current);

    if (badgeClickCountRef.current >= 3) {
      badgeClickCountRef.current = 0;
      setIsAuthModalOpen(true);
    } else {
      badgeClickTimerRef.current = setTimeout(() => {
        badgeClickCountRef.current = 0;
      }, 900);
    }
  };

  // Secret Triggers: Keyboard Shortcut (Ctrl+Shift+A) & URL Hash (#admin or ?admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAuthModalOpen(true);
      }
    };

    const checkAdminHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (hash === "#admin" || search.includes("admin")) {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", checkAdminHash);
    checkAdminHash();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", checkAdminHash);
    };
  }, []);

  // Load Admin Token & Certificates on Mount
  useEffect(() => {
    queueMicrotask(() => {
      const savedToken = sessionStorage.getItem(STORAGE_KEY_AUTH);
      if (savedToken) {
        setIsAdmin(true);
        setAdminToken(savedToken);
      }
    });

    const loadCertificates = async () => {
      try {
        const deletedIds: string[] = JSON.parse(
          localStorage.getItem(STORAGE_KEY_DELETED) || "[]"
        );
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data: CertificateItem[] = await res.json();
          const active = Array.isArray(data) ? data.filter((c) => !deletedIds.includes(c.id)) : [];
          setCertificates(active);
          localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(active));
        } else {
          // Fallback to cache if offline
          const cached = localStorage.getItem(STORAGE_KEY_DATA);
          if (cached) {
            const data: CertificateItem[] = JSON.parse(cached);
            setCertificates(Array.isArray(data) ? data.filter((c) => !deletedIds.includes(c.id)) : []);
          }
        }
      } catch {
        const deletedIds: string[] = JSON.parse(
          localStorage.getItem(STORAGE_KEY_DELETED) || "[]"
        );
        const cached = localStorage.getItem(STORAGE_KEY_DATA);
        if (cached) {
          const data: CertificateItem[] = JSON.parse(cached);
          setCertificates(Array.isArray(data) ? data.filter((c) => !deletedIds.includes(c.id)) : []);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, []);

  // Handle Admin Passcode Login via Secure Server Verification
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const passcode = enteredPasscode.trim();
    if (!passcode) {
      setAuthError("Please enter your admin passcode.");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await fetch("/api/certificates/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (res.ok) {
        setIsAdmin(true);
        setAdminToken(passcode);
        sessionStorage.setItem(STORAGE_KEY_AUTH, passcode);
        setIsAuthModalOpen(false);
        setEnteredPasscode("");
      } else {
        setAuthError("Incorrect passcode. Only the portfolio owner can manage certificates.");
      }
    } catch {
      setAuthError("Verification failed. Please check your connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminToken("");
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  };

  // Handle File Selection from Device / Gallery
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormError("Please select a valid image file (PNG, JPG, WEBP).");
        return;
      }
      setSelectedFile(file);
      setFormError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Google Drive Link Input
  const handleDriveUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setDriveUrlInput(url);
    setFormError("");

    if (url.trim()) {
      const parsed = parseDriveUrl(url);
      setImagePreview(parsed);
    } else {
      setImagePreview("");
    }
  };

  // Handle Form Submission
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please provide a certificate title.");
      return;
    }
    if (!description.trim()) {
      setFormError("Please provide a description of this certificate/credential.");
      return;
    }
    if (sourceType === "gallery" && !selectedFile && !imagePreview) {
      setFormError("Please select a photo from your device gallery.");
      return;
    }
    if (sourceType === "drive" && !driveUrlInput.trim()) {
      setFormError("Please paste a Google Drive shareable link.");
      return;
    }

    setIsSubmitting(true);

    try {
      let response: Response;

      if (sourceType === "gallery" && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title);
        formData.append("issuer", issuer);
        formData.append("date", date);
        formData.append("description", description);

        response = await fetch("/api/certificates", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          body: formData,
        });
      } else {
        response = await fetch("/api/certificates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            title,
            issuer,
            date,
            description,
            driveUrl: driveUrlInput,
            sourceType: "drive",
          }),
        });
      }

      if (response.ok) {
        const created: CertificateItem = await response.json();

        // Ensure newly created certificate is not suppressed by any previous deleted ID
        try {
          const deletedIds: string[] = JSON.parse(
            localStorage.getItem(STORAGE_KEY_DELETED) || "[]"
          );
          if (deletedIds.includes(created.id)) {
            const filtered = deletedIds.filter((d) => d !== created.id);
            localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(filtered));
          }
        } catch {}

        const updated = [created, ...certificates];
        setCertificates(updated);
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));

        setFormSuccess(true);
        setTimeout(() => {
          setIsUploadModalOpen(false);
          setFormSuccess(false);
          resetForm();
        }, 1200);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setFormError(errorData.error || "Failed to upload certificate. Check passcode.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setDriveUrlInput("");
    setImagePreview("");
    setTitle("");
    setIssuer("");
    setDate("");
    setDescription("");
    setFormError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle Certificate Deletion
  const handleDeleteCertificate = async (id: string) => {
    if (!isAdmin) return;

    // Immediately record deleted ID in localStorage so it NEVER shows again after refresh
    try {
      const deletedIds: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY_DELETED) || "[]"
      );
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(deletedIds));
      }
    } catch {}

    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
    setDeletingId(null);

    try {
      const response = await fetch(`/api/certificates?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        console.warn("Server delete warning: Certificate marked deleted locally.");
      }
    } catch {
      // Offline or network error: client persistence ensures it remains deleted
    }
  };

  return (
    <section className="py-20 bg-surface relative" id="certifications">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= Header ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span
              onClick={handleBadgeSecretClick}
              className="inline-block px-2.5 py-0.5 rounded-full bg-error-container text-primary text-[11px] mb-2 font-bold tracking-wider cursor-default select-none"
              title="Certifications & Learning"
            >
              CERTIFICATIONS &amp; LEARNING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Verified Certifications &amp; Credentials
            </h2>
            <p className="text-xs sm:text-sm text-secondary mt-1 max-w-xl leading-relaxed">
              Professional credentials, coursework certificates, and practical learning milestones with verified details and descriptions.
            </p>
          </div>

          {/* Admin Control Bar */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-label-xs text-xs font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin Mode</span>
                </span>

                <button
                  onClick={() => {
                    resetForm();
                    setIsUploadModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 shadow-sm active:scale-95 font-semibold transition-all cursor-pointer"
                  type="button"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Certificate</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-surface-container border border-surface-container-highest text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  title="Exit Admin Mode"
                  type="button"
                >
                  <Unlock className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= Certificates Display ================= */}
        {isLoading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-secondary font-body-sm text-sm">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          /* Empty State */
          <div className="bg-surface-container-lowest border-2 border-dashed border-surface-container-highest rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto my-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center text-[#d4252c] mb-5 shadow-sm">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="font-title-sm text-xl text-on-surface font-bold mb-2">
              Certifications &amp; Learning Showcase
            </h3>
            <p className="font-body-md text-secondary max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
              Verified certifications, practical coursework achievements, and technical credentials will appear here.
            </p>

            {isAdmin && (
              <button
                onClick={() => {
                  resetForm();
                  setIsUploadModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary hover:opacity-90 font-label-md text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                type="button"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Your First Certificate</span>
              </button>
            )}
          </div>
        ) : (
          /* Certificate Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="group bg-surface-container-lowest border border-surface-container-highest rounded-2xl overflow-hidden hover:border-[#d4252c] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Thumbnail Container */}
                  <div
                    onClick={() => setLightboxCert(cert)}
                    className="relative w-full h-52 bg-slate-900 overflow-hidden cursor-pointer group/img"
                  >
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      unoptimized={cert.sourceType === "drive"}
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                      <Maximize2 className="w-4 h-4" />
                      <span>Click to enlarge certificate</span>
                    </div>

                    {/* Source Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#151c27]/80 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1">
                        {cert.sourceType === "drive" ? (
                          <>
                            <Cloud className="w-3 h-3 text-sky-400" />
                            <span>Google Drive</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3 text-emerald-400" />
                            <span>Verified Upload</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Description */}
                  <div className="p-5">
                    {/* Index, Issuer & Date */}
                    <div className="flex items-center justify-between text-xs text-secondary mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#d4252c]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-primary uppercase tracking-wider text-[11px] flex items-center gap-1">
                          <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                          <span>{cert.issuer}</span>
                        </span>
                      </div>
                      {cert.date && (
                        <span className="flex items-center gap-1 text-[11px] text-tertiary">
                          <Calendar className="w-3 h-3" />
                          <span>{cert.date}</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-title-sm text-base text-on-surface font-bold mb-1.5 group-hover:text-primary transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Description Area */}
                    <div className="mt-2.5 bg-surface-container-low/60 rounded-xl p-3 border border-surface-container-highest/60">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                        About This Credential:
                      </span>
                      <p className="font-body-sm text-[11.5px] text-on-surface/90 leading-relaxed whitespace-pre-line">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3.5 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
                  <button
                    onClick={() => setLightboxCert(cert)}
                    className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </button>

                  {/* Admin Only Delete Action */}
                  {isAdmin && (
                    <div>
                      {deletingId === cert.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-red-600 font-bold">Delete?</span>
                          <button
                            onClick={() => handleDeleteCertificate(cert.id)}
                            className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 cursor-pointer"
                            type="button"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1 rounded bg-surface-container text-secondary text-[11px] hover:text-on-surface cursor-pointer"
                            type="button"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(cert.id)}
                          className="text-secondary hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50 cursor-pointer"
                          title="Delete certificate"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL 1: Admin Authentication ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-error-container text-primary flex items-center justify-center mb-4 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">
              Admin Authentication
            </h3>
            <p className="font-body-sm text-xs text-secondary mb-5 leading-relaxed">
              Enter your private admin passcode to securely add or delete certificates.
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-[#d4252c] transition-all"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-surface-container-highest text-secondary hover:text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-5 py-2 rounded-full bg-primary text-on-primary hover:opacity-90 disabled:opacity-50 text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  {isVerifying ? "Verifying..." : "Unlock Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: Upload Certificate ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative my-8">
            <button
              onClick={() => {
                if (!isSubmitting) setIsUploadModalOpen(false);
              }}
              className="absolute top-4 right-4 text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">
                  Add Certificate
                </h3>
                <p className="font-body-sm text-xs text-secondary">
                  Upload photo from your device gallery or attach a Google Drive link.
                </p>
              </div>
            </div>

            {formSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <h4 className="font-title-sm text-lg font-bold text-on-surface">
                  Certificate Published!
                </h4>
                <p className="text-secondary text-xs">
                  Your certificate has been securely added to your portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
                {/* Source Selection Tabs */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Photo Source
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setSourceType("gallery");
                        setDriveUrlInput("");
                        setImagePreview("");
                      }}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sourceType === "gallery"
                          ? "bg-surface-container-lowest text-primary shadow-sm"
                          : "text-secondary hover:text-on-surface"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Device / Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSourceType("drive");
                        setSelectedFile(null);
                        setImagePreview("");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sourceType === "drive"
                          ? "bg-surface-container-lowest text-primary shadow-sm"
                          : "text-secondary hover:text-on-surface"
                      }`}
                    >
                      <Cloud className="w-4 h-4" />
                      <span>Google Drive Link</span>
                    </button>
                  </div>
                </div>

                {/* Source Input Area */}
                {sourceType === "gallery" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cert-file-input"
                    />
                    <label
                      htmlFor="cert-file-input"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-surface-container-highest rounded-xl p-6 hover:border-[#d4252c] transition-colors cursor-pointer bg-surface-container-low/40 group"
                    >
                      <ImageIcon className="w-8 h-8 text-secondary group-hover:text-primary mb-2 transition-colors" />
                      <span className="text-xs font-bold text-on-surface">
                        {selectedFile ? selectedFile.name : "Click to select certificate from gallery"}
                      </span>
                      <span className="text-[11px] text-tertiary mt-1">
                        Supports PNG, JPG, JPEG, WEBP
                      </span>
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1">
                      Google Drive Shareable Link
                    </label>
                    <input
                      type="url"
                      value={driveUrlInput}
                      onChange={handleDriveUrlChange}
                      placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-xs focus:ring-2 focus:ring-[#d4252c] focus:outline-none"
                    />
                    <p className="text-[11px] text-tertiary mt-1">
                      Tip: Ensure your file in Google Drive has sharing set to &quot;Anyone with the link can view&quot;.
                    </p>
                  </div>
                )}

                {/* Live Image Preview */}
                {imagePreview && (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-surface-container-highest">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      unoptimized={sourceType === "drive"}
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setSelectedFile(null);
                        setDriveUrlInput("");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black cursor-pointer"
                      title="Clear photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Certificate Title */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mobile App Development with React Native Intern"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-xs focus:ring-2 focus:ring-[#d4252c] focus:outline-none"
                  />
                </div>

                {/* Issuer & Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={issuer}
                      onChange={(e) => setIssuer(e.target.value)}
                      placeholder="e.g. AICTE–EduSkills"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-xs focus:ring-2 focus:ring-[#d4252c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                      Issue Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. October 2026"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-xs focus:ring-2 focus:ring-[#d4252c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description Area */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Description &amp; Highlights *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write about the topics covered, skills acquired, projects completed, and practical experience gained..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface text-xs focus:ring-2 focus:ring-[#d4252c] focus:outline-none resize-y"
                  />
                </div>

                {formError && (
                  <div className="flex items-center gap-1.5 text-red-600 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3 border-t border-surface-container">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-surface-container-highest text-secondary hover:text-on-surface text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-primary text-on-primary hover:opacity-90 text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <span>Publish Certificate</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 3: Fullscreen Lightbox Preview ================= */}
      {lightboxCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-lowest">
              <div>
                <h3 className="font-title-sm text-base md:text-lg font-bold text-on-surface">
                  {lightboxCert.title}
                </h3>
                <p className="text-xs text-secondary">
                  {lightboxCert.issuer} {lightboxCert.date ? `• ${lightboxCert.date}` : ""}
                </p>
              </div>
              <button
                onClick={() => setLightboxCert(null)}
                className="text-secondary hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Display */}
            <div className="relative w-full h-[55vh] bg-black flex items-center justify-center p-2">
              <Image
                src={lightboxCert.imageUrl}
                alt={lightboxCert.title}
                fill
                unoptimized={lightboxCert.sourceType === "drive"}
                className="object-contain"
              />
            </div>

            {/* Description Details Drawer */}
            <div className="p-6 overflow-y-auto max-h-[25vh] bg-surface-container-low border-t border-surface-container-highest">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-1">
                Description:
              </span>
              <p className="font-body-sm text-xs md:text-sm text-on-surface/90 leading-relaxed whitespace-pre-line">
                {lightboxCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
