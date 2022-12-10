import { defineConfig, loadEnv } from 'vite'
import path from 'path'
// import fs from 'fs';

// plugins
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import checker from 'vite-plugin-checker'
// import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr'
// import babelImport from 'vite-plugin-babel-import'
import babelMacros from 'vite-plugin-babel-macros'
import { createHtmlPlugin } from 'vite-plugin-html'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode, command }) => {
	const envDir = path.resolve(process.cwd(), './config/env/')
	const env = {
		...process.env,
		...loadEnv(mode, envDir),
	}
	const isDev = mode === 'development'

	// console.log({ isDev, env })

	const plugins = [
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
				buildMode: isDev,
			},
		}),
		// like webpack analizer
		visualizer({
			open: isDev,
		}),
		/**
		 * @description
		 * Vite's default browser support baseline is Native ESM, native ESM dynamic import, and import.meta.
		 * This plugin provides support for legacy browsers that do not support those features when building
		 * for production.
		 */
		legacy({
			ignoreBrowserslistConfig: true,
		}),
		svgr(),
		babelMacros(),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					app_title: env.VITE_APP_TITLE,
				},
			},
		}),
	]

	return {
		server: {
			// 프록시 인스턴스 사용
			proxy: {
				// 테스트 용
				'/v1': {
					target: env.VITE_PUBLIC_API_URL,
					changeOrigin: true,
					configure: (proxy, options) => {
						// proxy 변수에는 'http-proxy'의 인스턴스가 전달됩니다
					},
				},
			},
		},
		plugins,

		// 모듈 최적화
		optimizeDeps: {
			// 포함될 리스트
			include: [
				// 'antd/lib/layout',
			],
			esbuildOptions: {
				target: 'es2020',
			},
		},
		build: {
			target: 'es2020',
		},

		// 환경변수 경로
		envDir,
		// 환경변수 접두사
		envPrefix: 'VITE_',
	}
})
