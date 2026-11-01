/**
 * Image Upload & Clipboard Helper
 * Provides automated cloud hosting for student application photos,
 * direct clipboard copy for WhatsApp Web (Ctrl+V), and client-side compression.
 */

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  provider?: string;
  error?: string;
}

/**
 * Converts any image File to PNG Blob for Clipboard API compatibility.
 * Modern browsers (Chrome, Edge) strictly require 'image/png' for ClipboardItem.
 */
export async function convertToPngBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context not available'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas toBlob conversion failed'));
        }
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for canvas conversion'));
    };

    img.src = objectUrl;
  });
}

/**
 * Copies an image file directly to the system clipboard.
 * Allows instant pasting (Ctrl+V) directly into WhatsApp Web or desktop chats.
 */
export async function copyImageToClipboard(file: File): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      console.warn('ClipboardItem API not supported in this browser');
      return false;
    }
    const pngBlob = await convertToPngBlob(file);
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': pngBlob
      })
    ]);
    return true;
  } catch (err) {
    console.warn('Could not copy image to clipboard automatically:', err);
    return false;
  }
}

/**
 * Compresses an image client-side to a lightweight JPEG Data URL (base64)
 * for safe local storage & instant previews.
 */
export async function compressImageToDataUrl(
  file: File,
  maxDimension = 500,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { naturalWidth: width, naturalHeight: height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve('');
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads student photograph to cloud host so direct URL can be sent in WhatsApp.
 * Supports:
 * 1. Cloudinary (if configured)
 * 2. ImgBB (if configured)
 * 3. tmpfiles.org (zero-config, high-speed, CORS enabled)
 */
export async function uploadStudentPhoto(file: File): Promise<ImageUploadResult> {
  // 1. Cloudinary unsigned upload if configured
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (cloudName && uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        return { success: true, url: data.secure_url, provider: 'Cloudinary' };
      }
    } catch (e) {
      console.warn('Cloudinary upload attempt failed:', e);
    }
  }

  // 2. ImgBB if API key provided
  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (imgbbKey) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        return { success: true, url: data.data.url, provider: 'ImgBB' };
      }
    } catch (e) {
      console.warn('ImgBB upload attempt failed:', e);
    }
  }

  // 3. Built-in zero-config uploader: tmpfiles.org
  try {
    const formData = new FormData();
    formData.append('file', file);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (data.status === 'success' && data.data?.url) {
      // Convert https://tmpfiles.org/XXXXXX/file.ext to direct file link https://tmpfiles.org/dl/XXXXXX/file.ext
      const directUrl = data.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
      return { success: true, url: directUrl, provider: 'tmpfiles' };
    }
  } catch (e) {
    console.warn('tmpfiles upload attempt failed:', e);
  }

  return {
    success: false,
    error: 'Direct upload unavailable. Photo will be attached directly in WhatsApp chat.'
  };
}

/**
 * Triggers browser download for student photograph
 */
export function downloadImageFile(file: File, studentName = 'student'): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  const safeName = studentName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const extension = file.name.split('.').pop() || 'jpg';
  a.href = url;
  a.download = `${safeName}_photo.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
