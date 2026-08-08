const { spawn } = require("child_process");
const watch = process.argv.includes("--watch");

const commands = [
    {
        name: "esm",
        args: [
            "--bundle",
            "--platform=node",
            "--target=node22",
            "--format=esm",
            "--external:better-sqlite3",
            "--out-extension:.js=.mjs",
            "--outdir=dist/esm",
            ...(watch ? ["--watch"] : []),
            "./src/index.ts",
        ],
    },
    {
        name: "cjs",
        args: [
            "--bundle",
            "--platform=node",
            "--target=node22",
            "--format=cjs",
            "--external:better-sqlite3",
            "--out-extension:.js=.cjs",
            "--outdir=dist/cjs",
            ...(watch ? ["--watch"] : []),
            "./src/index.ts",
        ],
    },
];

function runBuild({ name, args }) {
    return new Promise((resolve, reject) => {
        const proc = spawn("esbuild", args, {
            shell: true,
            stdio: "inherit",
        });
        proc.on("error", reject);
    });
}

Promise.all(commands.map(runBuild)).catch((err) => { console.error(err); process.exit(1); });