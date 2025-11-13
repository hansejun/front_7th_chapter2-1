import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  // GitHub Actions deploy 빌드에서만 서브패스 적용
  const isGitHubPagesDeploy = process.env.GITHUB_ACTIONS && command === "build";

  return {
    base: isGitHubPagesDeploy ? "/front_7th_chapter2-1/" : "/",
    build: {
      outDir: "dist",
    },
  };
});
