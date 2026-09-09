/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WA_GROUP_VITHURA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
