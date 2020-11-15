# RELEASE PROCESS

The release process is **semi-automated**. The generated changelog requires editing to keep it visually appealing and clear for everyone.

## Step by step

1. All the development goes into `dev` branch. There are only squash merges allowed there so that its not flooded with everyones commits.
2. Make a PR to `master` from `dev` and if all checks are good then merge with the title `chore: 🔧 releasing x.x.x`.
3. Generate the changelog
   - `yarn run changelog`
4. Take a look at the previous changelogs and modify the generated changelog accordingly. Delete and organize the commits and move them under internals section if needed.
5. Create the release
   - `yarn run release`
6. Publish to npm
   - `yarn run publish:npm`
7. Push the changes to git.
8. Create release in github by copy pasting the related section from the CHANGELOG.md
9. There is a `release CI workflow`. Wait for it to be succeeded to see if there any problems with the released version.
