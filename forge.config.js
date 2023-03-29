module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-wix',
    //   config: {
    //     language: 1033,
    //     manufacturer: 'AstraEffect'
    //   }
    // },
    {
      name: '@electron-forge/maker-zip',
    },
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {
    //     options: {
    //       maintainer: 'Saturn Maoudis',
    //       homepage: 'https://astraeffect.com'
    //     }
    //   }
    // },
  ],
};