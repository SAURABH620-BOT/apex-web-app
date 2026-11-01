/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSTITUTE_NAME: string;
  readonly VITE_PORTAL_USER: string;
  readonly VITE_PORTAL_PASS: string;
  readonly VITE_AUTH_SECRET: string;
  readonly VITE_SUPPORT_PHONE: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_SUPPORT_EMAIL: string;
  readonly VITE_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
