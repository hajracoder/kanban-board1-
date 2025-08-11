/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APPWRITE_DATABASE_ID: string;
  readonly REACT_APPWRITE_COLLECTION_ID_USERS: string;
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
