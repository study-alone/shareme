interface ImportMetaEnv {
    // 다른 환경 변수들에 대한 타입 정의...
    readonly VITE_APP_GOOGLE_API_TOKEN: string;
    readonly VITE_APP_GOOGLE_API_SECURITY_PASSWORD: string;
    readonly VITE_APP_SANITY_PROJECT_ID: string;
    readonly VITE_APP_SANITY_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
