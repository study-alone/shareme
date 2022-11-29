var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
// import fs from 'fs';
// plugins
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';
// import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
// import babelImport from 'vite-plugin-babel-import'
import babelMacros from 'vite-plugin-babel-macros';
/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(function (_a) {
    var mode = _a.mode, command = _a.command;
    var envDir = path.resolve(process.cwd(), './config/env/');
    var env = __assign(__assign({}, process.env), loadEnv(mode, envDir));
    var isDev = mode === 'development';
    // console.log({ isDev, env })
    var plugins = [
        /** React hot reload */
        react(),
        /** typescript paths alias */
        tsconfigPaths({}),
        /** eslint error overlay */
        eslint({ cache: false }),
        checker({
            // typescript error overlay
            typescript: {
                tsconfigPath: './tsconfig.json',
                root: './',
                buildMode: isDev
            }
        }),
        // like webpack analizer
        visualizer({
            open: isDev
        }),
        /**
         * @description
         * Vite's default browser support baseline is Native ESM, native ESM dynamic import, and import.meta.
         * This plugin provides support for legacy browsers that do not support those features when building
         * for production.
         */
        legacy({
            ignoreBrowserslistConfig: true
        }),
        svgr(),
        babelMacros(),
    ];
    // 개발 시 에만 사용되는 플러그인
    // isDev &&
    // 	plugins.push(
    // 		// fake cert
    // 		mkcert(),
    // 	)
    return {
        server: {
            // port: parseInt(env.VITE_PORT),
            // https: isDev
            // 	? true
            // 	: {
            // 			key: fs.readFileSync('./.cert/key.pem'),
            // 			cert: fs.readFileSync('./.cert/cert.pem'),
            // 	  },
            // 프록시 인스턴스 사용
            proxy: {
                // 테스트 용
                '/v1': {
                    target: env.VITE_PUBLIC_API_URL,
                    changeOrigin: true,
                    configure: function (proxy, options) {
                        // proxy 변수에는 'http-proxy'의 인스턴스가 전달됩니다
                    }
                }
            }
        },
        plugins: plugins,
        // 모듈 최적화
        optimizeDeps: {
            // 포함될 리스트
            include: [
            // 'antd/lib/layout',
            ],
            esbuildOptions: {
                target: 'es2020'
            }
        },
        build: {
            target: 'es2020'
        },
        // 환경변수 경로
        envDir: envDir,
        // 환경변수 접두사
        envPrefix: 'VITE_'
    };
});
