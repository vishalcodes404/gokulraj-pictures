'use client';

import { useState, useEffect, useRef } from 'react';

interface GallerySlot {
  id: number;
  image: string;
  title: string;
  category: string;
  spanClass: string;
}

export default function AdminPanel() {
  const [slots, setSlots] = useState<GallerySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Fetch gallery config
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      setMessage({ text: 'Failed to load gallery config', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Upload image for a slot
  const handleUpload = async (slotId: number, file: File) => {
    setUploadingSlot(slotId);
    setMessage(null);

    const formData = new FormData();
    formData.append('slotId', String(slotId));
    formData.append('file', file);

    try {
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: `Image ${slotId} updated successfully!`, type: 'success' });
        // Refresh config to get new image path
        await fetchConfig();
      } else {
        setMessage({ text: data.error || 'Upload failed', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Upload failed — check file size and format', type: 'error' });
    } finally {
      setUploadingSlot(null);
    }
  };

  // Save title/category edits
  const handleSaveMeta = async (slotId: number) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: slotId, title: editTitle, category: editCategory }),
      });

      if (res.ok) {
        setMessage({ text: `Slot ${slotId} info updated!`, type: 'success' });
        setEditingSlot(null);
        await fetchConfig();
      }
    } catch {
      setMessage({ text: 'Failed to update slot info', type: 'error' });
    }
  };

  // Clear message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.headerTitle}>Gallery Admin Panel</h1>
            <p style={styles.headerSub}>Gokulraj Pictures — Manage Homepage Gallery (25 Slots)</p>
          </div>
          <a href="/" style={styles.backLink}>← Back to Homepage</a>
        </div>
      </header>

      {/* Status Message */}
      {message && (
        <div style={{
          ...styles.toast,
          background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
          borderColor: message.type === 'success' ? '#86efac' : '#fca5a5',
          color: message.type === 'success' ? '#166534' : '#991b1b',
        }}>
          {message.text}
        </div>
      )}

      {/* Instructions */}
      <div style={styles.instructions}>
        <p style={styles.instructionText}>
          <strong>How to use:</strong> Click &quot;Choose File&quot; on any slot to replace that image.
          Supports JPG, PNG, WebP, AVIF, TIFF — perfect for high-resolution DSLR photographs.
          Click the edit icon (✏️) to change the title and category shown on hover.
        </p>
      </div>

      {/* Gallery Grid */}
      <div style={styles.grid}>
        {slots.map((slot) => (
          <div key={slot.id} style={styles.card}>
            {/* Slot Number Badge */}
            <div style={styles.slotBadge}>{slot.id}</div>

            {/* Image Preview */}
            <div style={styles.imageWrapper}>
              <img
                src={`${slot.image}?t=${Date.now()}`}
                alt={`Slot ${slot.id}`}
                style={styles.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23f5f5f4" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23aaa" font-family="sans-serif" font-size="14">No Image</text></svg>';
                }}
              />

              {/* Upload Overlay */}
              {uploadingSlot === slot.id && (
                <div style={styles.uploadOverlay}>
                  <div style={styles.spinner} />
                  <span style={{ color: '#fff', fontSize: 12, marginTop: 8 }}>Uploading...</span>
                </div>
              )}
            </div>

            {/* Info + Actions */}
            <div style={styles.cardInfo}>
              {editingSlot === slot.id ? (
                /* Edit Mode */
                <div style={styles.editForm}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    style={styles.editInput}
                  />
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                    style={styles.editInput}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => handleSaveMeta(slot.id)}
                      style={styles.saveBtn}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSlot(null)}
                      style={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <>
                  <div style={styles.metaRow}>
                    <span style={styles.categoryBadge}>{slot.category}</span>
                    <button
                      onClick={() => {
                        setEditingSlot(slot.id);
                        setEditTitle(slot.title);
                        setEditCategory(slot.category);
                      }}
                      style={styles.editBtn}
                      title="Edit title & category"
                    >
                      ✏️
                    </button>
                  </div>
                  <p style={styles.title}>{slot.title}</p>
                </>
              )}

              {/* Upload Button */}
              <div style={styles.uploadArea}>
                <input
                  ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/tiff"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(slot.id, file);
                    e.target.value = '';
                  }}
                  style={{ display: 'none' }}
                  id={`upload-${slot.id}`}
                />
                <button
                  onClick={() => fileInputRefs.current[slot.id]?.click()}
                  disabled={uploadingSlot === slot.id}
                  style={{
                    ...styles.uploadBtn,
                    opacity: uploadingSlot === slot.id ? 0.5 : 1,
                  }}
                >
                  {uploadingSlot === slot.id ? 'Uploading...' : 'Replace Image'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Gokulraj Pictures Admin — {slots.length} gallery slots configured</p>
      </footer>
    </div>
  );
}

/* ── Inline Styles ── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fafaf9',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#1a1a1a',
  },
  header: {
    background: '#1a1a1a',
    color: '#fff',
    padding: '24px 32px',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  headerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '0.02em',
    margin: 0,
  },
  headerSub: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  backLink: {
    fontSize: 13,
    color: '#ccc',
    textDecoration: 'none',
    border: '1px solid #444',
    padding: '8px 16px',
    borderRadius: 6,
    transition: 'all 0.2s',
  },
  toast: {
    maxWidth: 600,
    margin: '16px auto',
    padding: '12px 20px',
    borderRadius: 8,
    border: '1px solid',
    fontSize: 14,
    textAlign: 'center' as const,
    fontWeight: 500,
  },
  instructions: {
    maxWidth: 1200,
    margin: '24px auto 8px',
    padding: '0 24px',
  },
  instructionText: {
    fontSize: 13,
    color: '#6b6b6b',
    lineHeight: 1.6,
    background: '#fff',
    padding: '14px 20px',
    borderRadius: 8,
    border: '1px solid #e8e6e3',
  },
  grid: {
    maxWidth: 1200,
    margin: '24px auto 40px',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid #e8e6e3',
    position: 'relative' as const,
    transition: 'box-shadow 0.2s',
  },
  slotBadge: {
    position: 'absolute' as const,
    top: 10,
    left: 10,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: '#1a1a1a',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '66%',
    background: '#f5f4f2',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  uploadOverlay: {
    position: 'absolute' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 28,
    height: 28,
    border: '3px solid #e5e5e5',
    borderTopColor: '#1a1a1a',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  cardInfo: {
    padding: '14px 16px 16px',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryBadge: {
    fontSize: 10,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#999',
    fontWeight: 500,
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    padding: '2px 6px',
    borderRadius: 4,
    transition: 'background 0.2s',
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    margin: '4px 0 12px',
    color: '#1a1a1a',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    marginBottom: 12,
  },
  editInput: {
    width: '100%',
    padding: '8px 10px',
    fontSize: 13,
    border: '1px solid #ddd',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'inherit',
  },
  saveBtn: {
    flex: 1,
    padding: '7px 12px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '7px 12px',
    background: '#f5f4f2',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: 6,
    fontSize: 12,
    cursor: 'pointer',
  },
  uploadArea: {
    marginTop: 4,
  },
  uploadBtn: {
    width: '100%',
    padding: '9px 0',
    background: '#f5f4f2',
    color: '#1a1a1a',
    border: '1px solid #e0ddd9',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    background: '#fafaf9',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '24px 16px',
    fontSize: 12,
    color: '#999',
    borderTop: '1px solid #e8e6e3',
  },
};
