# RELEASE PROCESS

The release process is **semi-automated**. The generated changelog requires editing to keep it visually appealing and clear for everyone.

## Step by step

1. All the development goes into `dev` branch. There are only squash merges allowed there so that its not flooded with everyones commits.
2. Make a PR to `master` from `dev` and if all checks are good then merge with the title `chore: 🔧 releasing x.x.x`.
3. Generate the changelog
   - `npm run changelog`
4. Take a look at the previous changelogs and modify the generated changelog accordingly. Delete and organize the commits and move them under internals section if needed.
5. Create the release
   - `npm run release`
6. Publish to npm
   - `npm run publish:npm`